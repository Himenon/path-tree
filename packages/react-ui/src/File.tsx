import * as React from "react";

export interface Props {
  name2: string;
}

export type ComponentType = React.ComponentType<Props>;

export const Component: ComponentType = (props) => {
  return <p className="file-name">{props.name2}</p>;
};
