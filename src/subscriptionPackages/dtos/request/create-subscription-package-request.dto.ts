import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PRICE_UNITS } from 'src/subscriptionPackages/enums/price-unit.enum';
import { STORAGE_UNITS } from 'src/subscriptionPackages/enums/storage-unit.enum';

export class CreateSubscriptionPackageRequestDto {
    @ApiProperty({ 
        example: 'Essential Tribute',
        description: 'Name of the subscription package'
    })
    @IsNotEmpty()
    @IsString()
    packageName: string;

    @ApiPropertyOptional({ 
        example: 'heart-icon',
        description: 'Identifier for the package icon'
    })
    @IsOptional()
    @IsString()
    iconId?: string;

    @ApiPropertyOptional({ 
        example: 'https://cdn.example.com/icons/heart.png',
        description: 'URL to the package icon'
    })
    @IsOptional()
    @IsString()
    iconURL?: string;

    @ApiProperty({ 
        example: 5,
        description: 'Price of the package'
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiPropertyOptional({ 
        example: 'month',
        enum: PRICE_UNITS,
        description: 'Unit for the price (month or year)',
        default: 'month'
    })
    @IsOptional()
    @IsEnum(PRICE_UNITS)
    priceUnit?: string;

    @ApiProperty({ 
        example: 5,
        description: 'Storage amount included in the package'
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    storageAmount: number;

    @ApiPropertyOptional({ 
        example: 'GB',
        enum: STORAGE_UNITS,
        description: 'Unit for storage (GB or TB)',
        default: 'GB'
    })
    @IsOptional()
    @IsEnum(STORAGE_UNITS)
    storageUnit?: string;

    @ApiProperty({ 
        example: [
            'Complete funeral arrangements',
            'Transportation and logistics',
            'Documentation assistance',
            'Traditional ceremony coordination'
        ],
        description: 'Array of features included in the package',
        type: [String]
    })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    features: string[];

    @ApiPropertyOptional({ 
        example: true,
        description: 'Whether the package is active',
        default: true
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({ 
        example: 0,
        description: 'Sort order for displaying packages',
        default: 0
    })
    @IsOptional()
    @IsNumber()
    sortOrder?: number;
}
