"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkVXTEHXEPjs = require('./chunk-VXTEHXEP.js');

// src/common/models/redis/user.ts
var _redisom = require('redis-om');
var userSignUpSchema = new (0, _redisom.Schema)(
  "Signup",
  {
    "email": {
      type: "string"
    },
    "name": {
      type: "string"
    },
    "phone": {
      type: "string"
    },
    "role": {
      type: "string"
    },
    "password": {
      type: "string"
    },
    "address": {
      type: "string"
    },
    "ABN": {
      type: "string"
    },
    "token": {
      type: "string"
    }
  },
  {
    dataStructure: "JSON"
  }
);
var userSessionSchema = new (0, _redisom.Schema)(
  "Session",
  {
    "_id": {
      type: "string"
    },
    "userId": {
      type: "string"
    },
    "email": {
      type: "string"
    },
    "name": {
      type: "string"
    },
    "phone": {
      type: "string"
    },
    "role": {
      type: "string"
    },
    "address": {
      type: "string"
    },
    "ABN": {
      type: "string"
    },
    "isEmailVerified": {
      type: "boolean"
    },
    "isUserVerified": {
      type: "boolean"
    },
    "createdAt": {
      type: "date"
    },
    "accessToken": {
      type: "string"
    },
    "expiresIn": {
      type: "string"
    },
    "refreshToken": {
      type: "string"
    }
  },
  {
    dataStructure: "JSON"
  }
);
var userSignupRedisRepository = new (0, _redisom.Repository)(userSignUpSchema, _chunkVXTEHXEPjs.redis);
var userSessionRedisRepository = new (0, _redisom.Repository)(userSessionSchema, _chunkVXTEHXEPjs.redis);




exports.userSignupRedisRepository = userSignupRedisRepository; exports.userSessionRedisRepository = userSessionRedisRepository;
//# sourceMappingURL=chunk-YCOP6BXV.js.map