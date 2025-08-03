import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("customers_marked_types")
export class CustomersMarkedType {
  @PrimaryGeneratedColumn({ type: "bigint" })
  markedTypeId: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "text", nullable: true })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "text", nullable: true })
  modifiedBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  modifiedAt: Date;
}
