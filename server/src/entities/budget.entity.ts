import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm"
import { Company } from "./company.entity"
import { BudgetCategory } from "./budget-category.entity"
import { BudgetAlert } from "./budget-alert.entity"

export enum BudgetPeriod {
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  ANNUAL = "annual",
  CUSTOM = "custom",
}

@Entity("budgets")
export class Budget {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  name!: string

  @Column({ nullable: true })
  description!: string

  @Column({ type: "enum", enum: BudgetPeriod })
  period!: BudgetPeriod

  @Column({ type: "date" })
  startDate!: Date

  @Column({ type: "date" })
  endDate!: Date

  @Column({ type: "decimal", precision: 15, scale: 2 })
  totalAmount!: number

  @Column({ type: "decimal", precision: 15, scale: 2, default: 0 })
  spentAmount!: number

  @Column({ length: 3, default: "USD" })
  currency!: string

  @Column({ default: true })
  isActive!: boolean

  @ManyToOne(() => Company)
  @JoinColumn({ name: "companyId" })
  company!: Company

  @Column()
  companyId!: string

  @OneToMany(
    () => BudgetCategory,
    (category) => category.budget
  )
  categories!: BudgetCategory[]

  @OneToMany(
    () => BudgetAlert,
    (alert) => alert.budget
  )
  alerts!: BudgetAlert[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
