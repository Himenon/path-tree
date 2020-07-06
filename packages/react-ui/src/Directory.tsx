import * as React from "react";

export interface Props {
  name2: string;
}

export type ComponentType = React.ComponentType<Props>;

export const Component: ComponentType = (props) => {
  return (
    <ul key={props.name2}>
      <li key={`${props.name2}-1`}>
        <span className="dir-name">{props.name2}</span>
        {props.children && props.children}
      </li>
    </ul>
  );
};
