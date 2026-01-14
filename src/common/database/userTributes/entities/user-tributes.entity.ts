import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MemorialEntity } from "../../memorials/entities/memeorial.entity";
import { USER_TRIBUTE_TYPES, UserTributeTypes } from "src/userTributes/enums/user-tributes.enum";

@Entity('tributes')
export class UserTributeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    authorName: string;

    @Column({ type: 'text' })
    content: string;

    @Column({
        type: 'enum',
        enum: USER_TRIBUTE_TYPES,
    })
    type: UserTributeTypes;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ nullable: true })
    imageId: string

    @Column({ nullable: true })
    memorialId: string;

    @Column({ nullable: true })
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne(() => MemorialEntity, memorial => memorial.tributes)
    @JoinColumn({ name: 'memorialId' })
    memorial: MemorialEntity;
}