import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  name!: string

  @Column({ length: 100 })
  resource!: string

  @Column({ length: 50 })
  action!: string

  @Column({ nullable: true })
  description!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
