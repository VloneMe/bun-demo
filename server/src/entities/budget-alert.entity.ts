import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Budget } from "./budget.entity"

export enum AlertType {
  PERCENTAGE = "percentage",
  AMOUNT = "amount",
}

@Entity("budget_alerts")
export class BudgetAlert {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  name!: string

  @Column({ type: "enum", enum: AlertType })
  type!: AlertType

  @Column({ type: "decimal", precision: 5, scale: 2 })
  threshold!: number

  @Column({ default: true })
  isActive!: boolean

  @Column({ default: false })
  isTriggered!: boolean

  @Column({ nullable: true })
  lastTriggeredAt!: Date

  @ManyToOne(
    () => Budget,
    (budget) => budget.alerts
  )
  @JoinColumn({ name: "budgetId" })
  budget!: Budget

  @Column()
  budgetId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
