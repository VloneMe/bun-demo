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
import { User } from "./user.entity"
import { Vehicle } from "./vehicle.entity"
import { Driver } from "./driver.entity"
import { Invoice } from "./invoice.entity"
import { Document } from "./document.entity"
import { Company } from "./company.entity"
import { Client } from "./client.entity"
import { TripEvent } from "./trip-event.entity"
import { TripExpense } from "./trip-expense.entity"

export enum TripStatus {
  DRAFT = "draft",
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

@Entity("trips")
@Index(["pickupDate", "deliveryDate"])
@Index(["status", "companyId"])
export class Trip {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  tripNumber!: string

  @Column({ type: "enum", enum: TripStatus, default: TripStatus.DRAFT })
  status!: TripStatus

  @Column({ type: "timestamp" })
  pickupDate!: Date

  @Column({ type: "timestamp" })
  deliveryDate!: Date

  @Column()
  originAddress!: string

  @Column({ nullable: true })
  originCity!: string

  @Column({ nullable: true })
  originState!: string

  @Column({ nullable: true })
  originCountry!: string

  @Column({ nullable: true })
  originPostalCode!: string

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  originLatitude!: number

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  originLongitude!: number

  @Column()
  destinationAddress!: string

  @Column({ nullable: true })
  destinationCity!: string

  @Column({ nullable: true })
  destinationState!: string

  @Column({ nullable: true })
  destinationCountry!: string

  @Column({ nullable: true })
  destinationPostalCode!: string

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  destinationLatitude!: number

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  destinationLongitude!: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  distance!: number

  @Column({ length: 10, default: "km" })
  distanceUnit!: string

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  estimatedDuration!: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalWeight!: number

  @Column({ length: 10, default: "kg" })
  weightUnit!: string

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalVolume!: number

  @Column({ length: 10, default: "m3" })
  volumeUnit!: string

  @Column({ nullable: true })
  cargoDescription!: string

  @Column({ type: "simple-array", nullable: true })
  cargoTypes!: string[]

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalCost!: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalRevenue!: number

  @Column({ length: 3, default: "USD" })
  currency!: string

  @Column({ nullable: true })
  notes!: string

  @Column({ default: false })
  isHazardous!: boolean

  @Column({ default: false })
  requiresRefrigeration!: boolean

  @Column({ default: false })
  isHighValue!: boolean

  @Column({ default: false })
  isRushDelivery!: boolean

  @ManyToOne(
    () => Company,
    (company) => company.trips
  )
  @JoinColumn({ name: "companyId" })
  company!: Company

  @Column()
  companyId!: string

  @ManyToOne(
    () => Client,
    (client) => client.trips
  )
  @JoinColumn({ name: "clientId" })
  client!: Client

  @Column()
  clientId!: string

  @ManyToOne(
    () => User,
    (user) => user.createdTrips
  )
  @JoinColumn({ name: "createdById" })
  createdBy!: User

  @Column()
  createdById!: string

  @ManyToOne(
    () => User,
    (user) => user.assignedTrips,
    { nullable: true }
  )
  @JoinColumn({ name: "assignedToId" })
  assignedTo!: User

  @Column({ nullable: true })
  assignedToId!: string

  @ManyToOne(
    () => Vehicle,
    (vehicle) => vehicle.trips,
    { nullable: true }
  )
  @JoinColumn({ name: "vehicleId" })
  vehicle!: Vehicle

  @Column({ nullable: true })
  vehicleId!: string

  @ManyToOne(
    () => Driver,
    (driver) => driver.trips,
    { nullable: true }
  )
  @JoinColumn({ name: "driverId" })
  driver!: Driver

  @Column({ nullable: true })
  driverId!: string

  @OneToMany(
    () => Invoice,
    (invoice) => invoice.trip
  )
  invoices!: Invoice[]

  @OneToMany(
    () => TripEvent,
    (event) => event.trip
  )
  events!: TripEvent[]

  @OneToMany(
    () => TripExpense,
    (expense) => expense.trip
  )
  expenses!: TripExpense[]

  @ManyToMany(() => Document)
  @JoinTable({
    name: "trip_documents",
    joinColumn: { name: "tripId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "documentId", referencedColumnName: "id" },
  })
  documents!: Document[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
