import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator<
  keyof any,
  Request['user'] | undefined
>((data: keyof any, ctx: ExecutionContext): Request['user'] | undefined => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const user = request.user;

  return data ? (user?.[data] as Request['user'] | undefined) : user;
});
