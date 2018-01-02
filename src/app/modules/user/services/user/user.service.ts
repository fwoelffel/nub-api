import {Component} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User, UserInterface} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {hash} from 'bcrypt';
import {UserNotFoundError} from "../../errors/notFound.error";

@Component()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(uPayload: UserInterface): Promise<User> {
    uPayload.password = await hash(uPayload.password, 15);
    const createdUser = this.userRepository.create(uPayload);
    return createdUser;
  }

  async save(u: User): Promise<User> {
    const savedUser = await this.userRepository.save(u);
    return savedUser;
  }

  async update(uId: number, uPayload: Partial<User>): Promise<User|void> {
    const storedUser = await this.userRepository.findOneById(uId);
    if (!storedUser) {
      throw new UserNotFoundError(uId);
    }
    if (uPayload.password) {
      uPayload.password = await hash(uPayload.password, 15);
    }
    Object.assign(storedUser, uPayload);
    const updatedUser = await this.userRepository.save(storedUser);
    return updatedUser;
  }

  async get(uCriteria: Partial<User>): Promise<User[]> {
    const foundUsers = await this.userRepository.find({
      where: uCriteria
    });
    return foundUsers;
  }

  async delete(uCriteria: Partial<User>): Promise<User[]> {
    const foundUsers = await this.get(uCriteria);
    const deletedUsers = await this.userRepository.remove(foundUsers);
    return deletedUsers;
  }

}
