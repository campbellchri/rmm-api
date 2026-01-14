import { applyDecorators } from '@nestjs/common';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional as IsOptionalNullable,
  IsString,
  ValidateIf,
  IsIn,
  ValidateNested,
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

function IsOptional() {
  return applyDecorators(ValidateIf((_, value) => value !== undefined));
}

function IsStringOptional() {
  return applyDecorators(IsString(), IsOptional());
}

function IsStringOptionalNullable() {
  return applyDecorators(IsString(), IsOptionalNullable());
}

function IsStringOptionalNotEmpty() {
  return applyDecorators(IsStringOptional(), IsNotEmpty());
}

function IsStringOptionalNullableNotEmpty() {
  return applyDecorators(IsStringOptionalNullable(), IsNotEmpty());
}

function IsStringNotEmpty() {
  return applyDecorators(IsString(), IsNotEmpty());
}

function IsNumberStringOptionalNotEmpty() {
  return applyDecorators(IsNumberString(), IsOptional(), IsNotEmpty());
}

function IsNumberOptionalNotEmpty() {
  return applyDecorators(IsNumberString(), IsOptional());
}

function IsNumberStringOptionalNullableNotEmpty() {
  return applyDecorators(IsNumberString(), IsOptionalNullable(), IsNotEmpty());
}

function IsDateStringOptional() {
  return applyDecorators(IsDateString(), IsOptional());
}

function IsDateStringOptionalNullable() {
  return applyDecorators(IsDateString(), IsOptionalNullable());
}

function IsBooleanOptional() {
  return applyDecorators(IsBoolean(), IsOptional());
}

function IsBooleanOptionalNullable() {
  return applyDecorators(IsBoolean(), IsOptionalNullable);
}

function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

function NotMatch(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      // propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: NotMatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'NotMatch' })
export class NotMatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [propertyToCompare] = args.constraints;
    const relatedValue = (args.object as any)[propertyToCompare];
    return value !== relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [propertyToCompare] = args.constraints;
    return `${args.property} should not match ${propertyToCompare}`;
  }
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must match ${relatedPropertyName}`;
  }
}

function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
          return typeof value === 'string' && regex.test(value);
        },
        defaultMessage() {
          return `${propertyName} must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.`;
        },
        // defaultMessage(args: ValidationArguments) {
        //   return `${args.property} must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.`;
        // },
      },
    });
  };
}

export {
  ValidateNested,
  IsIn,
  IsOptionalNullable,
  IsOptional,
  IsStrongPassword,

  //String
  IsStringOptional,
  IsStringOptionalNullable,
  IsStringOptionalNotEmpty,
  IsStringOptionalNullableNotEmpty,
  IsStringNotEmpty,

  //NumberString
  IsNumberStringOptionalNotEmpty,
  IsNumberStringOptionalNullableNotEmpty,
  IsNumberOptionalNotEmpty,
  //DateString
  IsDateStringOptional,
  IsDateStringOptionalNullable,

  //Boolean
  IsBooleanOptional,
  IsBooleanOptionalNullable, Match, NotMatch,
};
