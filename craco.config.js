// const CSS_MODULE_LOCAL_IDENT_NAME =  process.env.NODE_ENV === 'test' ? '[local]' : '[local]__[hash:base64:5]';

module.exports = {
  // style: {
  //   modules: {
  //     localIdentName: CSS_MODULE_LOCAL_IDENT_NAME,
  //   },
  // },

  // webpack: {
  //   configure: (config) => {
  //     const minimizer = config.optimization.minimizer[0]

  //     minimizer.options.terserOptions.keep_classnames = true;
  //     minimizer.options.terserOptions.keep_fnames = true;

  //     return config;
  //   },
  // },

  // devServer: {
  //   proxy: {
  //     '/browser-viewer': {
  //       target: 'http://localhost:8000',
  //       pathRewrite: { '^/browser-viewer': '' },
  //     },
  //   },
  // },

  babel: {
    plugins: [
      ['@babel/plugin-proposal-export-default-from'],
      // [
      //   '@dr.pogodin/babel-plugin-react-css-modules',
      //   {
      //     filetypes: {
      //       '.scss': {
      //         syntax: 'postcss-scss',
      //       },
      //     },
      //     generateScopedName: CSS_MODULE_LOCAL_IDENT_NAME,
      //     attributeNames: { class: 'className' },
      //     autoResolveMultipleImports: true,
      //   },
      // ],

      [
        'module-resolver',
        {
          alias: {
            'application/*': './src/application/*',
            'components/*': './src/components/*',
            'domain/*': './src/domain/*',
            'lib/*': './src/lib/*',
            'appComponents/*': './src/appComponents/*',
            'infrastructure/*': './src/infrastructure/*',
          },
        },
      ],
    ],
  },

  jest: {
    configure: (jestConfig) => ({
      ...jestConfig,
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      modulePathIgnorePatterns: ['<rootDir>/src/.*/?__tests__/.*/?lib/'],
      transformIgnorePatterns: [ "node_modules/(?!(d3))" ],
      coverageReporters: ["json", "lcov", "text", "clover", "cobertura"],
      testMatch: ["**/__tests__/**/*.test.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"]
    })
  }
};
