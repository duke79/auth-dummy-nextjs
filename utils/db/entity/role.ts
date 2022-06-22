import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { sqlQuery } from "..";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  static async getUserRolesByUserName(username: string) {
    const query = `SELECT role.title FROM role 
        JOIN user_role ON role.id = user_role.role_id
        JOIN auth_user ON auth_user.id = user_role.user_id
        WHERE auth_user.username = '${username}';`;
    const res = await sqlQuery(query);
    if (!res?.rows.length) {
      throw new Error('Empty record!');
    }
    return res;
  }
}
