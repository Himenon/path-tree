import * as React from "react";

export interface Props {
  path: string;
  level: number;
}

export type ComponentType = React.ComponentType<Props>;

export const Component: ComponentType = (props) => {
  const [isActive, toggle] = React.useState(true);
  return (
    <ul className="tree-item directory" key={props.path}>
      <li className="directory-item" key={`${props.path}-1`}>
        <span className="directory-item-name" onClick={() => toggle(!isActive)}>
          {props.path}
        </span>
        {isActive && props.children}
      </li>
    </ul>
  );
};

Component.displayName = "Directory";
