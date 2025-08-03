import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("actions")
export class Action {
  @PrimaryColumn({ type: "bigint" })
  siteId: number;

  @PrimaryColumn({ type: "bigint" })
  actionId: number;

  @Column({ type: "text" })
  actionName: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "timestamp" })
  launchDate: Date;

  @Column({ type: "bigint" })
  brandId: number;

  @Column({ type: "int", nullable: true })
  actionCategoryId: number;

  @Column({ type: "text", nullable: true })
  catalogCode: string;

  @Column({ type: "text", nullable: true })
  catalogLot: string;

  @Column({ type: "text", nullable: true })
  catalogDescription: string;

  @Column({ type: "int", nullable: true })
  printRun: number;

  @Column({ type: "timestamp" })
  depositDate: Date;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "text", nullable: true })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "text", nullable: true })
  modifiedBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  modifiedAt: Date;
}