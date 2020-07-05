import * as React from "react";

export interface Props {
  name2: string;
}

export const Component: React.FC<Props> = (props) => {
  return <p className="file-name">{props.name2}</p>;
};
