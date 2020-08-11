import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PathTreeUi from "./";

const props: PathTreeUi.Tree.Props = {
  pathItems: [
    "commitlint.config.js",
    "jest.config.json",
    "lerna.json",
    "package.json",
    "packages/collection/__tests__/getParentDirectories.test.ts",
    "packages/collection/__tests__/treeData.test.ts",
    "packages/collection/coverage/clover.xml",
    "packages/collection/coverage/coverage-final.json",
    "packages/collection/coverage/lcov-report/base.css",
    "packages/collection/coverage/lcov-report/block-navigation.js",
    "packages/collection/coverage/lcov-report/favicon.png",
    "packages/collection/coverage/lcov-report/index.html",
    "packages/collection/coverage/lcov-report/index.ts.html",
    "packages/collection/coverage/lcov-report/prettify.css",
    "packages/collection/coverage/lcov-report/prettify.js",
    "packages/collection/coverage/lcov-report/sort-arrow-sprite.png",
    "packages/collection/coverage/lcov-report/sorter.js",
    "packages/collection/coverage/lcov.info",
    "packages/collection/index.d.ts",
    "packages/collection/index.js",
    "packages/collection/index.js.map",
    "packages/collection/index.ts",
    "packages/collection/index.tsbuildinfo",
    "packages/collection/jest.config.json",
    "packages/collection/package.json",
    "packages/collection/tsconfig.json",
    "packages/collection/tsconfig.tsbuildinfo",
    "packages/react-ui/package.json",
    "packages/react-ui/public/index.html",
    "packages/react-ui/public/main.css",
    "packages/react-ui/src/DevServer.tsx",
    "packages/react-ui/src/Directory.tsx",
    "packages/react-ui/src/DirectoryTree.tsx",
    "packages/react-ui/src/File.tsx",
    "packages/react-ui/src/index.tsx",
    "packages/react-ui/src/Tree.tsx",
    "packages/react-ui/tsconfig.json",
    "packages/react-ui/webpack.config.ts",
    "renovate.json",
    "tsconfig.json",
    "yarn.lock",
  ],
};

const Component: React.FC = () => {
  return (
    <div className="tree">
      <PathTreeUi.Tree.Component {...props} />
    </div>
  );
};

Component.displayName = "DevServer";

ReactDOM.render(<Component />, document.querySelector("#root"));
