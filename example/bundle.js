(function(modules) {
    function require(id) {
        
        const [fn,mapping] = modules[id]
    
        function localRequire(filePath) {
            const id = mapping[filePath]
            return require(id)
        }
        
        const module = {
            exports: {},
        }
        fn(localRequire, module, module.exports)
    
        return module.exports
    }
    
    require(0)

})({
    1:[
        function(require, module, exports) {
            const { foo } = require('./foo.js')
            
            foo()
            console.log('main.js')
    },
    {
        './foo.js': 1
    }],
    2:[
        function(require, module, exports) {
            function foo() {
                console.log('foo')
            }
            module.exports = {
                foo,
            }
        },{}],
})

