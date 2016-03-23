var Bulk = require("../bulk.js");

var data = [
  {uuid: 1, name: "test a"},
  {uuid: 2, name: "test b"},
  {uuid: 3, name: "test c"},
  {uuid: 4, name: "test d"},
  {uuid: 5, name: "test e"}
];

describe("Bulk", function() {
  it("#mark(uuid)", function() {
    var bulk = Bulk({}, {
      toId: function(x) {
        return x.uuid;
      }
    });
    bulk.mark(1);
    bulk.list().should.be.eql([1]);
  });
});
