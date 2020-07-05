import { dirname as _dirname } from "path";
export interface PathItem {
  path: string;
  type: "file" | "dir";
}

export interface FileItem {
  type: "file";
  name: string;
  path: string;
}

export interface DirectoryItem {
  type: "dir";
  name: string;
  path: string;
  items: (FileItem | DirectoryItem)[];
}

export type Item = FileItem | DirectoryItem;

export const generateFolderTree = (pathItems: PathItem[]): Item[] => {
  pathItems.forEach(({ path }) => {
    generateParentDirectories(path).forEach((dirname) => {
      if (!(dirname in flatFileMap) && dirname !== ".") {
        flatFileMap[dirname] = [];
      }
    });
  });
  pathItems.forEach(({ path }) => {
    const dirname = _dirname(path);
    const fileItem: SideNavItem.Props = generateFile(path, filePathObject, updateKey, option);
    (flatFileMap[dirname] || (flatFileMap[dirname] = [])).push(fileItem);
  });
  const directories = Object.keys(flatFileMap);
  const rootItems = directories
    .filter((directory) => {
      return !!directory && directory === path.basename(directory);
    })
    .map((directory) => {
      deleteItem(directories, directory);
      const items = generateItems(directory, directories, flatFileMap, option);
      return generateDirectory(directory, path.basename(directory), items, option);
    });
  return [generateDirectory(".", "@code-dependency", rootItems, option)];
};

export interface Option {
  basePath: string;
}

export const collect = (pathItems: PathItem[], options?: Option): Item[] => {
  return generateFolderTree(pathItems)
};
