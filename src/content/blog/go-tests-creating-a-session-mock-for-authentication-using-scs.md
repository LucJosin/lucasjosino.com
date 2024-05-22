---
title: 'Go Tests: Creating a session mock for authentication using SCS'
description: "In this article, we'll explore how to mock our session and inject data into context for authentication tests"
image:
  src: 'https://raw.githubusercontent.com/lucjosin/lucasjosino.com/main/public/static/blog/ZfgJzcJf/golang-session-tests.png'
  position: 'left'
  showInPost: true
tags:
  - 'golang'
  - 'go-chi'
  - 'tests'
  - 'auth'
  - 'session'
category: 'How to'
language: 'en'
shortlink: '/b/ZfgJzcJf'
isVisible: true
enableComments: true
color: '#173d74'
publishedAt: '2024-02-01 20:00 UTC-3'
---

## Table of Contents

## Introduction

While working on a personal project using Go and [alexedwards/scs](https://github.com/alexedwards/scs) for handling sessions, I've come across an issue when creating tests: After setting up the configuration and the `LoadAndSave` middleware, all tests started failing with 401 (Unauthorized) response.

In this quickly post we'll simple a small GoLang server using [go-chi](https://go-chi.io) router and implement a `LoadAndSaveMock` middleware to inject any session information into our test.

Or if you want to go direct to the [LoadAndSaveMock middleware](#implementing-loadandsavemock-middleware) :)

## Server config

First, let's create a `Server` struct to hold our session manager and router

```go title="main.go"
type Server struct {
	session *scs.SessionManager
	router  *chi.Mux
}
```

And now, create our main function, session, router and server

```go title="main.go" ins={6-15}
type Server struct {
	session *scs.SessionManager
	router  *chi.Mux
}

func main() {
	session := scs.New()
	router := chi.NewRouter()
	server := &Server{
		session: session,
		router:  router,
	}

	router.Use(session.LoadAndSave)
}
```

!!!info Note that we are defining the `LoadAndSave` middleware from the SCS session. This middleware will get the value from the cookie and save into our request context.

## Server routes

We can now define two routes:

- / - Will return 200 (Ok) with the message "Hello, World!" and insert an `user_role` value into our context
- /admin - Will return 200 (Ok) with the message "Hello, \<role\>!"

!!!warning If we request the `/admin` endpoint before requesting the root endpoint, we should get an 401 (Unauthorized) status code.

Let's implement all handlers:

```go title="main.go"
func (s *Server) handleHelloWorld(w http.ResponseWriter, r *http.Request) {
	// Save "ADMIN" value into "user_role"
	s.session.Put(r.Context(), "user_role", "ADMIN")

	// Send the message (By default, will send a 200 status code)
	w.Write([]byte("Hello, World!"))
}

func (s *Server) handleAdmin(w http.ResponseWriter, r *http.Request) {
	// Get the "user_role" value from request context
	role := s.session.GetString(r.Context(), "user_role")

	// By default, GetString will return an empty string if no value is found
	if role == "" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Send the message (By default, will send a 200 status code)
	w.Write([]byte("Welcome, " + role + "!"))
}
```

Defining the handlers into router:

```go title="main.go" ins={16-20, 25-45}
type Server struct {
	session *scs.SessionManager
	router  *chi.Mux
}

func main() {
	session := scs.New()
	router := chi.NewRouter()
	server := &Server{
		session: session,
		router:  router,
	}

	router.Use(session.LoadAndSave)

	// Routes
	router.Get("/", server.handleHelloWorld)
	router.Group(func(router chi.Router) {
		router.Get("/admin", server.handleAdmin)
	})

	http.ListenAndServe(":6987", router)
}

func (s *Server) handleHelloWorld(w http.ResponseWriter, r *http.Request) {
	// Save "ADMIN" value into "user_role"
	s.session.Put(r.Context(), "user_role", "ADMIN")

	// Send the message (By default, will send a 200 status code)
	w.Write([]byte("Hello, World!"))
}

func (s *Server) handleAdmin(w http.ResponseWriter, r *http.Request) {
	// Get the "user_role" value from request context
	role := s.session.GetString(r.Context(), "user_role")

	// By default, GetString will return an empty string if no value is found
	if role == "" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Send the message (By default, will send a 200 status code)
	w.Write([]byte("Welcome, " + role + "!"))
}
```

## Middleware for user authorization

To complete our simple GoLang server, we need a middleware for handling user authorization

```go title="main.go"
func (s *Server) RequireAdmin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get "user_role" value and validate
		if s.session.GetString(r.Context(), "user_role") != "ADMIN" {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
```

We'll use this middleware inside the `router.Group`

```go title="main.go" ins={4}
// Routes
router.Get("/", server.handleHelloWorld)
router.Group(func(router chi.Router) {
	router.Use(server.RequireAdmin)
	router.Get("/admin", server.handleAdmin)
})
```

## The testing

Now, the testing part.

Our test will have four paths:

- Public endpoint that will return `200 (Ok){endpointOk1#green-white}`
- Admin endpoint **without role** that will return `401 (Unauthorized){endpointUnauthorized1#goldenrod-white}`
- Admin endpoint **with wrong role** that will return `401 (Unauthorized){endpointUnauthorized2#goldenrod-white}`
- Admin endpoint **with correct role** that will return `200 (Ok){endpointOk2#green-white}`

```go title="main_test.go"
func Test_main(t *testing.T) {
	tests := []struct {
		name     string
		url      string
		role     string
		wantCode int
	}{
		{
			name:     "public endpoint",
			url:      "/",
			wantCode: http.StatusOK,
		},
		{
			name:     "admin endpoint without role",
			url:      "/admin",
			wantCode: http.StatusUnauthorized,
		},
		{
			name:     "admin endpoint with wrong role",
			url:      "/admin",
			role:     "OTHER",
			wantCode: http.StatusUnauthorized,
		},
		{
			name:     "admin endpoint with correct role",
			url:      "/admin",
			role:     "ADMIN",
			wantCode: http.StatusOK,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// TODO: Add test logic here
		})
	}
}
```

Implementing the first part of the test logic **(server configuration)**:

```go title="main_test.go"
// Set up
session := scs.New()
router := chi.NewRouter()
server := &Server{
		session: session,
		router:  router,
}

// TODO: Implement session middleware

// Routes
router.Get("/", server.handleHelloWorld)
router.Group(func(router chi.Router) {
	router.Use(server.RequireAdmin)
	router.Get("/admin", server.handleAdmin)
})

```

Second part of the test logic **(http request and status validation)**:

```go title="main_test.go"
// Request
rr := httptest.NewRecorder()
req := httptest.NewRequest("GET", tt.url, nil)
router.ServeHTTP(rr, req)

// Result
res := rr.Result()

if tt.wantCode != res.StatusCode {
	t.Errorf("Expected response code %d. Got %d\n", tt.wantCode, res.StatusCode)
}
```

## LoadAndSaveMock middleware

In this section we'll create a wrapper/middleware of the `LoadAndSave` middleware from the SCS package, this mock will inject any value we want into our router before recording the test request:

```go title="main_test.go"
func LoadAndSaveMock(session *scs.SessionManager, key, value string) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return session.LoadAndSave(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			session.Put(r.Context(), key, value)
			next.ServeHTTP(w, r)
		}))
	}
}
```

## Putting all together

The final test code logic:

```go title="main_test.go" ins={1-8, 42-70}
func LoadAndSaveMock(session *scs.SessionManager, key, value string) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return session.LoadAndSave(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			session.Put(r.Context(), key, value)
			next.ServeHTTP(w, r)
		}))
	}
}

func Test_main(t *testing.T) {
	tests := []struct {
		name     string
		url      string
		role     string
		wantCode int
	}{
		{
			name:     "public endpoint",
			url:      "/",
			wantCode: http.StatusOK,
		},
		{
			name:     "admin endpoint without role",
			url:      "/admin",
			wantCode: http.StatusUnauthorized,
		},
		{
			name:     "admin endpoint with wrong role",
			url:      "/admin",
			role:     "OTHER",
			wantCode: http.StatusUnauthorized,
		},
		{
			name:     "admin endpoint with correct role",
			url:      "/admin",
			role:     "ADMIN",
			wantCode: http.StatusOK,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Set up
			session := scs.New()
			router := chi.NewRouter()
			server := &Server{
				session: session,
				router:  router,
			}

			// Session middleware
			router.Use(LoadAndSaveMock(session, "user_role", tt.role))

			// Routes
			router.Get("/", server.handleHelloWorld)
			router.Group(func(router chi.Router) {
				router.Use(server.RequireAdmin)
				router.Get("/admin", server.handleAdmin)
			})

			// Request
			rr := httptest.NewRecorder()
			req := httptest.NewRequest("GET", tt.url, nil)
			router.ServeHTTP(rr, req)

			// Result
			res := rr.Result()

			if tt.wantCode != res.StatusCode {
				t.Errorf("Expected response code %d. Got %d\n", tt.wantCode, res.StatusCode)
			}
		})
	}
}
```

And.. we get this result

```bash showLineNumbers=false title="go test ./..."
=== RUN   Test_main
=== RUN   Test_main/public_endpoint
--- PASS: Test_main/public_endpoint (0.00s)
=== RUN   Test_main/admin_endpoint_without_role
--- PASS: Test_main/admin_endpoint_without_role (0.00s)
=== RUN   Test_main/admin_endpoint_with_wrong_role
--- PASS: Test_main/admin_endpoint_with_wrong_role (0.00s)
=== RUN   Test_main/admin_endpoint_with_correct_role
--- PASS: Test_main/admin_endpoint_with_correct_role (0.00s)
--- PASS: Test_main (0.00s)
PASS
ok      github.com/LucJosin/go-scs-test 0.002s
```

## Conclusion

In this post I show you a solution to a problem that I've encountered while implementing auth tests using the SCS session package.

## Resources and References

- [https://go-chi.io/#/](https://go-chi.io/#/)
- [https://github.com/alexedwards/scs](https://github.com/alexedwards/scs)
- [https://stackoverflow.com/questions/76607300](https://stackoverflow.com/questions/76607300) ([Comment](https://stackoverflow.com/a/76608076/14500144))
- [https://stackoverflow.com/questions/76606201](https://stackoverflow.com/questions/76606201) ([Comment](https://stackoverflow.com/a/76606952/14500144))
