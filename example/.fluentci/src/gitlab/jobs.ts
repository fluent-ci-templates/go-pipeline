import { Job } from "https://deno.land/x/fluent_gitlab_ci@v0.3.2/mod.ts";

export const test = new Job().script("go test -v ./...");

export const fmt = new Job().script("go fmt ./...");

export const build = new Job().script("go build");
