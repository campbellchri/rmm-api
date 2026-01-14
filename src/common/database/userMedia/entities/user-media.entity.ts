import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';
import { MEDIA_TYPES, MediaTypes } from 'src/userMedia/enums/media.enum';
import { MEDIA_CATEGORIES, MediaCategories } from 'src/userMedia/enums/media-category.enum';
import { MemorialEntity } from '../../memorials/entities/memeorial.entity';

@Entity('user_media')
export class UserMediaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    mimeType: string;

    @Column()
    fileURL: string;

    @Column({ nullable: true })
    fileId: string;

    @Column({
        type: 'enum',
        enum: MEDIA_TYPES,
    })
    type: MediaTypes;

    @Column({
        type: 'enum',
        enum: MEDIA_CATEGORIES,
        nullable: true,
    })
    category: MediaCategories; // 'profile', 'featured', 'gallery', 'life_story_image'

    @Column()
    memorialId: string; // Link to memorial

    @Column()
    userId: string; // User who uploaded

    @Column({ type: 'text', nullable: true })
    photoCaption: string;

    @Column({ type: 'text', nullable: true })
    photoDescription: string; // For photo descriptions

    @Column({ type: 'text', nullable: true })
    videoTitle: string; // For video titles

    @Column({ type: 'text', nullable: true })
    videoDescription: string; // For video descriptions

    @Column({ default: false })
    isMainVideo: boolean; // Mark if this is the main video for Event/Video mode

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: 0 })
    sortOrder: number; // For gallery ordering

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne(() => MemorialEntity, (memorial) => memorial.media)
    @JoinColumn({ name: 'memorialId' })
    memorial: MemorialEntity;

    @ManyToOne(() => UserEntity, (user) => user.uploadedMedia)
    @JoinColumn({ name: 'userId' })
    uploader: UserEntity;
}
