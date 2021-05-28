import { param } from 'express-validator';
import { ValidationReporter } from './ValidationReporter';

const HikesValidator = {
    getHikeById: [
        param('id').isUUID(),
        ValidationReporter.run
    ]
};

export {
    HikesValidator
};
