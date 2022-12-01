
import { HTTP_STATUS } from '../constants/api.constants';
import { errorResponse } from '../utils/api.utils';


const errorMiddleware = (error, solicitud, respuesta, next) => {
    const errorStatus = error.statusCode || HTTP_STATUS.INTERNAL_ERROR;
    const errorMessage = error.message || "Hubo un error inesperado";
    const errorDetails = error.message ? null : error;
    return respuesta
        .status(errorStatus)
        .json(errorResponse(errorMessage, errorDetails));
};

export { errorMiddleware };