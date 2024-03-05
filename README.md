# Go Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fgo_pipeline&query=%24.version)](https://pkg.fluentci.io/go_pipeline)
[![deno module](https://shield.deno.dev/x/go_pipeline)](https://deno.land/x/go_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fluentci/go)](https://jsr.io/@fluentci/go)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/go-pipeline)](https://codecov.io/gh/fluent-ci-templates/go-pipeline)
[![ci](https://github.com/fluent-ci-templates/go-pipeline/actions/workflows/ci.yml/badge.svg)](https://github.com/fluent-ci-templates/go-pipeline/actions/workflows/ci.yml)

A ready-to-use CI/CD Pipeline for your Go projects.

## 🚀 Usage

Run the following command in your project:

```bash
fluentci run go_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t go
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
```

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) module:

```sh
dagger install github.com/fluent-ci-templates/go-pipeline@mod
```

Call a function from the module:

```sh
dagger call test --src .
dagger call build --src .
```

## ✨ Jobs

| Job   | Description        |
| ----- | ------------------ |
| fmt   | Format your code   |
| test  | Run your tests     |
| build | Build your project |

```typescript
build(
  src?: Directory | string = "."
): Promise<Directory | string>

fmt(
  src?: Directory | string  = "."
): Promise<Directory | string>

test(src?:  Directory | string = "."): Promise<string>
```

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```ts
import { fmt, test, build } from "jsr:@fluentci/go";

await fmt();
await test();
await build();
```
