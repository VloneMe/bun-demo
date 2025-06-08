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

export enum DriverStatus {
  ACTIVE = "active",
  ON_TRIP = "on_trip",
  OFF_DUTY = "off_duty",
  INACTIVE = "inactive",
}

@Entity("drivers")
@Index(["licenseNumber", "companyId"], { unique: true })
export class Driver {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  firstName!: string

  @Column({ length: 100 })
  lastName!: string

  @Column({ nullable: true })
  email!: string

  @Column()
  phoneNumber!: string

  @Column({ nullable: true })
  emergencyContact!: string

  @Column({ nullable: true })
  emergencyContactPhone!: string

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

  @Column()
  licenseNumber!: string

  @Column({ type: "date" })
  licenseExpiryDate!: Date

  @Column({ nullable: true })
  licenseClass!: string

  @Column({ nullable: true })
  licenseCountry!: string

  @Column({ type: "enum", enum: DriverStatus, default: DriverStatus.ACTIVE })
  status!: DriverStatus

  @Column({ nullable: true })
  photo!: string

  @Column({ type: "date", nullable: true })
  dateOfBirth!: Date

  @Column({ nullable: true })
  nationality!: string

  @Column({ type: "date", nullable: true })
  hireDate!: Date

  @Column({ nullable: true })
  notes!: string

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalTrips!: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalDistance!: number

  @Column({ length: 10, default: "km" })
  distanceUnit!: string

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  rating!: number

  @ManyToOne(
    () => Company,
    (company) => company.drivers
  )
  @JoinColumn({ name: "companyId" })
  company!: Company

  @Column()
  companyId!: string

  @ManyToOne(
    () => User,
    (user) => user.managedDrivers,
    { nullable: true }
  )
  @JoinColumn({ name: "managerId" })
  manager!: User

  @Column({ nullable: true })
  managerId!: string

  @OneToMany(
    () => Trip,
    (trip) => trip.driver
  )
  trips!: Trip[]

  @ManyToMany(() => Document)
  @JoinTable({
    name: "driver_documents",
    joinColumn: { name: "driverId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "documentId", referencedColumnName: "id" },
  })
  documents!: Document[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
