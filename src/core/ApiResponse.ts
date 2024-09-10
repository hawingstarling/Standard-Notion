import { NextResponse } from 'next/server';

// Helper code for the API consumer to understand the error and handle it accordingly

export enum ResponseStatus {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export interface ErrorApi {
  key: string;
  value: string;
}

export abstract class ApiResponse {
  constructor(
    protected status: ResponseStatus,
    protected errors?: ErrorApi[],
  ) {}

  protected prepare<T extends ApiResponse>(
    response: T,
    headers: { [key: string]: string } = {},
  ): NextResponse {
    const sanitizedResponse = ApiResponse.sanitize(response);
    const res = NextResponse.json(sanitizedResponse, { status: this.status });

    for (const [key, value] of Object.entries(headers)) {
      res.headers.set(key, value);
    }

    return res;
  }

  public send(
    headers: { [key: string]: string } = {}
  ): NextResponse {
    return this.prepare<ApiResponse>(this, headers);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.UNAUTHORIZED, errors);
  }
}

export class UnauthorizedResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.UNAUTHORIZED, errors);
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.NOT_FOUND, errors);
  }

  send(headers: { [key: string]: string } = {}): NextResponse {
    return super.prepare<NotFoundResponse>(this, headers);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.FORBIDDEN, errors);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.BAD_REQUEST, errors);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.INTERNAL_ERROR, errors);
  }
}

export class UnknownErrorResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.INTERNAL_ERROR, errors);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.SUCCESS, errors);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.SUCCESS, errors);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(private data: T) {
    super(ResponseStatus.SUCCESS);
  }

  send(headers: { [key: string]: string } = {}): NextResponse {
    return super.prepare<SuccessResponse<T>>(this, headers);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.UNAUTHORIZED, errors);
  }

  send(headers: { [key: string]: string } = {}): NextResponse {
    headers['instruction'] = this.instruction;
    return super.prepare<AccessTokenErrorResponse>(this, headers);
  }
}

export class SuccessResponseWithMsg<T> extends ApiResponse {
  constructor(
    private message: string,
    private data: T
  ) {
    super(ResponseStatus.SUCCESS);
  }

  send(headers: { [key: string]: string } = {}): NextResponse {
    return super.prepare<SuccessResponseWithMsg<T>>(this, headers);
  }
}

export class CreatedResponse<T> extends ApiResponse {
  constructor(
    private message: string,
    private data: T
  ) {
    super(ResponseStatus.CREATED);
  }

  send(headers: { [key: string]: string } = {}): NextResponse {
    return super.prepare<CreatedResponse<T>>(this, headers);
  }
}