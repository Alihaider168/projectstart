exports.App = {
  testData: process.env.NODE_ENV || "not found env",
  MongoServerIp: "mongodb://localhost:27017/arslanApps",
  server: {
    ip: "http://127.0.0.1",
    port: "3001",
    env: "dev",
  },
  cosmoDb: {
    COSMODDB_USER: "rideshare",
    COSMOSDB_PASSWORD:
      "P8Ord8Xrqf8f4wxMRAN2CX507MEkkr5gpFqKwYUgsqPEpw8xbSN59CiQpjpQAG3XpW8OWZ80l9SY5chfWnRjag==",
    COSMOSDB_DBNAME: "b330e4b1xxxj9pk",
    COSMOSDB_HOST: "b330e4b1xxxj9pk-mongodb.services.clever-cloud.com",
    COSMOSDB_PORT: 10255,
  },
  httpStatuses: {
    OK: 200,
    ALREADY_EXISTS: 302,
    DATA_MISSING: 301,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
  },
};
