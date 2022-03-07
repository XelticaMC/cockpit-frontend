import { PaperBuildResponse, PaperProjectResponse, PaperVersionResponse } from "./response/paper";

export async function getPaperProject() {
  return fetch('https://papermc.io/api/v2/projects/paper').then(r => r.json()).then(r => r as PaperProjectResponse);
}

export async function getPaperVersion(version: string) {
  return fetch('https://papermc.io/api/v2/projects/paper/versions/' + version).then(r => r.json()).then(r => r as PaperVersionResponse);
}

export async function getPaperBuild(version: string, build: number) {
  return fetch(`https://papermc.io/api/v2/projects/paper/versions/${version}/builds/${build}`).then(r => r.json()).then(r => r as PaperBuildResponse);
}
