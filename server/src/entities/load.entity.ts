import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from "typeorm"
import { User } from "./user.entity"
import { LoadApplication } from "./load-application.entity"

export enum LoadStatus {
  OPEN = "open",
  ASSIGNED = "assigned",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum LoadUrgency {
  NORMAL = "normal",
  URGENT = "urgent",
  CRITICAL = "critical",
}

@Entity("loads")
@Index(["status", "pickupDate"])
@Index(["originCity", "destinationCity"])
export class Load {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  loadNumber!: string

  @Column()
  title!: string

  @Column({ type: "text" })
  description!: string

  @Column({ type: "enum", enum: LoadStatus, default: LoadStatus.OPEN })
  status!: LoadStatus

  @Column({ type: "enum", enum: LoadUrgency, default: LoadUrgency.NORMAL })
  urgency!: LoadUrgency

  @Column({ type: "timestamp" })
  pickupDate!: Date

  @Column({ type: "timestamp" })
  deliveryDate!: Date

  @Column()
  originAddress!: string

  @Column()
  originCity!: string

  @Column({ nullable: true })
  originState!: string

  @Column()
  originCountry!: string

  @Column({ nullable: true })
  originPostalCode!: string

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  originLatitude!: number

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  originLongitude!: number

  @Column()
  destinationAddress!: string

  @Column()
  destinationCity!: string

  @Column({ nullable: true })
  destinationState!: string

  @Column()
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

  @Column({ type: "simple-array" })
  cargoTypes!: string[]

  @Column({ type: "decimal", precision: 10, scale: 2 })
  weight!: number

  @Column({ length: 10, default: "kg" })
  weightUnit!: string

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  volume!: number

  @Column({ length: 10, default: "m3" })
  volumeUnit!: string

  @Column({ type: "simple-array" })
  requiredTruckTypes!: string[]

  @Column({ type: "decimal", precision: 10, scale: 2 })
  rate!: number

  @Column({ length: 3, default: "USD" })
  currency!: string

  @Column({ default: false })
  isHazardous!: boolean

  @Column({ default: false })
  requiresRefrigeration!: boolean

  @Column({ default: false })
  isHighValue!: boolean

  @Column({ default: false })
  isSaved!: boolean

  @Column({ nullable: true })
  notes!: string

  @ManyToOne(
    () => User,
    (user) => user.postedLoads
  )
  @JoinColumn({ name: "postedById" })
  postedBy!: User

  @Column()
  postedById!: string

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "assignedToId" })
  assignedTo!: User

  @Column({ nullable: true })
  assignedToId!: string

  @OneToMany(
    () => LoadApplication,
    (application) => application.load
  )
  applications!: LoadApplication[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
