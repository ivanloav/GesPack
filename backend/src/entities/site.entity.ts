import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("sites")
export class Site {
  @PrimaryGeneratedColumn({ type: "bigint" })
  siteId: number;

  @Column({ type: "text", unique: true })
  siteName: string;

  @Column({ type: "text", nullable: true })
  siteDescription: string;

  @Column({ type: "text", nullable: true })
  contactInfo: string;

  @Column({ type: "boolean", default: false })
  isActive: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
