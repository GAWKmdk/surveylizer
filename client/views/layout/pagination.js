Template.pagination.helpers({
   "pages": function(){
       return permissionsPaginator.pages();
   }
});
Template.pagination.events({
    "click li.pages": function(e, t){
        Template.parentData(0).toPage(e.target.data);
    },
    "click li:first": function(e, t){
        Template.parentData(0).toFirstPage();
    },
    "click li:first": function(e, t){
        Template.parentData(0).toLastPage();
    }
});