import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAliasDto } from './dto/create-alias.dto';
import { Alias } from './alias.entity';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};
@Injectable()
export class AliasService {
  constructor(
    @InjectRepository(Alias)
    private readonly repository: Repository<Alias>,
  ) {}

  async genKey() {
    return (await promisify(scrypt)(
      process.env.CRYPTO_SECRET,
      'salt',
      32,
    )) as Buffer;
  }

  async encryptId(recordId) {
    const cipher = createCipheriv(
      'aes-256-ctr',
      await this.genKey(),
      process.env.CRYPTO_IV,
    );
    return Buffer.concat([
      cipher.update(recordId.toString()),
      cipher.final(),
    ]).toString('hex');
  }

  async decryptId(encryptedId) {
    const decipher = createDecipheriv(
      'aes-256-ctr',
      await this.genKey(),
      process.env.CRYPTO_IV,
    );
    const buffer = Buffer.from(encryptedId, 'hex');

    return Number(
      Buffer.concat([decipher.update(buffer), decipher.final()]).toString(),
    );
  }

  async create(createAliasDto: CreateAliasDto) {
    try {
      const url = createAliasDto.fullUrl;

      if (isValidUrl(url) === true) {
        const newAliasRecord = await this.repository.save({
          fullUrl: createAliasDto.fullUrl,
        });

        const encryptedText = await this.encryptId(
          newAliasRecord.id.toString(),
        );

        const response = { ...newAliasRecord, id: encryptedText };

        return response;
      } else {
        return { error: 'Invalid url' };
      }
    } catch (err) {
      return { error: 'A fullUrl is required in your request body.' };
    }
  }

  async findOne(id: string) {
    const record = await this.repository.findOne(await this.decryptId(id));
    delete record.id;
    return record;
  }
}
