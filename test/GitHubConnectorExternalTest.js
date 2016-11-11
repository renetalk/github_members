var assert = require('assert');
var GitHubConnector = require("../Services/GitHubConnector.js");

describe("GitHubConnector Test", function () {
    describe('test member repo', function () {
        it('should return a nonnull object', function (done) {
            GitHubConnector.getMemberRepos("bennetelli", function (data) {
                if (data) {
                    done();
                }
            });
        });
    });

    describe('test all members', function () {
        it('should return a nonnull object', function (done) {
            GitHubConnector.getAllMembers(function (data) {
                if (data) {
                    done();
                }
            });
        });
    });
});


