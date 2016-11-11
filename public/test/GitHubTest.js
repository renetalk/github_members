window.$ = {};

QUnit.module("GitHub", {
    before: function () {
        $.ajax = function (config) {
            config.success(config);
        };
    },
    after: function () {
        $.ajax = undefined;
    }
});

QUnit.test("test getAllMembers", function (assert) {
    "use strict";
    GitHub.getAllMembers(function (ajaxConfig) {
        assert.equal(ajaxConfig.url, "http://localhost/allMembers");
        assert.equal(ajaxConfig.data, null);
    });
});

QUnit.test("test getReposOfMember", function (assert) {
    "use strict";
    GitHub.getReposOfMember("myMember", function (ajaxConfig) {
        assert.equal(ajaxConfig.url, "http://localhost/memberRepos");
        assert.deepEqual(ajaxConfig.data, {member: "myMember"});
    });
});