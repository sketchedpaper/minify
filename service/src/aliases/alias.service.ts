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

  iv = process.env.CRYPTO_IV;

  secret = process.env.CRYPTO_SECRET;

  async genKey() {
    return (await promisify(scrypt)(this.secret, 'salt', 32)) as Buffer;
  }

  async getCipher() {
    return createCipheriv('aes-256-ctr', await this.genKey(), this.iv);
  }

  async getDecipher() {
    return createDecipheriv('aes-256-ctr', await this.genKey(), this.iv);
  }

  async encryptId(recordId) {
    const cipher = await this.getCipher();
    const encryptedText = Buffer.concat([
      cipher.update(recordId.toString()),
      cipher.final(),
    ]);
    return encryptedText.toString('hex');
  }

  async decryptId(encryptedId) {
    const decipher = await this.getDecipher();
    const buffer = Buffer.from(encryptedId, 'hex');

    const decryptedText = Buffer.concat([
      decipher.update(buffer),
      decipher.final(),
    ]);

    return Number(decryptedText.toString());
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
