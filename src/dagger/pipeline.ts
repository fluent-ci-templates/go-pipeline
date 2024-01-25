import { uploadContext } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { Client } from "../../sdk/client.gen.ts";
import * as jobs from "./jobs.ts";

const { build, fmt, test, exclude } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (Deno.env.has("FLUENTCI_SESSION_ID")) {
    await uploadContext(src, exclude);
  }
  if (args.length > 0) {
    await runSpecificJobs(args);
    return;
  }

  await connect(async (client: Client) => {
    await fmt(client, src);
    await test(client, src);
    await build(client, src);
  });
}

async function runSpecificJobs(args: string[]) {
  await connect(async (client: Client) => {
    for (const name of args) {
      // deno-lint-ignore no-explicit-any
      const job = (jobs as any)[name];
      if (!job) {
        throw new Error(`Job ${name} not found`);
      }
      await job(client);
    }
  });
}
