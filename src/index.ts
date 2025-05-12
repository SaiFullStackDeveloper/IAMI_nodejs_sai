import { env } from "@/common/config/env";
import { app, logger } from "@/server";
import { mongoDB } from "./common/config/mongodb";
import { redis } from "./common/config/redis";

// import { redisDB } from "./common/config/redis";

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});


server.on('listening', async () => {
  try {
    await mongoDB()
    await redis.connect()
    logger.info("Connected to MongoDB and Redis");
  } catch (error) {
    logger.error("Error connecting to MongoDB or Redis", error);
    process.exit(1); // Exit the process to trigger a restart
  }
})

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
