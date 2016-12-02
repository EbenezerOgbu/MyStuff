ko.observableArray.fn.filterByProperty = function(propName, matchValue) {
    return ko.computed(function() {
        var allItems = this(), matchingItems = [];
        for (var i = 0; i < allItems.length; i++) {
            var current = allItems[i];
            if (ko.unwrap(current[propName]) === matchValue)
                matchingItems.push(current);
        }
        return matchingItems;
    }, this);
}

function Book(title, read) {
    this.title = ko.observable(title);
    this.read = ko.observable(read);
}

function LibraryViewModel() {
    this.books = ko.observableArray([
    new Book('Oliver Twist', true),
    new Book('Winnie-the-Pooh', false),
    new Book('The Hobbit', true),
    new Book('The Bicentennial Man', false),
    new Book('The Green Mile', true)
    ]);
    this.readBooks = this.books.filterByProperty("read", true);
    this.unreadBooks = this.books.filterByProperty("read", false);
}
ko.applyBindings(new LibraryViewModel());