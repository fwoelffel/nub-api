import {Mutation, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "../services/user/user.service";
import {UseInterceptors} from "@nestjs/common";
import {ClassToPlainInterceptor} from "../../../shared/interceptors/classToPlain.interceptor";
import {User} from "../entities/user.entity";
import {IncomingMessage} from "http";

export interface CreateUserInterface {
  email: string;
  username: string;
  password: string;
}

export interface UpdateUserInterface {
  id: number;
  email?: string;
  username?: string;
  password?: string;
}

export interface DeleteUserInterface {
  id: number;
}

@Resolver('User')
@UseInterceptors(ClassToPlainInterceptor)
export class UserResolvers {

  constructor(private readonly userService: UserService) {}

  @Query()
  async getUsers(): Promise<User[]> {
    const userEntities = await this.userService.get();
    return userEntities;
  }

  @Mutation()
  async createUser(msg: IncomingMessage, args: CreateUserInterface) {
    const createdUser = await this.userService.create(args);
    const savedUser = await this.userService.save(createdUser);
    return savedUser;
  }

  @Mutation()
  async updateUser(msg: IncomingMessage, args: UpdateUserInterface) {
    const userId = args.id;
    delete args.id;
    const updatedUser = await this.userService.update(userId, args);
    return updatedUser;
  }

  @Mutation()
  async deleteUser(msg: IncomingMessage, args: DeleteUserInterface) {
    const deletedUser = await this.userService.deleteById(args.id);
    return deletedUser;
  }

}