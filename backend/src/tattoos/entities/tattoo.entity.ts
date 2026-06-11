import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tattoos')
export class Tattoo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  style: string;

  @Column()
  image_url: string;

  @CreateDateColumn()
  created_at: Date;
}
