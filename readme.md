# bulkjs

base for a manager for multiple selection.

## Example

```javascript
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
```
