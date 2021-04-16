interface iResultData<T> {
  statusCode: string
  body: T
  message: string
}
class ResultData<T> implements iResultData<T> {
  statusCode: string;
  body: T;
  message: string;
  constructor(statusCode, body, message) {
    this.statusCode = statusCode
    this.body = body
    this.message = message
  }
  returnMessage(): iResultData<T> {
    return {
      statusCode: this.statusCode,
      body: this.body,
      message: this.message,
    }
  }
}

export class ResultFormat<T> {
  private resultData: ResultData<T>
  constructor() { }
  error(): iResultData<null>;
  error(statusCode: string, message: string): iResultData<null>;
  error(statusCode?: string, message?: string) {
    this.resultData = new ResultData(statusCode ? statusCode : '9999', null, message ? message : 'ERROR')
    return this.resultData.returnMessage()
  }

  success(): iResultData<null>;
  success(body: T): iResultData<T>;
  success(body: T, statusCode: string, message: string): iResultData<T>;
  success(body?: T, statusCode?: string, message?: string): iResultData<T | null> {
    this.resultData = new ResultData(statusCode ? statusCode : '0', body ? body : null, message ? message : 'SUCCESS')
    return this.resultData.returnMessage()
  }

}
