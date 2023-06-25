import {Request, Response} from "express";
import {ExceptionFilter, Catch, ArgumentsHost, HttpException}
  from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status === 404) {
      response.sendStatus(status);
      return;
    }

    if (status === 400) {
      let resError = {errorsMessages: []};

      const resBody: any = exception.getResponse();
      console.log(resBody);

      resBody.message.forEach((el: any) => {
        if (!resError.errorsMessages.find((error: any) => error.field === el.field)) {
          resError.errorsMessages.push(el);
        }
      });

      response.status(status).json(resError);
    } else {
      response
        .status(status)
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url
        });
    }
  };
};