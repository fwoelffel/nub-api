import {Component} from '@nestjs/common';
import {PlainUserInterface, User} from "../../../user/entities/user.entity";
import * as jwt from 'jsonwebtoken';
import {classToPlain} from "class-transformer";

export interface TokenInfo {
  readonly expires_in: number;
  readonly access_token: string;
}

@Component()
export class AuthService {

  constructor() {}

  async createToken(user: User): Promise<TokenInfo> {
    const expiresIn = 3600;
    const secret = 'secret';
    const plainUser = classToPlain(user);
    const token = jwt.sign(plainUser, secret, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token
    };
  }

  async validateUser(user: PlainUserInterface): Promise<boolean> {
    // TODO
    return true;
  }

}
