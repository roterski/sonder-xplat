import * as env from 'env-var';

module.exports = {
  type: 'postgres',
  port: env.get('DB_PORT', '5432').asIntPositive(),
  username: env
    .get('DB_USERNAME')
    .required()
    .asString(),
  password: env
    .get('DB_PASSWORD')
    .required()
    .asString(),
  database: env.get('DB_NAME', 'sonder_api_nest_dev').asString(),
  synchronize:
    env
      .get('NODE_ENV')
      .required()
      .asString() === 'production'
      ? false
      : true,
  logging:
    env
      .get('NODE_ENV')
      .required()
      .asString() === 'production'
      ? false
      : true,
  entities: ['apps/nest-server/src/**/**.entity{.ts,.js}'],
  migrations: ['apps/nest-server/src/migration/**/*.ts'],
  subscribers: ['apps/nest-server/src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'apps/nest-server/src/entity',
    migrationsDir: 'apps/nest-server/src/migration',
    subscribersDir: 'apps/nest-server/src/subscriber'
  }
};
