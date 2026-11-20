import path from "node:path";
import { fileURLToPath } from "node:url";

const layers = ["app", "pages", "widgets", "features", "entities", "shared"];
const sourceRoot = fileURLToPath(new URL("../../src/", import.meta.url));

function parts(filename) {
  const relative = path.relative(sourceRoot, filename);
  if (relative.startsWith("..")) return [];
  return relative.split(path.sep);
}

const fsd = {
  rules: {
    imports: {
      meta: {
        type: "problem",
        schema: [],
        messages: {
          layer: "FSD: {{source}} cannot import {{target}}; dependencies must point to lower layers.",
          api: "FSD: import {{slice}} through its public index.ts API.",
        },
      },
      create(context) {
        const filename = context.filename;
        const source = parts(filename);
        const sourceLayer = layers.indexOf(source[0]);
        if (sourceLayer === -1) return {};

        function check(node) {
          const specifier = node.source?.value;
          if (typeof specifier !== "string" || (!specifier.startsWith("@/") && !specifier.startsWith("."))) return;
          const targetPath = specifier.startsWith("@/")
            ? path.resolve(sourceRoot, specifier.slice(2))
            : path.resolve(path.dirname(filename), specifier);
          const target = parts(targetPath);
          const targetLayer = layers.indexOf(target[0]);
          if (targetLayer === -1) return;
          const sameSlice = source[0] === target[0] && source[1] === target[1];
          const unsegmentedLayer = source[0] === target[0] && ["app", "shared"].includes(source[0]);
          if (unsegmentedLayer || sameSlice) return;
          if (targetLayer <= sourceLayer) {
            context.report({
              node,
              messageId: "layer",
              data: { source: source.slice(0, 2).join("/"), target: target.slice(0, 2).join("/") },
            });
          } else if (
            ["pages", "widgets", "features", "entities"].includes(target[0]) &&
            target.length > 2 &&
            !(target.length === 3 && /^index(?:\.[cm]?[jt]s)?$/.test(target[2]))
          ) {
            context.report({ node, messageId: "api", data: { slice: target.slice(0, 2).join("/") } });
          }
        }
        return {
          ImportDeclaration: check,
          ImportExpression: check,
          ExportNamedDeclaration: check,
          ExportAllDeclaration: check,
        };
      },
    },
  },
};

export default fsd;
