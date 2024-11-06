---
permSlug: '@hawapi/go-sdk'
title: '@hawapi/go-sdk'
description: 'HawAPI SDK for Golang designed to simplify the integration with the API.'
git: 'https://github.com/HawAPI/go-sdk'
url: 'https://pkg.go.dev/github.com/HawAPI/go-sdk'
tags:
  - 'Golang'
  - 'API'
  - 'SDK'
  - 'HawAPI'
codeLanguage: 'Typescript'
language: 'en'
icon: 'simple-icons:go'
category: 'Project'
target:
  - 'Web'
  - 'SDK'
  - 'Library'
color: '#691313'
status: 'active'
isVisible: false
isIndexable: false
---

[HawAPI](/projects/hawapi/) SDK for **Golang** designed to simplify the integration with the **API**.

## Usage

### Installation

```bash showLineNumbers=false
go get github.com/HawAPI/go-sdk/hawapi@latest
```

### Importing and Requesting

```go
package main

import (
	"fmt"

	"github.com/HawAPI/go-sdk/hawapi"
)

func main() {
	// Create a new client with default options
	client := hawapi.NewClient()

	// Override options
	client.WithOpts(hawapi.Options{
		Endpoint: "http://localhost:8080/api",
		// When using 'WithOpts' or 'NewClientWithOpts' the value of
		// 'UseInMemoryCache' will be set to false
		UseInMemoryCache: true,
	})

	res, err := client.ListActors()
	if err != nil {
		panic(err)
	}

	fmt.Println(res)
	fmt.Println(len(res.Data))
}
```

### Links

- [Website](https://pkg.go.dev/github.com/HawAPI/go-sdk)
- [Docs](https://pkg.go.dev/github.com/HawAPI/go-sdk)
- [API Docs](https://hawapi.theproject.id/docs/)
- [GitHub](https://github.com/HawAPI/go-sdk/)
