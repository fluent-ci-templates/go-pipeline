import { fmt, test, build } from "jsr:@fluentci/go";

await fmt();
await test();
await build();
