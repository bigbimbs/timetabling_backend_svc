import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AvailabilityEntity } from './availability.entity';
import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity('venue')
export class VenuesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  name: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  capacity: number;

  @OneToMany(
    () => AvailabilityEntity,
    (availability) => availability.venueAvailability,
    { cascade: true },
  )
  availableDaysAndTimes: AvailabilityEntity[];

  @ManyToOne(() => UserEntity, (user) => user.venues)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
