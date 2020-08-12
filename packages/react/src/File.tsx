import * as React from "react";

export interface Props {
  path: string;
  name: string;
  level: number;
}

export type ComponentType = React.ComponentType<Props>;

export const Component: ComponentType = (props) => {
  return <p className="tree-item file-item">{props.name}</p>;
};

Component.displayName = "File";
