import cleanse from "../cleanse";

describe("cleanse", () => {
  test("object is not mutated", () => {
    const o = { a: 12, b: "fas", c: null };
    expect(cleanse(o)).not.toBe(o);
  });

  test("removes nullish values", () => {
    const o = {
      a: "1234",
      b: false,
      c: null,
      d: undefined,
      f: {
        a: null,
        b: "foo",
      },
    };
    const o_ = cleanse(o);

    expect(o_).toHaveProperty("a");
    expect(o_).toHaveProperty("b");
    expect(o_).toHaveProperty("f");
    expect(o_).toHaveProperty(["f", "b"]);

    expect(o_).not.toHaveProperty("c");
    expect(o_).not.toHaveProperty("d");
    expect(o_).not.toHaveProperty(["f", "a"]);
  });

  test("works on nested arrays", () => {
    const o = {
      a: [[]],
      b: [null, undefined, 4],
      c: [
        {
          a: "foo",
          b: null,
        },
      ],
    };
    const o_ = cleanse(o);

    expect(o_).toHaveProperty("a", [[]]);
    expect(o_).toHaveProperty("b", [4]);
    expect(o_).toHaveProperty(["c", "0", "a"], "foo");

    expect(o_).not.toHaveProperty(["c", 0, "b"]);
  });

  describe("numbers", () => {
    test("parses integers", () => {
      const o = {
        a: "123",
        b: "-32",
        c: "747",
        f: {
          a: "1234",
        },
      };

      expect(cleanse(o)).toEqual(
        expect.objectContaining({
          a: 123,
          b: -32,
          c: 747,
          f: {
            a: 1234,
          },
        })
      );
    });

    test("parsers floating point", () => {
      const o = {
        a: "123.45",
        // love me some "pie" c:
        b: "3.14159265358979323",
        c: "-734.3535353535353535",
      };

      expect(cleanse(o)).toEqual(
        expect.objectContaining({
          a: 123.45,
          b: 3.14159265358979323,
          c: -734.3535353535353535,
        })
      );
    });
  });
});
