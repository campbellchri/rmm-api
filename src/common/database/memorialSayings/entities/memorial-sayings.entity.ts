import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MemorialEntity } from '../../memorials/entities/memeorial.entity';

@Entity('memorial_sayings')
export class MemorialSayingEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ nullable: true })
    authorName?: string;

    @Column()
    memorialId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne(() => MemorialEntity, memorial => memorial.sayings)
    @JoinColumn({ name: 'memorialId' })
    memorial: MemorialEntity;
}
