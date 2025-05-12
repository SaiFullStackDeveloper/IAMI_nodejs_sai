"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkU3Q25YHWjs = require('./chunk-U3Q25YHW.js');

// src/common/config/mongodb.ts
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
async function mongoDB() {
  const { MONGODB_URI } = _chunkU3Q25YHWjs.env;
  const clientOptions = { serverApi: { version: "1", strict: true, deprecationErrors: true } };
  await _mongoose2.default.connect(MONGODB_URI, clientOptions);
  await _optionalChain([_mongoose2.default, 'access', _ => _.connection, 'access', _2 => _2.db, 'optionalAccess', _3 => _3.admin, 'call', _4 => _4(), 'access', _5 => _5.command, 'call', _6 => _6({ ping: 1 })]);
}



exports.mongoDB = mongoDB;
//# sourceMappingURL=chunk-IMRM6BX4.js.map