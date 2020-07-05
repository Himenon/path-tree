import { getParentDirectories } from "../index";

describe("getParentDirectories", () => {
  test("type:dir", () => {
    const expectResult: string[] = ["./a/b/c", "./a/b", "./a"];
    const result = getParentDirectories({
      type: "dir",
      path: "./a/b/c",
    });
    expect(result).toStrictEqual(expectResult);
  });

  test("type:file", () => {
    const expectResult: string[] = ["./a/b", "./a"];
    const result = getParentDirectories({
      type: "file",
      path: "./a/b/c",
    });
    expect(result).toStrictEqual(expectResult);
  });
});
