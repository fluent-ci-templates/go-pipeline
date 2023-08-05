import Client from "@dagger.io/dagger";

export enum Job {
  test = "test",
  fmt = "fmt",
  build = "build",
}

export const test = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline(Job.test)
    .container()
    .from("golang:latest")
    .withDirectory("/app", context, { exclude: ["vendor", ".git"] })
    .withWorkdir("/app")
    .withMountedCache("/go/pkg/mod", client.cacheVolume("go-mod"))
    .withMountedCache("/root/.cache/go-build", client.cacheVolume("go-build"))
    .withExec(["go", "test", "-v", "./..."]);
  const result = await ctr.stdout();

  console.log(result);
};

export const fmt = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline(Job.fmt)
    .container()
    .from("golang:latest")
    .withDirectory("/app", context, { exclude: ["vendor", ".git"] })
    .withMountedCache("/go/pkg/mod", client.cacheVolume("go-mod"))
    .withMountedCache("/root/.cache/go-build", client.cacheVolume("go-build"))
    .withWorkdir("/app")

    .withExec(["go", "fmt", "./..."]);
  const result = await ctr.stdout();

  console.log(result);
};

export const build = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline(Job.build)
    .container()
    .from("golang:latest")
    .withDirectory("/app", context, { exclude: ["vendor", ".git"] })
    .withWorkdir("/app")
    .withMountedCache("/go/pkg/mod", client.cacheVolume("go-mod"))
    .withMountedCache("/root/.cache/go-build", client.cacheVolume("go-build"))
    .withExec(["go", "build"]);
  const result = await ctr.stdout();

  console.log(result);
};

export type JobExec = (client: Client, src?: string) => Promise<void>;

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
