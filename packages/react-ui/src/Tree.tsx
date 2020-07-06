import * as React from "react";
import * as File from "./File";
import * as Directory from "./Directory";
import { basename } from "path";
import { collect, PathItem, TreeData } from "@path-tree/collection";

export { File, Directory };

export interface Props {
  pathItems: PathItem[];
  FileComponent?: File.ComponentType;
  DirectoryComponent?: Directory.ComponentType;
}

interface ComponentSet {
  FileComponent: File.ComponentType;
  DirectoryComponent: Directory.ComponentType;
}

const createTreeComponent = (edge: string, treeData: TreeData, visited: string[], { FileComponent, DirectoryComponent }: ComponentSet) => {
  if (visited.includes(edge)) {
    return undefined;
  } else {
    visited.push(edge);
  }
  const [type, name] = edge.split(":");
  if (type === "file") {
    const props: File.Props = {
      name2: basename(name),
    };
    return <FileComponent key={name} {...props} />;
  }
  // Directory
  const children = treeData.edges[edge].map((childEdge) => {
    return createTreeComponent(childEdge, treeData, visited, { FileComponent, DirectoryComponent });
  });
  const props: Directory.Props = {
    name2: basename(name),
  };
  return <DirectoryComponent key={name} {...props} children={children} />;
};

const createItemElement = (treeData: TreeData, componentSet: ComponentSet) => {
  const visited: string[] = [];
  const elements = Object.keys(treeData.edges).map((edge) => {
    return createTreeComponent(edge, treeData, visited, componentSet);
  });
  return elements;
};

export const Component: React.FC<Props> = (props) => {
  const [{ pathItems, FileComponent = File.Component, DirectoryComponent = Directory.Component }, updateProps] = React.useState(props);
  React.useEffect(() => {
    updateProps(props);
  }, [props]);
  const componentSet: ComponentSet = {
    FileComponent,
    DirectoryComponent,
  };
  const treeData = collect(pathItems);
  return <>{createItemElement(treeData, componentSet).filter(Boolean)}</>;
};
