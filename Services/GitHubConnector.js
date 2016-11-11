var request = require('request');

var GitHubConnector = (function () {
    "use strict";

    const GIT_HUB_ALL_MEMBERS = "https://api.github.com/orgs/codecentric/members?per_page=2";
    const GIT_HUB_SINGLE_MEMBER = "https://api.github.com/users/";

    function handleResponse(callback, err, res, body) {
        if (err || res.statusCode > 200) {
            console.error(body);
            callback(null);
        } else {
            console.log("Got data " + body);
            callback(body);
        }
    }

    function doRequest(url, callback) {
        request.get({
            url: url,
            headers: {'User-Agent': 'my agent'},
            json: true
        }, function (err, res, body) {
            handleResponse(callback, err, res, body);
        });
    }

    // TODO: Ask for updates of dataSets (timestamp)

    return {
        getAllMembers: function (callback) {
            doRequest(GIT_HUB_ALL_MEMBERS, callback);
        },
        getMemberRepos: function (member, callback) {
            if (member) {
                doRequest(GIT_HUB_SINGLE_MEMBER + member + "/repos", callback);
            } else {
                callback(null);
            }
        }
    };
}());

module.exports = GitHubConnector;