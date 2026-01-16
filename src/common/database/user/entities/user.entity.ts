import { USER_ROLES, UserRoles } from '../../../../users/enums/user-roles.enum';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MemorialEntity } from '../../memorials/entities/memeorial.entity';
import { UserMediaEntity } from '../../userMedia/entities/user-media.entity';
import { UserNotificationSettingsEntity } from '../../userNotificationSettings/entities/user-notification-settings.entity';


@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  callingCode: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ array: true, type: 'enum', enum: USER_ROLES, default: [], nullable: true })
  roles: UserRoles[];

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  photoId: string;

  @Column({ nullable: true })
  photoURL: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  street1: string;

  @Column({ nullable: true })
  street2: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  postal: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  facebookId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => MemorialEntity, memorial => memorial.creator)
  createdMemorials: MemorialEntity[];

  @OneToMany(() => UserMediaEntity, media => media.uploader)
  uploadedMedia: UserMediaEntity[];

  @OneToMany(() => UserNotificationSettingsEntity, (setting) => setting.user)
  notificationSettings?: UserNotificationSettingsEntity[];
}
