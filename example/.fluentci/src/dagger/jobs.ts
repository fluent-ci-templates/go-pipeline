import { Directory } from "../../deps.ts";
import { dag } from "../../sdk/client.gen.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  test = "test",
  fmt = "fmt",
  build = "build",
}

export const exclude = ["vendor", ".git"];

/**
 * Run tests
 *
 * @function
 * @description Run tests
 * @param {string | Directory | undefined} src
 * @returns {Directory | string}
 */
export async function test(
  src: Directory | string | undefined = "."
): Promise<string> {
  let result = "";
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.test)
    .container()
    .from("golang:latest")
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withMountedCache("/go/pkg/mod", dag.cacheVolume("go-mod"))
    .withMountedCache("/root/.cache/go-build", dag.cacheVolume("go-build"))
    .withExec(["go", "test", "-v", "./..."]);
  result = await ctr.stdout();
  return result;
}

/**
 * Format the project
 *
 * @function
 * @description Format the project
 * @param {string | Directory | undefined} src
 * @returns {Directory | string}
 */
export async function fmt(
  src: Directory | string | undefined = "."
): Promise<Directory | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.fmt)
    .container()
    .from("golang:latest")
    .withDirectory("/app", context, { exclude })
    .withMountedCache("/go/pkg/mod", dag.cacheVolume("go-mod"))
    .withMountedCache("/root/.cache/go-build", dag.cacheVolume("go-build"))
    .withWorkdir("/app")

    .withExec(["go", "fmt", "./..."]);
  await ctr.stdout();
  const id = await ctr.directory("/app/").id();
  return id;
}

/**
 * Build binary
 *
 * @function
 * @description Build binary
 * @param {string | Directory | undefined} src
 * @returns {Directory | string}
 */
export async function build(
  src: Directory | string | undefined = "."
): Promise<Directory | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.build)
    .container()
    .from("golang:latest")
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withMountedCache("/go/pkg/mod", dag.cacheVolume("go-mod"))
    .withMountedCache("/root/.cache/go-build", dag.cacheVolume("go-build"))
    .withExec(["go", "build"]);
  await ctr.stdout();
  const id = await ctr.directory("/app/").id();
  return id;
}

export type JobExec = (
  src: Directory | string | undefined
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
