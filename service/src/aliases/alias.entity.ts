import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alias {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fullUrl: string;

  constructor(fullUrl: string) {
    this.fullUrl = fullUrl;
  }
}
