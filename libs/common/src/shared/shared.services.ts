import { Injectable } from "@nestjs/common";

@Injectable()
export class SharedServices {
  constructor(){}
  
  static getConfigBaseOnMode() {
    return `config/.env.dev.${process.env?.NODE_ENV || 'local'}`
  }
}