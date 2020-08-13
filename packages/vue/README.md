# [@path-tree/vue](https://github.com/Himenon/path-tree/tree/master/packages/vue)

[![npm version](https://badge.fury.io/js/%40path-tree%2Fvue.svg)](https://badge.fury.io/js/%40path-tree%2Fvue)

## Usage

### Install

```bash
yarn add @path-tree/vue
```

### Basic Usage

```tsx
import Vue from "vue";
import * as PathTree from "@path-tree/vue";

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

new Vue({
  render: (createElement) =>
    createElement(PathTree.Component, {
      props,
    }),
}).$mount("#root");
```

### Define components

```tsx
import * as PathTree from "@path-tree/vue";

const props: PathTree.Props = {
  FileComponent: Vue.extend<PathTree.File.Props>({
    name: "File",
    props: {
      path: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      level: {
        type: Number,
        required: true,
      },
    },
    functional: true,
    render: function (createElement, { props }) {
      return createElement("p", { class: "tree-item file-item" }, props.name);
    },
  }),
  DirectoryComponent: Vue.extend<PathTree.Directory.Data, PathTree.Directory.Methods, PathTree.Directory.Computed, PathTree.Directory.Props>({
    name: "File",
    props: {
      path: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      level: {
        type: Number,
        required: true,
      },
    },
    render(createElement) {
      return createElement("ul", { class: "tree-item directory" }, [
        createElement(
          "li",
          {
            class: "directory-item",
            attrs: {
              "data-open": `${this.isActive}`,
            },
          },
          [
            createElement(
              "span",
              {
                class: "directory-item-name",

                on: {
                  click: () => {
                    this.toggle();
                  },
                },
              },
              this.$props.name,
            ),
          ],
        ),
        this.isActive && this.$slots.default,
      ]);
    },
  }),
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

`@path-tree/vue` is [MIT licensed](./LICENSE).
