const path = require('path');
const fs = require('fs-extra');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appDist: resolveApp('dist'),
    appMainJS: resolveApp('src/index.js'),
    appTemplate: resolveApp('assets/html/index.ejs')
};