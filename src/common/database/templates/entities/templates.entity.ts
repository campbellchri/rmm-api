import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LandingModeEntity } from "../../landingMode/entities/landing-mode.entity";
import { MemorialEntity } from "../../memorials/entities/memeorial.entity";

@Entity('templates')
export class TemplateEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ nullable: true })
    landingModeId: string;

    @Column({ nullable: true })
    thumbnailURL: string;

    @Column({ nullable: true })
    thumbnailId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne(() => LandingModeEntity, landingMode => landingMode.templates)
    @JoinColumn({ name: 'landingModeId' })
    landingMode: LandingModeEntity;

    @OneToMany(() => MemorialEntity, memorial => memorial.template)
    memorials: MemorialEntity[];
}