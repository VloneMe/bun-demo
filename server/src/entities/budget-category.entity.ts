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

@Entity("budget_categories")
export class BudgetCategory {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  name!: string

  @Column({ nullable: true })
  description!: string

  @Column({ type: "decimal", precision: 15, scale: 2 })
  allocatedAmount!: number

  @Column({ type: "decimal", precision: 15, scale: 2, default: 0 })
  spentAmount!: number

  @ManyToOne(
    () => Budget,
    (budget) => budget.categories
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
