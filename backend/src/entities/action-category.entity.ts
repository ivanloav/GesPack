import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("actions_categories")
export class ActionCategory {
  @PrimaryColumn({ type: "bigint" })
  siteId: number;

  @PrimaryColumn({ type: "bigint" })
  actionCategoryId: number;

  @Column({ type: "text" })
  categoryName: string;

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
