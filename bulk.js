/*global require, module */

function Bulk(scope, opts) {
  if (!(this instanceof Bulk)) {
    return new Bulk(scope, opts);
  }

  var isSelectedAll = false;
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

      if (source.length == selected.length) {
        isSelectedAll = true;
      }

      if (opts.update) {
        opts.update(scope, event, 'mark');
      }
    },
    unmark: function(filter, event) {
      selected = selected.filter(filter);
      isSelectedAll = false;

      if (opts.update) {
        opts.update(scope, event, 'unmark');
      }
    },
    markAll: function(event) {
      isSelectedAll = true;
      selected = source.map(opts.toId);

      if (opts.update) {
        opts.update(scope, event, 'markAll');
      }
    },
    cleanAll: function(event) {
      isSelectedAll = false;
      selected = [];

      if (opts.update) {
        opts.update(scope, event, 'cleanAll');
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
      if (!isSelectedAll) {
        this.markAll(event, 'markAll');
      } else {
        this.cleanAll(event, 'cleanAll');
      }
    },
    list: function() {
      return selected;
    },
    isSelected: function(item) {
      return selected.indexOf(item) > -1;
    },
    all: function() {
      return isSelectedAll;
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
