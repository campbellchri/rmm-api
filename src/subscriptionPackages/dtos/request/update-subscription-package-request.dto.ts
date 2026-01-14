import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PRICE_UNITS } from 'src/subscriptionPackages/enums/price-unit.enum';
import { STORAGE_UNITS } from 'src/subscriptionPackages/enums/storage-unit.enum';

export class UpdateSubscriptionPackageRequestDto {
    @ApiPropertyOptional({ 
        example: 'Essential Tribute',
        description: 'Name of the subscription package'
    })
    @IsOptional()
    @IsString()
    packageName?: string;

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

    @ApiPropertyOptional({ 
        example: 5,
        description: 'Price of the package'
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @ApiPropertyOptional({ 
        example: 'month',
        enum: PRICE_UNITS,
        description: 'Unit for the price (month or year)'
    })
    @IsOptional()
    @IsEnum(PRICE_UNITS)
    priceUnit?: string;

    @ApiPropertyOptional({ 
        example: 5,
        description: 'Storage amount included in the package'
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    storageAmount?: number;

    @ApiPropertyOptional({ 
        example: 'GB',
        enum: STORAGE_UNITS,
        description: 'Unit for storage (GB or TB)'
    })
    @IsOptional()
    @IsEnum(STORAGE_UNITS)
    storageUnit?: string;

    @ApiPropertyOptional({ 
        example: [
            'Complete funeral arrangements',
            'Transportation and logistics',
            'Documentation assistance',
            'Traditional ceremony coordination'
        ],
        description: 'Array of features included in the package',
        type: [String]
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    features?: string[];

    @ApiPropertyOptional({ 
        example: true,
        description: 'Whether the package is active'
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({ 
        example: 0,
        description: 'Sort order for displaying packages'
    })
    @IsOptional()
    @IsNumber()
    sortOrder?: number;
}
