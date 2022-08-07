import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, 
    IsPositive, isString, IsString, MaxLength, MinLength 
} from 'class-validator';

export class CreateRepositoryDto{

    @IsNotEmpty()
    @IsNumber()
    readonly id_tribe: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(1)
    readonly state: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(1)
    readonly status: string;
}
