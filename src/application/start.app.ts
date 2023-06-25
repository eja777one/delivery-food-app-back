import { BadRequestException, INestApplication, ValidationPipe }
  from "@nestjs/common";
import { HttpExceptionFilter } from "../exeption.filter";

const cookieParser = require("cookie-parser");

export const startApp = (app: INestApplication) => {
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    exceptionFactory: (errors) => {
      const resErrors = [];

      errors.forEach((e) => {
        const constraintKeys = Object.keys(e.constraints);
        constraintKeys.forEach((ckey) => {
          resErrors.push({ message: e.constraints[ckey], field: e.property });
        });
      });
      throw new BadRequestException(resErrors);
    }
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  return app;
};