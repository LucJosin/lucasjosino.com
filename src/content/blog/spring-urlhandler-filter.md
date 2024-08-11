---
permSlug: 'spring-boot-using-the-new-filter-for-trailing-slash-handling'
title: 'Spring Boot: Using the new filter for trailing slash handling'
description: 'In this tutorial, we’ll explore how to use the new UrlHandlerFilter to handle trailing slash in Spring Boot 3, including how to forward or redirect requests.'
image:
  src: 'https://raw.githubusercontent.com/lucjosin/lucasjosino.com/main/public/static/blog/YcStYlHD/spring-url-filter.png'
  position: 'left'
  showInPost: true
tags:
  - 'spring'
  - 'spring-boot'
  - 'spring-framework'
  - 'java'
category: 'How to'
language: 'en'
shortlink: '/b/YcStYlHD'
color: '#406924'
isVisible: true
isIndexable: true
enableComments: true
easyShare: true
publishedAt: '2024-06-13 18:20 UTC-3'
---

## Table of contents

## Introduction

I've been migrating the [HawAPI - A Free and Open Source API for Stranger Things](https://hawapi.theproject.id/) project from Spring Boot **2.7** to **3.3** and one intresting thing that I notice while running the tests is: _Tests where the URL ends with a trailing slash **(/)** started failing with 404 status code_.

Before Spring Boot **3.X** (Spring Framework **6.X**) the value of `setUseTrailingSlashMatch` was always `true`. However, with the latest major upgrade, this parameter has been deprecated and its value is now fixed at `false` in all locations. (See commit [b312eca](https://github.com/spring-projects/spring-framework/commit/b312eca39177cf9bd588c52c3b56ca42b4f75271))

According to the docs:

> [...] support for trailing slashes is deprecated as of 6.0 in favor of configuring explicit redirects through a proxy, Servlet/web filter, or a controller. - [PathPatternParser.java#L45-L61](https://github.com/spring-projects/spring-framework/blob/69c44dee9946d3bb1a1aa0ddef16f3226df6acc7/spring-web/src/main/java/org/springframework/web/util/pattern/PathPatternParser.java#L45-L61)

## Solutions for handle trailing slash

With that being said, let's dive into our options:

### Declaring multiple routes for every handler

The first solution is to **explicit** declare a second route mapping in all route handlers:

```java title="UserController.java"
@GetMapping({"/users/{uuid}", "/users/{uuid}/"})
public ResponseEntity<UserDTO> findUser(@PathVariable UUID uuid) {
    // ...
}

@PostMapping({"/users", "/users/"})
public ResponseEntity<UserDTO> registerUser(UserRegistrationDTO user) {
    // ...
}
```

The problem is: this solution will only work effectively if the application has a few number of mappings.

### Using a custom OncePerRequestFilter

To avoid adding a second route mapping to all routes, we can create a custom `OncePerRequestFilter` to redirect
all request urls that contain trailing slash **(/)** to the url without it and using the `301 (Moved Permanently){301-status-code##f0ad4e-white}` status code.

```java title="TrailingSlashHandlerFilter.java" ins={10-19}
@Component
public class TrailingSlashHandlerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String requestUri = request.getRequestURI();

        if (requestUri.endsWith("/")) {
            String newUrl = requestUri.substring(0, requestUri.length() - 1);
            response.setStatus(HttpStatus.MOVED_PERMANENTLY.value());
            response.setHeader(HttpHeaders.LOCATION, newUrl);
            return;
        }

        filterChain.doFilter(request, response);
    }
}
```

It's a good option but we'll need to redirect all requests the url without trailing slash, or vice versa.

### Using the new UrlHandlerFilter

!!!warning At the moment of writing this post, the version **6.2.0** wasn't released yet. To be able to use the new `UrlHandlerFilter` i'm using the version [6.2.0-M4](https://github.com/spring-projects/spring-framework/releases/tag/v6.2.0-M4). See how to install:

<details>
<summary>Overriding Spring Framework</summary>

1. Add the milestone repository to your pom.xml file:

```xml title="pom.xml" ins={7-14, 16-25} showLineNumbers=false
    <repositories>
        <repository>
            <id>maven_central</id>
            <name>Maven Central</name>
            <url>https://repo.maven.apache.org/maven2/</url>
        </repository>
        <repository>
            <id>spring-milestones</id>
            <name>Spring Milestones</name>
            <url>https://repo.spring.io/milestone</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>
    <pluginRepositories>
        <pluginRepository>
            <id>spring-milestones</id>
            <name>Spring Milestones</name>
            <url>https://repo.spring.io/milestone</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </pluginRepository>
    </pluginRepositories>
```

2. Override spring framework version:

```xml title="pom.xml" ins={3}
    <properties>
        <java.version>21</java.version>
        <spring-framework.version>6.2.0-M4</spring-framework.version>
    </properties>
```

</details>

In this version we can use the new **UrlHandlerFilter** with a few possible options:

1. Redirect **all** or **only specific** urls with `301 (Moved Permanently){301-status-code##f0ad4e-white}`
2. Handle **all** or **only specific** urls (Same as before Spring Boot **3.X** (Spring Framework **6.X**))

```java title="TrailingSlashHandlerFilter.java" ins={10-15}
@Component
public class TrailingSlashHandlerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        // Redirecting
        UrlHandlerFilter filter = UrlHandlerFilter.trimTrailingSlash("/**").andRedirect(HttpStatus.PERMANENT_REDIRECT).build();

        // Or transparently handle those for HTTP clients, without any redirect:
        UrlHandlerFilter filter = UrlHandlerFilter.trimTrailingSlash("/**").andHandleRequest().build();
        filter.doFilter(request, response, filterChain);
    }
}
```

!!!info The **catch-all pattern (/\*\*)** matches any path, including nested paths. \
\
\- /api/test will - be handled.
\
\- /api/test/subpath - will also be handled.

## Conclusion

In this article, we discussed the deprecation of the **trailing slash** matching configuration option in Spring Boot 3 showing three possible ways, including the [official](#using-the-new-urlhandlerfilter) **UrlHandlerFilter** filter, to fix this small but significant change.

According to [@rstoyanchev](https://github.com/rstoyanchev), this deprecation will not be reverted:

> [...] However, undeprecating trailing slash matching at this point, only to deprecate that later again, will only add to the confusion. - [issuecomment-1748751881](https://github.com/spring-projects/spring-framework/issues/28552#issuecomment-1748751881)

## Resources and References

- [stackoverflow.com/issues#14500144](https://stackoverflow.com/a/74786037/14500144)
- [spring-framework/issues#31366](https://github.com/spring-projects/spring-framework/issues/31366)
- [spring-framework/issues#32830](https://github.com/spring-projects/spring-framework/issues/32830)
- [spring-framework/issues#28552](https://github.com/spring-projects/spring-framework/issues/28552)
- [spring-framework/commit#edb6bb7](https://github.com/spring-projects/spring-framework/commit/edb6bb717d9ea10429a9e5c1fba285cd7761d5a1)
- [spring-framework/commit#b312eca](https://github.com/spring-projects/spring-framework/commit/b312eca39177cf9bd588c52c3b56ca42b4f75271)
- [spring.io/commit#urlhandlerfilter-for-trailing-slash-match](https://spring.io/blog/2024/05/16/spring-framework-6-2-0-m2-available-now#urlhandlerfilter-for-trailing-slash-match)
