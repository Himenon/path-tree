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

interface State {
  nodes: PathItem[];
  edges: {
    [dirname: string]: string;
  };
}

export type Item = FileItem | DirectoryItem;

export const getParentDirectories = (pathItem: PathItem): PathItem[] => {
  const rootDirPath = pathItem.type === "file" ? _dirname(pathItem.path) : pathItem.path;
  const dirs: Set<string> = new Set([rootDirPath]);
  const _getDir = (_path: string): PathItem[] => {
    const _parentDirPath = _dirname(_path);
    if (_parentDirPath === ".") {
      return Array.from(dirs).map((p) => ({
        type: "dir",
        path: p,
      }));
    }
    dirs.add(_parentDirPath);
    return _getDir(_parentDirPath);
  };
  return _getDir(rootDirPath);
};

const generateNode = (pathItem: PathItem) => {
  if (pathItem.type === "dir") {
    // 全部directory
    pathItem.path;
  }
};

export const generateFolderTree = (pathItems: PathItem[]): Item[] => {
  const state: State = {
    nodes: pathItems,
    edges: {},
  };
  return pathItems.reduce<Item[]>((items, pathItem) => {
    if (pathItem.type === "dir  ") {
    }
    return items;
  }, []);
};

export interface Option {
  basePath: string;
}

export const collect = (pathItems: PathItem[], options?: Option): Item[] => {
  return generateFolderTree(pathItems);
};
