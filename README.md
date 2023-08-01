# Go Pipeline

[![deno module](https://shield.deno.dev/x/go_pipeline)](https://deno.land/x/go_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/go-pipeline)](https://codecov.io/gh/fluent-ci-templates/go-pipeline)

A ready-to-use CI/CD Pipeline for your Go projects.
## 🚀 Usage

Run the following command:

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
import Client, { connect } from "@dagger.io/dagger";
import { Dagger } from "https://deno.land/x/go_pipeline/mod.ts";

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
