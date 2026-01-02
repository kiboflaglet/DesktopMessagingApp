
export class socketResponse<T = null> {
    readonly success: boolean
    readonly response: T
    readonly type: string

    private constructor(success: boolean, response: T, type: string) {
        this.success = success;
        this.response = response;
        this.type = type
    }

    static success<T>(response: T, type: string) {
        return new socketResponse(true, response, type)
    }

    static failure<T>(response: T, type: string) {
        return new socketResponse(true, response, type)
    }
}
