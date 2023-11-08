import {
  fmt,
  test,
  build,
} from "https://pkg.fluentci.io/go_pipeline@v0.7.0/mod.ts";

await fmt();
await test();
await build();
