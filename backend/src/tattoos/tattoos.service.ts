import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tattoo } from './entities/tattoo.entity';
import { CreateTattooDto } from './dto/create-tattoo.dto';
import { UpdateTattooDto } from './dto/update-tattoo.dto';
import { AccessLog } from '../auth/entities/access-log.entity';

@Injectable()
export class TattoosService {
  constructor(
    @InjectRepository(Tattoo)
    private readonly tattooRepository: Repository<Tattoo>,
    @InjectRepository(AccessLog)
    private readonly accessLogRepository: Repository<AccessLog>,
  ) {}

  async create(createTattooDto: CreateTattooDto, ip: string = 'unknown') {
    const tattoo = this.tattooRepository.create(createTattooDto);
    const saved = await this.tattooRepository.save(tattoo);
    
    await this.accessLogRepository.save({
      email: `GALLERY: Added "${saved.title}"`,
      ip,
      event: 'gallery_add',
      browser: 'Dashboard/Gallery',
    });

    return saved;
  }

  async findAll() {
    return this.tattooRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const tattoo = await this.tattooRepository.findOneBy({ id });
    if (!tattoo) throw new NotFoundException(`Tattoo #${id} not found`);
    return tattoo;
  }

  async update(id: number, updateTattooDto: UpdateTattooDto, ip: string = 'unknown') {
    const tattoo = await this.findOne(id);
    Object.assign(tattoo, updateTattooDto);
    const updated = await this.tattooRepository.save(tattoo);

    await this.accessLogRepository.save({
      email: `GALLERY: Updated "${updated.title}"`,
      ip,
      event: 'gallery_update',
      browser: 'Dashboard/Gallery',
    });

    return updated;
  }

  async remove(id: number, ip: string = 'unknown') {
    const tattoo = await this.findOne(id);
    await this.tattooRepository.softRemove(tattoo);

    await this.accessLogRepository.save({
      email: `GALLERY: Deleted (Soft) "${tattoo.title}"`,
      ip,
      event: 'gallery_delete',
      browser: 'Dashboard/Gallery',
    });

    return { deleted: true };
  }
}
