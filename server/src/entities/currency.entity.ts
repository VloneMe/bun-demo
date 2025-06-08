import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("currencies")
export class Currency {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 3, unique: true })
  code!: string

  @Column()
  name!: string

  @Column()
  symbol!: string

  @Column({ type: "decimal", precision: 15, scale: 6, default: 1 })
  exchangeRate!: number

  @Column({ default: false })
  isBaseCurrency!: boolean

  @Column({ default: true })
  isActive!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
