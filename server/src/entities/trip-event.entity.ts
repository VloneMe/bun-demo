import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm"
import { Trip } from "./trip.entity"
import { User } from "./user.entity"

export enum TripEventType {
  CREATED = "created",
  SCHEDULED = "scheduled",
  DEPARTED = "departed",
  ARRIVED_PICKUP = "arrived_pickup",
  LOADED = "loaded",
  IN_TRANSIT = "in_transit",
  ARRIVED_DELIVERY = "arrived_delivery",
  UNLOADED = "unloaded",
  COMPLETED = "completed",
  DELAYED = "delayed",
  CANCELLED = "cancelled",
  CUSTOM = "custom",
}

@Entity("trip_events")
@Index(["tripId", "timestamp"])
export class TripEvent {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "enum", enum: TripEventType })
  type!: TripEventType

  @Column({ type: "timestamp" })
  timestamp!: Date

  @Column({ nullable: true })
  description!: string

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  latitude!: number

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  longitude!: number

  @Column({ nullable: true })
  location!: string

  @ManyToOne(
    () => Trip,
    (trip) => trip.events
  )
  @JoinColumn({ name: "tripId" })
  trip!: Trip

  @Column()
  tripId!: string

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "recordedById" })
  recordedBy!: User

  @Column({ nullable: true })
  recordedById!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
