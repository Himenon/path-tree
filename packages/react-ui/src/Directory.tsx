import * as React from "react";

export interface Props {
  name2: string;
}

export const Component: React.FC<Props> = (props) => {
  return (
    <ul key={props.name2}>
      <li key={`${props.name2}-1`}>
        <span className="dir-name">{props.name2}</span>
        {props.children && props.children}
      </li>
    </ul>
  );
};
