// // src/utils/response.utils.ts
// import { Response } from 'express';
// import { ApiResponse as ApiResponseType } from '../types/apiResponse';

// export class ApiResponse {
//     static success<T>(
//         res: Response, 
//         data: T, 
//         message: string = 'Success', 
//         status: number = 200
//     ): Response<ApiResponseType<T>> {
//         const response: ApiResponseType<T> = {
//             message,
//             status,
//             success: true,
//             data
//         };
//         return res.status(status).json(response);
//     }

//     static error(
//         res: Response, 
//         message: string, 
//         status: number = 400, 
//         data: any = null
//     ): Response<ApiResponseType<any>> {
//         const response: ApiResponseType<any> = {
//             message,
//             status,
//             success: false,
//             data
//         };
//         return res.status(status).json(response);
//     }

//     // Common response patterns
//     static created<T>(
//         res: Response, 
//         data: T, 
//         message: string = 'Resource created successfully'
//     ): Response<ApiResponseType<T>> {
//         return this.success(res, data, message, 201);
//     }

//     static notFound(
//         res: Response, 
//         message: string = 'Resource not found'
//     ): Response<ApiResponseType<null>> {
//         return this.error(res, message, 404);
//     }

//     static unauthorized(
//         res: Response, 
//         message: string = 'Unauthorized access'
//     ): Response<ApiResponseType<null>> {
//         return this.error(res, message, 401);
//     }

//     static forbidden(
//         res: Response, 
//         message: string = 'Forbidden access'
//     ): Response<ApiResponseType<null>> {
//         return this.error(res, message, 403);
//     }

//     static validationError(
//         res: Response, 
//         message: string = 'Validation failed', 
//         errors: any = null
//     ): Response<ApiResponseType<any>> {
//         return this.error(res, message, 422, errors);
//     }

//     static serverError(
//         res: Response, 
//         message: string = 'Internal server error'
//     ): Response<ApiResponseType<null>> {
//         return this.error(res, message, 500);
//     }
// }

// src/utils/response.utils.ts
import { Response } from 'express';
import { ApiResponse as ApiResponseType } from '../types/apiResponse';

export class ApiResponse {
    static success<T>(
        res: Response, 
        data: T, 
        message: string = 'Success', 
        status: number = 200
    ): Response<ApiResponseType<T>> {
        const response: ApiResponseType<T> = {
            message,
            status,
            success: true,
            data
        };
        return res.status(status).json(response);
    }

    static error(
        res: Response, 
        message: string, 
        status: number = 400, 
        data: any = null
    ): Response<ApiResponseType<any>> {
        const response: ApiResponseType<any> = {
            message,
            status,
            success: false,
            data
        };
        return res.status(status).json(response);
    }

    // Common response patterns
    static created<T>(
        res: Response, 
        data: T, 
        message: string = 'Resource created successfully'
    ): Response<ApiResponseType<T>> {
        return this.success(res, data, message, 201);
    }

    static notFound(
        res: Response, 
        message: string = 'Resource not found'
    ): Response<ApiResponseType<null>> {
        return this.error(res, message, 404);
    }

    static unauthorized(
        res: Response, 
        message: string = 'Unauthorized access'
    ): Response<ApiResponseType<null>> {
        return this.error(res, message, 401);
    }

    static forbidden(
        res: Response, 
        message: string = 'Forbidden access'
    ): Response<ApiResponseType<null>> {
        return this.error(res, message, 403);
    }

    static validationError(
        res: Response, 
        message: string = 'Validation failed', 
        errors: any = null
    ): Response<ApiResponseType<any>> {
        return this.error(res, message, 422, errors);
    }

    static serverError(
        res: Response, 
        message: string = 'Internal server error'
    ): Response<ApiResponseType<null>> {
        return this.error(res, message, 500);
    }
}