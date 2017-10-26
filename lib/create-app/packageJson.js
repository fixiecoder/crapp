module.exports = function create(name, description) {
  return JSON.stringify({
    name: name || 'react-app',
    version: '1.0.0',
    description: description || 'empty template for new react app',
    main: 'index.js',
    scripts: {
      start: 'export BUILD_ENV=dev && webpack-dev-server',
      prod: 'export BUILD_ENV=production && webpack',
      test: 'echo \'Error: no test specified\' && exit 1'
    },
    dependencies: {
      immutable: '^3.8.1',
      lodash: '^4.17.4',
      react: '^16.0.0',
      'react-dom': '^16.0.0',
      'react-icons': '^2.2.7',
      'react-redux': '^5.0.6',
      'react-router-dom': '^4.2.2',
      redux: '^3.7.2',
      'redux-immutable': '^4.0.0',
      'redux-thunk': '^2.2.0',
      uuid: '^3.1.0'
    },
    author: '',
    license: 'ISC',
    devDependencies: {
      'babel-core': '^6.26.0',
      'babel-loader': '^7.1.2',
      'babel-preset-es2015': '^6.24.1',
      'babel-preset-react': '^6.24.1',
      'babel-preset-stage-0': '^6.24.1',
      'css-loader': '^0.28.7',
      'eslint-config-airbnb': '^15.1.0',
      'eslint-config-airbnb-base': '^11.3.1',
      'extract-text-webpack-plugin': '^3.0.0',
      'file-loader': '^0.11.2',
      'html-webpack-plugin': '^2.30.1',
      'node-sass': '^4.5.3',
      'redux-devtools-extension': '^2.13.2',
      'sass-loader': '^6.0.6',
      'style-loader': '^0.18.2',
      'uglifyjs-webpack-plugin': '^0.4.6',
      webpack: '^3.5.5',
      'webpack-cleanup-plugin': '^0.5.1',
      'webpack-dev-server': '^2.7.1'
    }
  }, null, 2);
};
