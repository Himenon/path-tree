import { generateState, State } from "../index";

describe("generateState", () => {
  test("1", () => {
    const expectNodes: State["nodes"] = [
      {
        type: "dir",
        path: "a",
      },
      {
        type: "dir",
        path: "a/b",
      },
      {
        type: "file",
        path: "a/b/index.js",
      },
    ];
    const resultNodes = generateState([
      {
        type: "file",
        path: "a/b/index.js",
      },
    ]).nodes;
    expect(resultNodes).toStrictEqual(expectNodes);
  });
  test("2", () => {
    const expectNodes: State["nodes"] = [
      {
        type: "dir",
        path: "a",
      },
      {
        type: "dir",
        path: "a/b",
      },
      {
        type: "dir",
        path: "a/b/c",
      },
      {
        type: "file",
        path: "a/b/c/index.js",
      },
      {
        type: "file",
        path: "a/b/index.js",
      },
    ];
    const resultNodes = generateState([
      {
        type: "file",
        path: "a/b/index.js",
      },
      {
        type: "file",
        path: "a/b/c/index.js",
      },
    ]).nodes;
    expect(resultNodes).toStrictEqual(expectNodes);
  });
});
