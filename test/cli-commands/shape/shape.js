const assert = require('chai').assert;
let chai = require("chai");
const fs = require("fs-extra")
const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;

let unexistingShape = 'sthUnexisting'

describe('Shape cli command', () => {
    let currentDir;

    before( async function() {
        currentDir = process.cwd();
        process.chdir('/tmp');
    });

    it('should throw err if can not find a proper shape', async () => {
       let expectedOutput = 'Invalid shape'
       let childProcess = await runCmdHandler(`etherlime shape ${unexistingShape}`, expectedOutput)
       assert.include(childProcess, expectedOutput)
    })

    it('should shape new dApp with Angular front-end', async () => {
        let expectedOutput = 'Shaping finished successful';
        let childProcess = await runCmdHandler('etherlime shape angular', expectedOutput)
        assert.include(childProcess.output, expectedOutput)
        assert(fs.existsSync('./web'))
    });

    it.only('should throw err if try to shape angular twice', async () => {
        let expectedOutput = "remote origin already exists."
        // await runCmdHandler('etherlime shape angular', "Shaping finished successful!")
        console.log("dir", process.cwd())
        let childProcess = await runCmdHandler('etherlime shape angular', expectedOutput)
        assert.include(childProcess, expectedOutput)
    })

    after(async function() {
        fs.removeSync('./contracts')
        fs.removeSync('./deployment')
        fs.removeSync('./test')
        fs.removeSync('./web')
        fs.removeSync('./node_modules')
        fs.removeSync('./package.json')
        fs.removeSync('./package-lock.json');
        fs.removeSync('./README.md');
        fs.removeSync('./.git');
        fs.removeSync('./.etherlime-store')
        fs.removeSync('./.gitignore')
        process.chdir(currentDir);
    });

});
