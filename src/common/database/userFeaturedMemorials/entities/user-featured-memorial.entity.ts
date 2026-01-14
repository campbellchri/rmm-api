import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { MemorialEntity } from '../../memorials/entities/memeorial.entity';

@Entity('user_featured_memorials')
@Unique(['userId', 'memorialId']) // Ensure a user can only feature a memorial once
export class UserFeaturedMemorialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    memorialId: string;

    @Column({ default: true })
    isFeature: boolean; // Track if memorial is currently featured

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => MemorialEntity)
    @JoinColumn({ name: 'memorialId' })
    memorial: MemorialEntity;
}
