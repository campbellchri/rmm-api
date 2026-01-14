import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';



@Entity('userQuestionnaire')
export class UserQuestionnaireEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    questionnaire: string;

    @Column({ type: 'varchar', nullable: true })
    iconURL: string;

    @Column({ type: 'varchar', nullable: true })
    iconId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
