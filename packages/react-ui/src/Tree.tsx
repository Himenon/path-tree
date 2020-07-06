import * as React from "react";
import * as File from "./File";
import * as Directory from "./Directory";
import { basename } from "path";
import { collect, PathItem, TreeData } from "@path-tree/collection";

export interface Props {
  pathItems: PathItem[];
}

const createTreeComponent = (edge: string, treeData: TreeData, visited: string[]) => {
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
      element: <File.Component key={name} name2={basename(name)} />,
      visited,
    };
  } else {
    const children = treeData.edges[edge].map((childEdge) => {
      const { element, visited: newVisited } = createTreeComponent(childEdge, treeData, visited);
      newVisited.forEach((v) => visited.push(v));
      return element;
    });
    return {
      element: <Directory.Component key={name} name2={basename(name)} children={children} />,
      visited,
    };
  }
};

const createItemElement = (treeData: TreeData) => {
  const visited: string[] = [];
  const elements = Object.keys(treeData.edges).map((edge) => {
    const { visited: newVisited, element } = createTreeComponent(edge, treeData, visited);
    visited.concat(newVisited);
    return element;
  });
  return elements.filter(Boolean);
};

export const Component: React.FC<Props> = (props) => {
  const [{ pathItems }, updateProps] = React.useState(props);
  React.useEffect(() => {
    updateProps(props);
  }, [props]);
  const treeData = collect(pathItems);
  return <div id="tree">{createItemElement(treeData)}</div>;
};
