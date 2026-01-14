import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          
          // Password validation criteria
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasDigit = /\d/.test(value);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
          const isLengthValid = value.length >= 8;

          return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && isLengthValid;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.';
        },
      },
    });
  };
}
