import Vue from "vue";

import { collect, PathItem } from "@path-tree/collection";

import * as File from "./File";
import * as Directory from "./Directory";
import * as DirectoryTree from "./DirectoryTree";

export { File, Directory };

export interface Props {
  pathItems: Array<PathItem | string>;
  FileComponent?: File.ComponentType;
  DirectoryComponent?: Directory.ComponentType;
}

const useTree = (props: Props) => {
  const { pathItems: inputPathItems, FileComponent = File.Component, DirectoryComponent = Directory.Component } = props;
  const componentSet: DirectoryTree.ComponentSet = {
    FileComponent,
    DirectoryComponent,
  };
  const pathItems: PathItem[] = inputPathItems.map((item) => {
    if (typeof item === "string") {
      return {
        type: "file",
        path: item,
      };
    }
    return item;
  });
  const treeData = collect(pathItems);
  return {
    componentSet,
    treeData,
  };
};

export const Component = Vue.extend<Props>({
  name: "tree",
  functional: true,
  render: function (createElement, { props }) {
    const { treeData, componentSet } = useTree(props);
    return createElement(DirectoryTree.Component, {
      props: {
        treeData,
        componentSet,
      },
    });
  },
});
