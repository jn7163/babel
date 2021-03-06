import * as t from "babel-types";

export default function () {
  return {
    visitor: {
      ObjectMethod(path) {
        let { node } = path;
        if (node.kind === "method") {
          path.replaceWith(t.objectProperty(
            node.key,
            t.functionExpression(null, node.params, node.body, node.generator, node.async),
            node.computed
          ));
        }
      },

      ObjectProperty({ node }) {
        if (node.shorthand) {
          node.shorthand = false;
        }
      }
    }
  };
}
