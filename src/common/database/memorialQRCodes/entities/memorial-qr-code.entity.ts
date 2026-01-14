import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MemorialEntity } from '../../memorials/entities/memeorial.entity';

@Entity('memorial_qr_codes')
export class MemorialQRCodeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    memorialId: string;

    @Column({ type: 'text', nullable: true })
    qrCodeData: string; // The data encoded in the QR code (usually the page URL)

    @Column({ nullable: true })
    qrCodeImageURL: string; // URL to the QR code image file

    @Column({ nullable: true })
    qrCodeImageId: string; // ID of the QR code image file

    @Column({ type: 'text', nullable: true })
    description: string; // Optional description for the QR code

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne(() => MemorialEntity, memorial => memorial.qrCodes)
    @JoinColumn({ name: 'memorialId' })
    memorial: MemorialEntity;
}
