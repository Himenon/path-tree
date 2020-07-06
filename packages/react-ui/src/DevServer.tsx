import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PathTreeUi from "./";

const MyDirectoryComponent: PathTreeUi.Tree.File.ComponentType = (props) => {
  return (
    <ul key={props.name2}>
      <li key={`${props.name2}-1`}>
        <span className="dir-name">Directory!! {props.name2}</span>
        {props.children && props.children}
      </li>
    </ul>
  );
};

const MyFileComponent: PathTreeUi.Tree.File.ComponentType = (props) => {
  return <p>Name2: {props.name2}</p>;
};

const props: PathTreeUi.Tree.Props = {
  pathItems: [
    {
      type: "file",
      path: "a/b/index.js",
    },
    {
      type: "file",
      path: "a/b/c/index.js",
    },
  ],
  FileComponent: MyFileComponent,
  DirectoryComponent: MyDirectoryComponent,
};

const Component: React.FC = () => {
  return (
    <div id="tree">
      <PathTreeUi.Tree.Component {...props} />
    </div>
  );
};

ReactDOM.render(<Component />, document.querySelector("#root"));
