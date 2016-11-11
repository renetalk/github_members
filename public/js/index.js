$(function () {
    "use strict";

    var $buttonAllMembers = $('#buttonAllMembers');
    var $buttonMemberRepo = $('#buttonMemberRepo');
    var $buttonLanguage = $('#buttonLanguage');
    var $membersOutput = $('.output');

    // TODO: search for language

    $buttonAllMembers.click(function () {
        $membersOutput.empty();
        GitHub.getAllMembers(function (members) {
            if (members) {
                _.each(members, function (member) {
                    renderReposOfMember(member);
                });
            }
        });
    });

    $buttonMemberRepo.click(function () {
        var member = $("#member").val();
        $membersOutput.empty();
        if (member) {
            GitHub.getMember(member, function (member) {
                if (member) {
                    renderReposOfMember(member);
                }
            });
        }
    });

    $buttonLanguage.click(function () {
        var language = $("#language").val();
        $membersOutput.empty();
        if (language) {
            GitHub.getMembersWithLanguage(language, function (members) {
                if (members) {
                    _.each(members, function (member) {
                        renderReposOfMember(member);
                    });
                }
            });
        }
    });

    function renderReposOfMember(member) {
        var languageList = {};
        var repos = _.filter(member.repos, function (repo) {
            return repo.language != null;
        });
        _.reduce(repos, function (result, repo) {
            if (result[repo.language]) {
                result[repo.language]++;
            } else {
                result[repo.language] = 1;
            }
            return result;
        }, languageList);

        var title = $('<h3>').text("Member: " + member.name);
        $membersOutput.append(title);
        var $list = $('<ul/>');
        _.each(languageList, function (amount, language) {
            $list.append($('<li/>').text(language + ": " + amount));
        });
        $membersOutput.append($list);
    }
});
