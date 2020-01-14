/**
 * Created by 清辉 on 2020/1/14 16:49
 */

import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';


describe('test/app/controller/home.test.ts', () => {


  it('should get correct params', async () => {
    const result = await app.httpRequest()
      .post('/api/test/params/OK')
      .send({ code: 'OK' })
      .query({ code: 'OK' })
      .expect(200);


    assert(result.body.body.code === 'OK');
    assert(result.body.query.code === 'OK');
    assert(result.body.params.code === 'OK');
  });

  it('should get correct params item', async () => {
    const result = await app.httpRequest()
      .post('/api/test/params/item/OK')
      .send({ code: 'OK' })
      .query({ code: 'OK' })
      .expect(200);


    assert(result.body.body === 'OK');
    assert(result.body.query === 'OK');
    assert.ok(result.body.params === 'OK');
  });


});
