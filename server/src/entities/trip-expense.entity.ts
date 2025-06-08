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

export enum ExpenseType {
  FUEL = "fuel",
  TOLL = "toll",
  MAINTENANCE = "maintenance",
  PARKING = "parking",
  FOOD = "food",
  ACCOMMODATION = "accommodation",
  OTHER = "other",
}

export enum ExpenseStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  REIMBURSED = "reimbursed",
}

@Entity("trip_expenses")
@Index(["tripId", "date"])
export class TripExpense {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "enum", enum: ExpenseType })
  type!: ExpenseType

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number

  @Column({ length: 3, default: "USD" })
  currency!: string

  @Column({ type: "date" })
  date!: Date

  @Column({ nullable: true })
  description!: string

  @Column({ nullable: true })
  receiptImage!: string

  @Column({ type: "enum", enum: ExpenseStatus, default: ExpenseStatus.PENDING })
  status!: ExpenseStatus

  @ManyToOne(
    () => Trip,
    (trip) => trip.expenses
  )
  @JoinColumn({ name: "tripId" })
  trip!: Trip

  @Column()
  tripId!: string

  @ManyToOne(() => User)
  @JoinColumn({ name: "submittedById" })
  submittedBy!: User

  @Column()
  submittedById!: string

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "approvedById" })
  approvedBy!: User

  @Column({ nullable: true })
  approvedById!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
