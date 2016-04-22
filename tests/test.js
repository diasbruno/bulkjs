var should = require("should");
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

  it("#unmark(uuid)", function() {
    var bulk = Bulk({}, {
      toId: function(x) {
        return x.uuid;
      }
    });
    bulk.mark(1);
    bulk.unmark(function(x) {
      return x != 1;
    });
    bulk.list().should.be.eql([]);
  });

  it("#markAll()", function() {
    var bulk = Bulk({}, {
      toId: function(x) {
        return x.uuid;
      }
    });
    bulk.dataSource(data);
    bulk.markAll();
    bulk.list().should.be.eql([1,2,3,4,5]);
  });

  it("#cleanAll()", function() {
    var bulk = Bulk({}, {
      toId: function(x) {
        return x.uuid;
      }
    });
    bulk.dataSource(data);
    bulk.markAll();
    bulk.cleanAll();
    bulk.list().should.be.eql([]);
  });

  it("#list()", function() {
    var bulk = Bulk({}, {
      update: function() {}
    });
    bulk.list([1, 2, 3]);
    bulk.list().should.be.eql([1, 2, 3]);
  });

  it("#toggleAll()", function() {
    var bulk = Bulk({}, {
      toId: function(x) {
        return x.uuid;
      }
    });
    bulk.dataSource(data);
    bulk.toogleAll();
    bulk.list().should.be.eql([1,2,3,4,5]);
    bulk.toogleAll();
    bulk.list().should.be.eql([]);
  });
});
