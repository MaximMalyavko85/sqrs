import { Request } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class AllexceptionsFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(AllexceptionsFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    this.logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json(this._response(status, request, exception));
  }
  
  
  private _response(status: number, request: Request, exception: any) {
    let messagesArray;

    console.log(exception)
    if (typeof exception?.response?.message === 'string') {
        messagesArray = exception.response.message.split(';');
    }

    if (exception.response.message instanceof Array) {
        messagesArray = exception.response.message
    }


    return {
      statusCode : status,
      timestamp  : new Date().toISOString(),
      path       : request?.url,
      method     : request?.method,
      params     : request?.params,
      query      : request?.query, 
      exception  : {
        name   : exception['name'],
        message: messagesArray,
      }
    }
  }
}
