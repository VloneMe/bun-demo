import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Invoice } from "./invoice.entity"

@Entity("invoice_items")
export class InvoiceItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  description!: string

  @Column({ type: "decimal", precision: 10, scale: 2 })
  quantity!: number

  @Column({ nullable: true })
  unit!: string

  @Column({ type: "decimal", precision: 10, scale: 2 })
  unitPrice!: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  discount!: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  taxRate!: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number

  @ManyToOne(
    () => Invoice,
    (invoice) => invoice.items,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "invoiceId" })
  invoice!: Invoice

  @Column()
  invoiceId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
