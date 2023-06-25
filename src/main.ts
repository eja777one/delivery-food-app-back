import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { startApp } from "./application/start.app";
import { useContainer } from "class-validator";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig, writeSwaggerFiles } from "./swagger.config";

async function bootstrap() {
  const rawApp = await NestFactory.create(AppModule);
  const app = startApp(rawApp);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, swaggerDoc);

  await app.listen(3004);

  // get the swagger json file (if app is running in development mode)
  if (process.env.NODE_ENV === "development") writeSwaggerFiles();
}

bootstrap();
