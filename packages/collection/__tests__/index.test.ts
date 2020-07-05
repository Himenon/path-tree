import { PathItem, Item, collect } from "../index";

describe("tree test", () => {
  test.skip("純粋な形", () => {
    const inputPathItems: PathItem[] = [
      {
        path: "a.html",
        type: "file",
      },
    ];
    const expectResult: Item[] = [
      {
        type: "file",
        name: "a.html",
        path: "./a.html",
      },
    ];
    const result = collect(inputPathItems);
    expect(expectResult).toBe(result);
  });

  test.skip("絶対パスと相対パスの混在", () => {
    const inputPathItems: PathItem[] = [
      {
        path: "a.html",
        type: "file",
      },
      {
        path: "/a.html",
        type: "file",
      },
    ];
    const expectResult: Item[] = [
      {
        type: "file",
        name: "a.html",
        path: "/a.html",
      },
      {
        type: "file",
        name: "a.html",
        path: "./a.html",
      },
    ];
    const result = collect(inputPathItems);
    expect(expectResult).toBe(result);
  });

  test.skip("階層構造1", () => {
    const inputPathItems: PathItem[] = [
      {
        path: "a.html",
        type: "file",
      },
      {
        path: "a/b.html",
        type: "file",
      },
    ];
    const expectResult: Item[] = [
      {
        type: "dir",
        name: "a",
        path: "./a",
        items: [
          {
            type: "file",
            name: "b.html",
            path: "./a/b.html",
          },
        ],
      },
      {
        type: "file",
        name: "a.html",
        path: "./a.html",
      },
    ];
    const result = collect(inputPathItems);
    expect(expectResult).toBe(result);
  });
  test.skip("階層構造2", () => {
    const inputPathItems: PathItem[] = [
      {
        path: "a/b/c.html",
        type: "file",
      },
    ];
    const expectResult: Item[] = [
      {
        type: "dir",
        name: "a",
        path: "./a",
        items: [
          {
            type: "dir",
            name: "b",
            path: "./a/b",
            items: [
              {
                type: "file",
                name: "c.html",
                path: "./a/b/c.html",
              },
            ],
          },
        ],
      },
    ];
    const result = collect(inputPathItems);
    expect(expectResult).toBe(result);
  });
});
