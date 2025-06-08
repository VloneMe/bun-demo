import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { Trip } from "./trip.entity"
import { Invoice } from "./invoice.entity"
import { Transaction } from "./transaction.entity"
import { Notification } from "./notification.entity"
import { Company } from "./company.entity"
import { Role } from "./role.entity"
import { Document } from "./document.entity"
import { Load } from "./load.entity"
import { Vehicle } from "./vehicle.entity"
import { Driver } from "./driver.entity"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ length: 100 })
  firstName: string

  @Column({ length: 100 })
  lastName: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @Column({ nullable: true })
  phoneNumber: string

  @Column({ nullable: true })
  profileImage: string

  @Column({ default: "en" })
  language: string

  @Column({ default: "system" })
  theme: string

  @Column({ default: false })
  aiModeEnabled: boolean

  @Column({ default: true })
  isActive: boolean

  @Column({ default: false })
  isVerified: boolean

  @Column({ nullable: true })
  lastLoginAt: Date

  @ManyToOne(
    () => Company,
    (company) => company.users,
  )
  @JoinColumn({ name: "companyId" })
  company: Company

  @Column({ nullable: true })
  companyId: string

  @ManyToMany(() => Role)
  @JoinTable({
    name: "user_roles",
    joinColumn: { name: "userId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "roleId", referencedColumnName: "id" },
  })
  roles: Role[]

  @OneToMany(
    () => Trip,
    (trip) => trip.createdBy,
  )
  createdTrips: Trip[]

  @OneToMany(
    () => Trip,
    (trip) => trip.assignedTo,
  )
  assignedTrips: Trip[]

  @OneToMany(
    () => Invoice,
    (invoice) => invoice.createdBy,
  )
  createdInvoices: Invoice[]

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.user,
  )
  transactions: Transaction[]

  @OneToMany(
    () => Notification,
    (notification) => notification.user,
  )
  notifications: Notification[]

  @OneToMany(
    () => Document,
    (document) => document.uploadedBy,
  )
  uploadedDocuments: Document[]

  @OneToMany(
    () => Load,
    (load) => load.postedBy,
  )
  postedLoads: Load[]

  @OneToMany(
    () => Vehicle,
    (vehicle) => vehicle.assignedTo,
  )
  assignedVehicles: Vehicle[]

  @OneToMany(
    () => Driver,
    (driver) => driver.manager,
  )
  managedDrivers: Driver[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
