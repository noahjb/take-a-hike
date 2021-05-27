import { NotFoundError } from "../errors/NotFound";
import { Request, Response } from "express";

const errorHelper = {
    logErrorsToConsole: (err: NodeJS.ErrnoException, _req: Request, _res: Response, next: (args: any) => void) => {
        console.error(`Log Entry: ${JSON.stringify(errorHelper.errorBuilder(err))}`)
        console.error('*'.repeat(80));
        next(err);
    },
    clientErrorHandler: (err: NodeJS.ErrnoException, req: Request, res: Response, next: (args: any) => void) => {
        if (req.xhr) {
            res.status(500).json({
                status: 500,
                statusText: 'Internal Server Error',
                message: 'XMLHttpRequest Error',
                error: {
                    errno: 0,
                    call: 'XMLHttpRequest Call',
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'XMLHttpRequest error'
                }
            });
        } else {
            next(err);
        }
    },
    errorHandler: (err: NodeJS.ErrnoException, _req: Request, res: Response, _next: (args: any) => void) => {
        const errorResponse = errorHelper.errorBuilder(err);
        res.status(errorResponse.status).json(errorResponse);
    },
    errorBuilder: (err: NodeJS.ErrnoException) => {
        if (err instanceof NotFoundError) {
            return {
                status: err.status,
                statusText: err.statusText,
                message: err.message,
                error: {
                    code: err.code,
                    message: err.message
                }
            };
        }
            
        return {
            status: 500,
            statusText: 'Internal Server Error',
            message: err.message,
            error: {
                errno: err.errno,
                call: err.syscall,
                code: 'INTERNAL_SERVER_ERROR',
                message: err.message
            }
        };
    }
};

export {
    errorHelper
};
