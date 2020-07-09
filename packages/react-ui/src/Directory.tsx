import * as React from "react";

export interface Props {
  path: string;
  level: number;
}

export type ComponentType = React.ComponentType<Props>;

export const Component: ComponentType = (props) => {
  const [isActive, toggle] = React.useState(true);
  return (
    <ul key={props.path}>
      <li key={`${props.path}-1`}>
        <span className="dir-name" onClick={() => toggle(!isActive)}  style={{ paddingLeft: `${props.level - 1}em` }}>
          {props.path}
        </span>
        {isActive && props.children}
      </li>
    </ul>
  );
};

Component.displayName = "Directory";