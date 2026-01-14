import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MESSAGE_TYPES, MessageTypes } from 'src/complaints/enums/message-type.enum';

@Entity('complaints')
export class ComplaintEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userName: string;

    @Column()
    userEmail: string;

    @Column({ nullable: true })
    userPhoneNumber: string;

    @Column({
        type: 'enum',
        enum: MESSAGE_TYPES,
        default: MESSAGE_TYPES.MESSAGE,
    })
    messageType: MessageTypes;

    @Column({ type: 'text', nullable: true })
    subject: string;

    @Column({ type: 'text' })
    messageContent: string;

    @Column({ nullable: true })
    userId: string; // Optional: link to user if authenticated

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
