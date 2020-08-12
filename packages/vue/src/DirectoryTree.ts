import Vue from "vue";
import * as Directory from "./Directory";
import * as File from "./File";
import { basename } from "path";
import { TreeData } from "@path-tree/collection";

export interface ComponentSet {
  FileComponent: File.ComponentType;
  DirectoryComponent: Directory.ComponentType;
}

export interface Props {
  treeData: TreeData;
  componentSet: ComponentSet;
}

const createTreeComponent = (
  createElement: Vue.CreateElement,
  edge: string,
  treeData: TreeData,
  visited: string[],
  { FileComponent, DirectoryComponent }: ComponentSet,
  level = 0,
): Vue.VNode | Vue.VNode[] | undefined => {
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
    return createElement(FileComponent, { props });
  }
  const children = treeData.edges[edge].map((childEdge) => {
    return createTreeComponent(createElement, childEdge, treeData, visited, { FileComponent, DirectoryComponent }, level + 1);
  });
  const props: Directory.Props = {
    path: fullPath,
    name: basename(fullPath),
    level,
  };
  if (props.name === ".") {
    return createElement("div", { class: "tree" } , children);
  }
  return createElement(DirectoryComponent, { props }, children);
};

export const Component = Vue.extend<Props>({
  name: "DirectoryTree",
  functional: true,
  render: function (createElement, { props }) {
    const { treeData, componentSet }  = props;
    const visited: string[] = [];
    const elements = Object.keys(treeData.edges).map((edge) => {
      return createTreeComponent(createElement, edge, treeData, visited, componentSet);
    });
    return createElement("div", { class: "root" }, elements);
  },
});
