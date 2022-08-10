const server = require('../server.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);


describe('Sauce Endpoints', () => {

    it('GET /api/sauces', async () => {
      const res = await requestWithSupertest.get('/api/sauces');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('hello')
        expect(res.body).toMatchObject({
            hello: 'world'
        });
    });

    it('GET /api/sauces/:id', async () => {
        const res = await requestWithSupertest.get('/api/sauces/62c93487e7a11121502e02fd');
          expect(res.status).toEqual(200);
          expect(res.type).toEqual(expect.stringContaining('json'));
          expect(res.body).toHaveProperty('description')
      });
  
});