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
import { User } from "./user.entity"
import { Trip } from "./trip.entity"
import { Document } from "./document.entity"
import { Maintenance } from "./maintenance.entity"

export enum VehicleStatus {
  ACTIVE = "active",
  MAINTENANCE = "maintenance",
  INACTIVE = "inactive",
  RETIRED = "retired",
}

export enum FuelType {
  DIESEL = "diesel",
  PETROL = "petrol",
  ELECTRIC = "electric",
  HYBRID = "hybrid",
  CNG = "cng",
  LPG = "lpg",
}

@Entity("vehicles")
@Index(["registrationNumber", "companyId"], { unique: true })
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  registrationNumber!: string

  @Column({ length: 100 })
  make!: string

  @Column({ length: 100 })
  model!: string

  @Column()
  year!: number

  @Column({ length: 100, nullable: true })
  vin!: string

  @Column({ type: "enum", enum: VehicleStatus, default: VehicleStatus.ACTIVE })
  status!: VehicleStatus

  @Column({ type: "enum", enum: FuelType })
  fuelType!: FuelType

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  fuelCapacity!: number

  @Column({ length: 10, default: "L" })
  fuelCapacityUnit!: string

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  fuelEfficiency!: number

  @Column({ length: 20, default: "km/L" })
  fuelEfficiencyUnit!: string

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  odometerReading!: number

  @Column({ length: 10, default: "km" })
  odometerUnit!: string

  @Column({ nullable: true })
  color!: string

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  maxPayload!: number

  @Column({ length: 10, default: "kg" })
  payloadUnit!: string

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  maxVolume!: number

  @Column({ length: 10, default: "m3" })
  volumeUnit!: string

  @Column({ nullable: true })
  dimensions!: string

  @Column({ nullable: true })
  image!: string

  @Column({ nullable: true })
  notes!: string

  @Column({ type: "date", nullable: true })
  insuranceExpiryDate!: Date

  @Column({ type: "date", nullable: true })
  registrationExpiryDate!: Date

  @Column({ type: "date", nullable: true })
  lastMaintenanceDate!: Date

  @Column({ type: "date", nullable: true })
  nextMaintenanceDate!: Date

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  acquisitionCost!: number

  @Column({ length: 3, default: "USD" })
  currency!: string

  @Column({ type: "date", nullable: true })
  acquisitionDate!: Date

  @ManyToOne(
    () => Company,
    (company) => company.vehicles
  )
  @JoinColumn({ name: "companyId" })
  company!: Company

  @Column()
  companyId!: string

  @ManyToOne(
    () => User,
    (user) => user.assignedVehicles,
    { nullable: true }
  )
  @JoinColumn({ name: "assignedToId" })
  assignedTo!: User

  @Column({ nullable: true })
  assignedToId!: string

  @OneToMany(
    () => Trip,
    (trip) => trip.vehicle
  )
  trips!: Trip[]

  @OneToMany(
    () => Maintenance,
    (maintenance) => maintenance.vehicle
  )
  maintenanceRecords!: Maintenance[]

  @ManyToMany(() => Document)
  @JoinTable({
    name: "vehicle_documents",
    joinColumn: { name: "vehicleId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "documentId", referencedColumnName: "id" },
  })
  documents!: Document[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
