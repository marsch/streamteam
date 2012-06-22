// fake server definitions follow here
define(['text!dev/responses/searchresults.json'], function (searchResults) {
    'use strict';

    var fakeserver = sinon.fakeServerWithClock.create();

    fakeserver.autoRespondAfter = 1;
    fakeserver.respondWith("GET", '/api/search', [200, {'Content-Type': 'application/json'}, searchResults]);

    window.fakeserver = fakeserver;
    return fakeserver;
});
