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

const collect = function(key) {
  const results = this.having(key).map(node => node[key])
  return flatten(results)
}

const collects = function(key) {
  return function() { 
    return this.collect(key)
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

model.collect = collect
model.media = collects("media")
model.properties = collects("property")
model.selectors = collects("selectors")

model.inspect = function() {
  return inspect(this.traversal.clone())
}

module.exports = Object.freeze(reap);
