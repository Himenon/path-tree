import * as React from "react";

export interface Props {
  name2: string;
}

export const Component: React.FC<Props> = (props) => {
  return (
    <ul key={props.name2}>
      <li key={`${props.name2}-1`}>{props.name2}</li>
      {props.children && <li key={`${props.name2}-2`}>{props.children}</li>}
    </ul>
  );
};
