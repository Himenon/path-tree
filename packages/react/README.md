# [@path-tree/react](https://github.com/Himenon/path-tree/tree/master/packages/react)

[![npm version](https://badge.fury.io/js/%40path-tree%2Freact.svg)](https://badge.fury.io/js/%40path-tree%2Freact)

## Usage

[DEMO](https://codesandbox.io/s/react-path-tree-demo-khbxc)

### Install

```bash
yarn add @path-tree/react tslib
```

### Basic Usage

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PathTree from "@path-tree/react";

const props: PathTree.Props = {
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

ReactDOM.render(<PathTree.Component {...props} />, document.querySelector("#root"));
```

### Define components

```tsx
import * as PathTree from "@path-tree/react";

const props: PathTree.Props = {
  FileComponent: (fileProps) => {
    return <p>{fileProps.path}</p>;
  },
  DirectoryComponent: (directoryProps) => {
    return <div>{directoryProps.children}</div>;
  },
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
```

## LICENSE

`@path-tree/react` is [MIT licensed](./LICENSE).
