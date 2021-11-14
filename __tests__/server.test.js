'use strict';
//---------------------------------------------------------------------------------------
const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
const { db } = require('../src/models/index');
//---------------------------------------------------------------------------------------
beforeAll(async () => {
  await db.sync();
});
//---------------------------------------------------------------------------------------
afterAll(async () => {
  await db.drop();
});
//---------------------------------------------------------------------------------------
describe('TEST ALL', () => {
//---------------------------------------------------------------------------------------
it('Should respond with 404 status on an invalid method', async () => {
    const response = await mockRequest.get('/singin');
    expect(response.status).toBe(404);
});
//---------------------------------------------------------------------------------------
it('should respond with 403 on an error', async () => {
    const response = await mockRequest.post('/signup').send({
      test: "amr",
      test: "123"
    });;
    expect(response.status).toBe(403);
});

it('SignUp test', async () => {
    const user = await mockRequest.post('/signup').send({
      username: "amr",
      password: "123"
    });
    expect(user.status).toEqual(201);
});
//---------------------------------------------------------------------------------------
it('SignIn', async () => {
    const user = await mockRequest.post('/signin').auth('amr', '123');
    expect(user.status).toEqual(200);
});
//---------------------------------------------------------------------------------------

it(' MiddleWare response with error', async () => {
    const user = await mockRequest.post('/signin').auth( '321');
    expect(user.status).toEqual(403);
});
//---------------------------------------------------------------------------------------
it('SignUp , SignIn', async () => {
    const Obj = await mockRequest.post('/signup').send({
      username: 'amr',
      password: '123'
    });
//---------------------------------------------------------------------------------------
    const user = await mockRequest.post('/signin').auth( 'amr','123');
    expect(user.status).toEqual(200);
  })
//---------------------------------------------------------------------------------------
})

