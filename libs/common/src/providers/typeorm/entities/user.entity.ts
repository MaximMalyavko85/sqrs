import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  userName: string;

  @Column()
  email: string;
  
  @Column()
  password: string;
}