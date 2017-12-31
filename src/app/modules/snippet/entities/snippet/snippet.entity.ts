import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {Exclude, Expose} from 'class-transformer';
import {lookup} from "mime-types";

export interface SnippetInterface {
  id?: number;
  name?: string;
  description?: string;
  content?: string;
  createdDate?: Date;
  updatedDate?: Date;
  shortId?: string;
  mime?: string;
}

@Entity()
export class Snippet implements SnippetInterface {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
      default: ''
  })
  description: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Expose({name: 'id'})
  @Column({
    unique: true
  })
  shortId: string;

  @Expose()
  get mime(): string {
    return lookup(this.name) || undefined;
  }

}