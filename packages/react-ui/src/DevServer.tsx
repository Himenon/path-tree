import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PathTreeUi from "./";

const props: PathTreeUi.Tree.Props = {
  pathItems: [
    {
      type: "file",
      path: "commitlint.config.js ",
    },
    {
      type: "file",
      path: "node_modules",
    },
    {
      type: "file",
      path: "renovate.json",
    },
    {
      type: "file",
      path: "jest.config.json",
    },
    {
      type: "file",
      path: "package.json",
    },
    {
      type: "file",
      path: "tsconfig.json",
    },
    {
      type: "file",
      path: "lerna.json",
    },
    {
      type: "file",
      path: "packages/collection/package.json",
    },
    {
      type: "file",
      path: "packages/collection/tsconfig.json",
    },
    {
      type: "file",
      path: "packages/react-ui/package.json",
    },
    {
      type: "file",
      path: "packages/react-ui/tsconfig.json",
    },
    {
      type: "file",
      path: "yarn.lock",
    },
  ],
};

const Component: React.FC = () => {
  return (
    <div id="tree">
      <PathTreeUi.Tree.Component {...props} />
    </div>
  );
};

ReactDOM.render(<Component />, document.querySelector("#root"));
