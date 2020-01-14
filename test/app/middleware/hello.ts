/**
 * Created by 清辉 on 2020/1/14 10:19
 */

export default (_config, _app) => {
  return async (ctx, next) => {

    ctx.logger.info('[CONFIG]', JSON.stringify(_config));
    ctx.logger.info('[APP_NAME]', _app.name);

    await next();
  };
};
