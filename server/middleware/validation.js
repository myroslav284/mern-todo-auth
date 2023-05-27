import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Min length of password is 5').isLength({ min: 5}),
];

export const signupValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Min length of password is 5').isLength({ min: 5}),
    body('fullName', 'Min length of name is 3').isLength({ min: 3 }),
];