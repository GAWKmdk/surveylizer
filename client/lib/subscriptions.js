function Paginator(collection, perPage, currentPage){
    this.collection = collection;
    this.perPage = perPage;
    this.currentPage = currentPage;
}

Paginator.prototype = {
    constructor: Paginator,
    pages: function(){
        var totalCount = this.totalPages();
        var totalPages = parseInt(totalCount/this.perPage);
        var pages = [];
        for(var i=1; i < totalPages; i++){
            pages.push({pageNumber: i});
        }
        return pages;
    },
    totalPages: function(){
        this.collection.find({}).count();
    },
    pagedItems: function(){
        return this.collection.find({}, {skip: (this.currentPage - 1) * this.perPage, limit: this.perPage }).fetch();
    },
    toPage: function(pageNumber){
        this.currentPage = pageNumber;
    },
    toFirstPage: function(){
        this.currentPage = 1;
    },
    toLastPage: function(){
        this.currentPage = parseInt(this.totalPages()/this.perPage);
    }
};

Meteor.subscribe("users");
Meteor.subscribe("roles");
Meteor.subscribe("permissions");
this.permissionsPaginator = new Paginator(permissions, 10, 1);
Meteor.subscribe("questionnaires");
Meteor.subscribe("questionTypes");
Meteor.subscribe("questionCategories");
Meteor.subscribe("surveyors");
Meteor.subscribe("questions");
Meteor.subscribe("surveys");
Meteor.subscribe("answers");
Meteor.subscribe("notifications");
