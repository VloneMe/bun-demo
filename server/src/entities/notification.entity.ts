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

export enum NotificationType {
  SYSTEM = "system",
  TRIP = "trip",
  INVOICE = "invoice",
  PAYMENT = "payment",
  MAINTENANCE = "maintenance",
  DOCUMENT = "document",
  CLIENT = "client",
  FINANCE = "finance",
  OTHER = "other",
}

export enum NotificationPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

@Entity("notifications")
@Index(["userId", "isRead"])
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "enum", enum: NotificationType })
  type!: NotificationType

  @Column()
  title!: string

  @Column({ type: "text" })
  message!: string

  @Column({ nullable: true })
  link!: string

  @Column({ type: "enum", enum: NotificationPriority, default: NotificationPriority.MEDIUM })
  priority!: NotificationPriority

  @Column({ default: false })
  isRead!: boolean

  @Column({ nullable: true })
  icon!: string

  @Column({ nullable: true })
  actionText!: string

  @ManyToOne(
    () => User,
    (user) => user.notifications
  )
  @JoinColumn({ name: "userId" })
  user!: User

  @Column()
  userId!: string

  @Column({ nullable: true })
  relatedEntityId!: string

  @Column({ nullable: true })
  relatedEntityType!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
