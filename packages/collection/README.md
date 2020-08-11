# [@path-tree/collection](https://github.com/Himenon/path-tree/tree/master/packages/collection)

## Usage

```ts
import { collect } from "@path-tree/collection";

collect([
  {
    type: "file",
    path: "a/b/index.js",
  },
  {
    type: "file",
    path: "a/b/c/index.js",
  },
]);
```

The results above are as follows.

```json
{
  "nodes": [
    "dir:a",
    "dir:a/b",
    "dir:a/b/c",
    "file:a/b/c/index.js",
    "file:a/b/index.js"
  ],
  "edges": {
    "dir:.": [
      "dir:a"
    ],
    "dir:a": [
      "dir:a/b"
    ],
    "dir:a/b": [
      "dir:a/b/c",
      "file:a/b/index.js"
    ],
    "dir:a/b/c": [
      "file:a/b/c/index.js"
    ]
  },
  "data": {
    "dir:a": {
      "type": "dir",
      "path": "a"
    },
    "dir:a/b": {
      "type": "dir",
      "path": "a/b"
    },
    "dir:a/b/c": {
      "type": "dir",
      "path": "a/b/c"
    },
    "file:a/b/c/index.js": {
      "type": "file",
      "path": "a/b/c/index.js"
    },
    "file:a/b/index.js": {
      "type": "file",
      "path": "a/b/index.js"
    }
  }
}
```

## LICENSE

`@path-tree/collection` is [MIT licensed](./LICENSE).

