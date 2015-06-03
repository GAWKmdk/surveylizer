trimInput = function(val){
    return val.replace(/^\s*|\s*$/g, "");
};

cleanOutput = function(val){
    if(val == undefined){
        val = "false";
    }
    return val;
};

checkEmail = Match.Where(function(email){
    check(email, String);
    return email.match(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/);
});

nonEmptyString = Match.Where(function (x) {
    check(x, String);
    return x.length > 0;
});

securePassword = Match.Where(function(password){
    check(password, nonEmptyString);
    return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,14}/);
});

passwordLowercase = Match.Where(function(password){
    check(password, nonEmptyString);
    return password.match(/^(?=.*[a-z])/);
});

passwordUppercase = Match.Where(function(password){
    check(password, nonEmptyString);
    return password.match(/^(?=.*[A-Z])/);
});

passwordNumber = Match.Where(function(password){
    check(password, nonEmptyString);
    return password.match(/^(?=.*\d)/);
});

passwordSpecialCharacter = Match.Where(function(password){
    check(password, nonEmptyString);
    return password.match(/^(?=.*[$@$!%*?&])/);
});

passwordMinLength = Match.Where(function(password){
    check(password, nonEmptyString);
    return password.length > 8;
});

passwordMaxLength = Match.Where(function(password){
    check(password, nonEmptyString);
    return password.length < 14;
});