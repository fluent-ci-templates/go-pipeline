import { GitlabCI } from "https://deno.land/x/fluent_gitlab_ci@v0.3.2/mod.ts";
import { build, fmt, test } from "./jobs.ts";

const gitlabci = new GitlabCI()
  .image("golang:latest")
  .addJob("test", test)
  .addJob("fmt", fmt)
  .addJob("build", build);

export default gitlabci;
