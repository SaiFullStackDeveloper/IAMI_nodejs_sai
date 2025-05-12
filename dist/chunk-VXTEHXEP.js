"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkU3Q25YHWjs = require('./chunk-U3Q25YHW.js');

// src/common/config/redis.ts
var _redis = require('redis');
var { REDIS_URI } = _chunkU3Q25YHWjs.env;
var redis = _redis.createClient.call(void 0, {
  url: REDIS_URI
});



exports.redis = redis;
//# sourceMappingURL=chunk-VXTEHXEP.js.map