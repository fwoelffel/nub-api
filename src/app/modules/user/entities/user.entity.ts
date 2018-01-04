import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {Exclude, Expose} from 'class-transformer';

export interface UserInterface {
  id?: number;
  email: string;
  password: string;
  username: string;
  createdDate?: Date;
  updatedDate?: Date;
}

export interface PlainUserInterface {
  id: string;
  email: string;
  username: string;
  createdDate?: Date;
  updatedDate?: Date;
}

@Entity()
export class User implements UserInterface {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    unique: true
  })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

}