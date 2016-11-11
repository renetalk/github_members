var express = require('express');
var MembersController = require('./Controller/MembersController');

(function () {
    "use strict";

    var app = express();
    app.use(express.static('public'));

    app.get('/', function (req, res) {
        res.sendFile('public/index.html', {root: __dirname})
    });

    app.get('/allMembers', function (req, res) {
        MembersController.getAllMembers(function (members) {
            res.send(members);
        });
    });

    app.get('/member', function (req, res) {
        MembersController.getMember(req.query.member, function (member) {
            res.send(member);
        });
    });

    app.get('/language', function (req, res) {
        MembersController.getMembersWithLanguage(req.query.language, function (members) {
            res.send(members);
        });
    });

    app.listen(80);
}());

