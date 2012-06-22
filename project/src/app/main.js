define(['text!tmpl/search.html', 'text!tmpl/resultitem.html'], function (tpl, itemtpl) {
    'use strict';

    console.log('am running', tpl);

    var SearchResultItem = Backbone.Model.extend();

    var SearchResults = Backbone.Collection.extend({
        url: '/api/search',
        model: SearchResultItem
    });

    var SearchResultItemView = Backbone.View.extend({
        initialize: function () {
            this.template = doT.template(itemtpl);
            this._modelBinder = new Backbone.ModelBinder();
        },
        render: function () {
            this.$el.empty().append(this.template({}));
            this._modelBinder.bind(this.model, this.el, Backbone.ModelBinder.createDefaultBindings(this.el, 'data-property'));
            return this;
        }
    });

    var SearchResultsView = Backbone.View.extend({
        initialize: function () {
            var viewCreator = function (model) {
                return new SearchResultItemView({model: model});
            };
            var elManagerFactory = new Backbone.CollectionBinder.ViewManagerFactory(viewCreator);
            this._collectionBinder = new Backbone.CollectionBinder(elManagerFactory);
        },
        render: function () {
            this._collectionBinder.bind(this.collection, this.$el);
            return this;
        }
    });

    var SearchView = Backbone.View.extend({
        className: 'searchview',
        events: {
            'click #gobutton': 'onClickGo',
            'keydown': 'onKeyDown'
        },
        initialize: function () {
            this.template = doT.template(tpl);
            this.searchResults = new SearchResults();
        },
        render: function () {
            this.$el.empty().append(this.template({}));
            this.resultView = new SearchResultsView({collection: this.searchResults, el: this.$('#searchresults')});
            this.resultView.render();

            return this;
        },
        onClickGo: function (e) {
            this.triggerSearch();
        },
        onKeyDown: function (e) {
            switch(e.which) {
            case 13:
                this.triggerSearch();
                break;
            }
        },
        triggerSearch: function () {
            var val = this.$('#searchinput').val();
            this.$('#searchinput').val('');
            if (val !== '') {
                this.doSearch(val);
            }

        },
        doSearch: function (query) {
            console.log('do search:' + query);
            this.searchResults.fetch({query: query});
        }
    });


    var view = new SearchView();
    $('#main.container').empty().append(view.render().el);
    $('#searchinput').focus();

    window.col = new SearchResults();

    return {};
});
