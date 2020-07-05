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

export interface State {
  nodes: PathItem[];
  edges: {
    [dirname: string]: string;
  };
}

export type Item = FileItem | DirectoryItem;

/**
 * vscodeのファイルツリーと同じ順序にならべる.
 */
export const compareBasename = (a: PathItem, b: PathItem): 0 | -1 | 1 => {
  if (a.type === "dir" && b.type === "file") {
    return -1;
  }
  if (a.type === "file" && b.type === "dir") {
    return 1;
  }
  if (a.path.toLowerCase() < b.path.toLowerCase()) {
    return -1;
  }
  if (a.path.toLowerCase() > b.path.toLowerCase()) {
    return 1;
  }
  return 0;
};

export const getParentDirectories = (pathItem: PathItem): string[] => {
  const rootDirPath = pathItem.type === "file" ? _dirname(pathItem.path) : pathItem.path;
  const dirs: Set<string> = new Set([rootDirPath]);
  const _getDir = (_path: string): string[] => {
    const _parentDirPath = _dirname(_path);
    if (_parentDirPath === ".") {
      return Array.from(dirs);
    }
    dirs.add(_parentDirPath);
    return _getDir(_parentDirPath);
  };
  return _getDir(rootDirPath);
};

export const generateState = (pathItems: PathItem[]): State => {
  const directoryItems: PathItem[] = Array.from(new Set(pathItems.map(getParentDirectories).flat())).map((path) => ({
    type: "dir",
    path,
  }));
  const fileItems = pathItems.filter((item) => item.type === "file");
  const state: State = {
    nodes: directoryItems.concat(fileItems).sort(compareBasename),
    edges: {},
  };
  return state;
};

const generateNode = (pathItem: PathItem) => {
  if (pathItem.type === "dir") {
    // 全部directory
    pathItem.path;
  }
};

export const generateFolderTree = (pathItems: PathItem[]): Item[] => {
  return pathItems.reduce<Item[]>((items, pathItem) => {
    return items;
  }, []);
};

export interface Option {
  basePath: string;
}

export const collect = (pathItems: PathItem[], options?: Option): Item[] => {
  return generateFolderTree(pathItems);
};
