import { IsString } from 'class-validator';

export class CreateSnippetDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description?: string;
  @IsString()
  readonly content: string;
}