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
      element: <File.Component name2={basename(name)} />,
      visited,
    };
  } else {
    const children = treeData.edges[edge].map((childEdge) => {
      return createTreeComponent(childEdge, treeData, visited);
    });
    return {
      element: <Directory.Component name2={basename(name)} children={children} />,
      visited,
    };
  }
};

const createItemElement = (treeData: TreeData) => {
  const visited: string[] = [];
  return Object.keys(treeData.edges).map((edge) => {
    const { visited: newVisited, element } = createTreeComponent(edge, treeData, visited);
    visited.concat(newVisited);
    return element;
  });
};

export const Component: React.FC<Props> = (props) => {
  const [{ pathItems }, updateProps] = React.useState(props);
  React.useEffect(() => {
    updateProps(props);
  }, [props]);
  const treeData = collect(pathItems);
  return <div id="tree">{createItemElement(treeData)}</div>;
};
