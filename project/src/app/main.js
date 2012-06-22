define(['text!tmpl/search.html'], function (tpl) {
    'use strict';

    console.log('am running', tpl);

    var SearchResultItem = Backbone.Model.extend();

    var SearchResults = Backbone.Collection.extend({
        url: '/api/search',
        model: SearchResultItem
    });

    window.col = new SearchResults();

    return {};
});
