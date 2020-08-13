import Vue from "vue";
import * as PathTree from ".";

const props: PathTree.Props = {
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
    "packages/react/package.json",
    "packages/react/public/index.html",
    "packages/react/public/main.css",
    "packages/react/src/DevServer.tsx",
    "packages/react/src/Directory.tsx",
    "packages/react/src/DirectoryTree.tsx",
    "packages/react/src/File.tsx",
    "packages/react/src/index.tsx",
    "packages/react/src/Tree.tsx",
    "packages/react/tsconfig.json",
    "packages/react/webpack.config.ts",
    "renovate.json",
    "tsconfig.json",
    "yarn.lock",
  ],
};

new Vue({
  render: (createElement) =>
    createElement(PathTree.Component, {
      props,
    }),
}).$mount("#root");
