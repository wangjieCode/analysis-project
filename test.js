const { modules } = require('./dist/report.json');
const fastGlob = require('fast-glob');
const { resolve } = require('path');
const fs = require('fs')


const allFilesPathArr =  fastGlob.sync('./src/**/*.{js,vue,png}').map( ele => resolve(process.cwd(), ele));

const useModulePathArr = new Set(modules.map( ele => ele.nameForCondition )
.filter( path =>  path && !path.includes('node_modules') ));

allFilesPathArr.forEach( path => {

    if(useModulePathArr.has(path))return;

    fs.rmSync(path);
})
