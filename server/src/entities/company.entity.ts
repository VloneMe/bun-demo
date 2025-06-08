import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { User } from "./user.entity"
import { Vehicle } from "./vehicle.entity"
import { Driver } from "./driver.entity"
import { Trip } from "./trip.entity"
import { Invoice } from "./invoice.entity"
import { Document } from "./document.entity"
import { CompanySettings } from "./company-settings.entity"
import { Client } from "./client.entity"

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 200 })
  name!: string

  @Column({ nullable: true })
  logo!: string

  @Column({ nullable: true })
  website!: string

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

  @Column({ nullable: true })
  registrationNumber!: string

  @Column({ default: true })
  isActive!: boolean

  @Column({ type: "simple-json", nullable: true })
  businessHours!: {
    monday: { start: string; end: string; closed: boolean} 
    tuesday: { start: string; end: string; closed: boolean} 
    wednesday: { start: string; end: string; closed: boolean} 
    thursday: { start: string; end: string; closed: boolean} 
    friday: { start: string; end: string; closed: boolean} 
    saturday: { start: string; end: string; closed: boolean} 
    sunday: { start: string; end: string; closed: boolean} 
  }

  @OneToMany(
    () => User,
    (user) => user.company
  )
  users!: User[]

  @OneToMany(
    () => Vehicle,
    (vehicle) => vehicle.company
  )
  vehicles!: Vehicle[]

  @OneToMany(
    () => Driver,
    (driver) => driver.company
  )
  drivers!: Driver[]

  @OneToMany(
    () => Trip,
    (trip) => trip.company
  )
  trips!: Trip[]

  @OneToMany(
    () => Invoice,
    (invoice) => invoice.company
  )
  invoices!: Invoice[]

  @OneToMany(
    () => Document,
    (document) => document.company
  )
  documents!: Document[]

  @OneToMany(
    () => CompanySettings,
    (settings) => settings.company
  )
  settings!: CompanySettings[]

  @OneToMany(
    () => Client,
    (client) => client.company
  )
  clients!: Client[]

  @ManyToMany(() => Document)
  @JoinTable({
    name: "company_compliance_documents",
    joinColumn: { name: "companyId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "documentId", referencedColumnName: "id" },
  })
  complianceDocuments!: Document[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
