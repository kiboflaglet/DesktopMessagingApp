export type serviceResponse <T> = {

    success: boolean;
    responseObject: T;
    statusCode: number;
    message: string | null


}

export type User = {
    id: string;
    username: string;
}
