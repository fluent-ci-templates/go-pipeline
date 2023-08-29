# Go Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fgo_pipeline&query=%24.version)](https://pkg.fluentci.io/go_pipeline)
[![deno module](https://shield.deno.dev/x/go_pipeline)](https://deno.land/x/go_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/go-pipeline)](https://codecov.io/gh/fluent-ci-templates/go-pipeline)

A ready-to-use CI/CD Pipeline for your Go projects.
## 🚀 Usage

Run the following command in your project:

```bash
dagger run fluentci go_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t go
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
dagger run fluentci .
```

## Jobs

| Job   | Description        |
| ----- | ------------------ |
| fmt   | Format your code   |
| test  | Run your tests     |
| build | Build your project |

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { Client, connect } from "https://esm.sh/@dagger.io/dagger@0.8.1";
import { Dagger } from "https://pkg.fluentci.io/go_pipeline/mod.ts";

const { fmt, test, build } = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await fmt(client, src);
    await test(client, src);
    await build(client, src);
  });
}

pipeline();
```
