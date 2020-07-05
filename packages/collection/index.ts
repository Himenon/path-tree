import { dirname as _dirname } from "path";

export interface PathItem {
  path: string;
  type: "file" | "dir";
}

export interface TreeData {
  nodes: string[];
  edges: {
    [dirname: string]: string[];
  };
  data: {
    [key: string]: PathItem;
  };
}

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
    if (_parentDirPath === "." || _parentDirPath === "/") {
      return Array.from(dirs);
    }
    dirs.add(_parentDirPath);
    return _getDir(_parentDirPath);
  };
  return _getDir(rootDirPath);
};

export const collect = (pathItems: PathItem[]): TreeData => {
  const directoryItems: PathItem[] = Array.from(new Set(pathItems.map(getParentDirectories).flat())).map((path) => ({
    type: "dir",
    path,
  }));
  const fileItems = pathItems.filter((item) => item.type === "file");
  const allItems = directoryItems.concat(fileItems).sort(compareBasename);
  const nodes = allItems.map((item) => `${item.type}:${item.path}`);
  const edges = allItems.reduce<TreeData["edges"]>((allEdges, node) => {
    const parentDirname = _dirname(node.path);
    const key = `dir:${parentDirname}`;
    if (allEdges[key]) {
      allEdges[key].push(`${node.type}:${node.path}`);
    } else {
      allEdges[key] = [`${node.type}:${node.path}`];
    }
    return allEdges;
  }, {});
  const data = allItems.reduce<TreeData["data"]>((allData, item) => {
    allData[`${item.type}:${item.path}`] = item;
    return allData;
  }, {});
  return {
    nodes,
    edges,
    data,
  };
};
