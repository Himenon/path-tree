import * as React from "react";
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

export const Component: React.FC<Props> = (props) => {
  const [{ pathItems: inputPathItems, FileComponent = File.Component, DirectoryComponent = Directory.Component }, updateProps] = React.useState(
    props,
  );
  React.useEffect(() => {
    updateProps(props);
  }, [props]);
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
  return <DirectoryTree.Component treeData={treeData} componentSet={componentSet} />;
};

Component.displayName = "Tree";
