import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MemorialEntity } from '../../memorials/entities/memeorial.entity';
import { TemplateEntity } from '../../templates/entities/templates.entity';
import { LANDING_MODES_TYPES, LandingModeTypes } from 'src/landingMode/enums/landing-mode.enum';

@Entity('landing_modes')
export class LandingModeEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column({ type: 'enum', enum: LANDING_MODES_TYPES })
    landingModeType: LandingModeTypes;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    iconId: string;

    @Column({ nullable: true })
    iconURL: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => TemplateEntity, template => template.landingMode)
    templates: TemplateEntity[];

    @OneToMany(() => MemorialEntity, memorial => memorial.landingMode)
    memorials: MemorialEntity[];
}
