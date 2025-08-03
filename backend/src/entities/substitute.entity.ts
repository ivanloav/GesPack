import {
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    } from "typeorm";
  import { SubstitutesLog } from "./substitutes-log.entity";
  
  @Entity("substitutes")
  export class Substitute {
    @PrimaryColumn({ type: "bigint" })
    siteId: number;
  
    @PrimaryGeneratedColumn({ type: "bigint" })
    substitutesId: number;
  
    @Column({ type: "text", nullable: true })
    refStart: string;
  
    @Column({ type: "text", nullable: true })
    catStart: string;
  
    @Column({ type: "text", nullable: true })
    descStart: string;
  
    @Column({ type: "text", nullable: true })
    refEnd: string;
  
    @Column({ type: "text", nullable: true })
    catEnd: string;
  
    @Column({ type: "text", nullable: true })
    descEnd: string;
  
    @Column({ type: "int", nullable: true })
    maxQuantity: number;
  
    @Column({ type: "int", nullable: true })
    usedQuantity: number;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamp", nullable: true })
    expiresAt: Date;
  
    @Column({ type: "text", nullable: true })
    createdBy: string;
  
    @Column({ type: "timestamp", nullable: true })
    modifiedAt: Date;
  
    @Column({ type: "text", nullable: true })
    modifiedBy: string;
  
    @Column({ type: "boolean", default: false })
    isActive: boolean;

    @OneToMany(() => SubstitutesLog, (log) => log.substitute)
    logs: SubstitutesLog[];

  }
  