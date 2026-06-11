import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Admin } from './admin.entity';

@Entity('access_logs')
export class AccessLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Admin, { nullable: true })
  user: Admin;

  @Column({ nullable: true })
  email: string;

  @Column()
  ip: string;

  @Column()
  event: string; // 'login', 'logout', 'failed_login'

  @Column()
  browser: string;

  @CreateDateColumn()
  timestamp: Date;
}
