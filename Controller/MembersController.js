var GitHubConnector = require('./../Services/GitHubConnector');
var MemberDB = require('./../Dao/MemberDao');
var Member = require('./../Entity/Member');
var Repo = require('./../Entity/Repo');

var MembersController = (function () {

    function getRepos(memberName, callback) {
        GitHubConnector.getMemberRepos(memberName, function (repos) {
            var repoCollection = [];
            if (repos) {
                repos.forEach(function (repo) {
                    repoCollection.push(new Repo(repo.language));
                });
            }
            callback(repoCollection);
        });
    }

    return {
        getAllMembers: function (callback) {
            GitHubConnector.getAllMembers(function (members) {
                var memberCollection = [];
                members.forEach(function (member) {
                    getRepos(member.login, function (repos) {
                        MemberDB.getMember(member.login, function (existingMember) {
                            if (existingMember) {
                                existingMember.repos = repos;
                                MemberDB.addOrUpdateMember(existingMember);
                                memberCollection.push(existingMember);
                            } else {
                                var memberObj = new Member(member.login, repos);
                                MemberDB.addOrUpdateMember(memberObj);
                                memberCollection.push(memberObj);
                            }
                        });
                    });
                });
                if (members) {
                    var interval = setInterval(function () {
                        if (memberCollection.length == members.length) {
                            clearInterval(interval);
                            callback(memberCollection);
                        }
                    }, 100);
                } else {
                    callback(null);
                }
            });
        },
        getMember: function (memberName, callback) {
            getRepos(memberName, function (repos) {
                MemberDB.getMember(memberName, function (existingMember) {
                    if (existingMember) {
                        existingMember.repos = repos;
                        MemberDB.addOrUpdateMember(existingMember);
                        callback(existingMember);
                    } else {
                        var memberObj = new Member(memberName, repos);
                        MemberDB.addOrUpdateMember(memberObj);
                        callback(memberObj);
                    }
                });
            });
        },
        getMembersWithLanguage: function (language, callback) {
            this.getAllMembers(function (members) {
                var membersWithLanguage = members.filter(function (member) {
                    var result = false;
                    member.repos.forEach(function (repo) {
                        if (repo.language == language) {
                            result = true;
                        }
                    });
                    return result;
                });
                callback(membersWithLanguage);
            });
        }
    }
}());

module.exports = MembersController;

