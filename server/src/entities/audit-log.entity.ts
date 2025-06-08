import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm"

@Entity("audit_logs")
@Index(["entityType", "entityId"])
@Index(["action", "timestamp"])
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  action!: string

  @Column()
  entityType!: string

  @Column()
  entityId!: string

  @Column({ type: "simple-json" })
  oldValues!: Record<string, any>

  @Column({ type: "simple-json" })
  newValues!: Record<string, any>

  @Column()
  userId!: string

  @Column({ nullable: true })
  userIp!: string

  @Column({ nullable: true })
  userAgent!: string

  @Column({ type: "timestamp" })
  timestamp!: Date

  @CreateDateColumn()
  createdAt!: Date
}
