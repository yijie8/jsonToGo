// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  history: 'hash',
  publicPath: './',
  outputPath: './chrome-extension/dist',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true,
      },
      dynamicImport: false,
      title: 'jsonToGo',
      dll: false,

      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
      },
    }],
  ],
  routes: [
    {
      path: '/',
      redirect: '/jsonTars',
    },
    {
      path: '/jsonTars',
      component: 'Index',
      exact: true,
    },
    // 加下面的报错
    // {
    //   path: '/mysqlTars',
    //   component: 'Index',
    //   exact: true,
    // },
    // {
    //   path: '/yamlTars',
    //   component: 'Index',
    //   exact: true,
    // },
    {
      path: '/structTars',
      component: 'Index',
      exact: true,
    },
    // {
    //   path: '/jsonStruct',
    //   component: 'Index',
    //   exact: true,
    // },
    // {
    //   path: '/mysqlStruct',
    //   component: 'Index',
    //   exact: true,
    // },
    // {
    //   path: '/yamlStruct',
    //   component: 'Index',
    //   exact: true,
    // },
  ],
};
