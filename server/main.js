Accounts.onCreateUser(function(options, user) {
    // We're forcing at least an empty profile object to avoid needing to check for its existence later.
    var d = new moment();
    user.profile = {
        'roleId': options.roleId,
        'dateStart': d.toISOString(),
        'firstName': options.firstName,
        'lastName': options.lastName,
        'address': options.address,
        'city': options.city,
        'state': options.state,
        'postalCode': options.postalCode
    };
    return user;
});