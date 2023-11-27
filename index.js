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
        deps
    }
}

// const asset = createAsset()
// console.log(asset)

// 创建依赖关系图
function createGraph() {
    const mainAsset = createAsset('./example/main.js')

    const queue = [mainAsset]
    for(const asset of queue) {
        asset.deps.forEach(relativePath => {
            const child = createAsset(path.resolve('./example', relativePath))
            queue.push(child)
        })
    }
    return queue
}

const graph = createGraph()
console.log(graph)