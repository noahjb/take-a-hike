import { param } from 'express-validator';
import ValidationReporter from './ValidationReporter';

const HikesValidator = {
  getHikeById: [
    param('id', 'Invalid ID format').isUUID(),
    ValidationReporter.run
  ]
};

export default HikesValidator;
