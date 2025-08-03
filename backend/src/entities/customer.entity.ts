import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Order } from "./order.entity";
import { CustomersRnvpType } from "./customers-rnvp-type.entity";
import { CustomersMarkedType } from "./customers-marked-type.entity";

@Entity("customers")
export class Customer {
  @PrimaryColumn({ type: "bigint" })
  siteId: number;

  @PrimaryColumn({ type: "bigint" })
  customerId: number;

  @Column({ type: "text", nullable: true })
  gender: string;

  @Column({ type: "text", nullable: true })
  firstName: string;

  @Column({ type: "text", nullable: true })
  lastName: string;

  // Dirección de facturación
  @Column({ type: "text", nullable: true })
  billingGender: string;

  @Column({ type: "text", nullable: true })
  billingFirstName: string;

  @Column({ type: "text", nullable: true })
  billingLastName: string;

  @Column({ type: "text", nullable: true })
  billingAddressLine1: string;

  @Column({ type: "text", nullable: true })
  billingAddressLine2: string;

  @Column({ type: "text", nullable: true })
  billingAddressLine3: string;

  @Column({ type: "text", nullable: true })
  billingAddressLine4: string;

  @Column({ type: "text", nullable: true })
  billingAddressCp: string;

  @Column({ type: "text", nullable: true })
  billingAddressCity: string;

  @Column({ type: "text", nullable: true })
  billingMobilePhone: string;

  // Dirección de envío
  @Column({ type: "text", nullable: true })
  shippingGender: string;

  @Column({ type: "text", nullable: true })
  shippingFirstName: string;

  @Column({ type: "text", nullable: true })
  shippingLastName: string;

  @Column({ type: "text", nullable: true })
  shippingAddressLine1: string;

  @Column({ type: "text", nullable: true })
  shippingAddressLine2: string;

  @Column({ type: "text", nullable: true })
  shippingAddressLine3: string;

  @Column({ type: "text", nullable: true })
  shippingAddressLine4: string;

  @Column({ type: "text", nullable: true })
  shippingAddressCp: string;

  @Column({ type: "text", nullable: true })
  shippingAddressCity: string;

  @Column({ type: "text", nullable: true })
  shippingMobilePhone: string;

  @Column({ type: "text", nullable: true })
  phone: string;

  @Column({ type: "date", nullable: true })
  birthDate: Date;

  @Column({ type: "text", nullable: true })
  npai: string;

  @Column({ type: "text", nullable: true })
  rfm: string;

  @Column({ type: "text", nullable: true })
  creditRisk: string;

  @Column({ type: "text", nullable: true })
  sourceOrigin: string;

  @Column({ type: "boolean", default: false })
  isUnderGuardianship: boolean;

  @Column({ type: "boolean", default: false })
  isDeceased: boolean;

  @Column({ type: "boolean", default: false })
  doNotContact: boolean;

  @Column({ type: "int", nullable: true })
  rnvpTypeId: number;

  @Column({ type: "int", nullable: true })
  markedTypeId: number;

  @Column({ type: "text", nullable: true })
  email: string;

  @Column({ type: "boolean", default: false })
  privileged: boolean;

  @Column({ type: "date", nullable: true })
  privilegedDate: Date;

  @Column({ type: "text", nullable: true })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "text", nullable: true })
  modifiedBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  modifiedAt: Date;

  // Relaciones

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @ManyToOne(() => CustomersRnvpType)
  @JoinColumn({ name: "rnvpTypeId", referencedColumnName: "rnvpTypeId" })
  rnvpType: CustomersRnvpType;

  @ManyToOne(() => CustomersMarkedType)
  @JoinColumn({ name: "markedTypeId", referencedColumnName: "markedTypeId" })
  markedType: CustomersMarkedType;
}
