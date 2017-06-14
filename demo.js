const reap = require("./")
const read = require("read-css")

const log = function(data) {
  console.log(data === Object(data) ? JSON.stringify(data, null, 2) : data)
}

const tree = read("test.css")
const harvest = reap(tree)

log("\nmedia\n")
log(harvest.media())

log("\nproperties\n")
log(harvest.properties())

log("\nselectors\n")
log(harvest.selectors())
