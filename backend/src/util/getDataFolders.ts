import { readdir } from "fs/promises";
import path from "path";
import { format } from "date-fns";

export const getDataFolders = async (skipFormatting?: boolean) => {
  const dataDirectory = path.join("data");
  const dirNames = await readdir(dataDirectory, { withFileTypes: true });
  let folders = dirNames
    .filter((file) => file.isDirectory())
    .map((file) => file.name.replace(/_/g, "-"))
    .sort()
    .reverse();

  if (!skipFormatting) {
    folders = folders.map((name) => format(new Date(name), "dd/MM/yyyy"));
  }

  return folders;
};
