/**
 * Created by 清辉 on 2020/1/14 09:48
 */
import { RouterHandle } from '../../';
import { Application } from 'egg';

export default (app: Application) => {

  RouterHandle(app)
    .catch(e => app.logger.error(e));

};
