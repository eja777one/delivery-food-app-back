import { DocumentBuilder } from "@nestjs/swagger";
import { get } from "http";
import { createWriteStream } from "fs";

const description = `Delivery Food App API.
Base URL is _____`;

const serverUrl = "http://localhost:3004";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Delivery Food App API")
  .setDescription(description)
  .setVersion("1")
  .addBearerAuth()
  .addCookieAuth("refreshToken")
  .addBasicAuth()
  .build();

export const writeSwaggerFiles = () => {
  // write swagger ui files
  get(`${serverUrl}/swagger/swagger-ui-bundle.js`,
    function(response) {
      response.pipe(createWriteStream(
        "swagger-static/swagger-ui-bundle.js"));
      console.log(`Swagger UI bundle file written to:
     '/swagger-static/swagger-ui-bundle.js'`);
    });

  get(`${serverUrl}/swagger/swagger-ui-init.js`,
    function(response) {
      response.pipe(createWriteStream("swagger-static/swagger-ui-init.js"));
      console.log(`Swagger UI init file written to:
     '/swagger-static/swagger-ui-init.js'`);
    });

  get(`${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
    function(response) {
      response.pipe(createWriteStream(
        "swagger-static/swagger-ui-standalone-preset.js"));
      console.log(`Swagger UI standalone preset file written to:
     '/swagger-static/swagger-ui-standalone-preset.js'`);
    });

  get(`${serverUrl}/swagger/swagger-ui.css`,
    function(response) {
      response.pipe(createWriteStream("swagger-static/swagger-ui.css"));
      console.log(`Swagger UI css file written to:
     '/swagger-static/swagger-ui.css'`);
    });
};