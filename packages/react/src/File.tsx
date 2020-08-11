import * as React from "react";

export interface Props {
  path: string;
  level: number;
}

export type ComponentType = React.ComponentType<Props>;

export const Component: ComponentType = (props) => {
  return <p className="tree-item file-item">{props.path}</p>;
};

Component.displayName = "File";
