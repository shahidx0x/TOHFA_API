import { PrismaClient } from '@prisma/client';
import { Server } from 'http';
import app from './app';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

async function bootstrap() {
  try {
    await prisma.$connect();
    logger.info('Connected to the database successfully');

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    errorlogger.error('Failed to connect to the database', err);
  }
}

bootstrap();
process.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      errorlogger.error(error);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});

export default prisma;