import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { FaqCategoryEntity } from './faq-category.entity';

@Entity('faq_items')
export class FaqItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    question: string;

    @Column({ type: 'text' })
    answer: string;

    @ManyToOne(() => FaqCategoryEntity, (category) => category.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoryId' })
    category: FaqCategoryEntity;

    @Column({ type: 'uuid' })
    categoryId: string;

    @Column({ type: 'int', default: 0 })
    order: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
