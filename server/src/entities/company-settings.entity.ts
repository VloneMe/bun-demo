import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Company } from "./company.entity"

@Entity("company_settings")
export class CompanySettings {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  category!: string

  @Column()
  key!: string

  @Column({ type: "text" })
  value!: string

  @ManyToOne(
    () => Company,
    (company) => company.settings
  )
  @JoinColumn({ name: "companyId" })
  company!: Company

  @Column()
  companyId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
