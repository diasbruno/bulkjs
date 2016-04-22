/*global require, module */

function Bulk(scope, opts) {
  if (!(this instanceof Bulk)) {
    return new Bulk(scope, opts);
  }

  var selected = [];
  var source = [];

  return {
    dataSource: function(src) {
      source = src;
    },
    mark: function(item_uuid, event) {
      if (selected.indexOf(item_uuid) > -1) {
        return;
      }

      selected.push(item_uuid);

      if (opts.update) {
        opts.update(scope, event, "mark");
      }
    },
    unmark: function(filter, event) {
      selected = selected.filter(filter);

      if (opts.update) {
        opts.update(scope, event, "unmark");
      }
    },
    markAll: function(event) {
      selected = source.map(opts.toId);

      if (opts.update) {
        opts.update(scope, event, "markAll");
      }
    },
    cleanAll: function(event) {
      selected = [];

      if (opts.update) {
        opts.update(scope, event, "cleanAll");
      }
    },
    toogleMark: function(item_uuid, event) {
      var target = event.target;

      if (target.checked) {
        this.mark(item_uuid, event);
      } else {
        this.unmark(function(x) {
          return item_uuid != x;
        }, event);
      }
    },
    toogleAll: function(event) {
      if (!this.all()) {
        this.markAll(event, "markAll");
      } else {
        this.cleanAll(event, "cleanAll");
      }
    },
    list: function(items_uuids) {
      if (items_uuids) {
        selected = items_uuids;

        if (opts.update) {
          opts.update(scope, null, 'mark');
        }
      }
      return selected;
    },
    isSelected: function(item) {
      return selected.indexOf(item) > -1;
    },
    all: function() {
      return source.length == selected.length;
    },
    count: function() {
      return selected.length;
    }
  };
}

if (typeof module !== "undefined") {
  module.exports = Bulk;
} else {
  window.bulk = Bulk;
}
