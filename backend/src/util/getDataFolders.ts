import { readdir } from "fs/promises";
import path from "path";

export const getDataFolders = async () => {
  const dataDirectory = path.join("data");
  const dirNames = await readdir(dataDirectory, { withFileTypes: true });
  let folders = dirNames
    .filter((file) => file.isDirectory())
    .map((file) => file.name.replace(/_/g, "-"))
    .sort()
    .reverse();

  return folders;
};
