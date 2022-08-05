import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
    IsPositive, IsString, MinLength 
} from 'class-validator';

export class CreateMetricDto{
    @IsString()
    readonly name: string;
    
    @IsNumber()
    @IsPositive()
    readonly status: number;
}
