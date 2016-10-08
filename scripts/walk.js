"use strict"

if (require.main === module) {
    throw new Error("This isn't a runnable script!")
}

const fs = require("fs")
const path = require("path")
const pcall = require("./promise.js")

module.exports = function walk(dir, ignore) {
    return pcall(fs.readdir, dir)
    .then(files => files.filter(file => !ignore || !ignore(file)))
    .then(files => files.map(file => path.join(dir, file)))
    .then(files => Promise.all(files.map(file => {
        return pcall(fs.stat, file).then(stat => {
            if (stat.isDirectory()) return walk(file, ignore)
            if (stat.isFile()) return [file]
            return []
        })
    })))
    .then(files => [].concat.apply([], files))
}
