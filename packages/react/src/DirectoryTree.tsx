import * as React from "react";
import * as File from "./File";
import * as Directory from "./Directory";
import { basename } from "path";
import { TreeData } from "@path-tree/collection";

export interface ComponentSet {
  FileComponent: File.ComponentType;
  DirectoryComponent: Directory.ComponentType;
}

const createTreeComponent = (
  edge: string,
  treeData: TreeData,
  visited: string[],
  { FileComponent, DirectoryComponent }: ComponentSet,
  level = 0,
): JSX.Element | JSX.Element[] | undefined => {
  if (visited.includes(edge)) {
    return undefined;
  } else {
    visited.push(edge);
  }
  const [type, fullPath] = edge.split(":");
  if (type === "file") {
    const props: File.Props = {
      path: fullPath,
      name: basename(fullPath),
      level,
    };
    return <FileComponent key={edge} {...props} />;
  }
  const children = treeData.edges[edge].map((childEdge) => {
    return createTreeComponent(childEdge, treeData, visited, { FileComponent, DirectoryComponent }, level + 1);
  });
  const props: Directory.Props = {
    path: fullPath,
    name: basename(fullPath),
    level,
  };
  if (props.name === ".") {
    return <React.Fragment key={`level-${level}`}>{children}</React.Fragment>;
  }
  return <DirectoryComponent key={edge} {...props} children={children} />;
};

export interface Props {
  treeData: TreeData;
  componentSet: ComponentSet;
}

export const Component: React.FC<Props> = ({ treeData, componentSet }) => {
  const visited: string[] = [];
  const elements = Object.keys(treeData.edges).map((edge) => {
    return createTreeComponent(edge, treeData, visited, componentSet);
  });
  return <>{elements}</>;
};

Component.displayName = "DirectoryTree";
