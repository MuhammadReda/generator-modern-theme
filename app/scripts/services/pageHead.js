app.factory('PageHead', function() {
    var title = 'Homepage';
    return {
        title: function() {
            return title;
        },
        setTitle: function(newTitle) {
            title = newTitle
        }
    };
});
