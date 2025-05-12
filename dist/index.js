"use strict";

var _chunkIMRM6BX4js = require('./chunk-IMRM6BX4.js');



var _chunkS7VHYFOKjs = require('./chunk-S7VHYFOK.js');
require('./chunk-JI2CNXVD.js');
require('./chunk-SZZ53PIM.js');
require('./chunk-L6X3WCB6.js');
require('./chunk-MVSBMO72.js');
require('./chunk-2QMC77YJ.js');
require('./chunk-3FHKKDEG.js');
require('./chunk-XRNJ7TQO.js');
require('./chunk-H52BNYS6.js');
require('./chunk-DDBUW572.js');
require('./chunk-RHY4WX2A.js');
require('./chunk-PQNQEBHS.js');
require('./chunk-RKO6BLKO.js');
require('./chunk-CHP2GYIB.js');
require('./chunk-MMEWGB5A.js');
require('./chunk-4QGOQSDI.js');
require('./chunk-X5VRHMWC.js');
require('./chunk-NX24CH72.js');
require('./chunk-RPTFHDQ2.js');
require('./chunk-XSUWL2FG.js');
require('./chunk-LIHG6MRB.js');
require('./chunk-QIPQVNW5.js');
require('./chunk-E5IYCE7T.js');
require('./chunk-XP7MPBWL.js');
require('./chunk-GDC63SRX.js');
require('./chunk-SBKGAB2F.js');
require('./chunk-YCOP6BXV.js');
require('./chunk-MY7ICP5M.js');
require('./chunk-JDA4FSDT.js');


var _chunkVXTEHXEPjs = require('./chunk-VXTEHXEP.js');


var _chunkU3Q25YHWjs = require('./chunk-U3Q25YHW.js');
require('./chunk-PR4QN5HX.js');

// src/index.ts
var server = _chunkS7VHYFOKjs.app.listen(_chunkU3Q25YHWjs.env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = _chunkU3Q25YHWjs.env;
  _chunkS7VHYFOKjs.logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});
server.on("listening", async () => {
  try {
    await _chunkIMRM6BX4js.mongoDB.call(void 0, );
    await _chunkVXTEHXEPjs.redis.connect();
    _chunkS7VHYFOKjs.logger.info("Connected to MongoDB and Redis");
  } catch (error) {
    _chunkS7VHYFOKjs.logger.error("Error connecting to MongoDB or Redis", error);
    process.exit(1);
  }
});
var onCloseSignal = () => {
  _chunkS7VHYFOKjs.logger.info("sigint received, shutting down");
  server.close(() => {
    _chunkS7VHYFOKjs.logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 1e4).unref();
};
process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
//# sourceMappingURL=index.js.map