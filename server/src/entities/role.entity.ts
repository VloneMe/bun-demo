import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { Permission } from "./permission.entity"

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  name!: string

  @Column({ nullable: true })
  description!: string

  @Column({ default: false })
  isSystemRole!: boolean

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "role_permissions",
    joinColumn: { name: "roleId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "permissionId", referencedColumnName: "id" },
  })
  permissions!: Permission[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
