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
import { Trip } from "./trip.entity"
import { Invoice } from "./invoice.entity"
import { Document } from "./document.entity"
import { Contact } from "./contact.entity"

export enum ClientStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  LEAD = "lead",
}

@Entity("clients")
@Index(["name", "companyId"], { unique: true })
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 200 })
  name!: string

  @Column({ nullable: true })
  logo!: string

  @Column({ nullable: true })
  website!: string

  @Column({ nullable: true })
  industry!: string

  @Column({ nullable: true })
  address!: string

  @Column({ nullable: true })
  city!: string

  @Column({ nullable: true })
  state!: string

  @Column({ nullable: true })
  country!: string

  @Column({ nullable: true })
  postalCode!: string

  @Column({ nullable: true })
  phoneNumber!: string

  @Column({ nullable: true })
  email!: string

  @Column({ nullable: true })
  taxId!: string

  @Column({ type: "enum", enum: ClientStatus, default: ClientStatus.ACTIVE })
  status!: ClientStatus

  @Column({ nullable: true })
  notes!: string

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  creditLimit!: number

  @Column({ length: 3, default: "USD" })
  currency!: string

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  discountRate!: number

  @Column({ type: "integer", default: 30 })
  paymentTerms!: number

  @ManyToOne(
    () => Company,
    (company) => company.clients
  )
  @JoinColumn({ name: "companyId" })
  company!: Company

  @Column()
  companyId!: string

  @OneToMany(
    () => Trip,
    (trip) => trip.client
  )
  trips!: Trip[]

  @OneToMany(
    () => Invoice,
    (invoice) => invoice.client
  )
  invoices!: Invoice[]

  @OneToMany(
    () => Contact,
    (contact) => contact.client
  )
  contacts!: Contact[]

  @ManyToMany(() => Document)
  @JoinTable({
    name: "client_documents",
    joinColumn: { name: "clientId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "documentId", referencedColumnName: "id" },
  })
  documents!: Document[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
