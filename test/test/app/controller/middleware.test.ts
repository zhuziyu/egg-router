/**
 * Created by 清辉 on 2020/1/14 16:49
 */

import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';


describe('test/app/controller/middleware.test.ts', () => {


  it('hello middleware should work', async () => {
    const result = await app.httpRequest()
      .get('/api/middleware/check')
      .expect(200);
    assert.ok(result.text === 'it work!');
  });


});
