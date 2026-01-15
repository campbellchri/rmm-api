import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { FaqItemEntity } from './faq-item.entity';

@Entity('faq_categories')
export class FaqCategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar', nullable: true })
    iconURL: string;

    @Column({ type: 'varchar', nullable: true })
    iconId: string;

    @Column({ type: 'int', default: 0 })
    order: number;

    @OneToMany(() => FaqItemEntity, (item) => item.category)
    items: FaqItemEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
