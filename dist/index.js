"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = matcher;

function matcher(tags, components) {
  return tags.reduce(function (matches, tag) {
    var match = components.find(function (_ref) {
      var pascalName = _ref.pascalName,
          kebabName = _ref.kebabName;
      return [pascalName, kebabName].includes(tag);
    });
    match && matches.push(match);
    return matches;
  }, []);
}