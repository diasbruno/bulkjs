$(function() {
  var sl = $("#selected");
  var all = $("#selectAll");
  var inputs = $("tbody input[type=checkbox]");
  var collection = [];
  // transform the inputs into a 'pair' of (uuid, <input />).
  inputs.each(function(i, k) {
    collection.push({ uuid: i + 1, content: k });
  });

  // the scope, to make things easy.
  var scope = {};

  // the api.
  var bulkAction = bulk(scope, {
    // toId maps the object from the data source,
    // to the unique id in the list.
    toId: function(x) {
      return x.uuid;
    },
    // updates will always be executed for any change,
    // except when settings the 'dataSource'.
    update: function(scope, event, eventName) {
      // get the list of selected ids.
      var selected = scope.bulkAction.list();

      // if not 'all', unmark the all checkbox.
      if (!scope.bulkAction.all()) {
        all[0].checked = '';
      } else {
        all[0].checked = 'checked';
      }

      // mark as checked if the uuid is in the selected list.
      scope.collection.map(function(o, k) {
        var checked = selected.indexOf(o.uuid) > -1;
        o.content.checked = checked ? 'checked' : '';
      });
      // display info.
      if (scope.bulkAction.all()) {
        sl.html("all");
      } else {
        if (selected.length > 0) {
          sl.html(selected.join(","));
        } else {
          sl.html("none");
        }
      }
    }
  });

  // set the data source.
  bulkAction.dataSource(collection);

  // inject in the scope for easy access.
  scope.bulkAction = bulkAction;
  scope.collection = collection;

  bulkAction.list([1, 2, 3]);

  var k = setInterval(function() {
    if (bulkAction.all()) {
      return;
    }
    bulkAction.mark(parseInt(Math.random() * 4) + 1);
  }, 1000);

  // default value.
  sl.html("none");

  // events.
  all.click(function(event) {
    bulkAction.toogleAll(event);
  });

  collection.map(function(o, k) {
    $(o.content).click(function(event) {
      bulkAction.toogleMark(o.uuid, event);
    });
  });
});
