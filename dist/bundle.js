/**
 * 1.获取文件的内容
 * 2.获取依赖关系
 * ast -> 抽象语法树 -> 获取foo文件的节点
 */

import fs from 'fs'
import path from 'path'
import esj from 'ejs'
import parser from '@babel/parser'
import traverse from '@babel/traverse'

function createAsset(filePath) {
    // 1.获取文件的内容
    // ast -> 抽象语法树 -> 获取foo文件的节点

    const source = fs.readFileSync(filePath,{
        encoding: 'utf8'
    })
    // console.log(source)
    // 2.获取依赖关系
    const ast = parser.parse(source, {
        sourceType: 'module',
    })
    // console.log(ast)
    
    const deps = []
    traverse.default(ast, {
        ImportDeclaration({ node }) {
            deps.push(node.source.value)
        }
    })
    return {
        filePath,
        source,
        deps,
    }
}


(function (modules) {
    
    function require(id) {
        
        const [fn,mapping] = modules[id]
    
        const module = {
            exports: {},
        }
        function localRequire(filePath) {
            const id = mapping[filePath]
            return require(id)
        }
        fn(localRequire, module, module.exports)
    
        return module.exports
    }
    
    require(1)
})
({
    
        "0": [function(require, module, exports) {
            "use strict";

var _foo = require("./foo.js");

var _foo2 = _interopRequireDefault(_foo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _foo2.default)();
console.log('main.js');
        },]
    
        "1": [function(require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

function foo() {
  console.log('foo');
}
        },]
    
})