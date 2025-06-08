import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { User } from "./user.entity"
import { Company } from "./company.entity"

export enum ReportType {
  FINANCIAL = "financial",
  OPERATIONAL = "operational",
  PERFORMANCE = "performance",
  CUSTOM = "custom",
}

export enum ReportFormat {
  PDF = "pdf",
  CSV = "csv",
  EXCEL = "excel",
  JSON = "json",
}

@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  name!: string

  @Column({ nullable: true })
  description!: string

  @Column({ type: "enum", enum: ReportType })
  type!: ReportType

  @Column({ type: "simple-json" })
  parameters!: Record<string, any>

  @Column({ type: "simple-json", nullable: true })
  filters!: Record<string, any>

  @Column({ type: "enum", enum: ReportFormat, default: ReportFormat.PDF })
  format!: ReportFormat

  @Column({ nullable: true })
  fileUrl!: string

  @Column({ type: "date", nullable: true })
  startDate!: Date

  @Column({ type: "date", nullable: true })
  endDate!: Date

  @Column({ default: false })
  isScheduled!: boolean

  @Column({ nullable: true })
  scheduleExpression!: string

  @Column({ nullable: true })
  lastRunAt!: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: "createdById" })
  createdBy!: User

  @Column()
  createdById!: string

  @ManyToOne(() => Company)
  @JoinColumn({ name: "companyId" })
  company!: Company

  @Column()
  companyId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
