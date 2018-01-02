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

  /**
   * This function creates a new user.
   * @async
   * @param {UserInterface} uPayload The user to be created.
   * @returns {Promise<User>} The created user.
   */
  async create(uPayload: UserInterface): Promise<User> {
    uPayload.password = await hash(uPayload.password, 15);
    const createdUser = this.userRepository.create(uPayload);
    return createdUser;
  }

  /**
   * This function saves a new user.
   * @async
   * @param {User} u The user to be saved.
   * @returns {Promise<User>} The saved user.
   */
  async save(u: User): Promise<User> {
    const savedUser = await this.userRepository.save(u);
    return savedUser;
  }

  /**
   * This function updates the user matching the given id with the given attributes.
   * @async
   * @param {number} uId The user id.
   * @param {Partial<User>} uPayload The new user attributes.
   * @returns {Promise<User>} The updated user.
   * @throws {UserNotFoundError} When no user matches the given id.
   */
  async update(uId: number, uPayload: Partial<User>): Promise<User> {
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

  /**
   * This function returns the users matching the given simple criteria.
   * @async
   * @param {Partial<User>} uCriteria The user criteria.
   * @returns {Promise<User[]>} The found user(s) (can be empty).
   */
  async get(uCriteria?: Partial<User>): Promise<User[]> {
    const findOpts:any = {};
    if (uCriteria) {
      findOpts.where = uCriteria;
    }
    const foundUsers = await this.userRepository.find(findOpts);
    return foundUsers;
  }

  /**
   * This function deletes the users matching the given simple criteria.
   * @async
   * @param {Partial<User>} uCriteria The user criteria.
   * @returns {Promise<User[]>} The deleted user(s) (can be empty).
   */
  async delete(uCriteria: Partial<User>): Promise<User[]> {
    const foundUsers = await this.get(uCriteria);
    const deletedUsers = await this.userRepository.remove(foundUsers);
    return deletedUsers;
  }

  /**
   * This function deletes the user matching the given id.
   * @async
   * @param {number} uId The user id.
   * @returns {Promise<User>} The deleted user.
   * @throws {UserNotFoundError} When no user matches the given id.
   */
  async deleteById(uId: number): Promise<User> {
    const storedUser = await this.userRepository.findOneById(uId);
    if (!storedUser) {
      throw new UserNotFoundError(uId);
    }
    const deletedUser = await this.userRepository.remove(storedUser);
    return deletedUser;
  }

}
