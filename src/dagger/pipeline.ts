import Client, { connect } from "@dagger.io/dagger";
import { build, fmt, test } from "./jobs.ts";

export default function pipeline(src = ".") {
  connect(async (client: Client) => {
    await fmt(client, src);
    await test(client, src);
    await build(client, src);
  });
}
