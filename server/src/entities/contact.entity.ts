import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm"
import { Client } from "./client.entity"

@Entity("contacts")
@Index(["email", "clientId"], { unique: true })
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  firstName!: string

  @Column({ length: 100 })
  lastName!: string

  @Column()
  email!: string

  @Column({ nullable: true })
  phoneNumber!: string

  @Column({ nullable: true })
  mobileNumber!: string

  @Column({ nullable: true })
  jobTitle!: string

  @Column({ nullable: true })
  department!: string

  @Column({ default: false })
  isPrimary!: boolean

  @Column({ default: true })
  isActive!: boolean

  @Column({ nullable: true })
  notes!: string

  @ManyToOne(
    () => Client,
    (client) => client.contacts
  )
  @JoinColumn({ name: "clientId" })
  client!: Client

  @Column()
  clientId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
