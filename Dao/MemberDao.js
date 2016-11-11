var PouchDB = require('pouchdb');

var MembersDB = (function () {
    var db = new PouchDB('members');

    return {
        addOrUpdateMember: function (member) {
            db.put(member).then(function (result) {
                console.log('Added member: ' + result);
            }).catch(function (err) {
                console.log('Something went wrong adding member' + err)
            });
        },
        getMember: function (memberName, callback) {
            return db.get(memberName).then(function (existingMember) {
                callback(existingMember);
            }).catch(function (err) {
                console.log("Could not find member", err);
                callback(null);
            });
        }
    }
}());

module.exports = MembersDB;
