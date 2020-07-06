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
    return {
      element: undefined,
      visited,
    };
  }
  visited.push(edge);
  const [type, name] = edge.split(":");
  if (type === "file") {
    return {
      element: <FileComponent key={name} name2={basename(name)} />,
      visited,
    };
  } else {
    const children = treeData.edges[edge].map((childEdge) => {
      const { element, visited: newVisited } = createTreeComponent(childEdge, treeData, visited, { FileComponent, DirectoryComponent });
      newVisited.forEach((v) => visited.push(v));
      return element;
    });
    return {
      element: <DirectoryComponent key={name} name2={basename(name)} children={children} />,
      visited,
    };
  }
};

const createItemElement = (treeData: TreeData, componentSet: ComponentSet) => {
  const visited: string[] = [];
  const elements = Object.keys(treeData.edges).map((edge) => {
    const { visited: newVisited, element } = createTreeComponent(edge, treeData, visited, componentSet);
    visited.concat(newVisited);
    return element;
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
