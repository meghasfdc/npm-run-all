/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("power-assert")
const nodeApi = require("../lib")
const createHeader = require("../lib/create-header")
const readPackageJson = require("../lib/read-package-json")
const BufferStream = require("./lib/buffer-stream")
const util = require("./lib/util")

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

describe("[print-name] npm-run-all", () => {
    util.moveToWorkspace()

    let packageInfo = null
    before(async () => {
        packageInfo = (await readPackageJson()).packageInfo
    })

    describe("should print names before running tasks:", () => {
        it("Node API", async () => {
            const stdout = new BufferStream()
            await nodeApi("test-task:echo abc", { stdout, silent: true, printName: true })
            const header = createHeader("test-task:echo abc", packageInfo, false)
            assert.equal(stdout.value.slice(0, header.length), header)
        })

        it("npm-run-all command (--print-name)", async () => {
            const stdout = new BufferStream()
            await util.runAll(["test-task:echo abc", "--silent", "--print-name"], stdout)
            const header = createHeader("test-task:echo abc", packageInfo, false)
            assert.equal(stdout.value.slice(0, header.length), header)
        })

        it("run-s command (--print-name)", async () => {
            const stdout = new BufferStream()
            await util.runSeq(["test-task:echo abc", "--silent", "--print-name"], stdout)
            const header = createHeader("test-task:echo abc", packageInfo, false)
            assert.equal(stdout.value.slice(0, header.length), header)
        })

        it("run-p command (--print-name)", async () => {
            const stdout = new BufferStream()
            await util.runPar(["test-task:echo abc", "--silent", "--print-name"], stdout)
            const header = createHeader("test-task:echo abc", packageInfo, false)
            assert.equal(stdout.value.slice(0, header.length), header)
        })

        it("npm-run-all command (-n)", async () => {
            const stdout = new BufferStream()
            await util.runAll(["test-task:echo abc", "--silent", "-n"], stdout)
            const header = createHeader("test-task:echo abc", packageInfo, false)
            assert.equal(stdout.value.slice(0, header.length), header)
        })

        it("run-s command (-n)", async () => {
            const stdout = new BufferStream()
            await util.runSeq(["test-task:echo abc", "--silent", "-n"], stdout)
            const header = createHeader("test-task:echo abc", packageInfo, false)
            assert.equal(stdout.value.slice(0, header.length), header)
        })

        it("run-p command (-n)", async () => {
            const stdout = new BufferStream()
            await util.runPar(["test-task:echo abc", "--silent", "-n"], stdout)
            const header = createHeader("test-task:echo abc", packageInfo, false)
            assert.equal(stdout.value.slice(0, header.length), header)
        })
    })
})

