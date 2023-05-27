
export class HttpResponse {
  public statusCode: number;
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
