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
import { User } from "./user.entity"
import { Load } from "./load.entity"

export enum ApplicationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  WITHDRAWN = "withdrawn",
}

@Entity("load_applications")
@Index(["loadId", "userId"])
export class LoadApplication {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "decimal", precision: 10, scale: 2 })
  bidAmount!: number

  @Column({ length: 3, default: "USD" })
  currency!: string

  @Column()
  vehicleType!: string

  @Column({ type: "text" })
  message!: string

  @Column({ type: "enum", enum: ApplicationStatus, default: ApplicationStatus.PENDING })
  status!: ApplicationStatus

  @Column({ nullable: true })
  notes!: string

  @ManyToOne(
    () => Load,
    (load) => load.applications
  )
  @JoinColumn({ name: "loadId" })
  load!: Load

  @Column()
  loadId!: string

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user!: User

  @Column()
  userId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
