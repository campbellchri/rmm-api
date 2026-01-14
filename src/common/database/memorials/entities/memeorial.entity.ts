import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { LandingModeEntity } from "../../landingMode/entities/landing-mode.entity";
import { UserMediaEntity } from "../../userMedia/entities/user-media.entity";
import { UserTributeEntity } from "../../userTributes/entities/user-tributes.entity";
import { TemplateEntity } from "../../templates/entities/templates.entity";
import { MemorialSayingEntity } from "../../memorialSayings/entities/memorial-sayings.entity";
import { MemorialQRCodeEntity } from "../../memorialQRCodes/entities/memorial-qr-code.entity";
import { GENDERS, Genders } from "src/memorials/enums/gender.enum";
import { PUBLISH_STATUSES, PublishStatuses } from "src/memorials/enums/publish-status.enum";

@Entity('memorials')
export class MemorialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    description: string; // Memorial description

    @Column({ type: 'text', nullable: true })
    favSaying: string; // Legacy field, kept for backward compatibility

    @Column()
    creatorId: string;

    @Column()
    landingModeId: string; // 'full-memorial', 'video-only', 'event-mode'

    @Column()
    templateId: string;

    // Person Details (for Full Memorial & Video Only modes)
    @Column({ nullable: true })
    personName: string;

    @Column({ nullable: true })
    personGender: Genders; // Gender of the deceased

    @Column({ nullable: true })
    personBirthDate: Date;

    @Column({ nullable: true })
    personDeathDate: Date;

    @Column({ nullable: true })
    personProfilePicture: string;

    @Column({ nullable: true })
    profilePictureId: string;

    @Column({ type: 'text', nullable: true })
    favQuote: string; // Main quote

    // Featured Photo (separate from profile picture)
    @Column({ nullable: true })
    featuredPhotoId: string;

    @Column({ nullable: true })
    featuredPhotoURL: string;

    // Life Story
    @Column({ type: 'text', nullable: true })
    lifeStoryText: string; // Life story content

    @Column({ nullable: true })
    lifeStoryImageId: string;

    @Column({ nullable: true })
    lifeStoryImageURL: string;

    // Publish Status
    @Column({
        type: 'enum',
        enum: PUBLISH_STATUSES,
        default: PUBLISH_STATUSES.DRAFT,
    })
    publishStatus: PublishStatuses;

    // Event Details (for Event Mode)
    @Column({ nullable: true })
    eventStart: Date; // Start Date & Time

    @Column({ nullable: true })
    eventDuration: string; // '48h', '24h', '72h', etc.

    @Column({ default: false })
    autoRevertToFullMode: boolean; // Auto revert after event ends


    @Column({ unique: true, nullable: true })
    slug: string; // URL slug for memorial

    @Column({ nullable: true })
    pageURL: string; // Full URL to the memorial page (e.g., https://rememberme.com/memorial/john-doe)


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne(() => UserEntity, user => user.createdMemorials)
    @JoinColumn({ name: 'creatorId' })
    creator: UserEntity;

    @ManyToOne(() => LandingModeEntity, landingMode => landingMode.memorials)
    @JoinColumn({ name: 'landingModeId' })
    landingMode: LandingModeEntity;

    @ManyToOne(() => TemplateEntity, template => template.memorials)
    @JoinColumn({ name: 'templateId' })
    template: TemplateEntity;

    @OneToMany(() => UserMediaEntity, media => media.memorial)
    media: UserMediaEntity[];

    @OneToMany(() => UserTributeEntity, tribute => tribute.memorial)
    tributes: UserTributeEntity[];

    @OneToMany(() => MemorialSayingEntity, saying => saying.memorial)
    sayings: MemorialSayingEntity[];

    @OneToMany(() => MemorialQRCodeEntity, qrCode => qrCode.memorial)
    qrCodes: MemorialQRCodeEntity[];

}