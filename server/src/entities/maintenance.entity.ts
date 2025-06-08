import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Index,
} from "typeorm"
import { Vehicle } from "./vehicle.entity"
import { User } from "./user.entity"
import { Document } from "./document.entity"

export enum MaintenanceType {
  ROUTINE = "routine",
  REPAIR = "repair",
  INSPECTION = "inspection",
  EMERGENCY = "emergency",
}

export enum MaintenanceStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

@Entity("maintenance_records")
@Index(["vehicleId", "date"])
export class Maintenance {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "enum", enum: MaintenanceType })
  type!: MaintenanceType

  @Column({ type: "enum", enum: MaintenanceStatus, default: MaintenanceStatus.SCHEDULED })
  status!: MaintenanceStatus

  @Column({ type: "date" })
  date!: Date

  @Column({ nullable: true })
  description!: string

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  odometerReading!: number

  @Column({ length: 10, default: "km" })
  odometerUnit!: string

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  cost!: number

  @Column({ length: 3, default: "USD" })
  currency!: string

  @Column({ nullable: true })
  serviceProvider!: string

  @Column({ nullable: true })
  serviceProviderContact!: string

  @Column({ nullable: true })
  notes!: string

  @Column({ type: "date", nullable: true })
  nextMaintenanceDate!: Date

  @ManyToOne(
    () => Vehicle,
    (vehicle) => vehicle.maintenanceRecords
  )
  @JoinColumn({ name: "vehicleId" })
  vehicle!: Vehicle

  @Column()
  vehicleId!: string

  @ManyToOne(() => User)
  @JoinColumn({ name: "performedById" })
  performedBy!: User

  @Column()
  performedById!: string

  @ManyToMany(() => Document)
  @JoinTable({
    name: "maintenance_documents",
    joinColumn: { name: "maintenanceId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "documentId", referencedColumnName: "id" },
  })
  documents!: Document[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
