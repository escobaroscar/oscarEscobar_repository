import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, 
    IsPositive, isString, IsString, MinLength 
} from 'class-validator';

export class CreateRepositoryDto{
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsString()
    @IsPositive()
    readonly state: number;
    @IsNotEmpty()
    @IsString()
    readonly status: string;
    
}
