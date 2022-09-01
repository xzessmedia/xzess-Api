export type ApiResponseResult = {
    Successful: boolean,
    Data?: Object,
    Error?: Object
}

export function CreateApiResponse(successful: boolean, data?: object, error?: object): ApiResponseResult {
    return {
        Successful: successful,
        Data: data,
        Error: error
    }
}