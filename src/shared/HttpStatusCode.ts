class HttpStatusCode {
  static get OK(): number {
    return 200;
  }

  static get ERROR(): number {
    return 400;
  }

  static get METHOD_NOT_ALLOWED(): number {
    return 406;
  }

  static get NOT_FOUND(): number {
    return 404;
  }

  static get NOT_AUTHORIZED(): number {
    return 401;
  }

  static get PRECONDITION_FAIL(): number {
    return 412;
  }
}

export default HttpStatusCode;
