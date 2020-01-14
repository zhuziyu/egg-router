export default () => {
  return {
    keys: '_1557187716637_3383',
    // middleware config
    hello: {
      msg: 'this is hello middleware config!',
    },

    security: {
      csrf: { enable: false }, // 用于 API 服务，CSRF 无必要
    },

    logger: {
      level: 'NONE',
      consoleLevel: 'DEBUG',
    },
  };
};
