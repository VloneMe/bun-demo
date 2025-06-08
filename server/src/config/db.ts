import "reflect-metadata";
import { DataSource } from "typeorm";
import type { EnvConfig } from "./env";
import { logger } from "../utils/logger";
import { User } from "../entities/user.entity";
import { AuditLog } from "../entities/audit-log.entity";
import { BudgetAlert } from "../entities/budget-alert.entity";
import { BudgetCategory } from "../entities/budget-category.entity";
import { Budget } from "../entities/budget.entity";
import { Client } from "../entities/client.entity";
import { CompanySettings } from "../entities/company-settings.entity";
import { Company } from "../entities/company.entity";
import { Contact } from "../entities/contact.entity";
import { Currency } from "../entities/currency.entity";
import { Document } from "../entities/document.entity";
import { Driver } from "../entities/driver.entity";
import { Invoice } from "../entities/invoice.entity";
import { InvoiceItem } from "../entities/invoice-item.entity";
import { LoadApplication } from "../entities/load-application.entity";
import { Load } from "../entities/load.entity";
import { Maintenance } from "../entities/maintenance.entity";
import { Notification } from "../entities/notification.entity";
import { Permission } from "../entities/permission.entity";
import { Report } from "../entities/report.entity";
import { Role } from "../entities/role.entity";
import { Transaction } from "../entities/transaction.entity";
import { TripEvent } from "../entities/trip-event.entity";
import { TripExpense } from "../entities/trip-expense.entity";
import { Trip } from "../entities/trip.entity";
import { Vehicle } from "../entities/vehicle.entity";
import { Wallet } from "../entities/wallet.entity";

export const createDataSource = (config: EnvConfig): DataSource => {
  return new DataSource({
    type: "postgres",
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: config.NODE_ENV !== "production",
    logging: config.NODE_ENV === "development",
    entities: [
      User, AuditLog, BudgetAlert, BudgetCategory, Budget, 
      Client, CompanySettings, Company, Contact, Currency, 
      Document, Driver, Invoice, InvoiceItem, 
      LoadApplication, Load, Maintenance, 
      Notification, Permission, Report, Role, 
      Transaction, TripEvent, TripExpense, Trip, 
      Vehicle, Wallet
    ],
    migrations: [],
    subscribers: [],
    poolSize: 10,
    extra: {
      connectionTimeoutMillis: 2000,
    },
  });
};

export const initializeDB = async (dataSource: DataSource): Promise<void> => {
  try {
    await dataSource.initialize();
    logger.info("✅ Database connected");
  } catch (error) {
    if (error instanceof Error) {
      logger.error("❌ Database connection failed", { 
        error: error.message,
        stack: error.stack 
      });
    } else {
      logger.error("❌ Database connection failed", { 
        error: String(error) 
      });
    }
    process.exit(1);
  }
};