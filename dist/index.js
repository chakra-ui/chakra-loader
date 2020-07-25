"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ChakraLoaderPlugin", {
  enumerable: true,
  get: function get() {
    return _plugin["default"];
  }
});
exports["default"] = void 0;

var _loader = _interopRequireDefault(require("./loader"));

var _plugin = _interopRequireDefault(require("./plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _loader["default"];
exports["default"] = _default;