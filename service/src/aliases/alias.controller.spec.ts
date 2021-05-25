import { Test, TestingModule } from '@nestjs/testing';
import { AliasController } from './alias.controller';
import { CreateAliasDto } from './dto/create-alias.dto';
import { AliasService } from './alias.service';

const fullUrlResponse = 'http://news.ycombinator.com/';
const encryptedId = '5d97c0';

describe('Alias Controller', () => {
  let controller: AliasController;
  let service: AliasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AliasController],
      providers: [
        AliasService,
        {
          provide: AliasService,
          useValue: {
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                fullUrl: fullUrlResponse,
                id: id,
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((newAlias: CreateAliasDto) =>
                Promise.resolve({ id: encryptedId, ...newAlias }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<AliasController>(AliasController);
    service = module.get<AliasService>(AliasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find one invalid', () => {
    it('should return an error if no id is provided', async () => {
      expect(await controller.findOne('')).toEqual({
        error: 'Not Found',
      });
    });
  });

  describe('create one valid', () => {
    it('should create a new alias', async () => {
      expect(await controller.create({ fullUrl: fullUrlResponse })).toEqual({
        fullUrl: fullUrlResponse,
        id: encryptedId,
      });
    });
  });

  describe('create one invalid', () => {
    it('should return an error if no id is provided', async () => {
      expect(await controller.create({ fullUrl: undefined })).toEqual({
        error: 'A fullUrl is required in your request body.',
      });
    });
  });
});
