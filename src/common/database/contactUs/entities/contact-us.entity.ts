import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('contact_us')
export class ContactUsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   

    @Column({ nullable: true })
    addressLine1: string;

    @Column({ nullable: true })
    addressLine2: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    state: string;

    @Column({ nullable: true })
    zipCode: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    emailAddress: string;

    // Social Media URLs
    @Column({ nullable: true })
    facebookUrl: string;

    @Column({ nullable: true })
    instagramUrl: string;

    @Column({ nullable: true })
    twitterUrl: string;

    @Column({ nullable: true })
    linkedinUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
