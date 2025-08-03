import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm";

@Entity("orders_payments")
export class OrdersPayment {
  @PrimaryGeneratedColumn()
  ordersPaymentsId: number;

  @Column({ type: "bigint" })
  siteId: number;

  @Column({ type: "int" })
  orderId: number;

  @Column({ type: "text" })
  paymentType: string;

  @Column({ type: "text", nullable: true })
  holderName: string;

  @Column({ type: "numeric", precision: 19, scale: 4 })
  amount: number;

  @Column({ type: "text", nullable: true })
  bankName: string;

  @Column({ type: "text", nullable: true })
  chequeNumber: string;

  @Column({ type: "int", nullable: true })
  cardTypeId: number;

  @Column({ type: "bigint", nullable: true })
  cardNumber: number;

  @Column({ type: "varchar", length: 5, nullable: true })
  expirationDate: string;

  @Column({ type: "int", nullable: true })
  securityCode: number;

  @Column({ type: "boolean", default: false })
  isUnpaid: boolean;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  unpaidAmount: number;

  @Column({ type: "date", nullable: true })
  unpaidDate: Date;

  @Column({ type: "boolean", default: false })
  isRecovered: boolean;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  recoveredAmount: number;

  @Column({ type: "date", nullable: true })
  recoveryDate: Date;

  @Column({ type: "boolean", default: false })
  isUncollectible: boolean;

  @Column({ type: "numeric", precision: 19, scale: 4, nullable: true })
  uncollectibleAmount: number;

  @Column({ type: "date", nullable: true })
  uncollectibleDate: Date;

  @Column({ type: "text", nullable: true })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "text", nullable: true })
  modifiedBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  modifiedAt: Date;
} 