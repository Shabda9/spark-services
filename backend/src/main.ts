import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger("SparkServicesApi");
  const frontendOrigin = config.get<string>("FRONTEND_ORIGIN", "http://127.0.0.1:3000");

  app.enableCors({
    origin: frontendOrigin,
    credentials: true,
  });

  const port = config.get<number>("PORT", 4000);
  await app.listen(port);

  logger.log(`Started from ${process.cwd()}`);
  logger.log(`Health check: http://127.0.0.1:${port}/health`);
  logger.log(`Booking health check: http://127.0.0.1:${port}/booking/health`);
}

void bootstrap();
