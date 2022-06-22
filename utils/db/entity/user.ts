import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { sqlQuery } from ".."

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  name: string

  @Column("text")
  description: string

  @Column()
  filename: string

  @Column("double")
  views: number

  @Column()
  isPublished: boolean

  static async getUserByUserName(username: string) {
    const query = `SELECT * from auth_user 
        WHERE username=lower('${username}')`;
    const res = await sqlQuery(query);
    if (!res?.rows.length) {
      throw new Error('Empty record!');
    }
    return res;
  }

  static async updateOtp(args: {
    otp: string;
    username: string;
  }) {
    const { otp, username } = args;
    const query = `UPDATE auth_user SET otp='${otp}'
        WHERE username=lower('${username}')`;
    const res = await sqlQuery(query);
    if (!res?.rows.length) {
      throw new Error('Empty record!');
    }
    return res;
  }
}
