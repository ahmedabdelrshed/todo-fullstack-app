
export interface IErrorResponse {
    error: {
        details?: {
            errors: {
                message: string;
            }[];
        };
        message?: string;
    };
}

export interface ITodo {
    id: number;
    title: string;
    description: string;
}
