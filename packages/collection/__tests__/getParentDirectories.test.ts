import { getParentDirectories, PathItem } from "../index";

describe("getParentDirectories", () => {
  test("type:dir", () => {
    const expectResult: PathItem[] = [
      {
        type: "dir",
        path: "./a/b/c",
      },
      {
        type: "dir",
        path: "./a/b",
      },
      {
        type: "dir",
        path: "./a",
      },
    ];
    const result = getParentDirectories({
      type: "dir",
      path: "./a/b/c",
    });
    expect(result).toStrictEqual(expectResult);
  });

  test("type:file", () => {
    const expectResult: PathItem[] = [
      {
        type: "dir",
        path: "./a/b",
      },
      {
        type: "dir",
        path: "./a",
      },
    ];
    const result = getParentDirectories({
      type: "file",
      path: "./a/b/c",
    });
    expect(result).toStrictEqual(expectResult);
  });
});
