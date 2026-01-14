import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';


@Entity('userNotificationSettings')
export class UserNotificationSettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  IsInAppAllowed: boolean;

  @Column({ type: 'boolean', default: false })
  IsEmailAllowed: boolean;

  @Column({ type: 'boolean', default: true })
  IsDesktopNotificationAllowed: boolean;

  @Column({ type: 'boolean', default: false })
  IsUnreadBadgeEnabled: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, user => user.notificationSettings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

