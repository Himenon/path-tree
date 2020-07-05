import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PathTreeUi from "./";

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
};

ReactDOM.render(<PathTreeUi.Tree.Component {...props} />, document.querySelector("#root"));
