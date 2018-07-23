const path = require('path');
const fs = require('fs-extra');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appSrc: resolveApp('src'),
    appDist: resolveApp('dist'),
    appMainJS: resolveApp('src/index.js'),
    appTemplate: resolveApp('src/assets/index.ejs'),
    appPublicPath:'',
};