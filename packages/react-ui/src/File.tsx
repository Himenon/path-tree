import * as React from "react";

export interface Props {
  path: string;
  level: number;
}

export type ComponentType = React.ComponentType<Props>;

export const Component: ComponentType = (props) => {
  return (
    <p className="file-name" style={{ paddingLeft: `${props.level - 1}em` }}>
      {props.path}
    </p>
  );
};
