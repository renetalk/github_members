var GitHub = (function () {
    "use strict";

    var doRequest = function (url, data, callback) {
        $.ajax({
            url: url,
            data: data,
            method: "GET",
            dataType: 'json',
            success: function (data) {
                callback(data);
            },
            error: function (err) {
                console.log(err);
                callback(null);
            }
        });
    };

    return {
        getAllMembers: function (callback) {
            doRequest("http://localhost/allMembers", null, callback);
        },
        getMember: function (member, callback) {
            doRequest("http://localhost/member", {member: member}, callback);
        },
        getMembersWithLanguage: function (language, callback) {
            doRequest("http://localhost/language", {language: language}, callback);
        }
    };
}());

