import diff from "cli-diff";
import cleanse from "./cleanse";
import serializeJavascript from "serialize-javascript";

const data = {
  a: "foo",
  b: "bar",
  c: null,
  d: undefined,
  e: 0,
  f: {
    a: "fuz",
    b: null,
    c: {
      a: "biz",
      b: "buz",
      c: "123",
      d: [
        {
          a: "foo",
          b: "bar",
          c: null,
          d: undefined,
          e: 0,
          f: false,
          g: 12,
          h: "13",
          i: {},
          j: [],
          k: [[]],
        },
        {
          a: "foo",
          b: "bar",
          c: null,
          d: undefined,
          e: 0,
        },
        {
          a: "foo",
          b: "bar",
          c: null,
          d: undefined,
          e: 0,
          f: "-7",
          g: "3.14159265358979323",
        },
      ],
    },
  },

  g: 123,
  h: "456",
  i: false,
  j: {},
  k: [],
  l: [[]],
  m: "3.14159265358979323",
};

function format(o) {
  return serializeJavascript(o, { space: 2 });
}

const cleansed = cleanse(data);

console.log("Printing diff view");
console.log(diff(format(data), format(cleansed)));
