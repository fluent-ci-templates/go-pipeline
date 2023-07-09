import Client from "@dagger.io/dagger";

export const test = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("test")
    .container()
    .from("golang:latest")
    .withDirectory("/app", context, { exclude: ["vendor", ".git"] })
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
    .withExec(["go", "fmt", "-v", "./..."]);
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
    .withExec(["go", "build"]);
  const result = await ctr.stdout();

  console.log(result);
};
