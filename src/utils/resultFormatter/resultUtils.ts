class ResultData<T> {
    statusCode: string;
    body: T;
    message:string;
    constructor(statusCode, body, message) {
        this.statusCode = statusCode
        this.body = body
        this.message = message
    }
    returnMessage() {
        return {
            statusCode: this.statusCode,
            body: this.body,
            message: this.message,
        }
    }
}

export class ResultFormat<T> {
    private resultData
    success() {
        console.log('成功')
        console.log('成功',this.resultData)
        if(this.resultData.message === '') {
            this.resultData.message = 'SUCCESS'
        }
        if(this.resultData.statusCode === '') {
            this.resultData.statusCode = '0'
        }
        return this.resultData.returnMessage()
    }
    error() {
        if(this.resultData.message === '') {
            this.resultData.message = 'ERROR'
        }
        return this.resultData.returnMessage()
    }
    constructor();
    constructor(body: T);
    constructor(statusCode: string, message: string)
    constructor(body?: T,statusCode?: string, message?: string) {
        this.resultData = new ResultData(statusCode ? statusCode : "", body ? body : null, message ? message : '')
    }
}
