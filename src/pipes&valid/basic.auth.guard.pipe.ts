import { Injectable, CanActivate, ExecutionContext, UnauthorizedException }
  from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext)
    : boolean | Promise<boolean> | Observable<boolean> {

    const request: Request = context.switchToHttp().getRequest();

    const byffer = new Buffer(`${"admin"}:${"qwerty"}`);
    const base64 = byffer.toString("base64");

    const pass = request.header("authorization");

    if (pass !== `Basic ${base64}`) throw new UnauthorizedException();

    return true;
  };
};