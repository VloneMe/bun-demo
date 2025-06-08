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

export enum DocumentType {
  INVOICE = "invoice",
  RECEIPT = "receipt",
  CONTRACT = "contract",
  INSURANCE = "insurance",
  LICENSE = "license",
  REGISTRATION = "registration",
  MAINTENANCE = "maintenance",
  TRIP = "trip",
  COMPLIANCE = "compliance",
  OTHER = "other",
}

@Entity("documents")
export class Document {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  name!: string

  @Column({ nullable: true })
  description!: string

  @Column()
  fileUrl!: string

  @Column({ nullable: true })
  fileSize!: number

  @Column({ nullable: true })
  fileType!: string

  @Column({ type: "enum", enum: DocumentType })
  documentType!: DocumentType

  @Column({ nullable: true })
  tags!: string

  @Column({ type: "date", nullable: true })
  expiryDate!: Date

  @ManyToOne(
    () => User,
    (user) => user.uploadedDocuments
  )
  @JoinColumn({ name: "uploadedById" })
  uploadedBy!: User

  @Column()
  uploadedById!: string

  @ManyToOne(
    () => Company,
    (company) => company.documents
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
