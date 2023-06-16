import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should deny access to endpoint 1 if API Identifier is incorrect', () => {
    return request(app.getHttpServer()).get('/1').expect(403);
  });

  it('should deny access to endpoint 2 if API Identifier is not provided', () => {
    return request(app.getHttpServer()).get('/2').expect(403);
  });

  it('should allow access to endpoint 3 if API Identifier is correct and api-key header is valid', () => {
    return request(app.getHttpServer())
      .get('/3')
      .set('api-key-1', 'rootz491')
      .expect(200);
  });
});
