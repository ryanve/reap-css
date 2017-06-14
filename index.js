const traverse = require("traverse")
const concat = [].concat
const flatten = array => concat.apply([], array)
const inspect = data => JSON.stringify(data, null, 2)

const reap = function(tree) {
  const self = this instanceof reap ? this : new reap
  self.traversal = traverse(tree)
  return self
}

const use = function(method) {
  return function() {
    return this.traversal[method]()
  }
}

const search = function(key) {
  return function() {
    const results = this.having(key).map(node => node[key])
    return flatten(results)
  }
}

const model = reap.prototype
model.nodes = use("nodes")

model.type = function(type) {
  return this.nodes().filter(node => node.type === type)
}

model.having = function(key) {
  if (key == null) throw new Error("key supplied to .having was null")
  return this.nodes().filter(node => node.hasOwnProperty(key))
}

model.media = search("media")
model.properties = search("property")
model.selectors = search("selectors")

model.inspect = function() {
  return inspect(this.traversal.clone())
}

module.exports = Object.freeze(reap);
