import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  var id;
  var url;

  var id2;
  var url2;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) returns 404 if no url id in path', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  it('/ (POST) with no body', async () => {
    const res: request.Response = await request(app.getHttpServer())
      .post('/')
      .expect('{"error":"A fullUrl is required in your request body."}');
  });

  it('/ (POST) fails to post with a invalid url', async () => {
    const res: request.Response = await request(app.getHttpServer())
      .post('/')
      .set('Accept', 'application/json')
      .send({ fullUrl: 'asdf.com' })
      .expect('{"error":"A fullUrl is required in your request body."}');
  });

  it('/ (POST) fails to post with a invalid url starting with http', async () => {
    const res: request.Response = await request(app.getHttpServer())
      .post('/')
      .set('Accept', 'application/json')
      .send({ fullUrl: 'httpasdf.com' })
      .expect('{"error":"A fullUrl is required in your request body."}');
  });

  it('/ (POST) with a valid body', async () => {
    const res: request.Response = await request(app.getHttpServer())
      .post('/')
      .set('Accept', 'application/json')
      .send({ fullUrl: 'https://stord.com' })
      .expect(HttpStatus.CREATED);
    id = res.body.id;
    url = res.body.fullUrl;
  });

  it('/ (GET) returns just created alias', async () => {
    return await request(app.getHttpServer())
      .get(`/${id}`)
      .expect(`Found. Redirecting to ${url}`);
  });

  it('/ (POST) with a second valid body', async () => {
    const res: request.Response = await request(app.getHttpServer())
      .post('/')
      .set('Accept', 'application/json')
      .send({ fullUrl: 'https://google.com' })
      .expect(HttpStatus.CREATED);
    id2 = res.body.id;
    url2 = res.body.fullUrl;
  });

  it('/ (GET) returns just created alias', async () => {
    return await request(app.getHttpServer())
      .get(`/${id2}`)
      .expect(`Found. Redirecting to ${url2}`);
  });

  it('/ (GET) can still return first created alias', async () => {
    return await request(app.getHttpServer())
      .get(`/${id}`)
      .expect(`Found. Redirecting to ${url}`);
  });
});
