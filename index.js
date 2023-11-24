/**
 * 1.获取文件的内容
 * 2.获取依赖关系
 * ast -> 抽象语法树 -> 获取foo文件的节点
 */

import fs from 'fs'
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
        source,
        deps
    }
}

// const asset = createAsset()
// console.log(asset)

function createGraph() {
    const mainAsset = createAsset('./example/main.js')
}