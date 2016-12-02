

function PersonViewModel()
{
    var self = this;
    this.firstName = ko.observable("John");
    this.lastName = ko.observable("Smith");
    this.fullName = ko.computed(function () { return this.firstName() + " " + this.lastName(); }, this);
    this.checkout = function () { alert("Trying to check out!"); };
    this.shoppingCart = ko.observableArray([
        new Product("Beer", 10.99, null, .20), 
        new Product("Brats", 7.99), 
        new Product("Buns", 1.49, ['Baked goods', 'Hot dogs']) 
    ]);
    this.addProduct = function () { this.shoppingCart.push(new Product("More Beer", 10.99)); };
    this.removeProduct = function (product) { self.shoppingCart.destroy(product); alert(self.shoppingCart().length); alert(product._destroy); };

    var featured = new Product("Acme BBQ Sauce", 3.99);
    this.featuredProduct = ko.observable(featured);

    //Interactive Binding
    this.saveUserData = function (model, event) {
        alert(model.firstName() + " is trying to checkout!");
        if (event.ctrlKey) {
            alert("He was holding down the Control key for some reason.");
        }
    };

    this.displayName = function () { alert(this.firstName()); };
    this.setName = function () { this.firstName("Bob"); };

    this.details = ko.observable("");

    this.showDetails = function (target, event, details) {
        this.details(details);
    }
    this.hideDetails = function (target, event) {
        this.details("");
    }

    this.primaryPhone = ko.observable("");
    this.secondaryPhone = ko.observable("");

    this.annoyMe = ko.observable(true);
    this.annoyTimes = ko.observableArray(['morning', 'evening']);

    this.annoyTimesDrop = ko.observableArray([
        'In the morning',
        'In the afternoon',
        'In the evening']);

    this.selectedTime = ko.observable('In the afternoon');

    var brats = { name: 'Brats', price: 7.99 };
    this.products = ko.observableArray([{ name: 'Beer', price: 10.99 }, brats, { name: 'Buns', price: 2.99 }]);
    this.favoriteProducts = ko.observableArray([brats]);
};
//ko.applyBindings(new PersonViewModel());


function Product(name, price, tags, discount) {
    this.name = ko.observable(name);
    this.price = ko.observable(price);
    tags = typeof (tags) !== 'undefined' ? tags : []; 
    this.tags = ko.observableArray(tags);
    discount = typeof (discount) !== 'undefined' ? discount : 0;
    this.discount = ko.observable(discount);
    this.formattedDiscount = ko.computed(function () { return (this.discount() * 100) + "%"; }, this);
    this.formattedName = ko.computed(function () { return "<strong>" + this.name() + "</strong>"; }, this);
    
}
$(document).ready(function () {
    ko.applyBindings(new PersonViewModel());
})

