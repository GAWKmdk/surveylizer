trimInput = function (val) {
    return val.replace(/^\s*|\s*$/g, "");
};

cleanOutput = function (val) {
    if (val == undefined) {
        val = "false";
    }
    return val;
};

camelize = function (str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
};


checkEmail = Match.Where(function (email) {
    check(email, String);
    return email.match(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/);
});

nonEmptyString = Match.Where(function (x) {
    check(x, String);
    return x.length > 0;
});

securePassword = Match.Where(function (password) {
    check(password, nonEmptyString);
    return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,14}/);
});

passwordLowercase = Match.Where(function (password) {
    check(password, nonEmptyString);
    return password.match(/^(?=.*[a-z])/);
});

passwordUppercase = Match.Where(function (password) {
    check(password, nonEmptyString);
    return password.match(/^(?=.*[A-Z])/);
});

passwordNumber = Match.Where(function (password) {
    check(password, nonEmptyString);
    return password.match(/^(?=.*\d)/);
});

passwordSpecialCharacter = Match.Where(function (password) {
    check(password, nonEmptyString);
    return password.match(/^(?=.*[$@$!%*?&])/);
});

passwordMinLength = Match.Where(function (password) {
    check(password, nonEmptyString);
    return password.length > 8;
});

passwordMaxLength = Match.Where(function (password) {
    check(password, nonEmptyString);
    return password.length < 14;
});

getErrorMessage = function (errorObject) {
    var message = "";
    for (var key in errorObject) {
        if (errorObject.hasOwnProperty(key)) {
            message += errorObject[key] + "</br>";
        }
    }
    return message;
};

Notify = {
    user: function (title, detail, receiverId) {
        // Send notification to User
        var notification = new Notification({
            receiverId: receiverId,
            title: title,
            detail: detail,
            isRead: false
        });
        notification.save();
    },
    admin: function (title, detail) {
        // Send notification to Admin(s)
        var notification = new Notification({
            title: title,
            detail: detail,
            isRead: false
        });
        notification.sendToAdmin();
    }
};

Template.registerHelper("selectedDate", function () {
    return Session.get("selectedDate") ?
        moment(Session.get("selectedDate"), "MMMM DD, YYYY").format("MMMM DD, YYYY") :
        moment().format("MMMM DD, YYYY");
});

Template.registerHelper("localize", function (category, key) {
    return i18n(category + "." + camelize(key));
});