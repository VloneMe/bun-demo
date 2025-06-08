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
import { User } from "./user.entity"
import { Invoice } from "./invoice.entity"

export enum TransactionType {
  PAYMENT = "payment",
  REFUND = "refund",
  ADJUSTMENT = "adjustment",
  WITHDRAWAL = "withdrawal",
  DEPOSIT = "deposit",
  TRANSFER = "transfer",
  FEE = "fee",
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum PaymentMethod {
  BANK_TRANSFER = "bank_transfer",
  CREDIT_CARD = "credit_card",
  CASH = "cash",
  MOBILE_MONEY = "mobile_money",
  CHEQUE = "cheque",
  WALLET = "wallet",
  OTHER = "other",
}

@Entity("transactions")
@Index(["date", "userId"])
@Index(["type", "status"])
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  transactionNumber!: string

  @Column({ type: "enum", enum: TransactionType })
  type!: TransactionType

  @Column({ type: "enum", enum: TransactionStatus, default: TransactionStatus.PENDING })
  status!: TransactionStatus

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number

  @Column({ length: 3, default: "USD" })
  currency!: string

  @Column({ type: "date" })
  date!: Date

  @Column({ type: "enum", enum: PaymentMethod, nullable: true })
  paymentMethod!: PaymentMethod

  @Column({ nullable: true })
  paymentReference!: string

  @Column({ nullable: true })
  description!: string

  @Column({ nullable: true })
  notes!: string

  @ManyToOne(
    () => User,
    (user) => user.transactions
  )
  @JoinColumn({ name: "userId" })
  user!: User

  @Column()
  userId!: string

  @ManyToOne(
    () => Invoice,
    (invoice) => invoice.transactions,
    { nullable: true }
  )
  @JoinColumn({ name: "invoiceId" })
  invoice!: Invoice

  @Column({ nullable: true })
  invoiceId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
