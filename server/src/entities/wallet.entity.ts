import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm"
import { User } from "./user.entity"
import { Company } from "./company.entity"
import { Transaction } from "./transaction.entity"

@Entity("wallets")
export class Wallet {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  walletNumber!: string

  @Column({ type: "decimal", precision: 15, scale: 2, default: 0 })
  balance!: number

  @Column({ length: 3, default: "USD" })
  currency!: string

  @Column({ default: true })
  isActive!: boolean

  @Column({ nullable: true })
  description!: string

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user!: User

  @Column()
  userId!: string

  @ManyToOne(() => Company)
  @JoinColumn({ name: "companyId" })
  company!: Company

  @Column()
  companyId!: string

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.invoice
  )
  transactions!: Transaction[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
