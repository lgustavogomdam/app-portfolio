import { Technology } from "./technology";

export interface Repository {
  name: string,
  description: string,
  link: string,
  techs?: Technology[]
}
