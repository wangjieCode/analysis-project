const fastGlob = require('fast-glob');
const path = require('path');
const fs = require('fs');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
// const vue = require('babel-preset-vue')
const allSourcesPath = fastGlob.sync('./src/**/*.{js,vue}');

const entry = path.resolve(process.cwd(), './src/main.js');

const getDepPath = (sourcePath) => {
    const sourceContent = fs.readFileSync(sourcePath);
    const depPathArr = [];
    const ast = parse(sourceContent.toString(), {
        sourceType: 'module',
    })
    traverse(ast, {
        ImportDeclaration(path) {
            const filepath = path.node.source.value;
            filepath.startsWith('.') && depPathArr.push(filepath)
        }
    })
    return depPathArr;
}

console.log(getDepPath(entry))