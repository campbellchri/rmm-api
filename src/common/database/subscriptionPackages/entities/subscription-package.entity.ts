import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PRICE_UNITS, PriceUnits } from 'src/subscriptionPackages/enums/price-unit.enum';
import { STORAGE_UNITS, StorageUnits } from 'src/subscriptionPackages/enums/storage-unit.enum';

@Entity('subscription_packages')
export class SubscriptionPackageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    packageName: string; // e.g., "Essential Tribute", "Premium Legacy", "Eternal Archive"

    @Column({ nullable: true })
    iconId: string; // Identifier for the icon

    @Column({ nullable: true })
    iconURL: string; // URL to the icon

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number; // e.g., 5, 15, 25

    @Column({
        type: 'enum',
        enum: PRICE_UNITS,
        default: PRICE_UNITS.MONTH,
    })
    priceUnit: PriceUnits; // 'month' or 'year'

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    storageAmount: number; // e.g., 5, 15, 30

    @Column({
        type: 'enum',
        enum: STORAGE_UNITS,
        default: STORAGE_UNITS.GB,
    })
    storageUnit: StorageUnits; // 'GB' or 'TB'

    @Column({ type: 'text', array: true, default: [] })
    features: string[]; // Array of feature strings

    @Column({ default: true })
    isActive: boolean; // Enable/disable package

    @Column({ default: 0 })
    sortOrder: number; // For ordering packages

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
