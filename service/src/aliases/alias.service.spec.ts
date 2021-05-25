import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alias } from './alias.entity';
import { AliasService } from './alias.service';

const testUrl1 = 'https://google.com';
const testUrl2 = 'https://stord.com';

const decryptedIdNA = 1;

const decryptedId1 = 337;
const decryptedId2 = 338;
const oneAlias = new Alias(testUrl1);
const twoAlias = new Alias(testUrl2);

const arrayOfAliases = [
  new Alias(testUrl1),
  new Alias('https://news.ycombinator.com'),
];

const encrpytedKey1 = '5d94c3';
const encrpytedKey2 = '5d94cc';
const fakeEncrpytedKey3 = '3cf01923ufjalkfjvf0912740374717437*a';

describe('CatService', () => {
  let service: AliasService;
  let repo: Repository<Alias>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AliasService,
        {
          provide: getRepositoryToken(Alias),
          // define all the methods that you use from the catRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            find: jest.fn().mockResolvedValue(arrayOfAliases),
            findOne: jest.fn().mockResolvedValue(oneAlias),
            create: jest.fn().mockReturnValue(oneAlias),
            save: jest.fn().mockReturnValue(oneAlias),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<AliasService>(AliasService);
    repo = module.get<Repository<Alias>>(getRepositoryToken(Alias));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOne', () => {
    it('should get one alias', async () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      expect(await service.findOne(encrpytedKey1));
      expect(repoSpy).toBeCalledWith(decryptedId1);
      expect(repo.findOne).toBeCalledTimes(1);
    });
  });

  describe('getOne', () => {
    it('throw exception on error', async () => {
      expect(await service.findOne(fakeEncrpytedKey3)).rejects;
    });
  });

  describe('insertOne', () => {
    it('should successfully insert an alias', async () => {
      expect(await service.create({ fullUrl: testUrl2 })).resolves;
    });
  });

  describe('insertOne', () => {
    it('should fail to insert an alias if a fullUrl is not provided', async () => {
      expect(await service.create({ fullUrl: '' })).rejects;
    });
  });
});
