import { Directory } from "../../deps.ts";
import { Client } from "../../sdk/client.gen.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  test = "test",
  fmt = "fmt",
  build = "build",
}

export const exclude = ["vendor", ".git"];

/**
 * @function
 * @description Run tests
 * @param {string | Directory | undefined} src
 * @returns {Directory | string}
 */
export async function test(
  client: Client,
  src: Directory | string | undefined = ".",
): Promise<string> {
  let result = "";
  const context = getDirectory(client, src);
  const ctr = client
    .pipeline(Job.test)
    .container()
    .from("golang:latest")
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withMountedCache("/go/pkg/mod", client.cacheVolume("go-mod"))
    .withMountedCache("/root/.cache/go-build", client.cacheVolume("go-build"))
    .withExec(["go", "test", "-v", "./..."]);
  result = await ctr.stdout();
  return result;
}

/**
 * @function
 * @description Format the project
 * @param {string | Directory | undefined} src
 * @returns {Directory | string}
 */
export async function fmt(
  client: Client,
  src: Directory | string | undefined = ".",
): Promise<Directory | string> {
  let id = "";
  const context = getDirectory(client, src);
  const ctr = client
    .pipeline(Job.fmt)
    .container()
    .from("golang:latest")
    .withDirectory("/app", context, { exclude })
    .withMountedCache("/go/pkg/mod", client.cacheVolume("go-mod"))
    .withMountedCache("/root/.cache/go-build", client.cacheVolume("go-build"))
    .withWorkdir("/app")
    .withExec(["go", "fmt", "./..."]);
  await ctr.stdout();
  return await ctr.directory("/app/").id();
}

/**
 * @function
 * @description Build binary
 * @param {string | Directory | undefined} src
 * @returns {Directory | string}
 */
export async function build(
  client: Client,
  src: Directory | string | undefined = ".",
): Promise<Directory | string> {
  let id = "";
  const context = getDirectory(client, src);
  const ctr = client
    .pipeline(Job.build)
    .container()
    .from("golang:latest")
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withMountedCache("/go/pkg/mod", client.cacheVolume("go-mod"))
    .withMountedCache("/root/.cache/go-build", client.cacheVolume("go-build"))
    .withExec(["go", "build"]);
  await ctr.stdout();
  return await ctr.directory("/app/").id();
}

export type JobExec = (
  client: Client,
  src: Directory | string | undefined,
) => Promise<Directory | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.test]: test,
  [Job.fmt]: fmt,
  [Job.build]: build,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.test]: "Run tests",
  [Job.fmt]: "Format code",
  [Job.build]: "Build binary",
};
