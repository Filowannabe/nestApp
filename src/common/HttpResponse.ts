import { ApiProperty } from '@nestjs/swagger';

export class HttpResponse {
  @ApiProperty({ description: 'Status code' })
  public statusCode: number;
  @ApiProperty({ description: 'Response' })
  public body: object;

  constructor(statusCode: number, body: object) {
    this.statusCode = statusCode;
    this.body = body;
  }
  static create(respCode: number, body: object): HttpResponse {
    return new HttpResponse(respCode, body);
  }
  static convertToExpress(resp, httpResponse: HttpResponse): object {
    return resp.status(httpResponse.statusCode).json(httpResponse.body);
  }
}
