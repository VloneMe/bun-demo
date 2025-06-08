import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
} from "typeorm"
import { Company } from "./company.entity"
import { Client } from "./client.entity"
import { Trip } from "./trip.entity"
import { User } from "./user.entity"
import { Document } from "./document.entity"
import { InvoiceItem } from "./invoice-item.entity"
import { Transaction } from "./transaction.entity"

export enum InvoiceStatus {
  DRAFT = "draft",
  SENT = "sent",
  PARTIALLY_PAID = "partially_paid",
  PAID = "paid",
  OVERDUE = "overdue",
  CANCELLED = "cancelled",
}

@Entity("invoices")
@Index(["invoiceNumber", "companyId"], { unique: true })
@Index(["status", "dueDate"])
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  invoiceNumber!: string

  @Column({ type: "date" })
  issueDate!: Date

  @Column({ type: "date" })
  dueDate!: Date

  @Column({ type: "enum", enum: InvoiceStatus, default: InvoiceStatus.DRAFT })
  status!: InvoiceStatus

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  subtotal!: number

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  taxRate!: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  taxAmount!: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  discountAmount!: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  total!: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  amountPaid!: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  amountDue!: number

  @Column({ length: 3, default: "USD" })
  currency!: string

  @Column({ nullable: true })
  notes!: string

  @Column({ nullable: true })
  termsAndConditions!: string

  @Column({ nullable: true })
  footer!: string

  @ManyToOne(
    () => Company,
    (company) => company.invoices
  )
  @JoinColumn({ name: "companyId" })
  company!: Company

  @Column()
  companyId!: string

  @ManyToOne(
    () => Client,
    (client) => client.invoices
  )
  @JoinColumn({ name: "clientId" })
  client!: Client

  @Column()
  clientId!: string

  @ManyToOne(
    () => Trip,
    (trip) => trip.invoices,
    { nullable: true }
  )
  @JoinColumn({ name: "tripId" })
  trip!: Trip

  @Column({ nullable: true })
  tripId!: string

  @ManyToOne(
    () => User,
    (user) => user.createdInvoices
  )
  @JoinColumn({ name: "createdById" })
  createdBy!: User

  @Column()
  createdById!: string

  @OneToMany(
    () => InvoiceItem,
    (item) => item.invoice
  )
  items!: InvoiceItem[]

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.invoice
  )
  transactions!: Transaction[]

  @ManyToMany(() => Document)
  @JoinTable({
    name: "invoice_documents",
    joinColumn: { name: "invoiceId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "documentId", referencedColumnName: "id" },
  })
  documents!: Document[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
