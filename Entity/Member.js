var Member = (function () {
    /**
     * @param name
     * @param repos
     * @constructor
     */
    function Member(name, repos) {
        this._id = name;
        this._rev = '';
        this.name = name;
        this.repos = repos;
    }

    return Member;
}());

module.exports = Member;
