import { IsString, IsOptional } from 'class-validator';

export class UpdateSnippetDto {
  @IsString()
  @IsOptional()
  readonly name?: string;
  @IsString()
  @IsOptional()
  readonly description?: string;
  @IsString()
  @IsOptional()
  readonly content?: string;
}