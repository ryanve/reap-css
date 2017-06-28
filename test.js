let fails = 0
const reap = require("./")
const read = require("read-css")
const equal = require("deep-equal")
const correct = {
  media: ["(color), (update)", "(orientation: portrait)"],
  properties: ["color", "border-radius", "color", "cursor", "display"],
  selectors: [".apple", ".orange", "button:enabled", ".flex\\@portrait"],
}

const ok = function(id, actual, correct) {
  if (equal(actual, correct)) console.info("Passed:", id)
  else ++fails && console.error("Failed:", id, actual,  "should be", correct)
}

const tree = read("test.css")
const harvest = reap(tree)

ok("type", harvest.type("media").length, 2)
ok("having", harvest.having("media").length, 2)
ok("collect", harvest.collect("media"), correct.media)
ok("media", harvest.media(), correct.media)
ok("selectors", harvest.selectors(), correct.selectors)
ok("properties", harvest.properties(), correct.properties)

if (fails) throw new Error("\n" + fails + " tests failed.")
else console.log("\nAll tests passed.")
