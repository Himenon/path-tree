import { collect, TreeData } from "../index";

describe("generateState", () => {
  test("node 1", () => {
    const expectNodes: TreeData["nodes"] = ["dir:a", "dir:a/b", "file:a/b/index.js"];
    const expectEdges: TreeData["edges"] = {
      'dir:.': [ 'dir:a' ],
      'dir:a': [ 'dir:a/b' ],
      'dir:a/b': [ 'file:a/b/index.js' ]
    };
    const result = collect([
      {
        type: "file",
        path: "a/b/index.js",
      },
    ]);
    expect(result.nodes).toStrictEqual(expectNodes);
    expect(result.edges).toStrictEqual(expectEdges);
  });
  test("node 2", () => {
    const expectNodes: TreeData["nodes"] = ["dir:a", "dir:a/b", "dir:a/b/c", "file:a/b/c/index.js", "file:a/b/index.js"];
    const expectEdges: TreeData["edges"] = {
      "dir:.": ["dir:a"],
      "dir:a": ["dir:a/b"],
      "dir:a/b": ["dir:a/b/c", "file:a/b/index.js"],
      "dir:a/b/c": ["file:a/b/c/index.js"],
    };
    const result = collect([
      {
        type: "file",
        path: "a/b/index.js",
      },
      {
        type: "file",
        path: "a/b/c/index.js",
      },
    ]);
    expect(result.nodes).toStrictEqual(expectNodes);
    expect(result.edges).toStrictEqual(expectEdges);
  });
});
