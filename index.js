// 1.获取文件的内容
// 2.获取依赖关系

import fs from 'fs'

function createAsset() {
    const source = fs.readFileSync('./example/main.js',{
        encoding: 'utf8'
    })
    console.log(source)
    return {}
}

createAsset()