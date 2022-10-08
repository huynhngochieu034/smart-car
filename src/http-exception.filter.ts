import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        
        let status = !isNaN(exception.status)
            ? exception.status
            : HttpStatus.OK;

        let message = "";
        if (exception.response?.message) {
            if (Array.isArray(exception.response.message)) {
                message = exception.response.message.join(', ');
            } else {
                message = exception.response.message;
            }
            status = 200;
        }

        if (exception.code === 11000) {
            const path = Object.keys(exception.keyPattern)[0];
            message = `${path.charAt(0).toUpperCase() + path.slice(1)} already exists!`;
            status = 200;
        }

        response.status(status).json({
            status: status,
            message: message ? message : exception.message
        });
    }
}