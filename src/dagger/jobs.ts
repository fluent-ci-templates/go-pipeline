import Client from "@dagger.io/dagger";

export const test = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("test")
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
    .pipeline("fmt")
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
    .pipeline("build")
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
