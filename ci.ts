import {
  fmt,
  test,
  build,
} from "https://pkg.fluentci.io/go_pipeline@v0.9.1/mod.ts";

await fmt();
await test();
await build();
