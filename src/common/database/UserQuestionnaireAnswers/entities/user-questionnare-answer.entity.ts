import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { UserQuestionnaireEntity } from '../../userQuestionnaire/entities/user-questionnaire.entity';
import { UserAnswersEntity } from '../../userAnswers/entities/user-answers.entity';


@Entity('user_questionnaire_answers')
export class UserQuestionnaireAnswersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => UserQuestionnaireEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'questionnaireId' })
    questionnaire: UserQuestionnaireEntity;

    @ManyToOne(() => UserAnswersEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'answerId' })
    answer: UserAnswersEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
