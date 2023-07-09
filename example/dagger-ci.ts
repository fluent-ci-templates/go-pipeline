import Client, { connect } from "@dagger.io/dagger";
import { Dagger } from "https://deno.land/x/go_pipeline@v0.1.1/mod.ts";

const { build, test, fmt } = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await fmt(client, src);
    await test(client, src);
    await build(client, src);
  });
}

pipeline();
