var Views = (function() {

    var Application = Backbone.View.extend({

        statsTemplate: _.template($('#stats-template').html()),

        initialize: function () {

            this.$('#stats').html(this.statsTemplate({ count: app.collections.slides.length }));

        }

    });

    var Slides = Backbone.View.extend({

        initialize: function() {

            this.collection.on('add', this.renderOne, this);

        },

        addAll: function() {

            var self = this;

            // Collect a slide view for each slide in the collection
            return this.collection.map(function(model) {

                // Create a new view for the slide and return it's element
                return self.addOne(model);

            });

        },

        addOne: function (model) {

            // Create a new view for the slide and return it's element
            return new Views.Slide({ model: model }).render().el;

        },

        renderAll: function() {

            // Add the slides elements to the slides list element
            this.$el.append(this.addAll());

            return this;

        },

        renderOne: function(model) {

            this.$el.append(this.addOne(model));

            return this;

        }

    });

    var Slide = Backbone.View.extend({

        tagName: 'li',
        className: 'slide',
        template: _.template($('#slide-template').html()),

        events: {
            'dblclick': 'edit',
            'click .done': 'close'
        },

        initialize: function() {

            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);

        },

        render: function() {

            this.$el.html(this.template(this.model.toJSON()));

            return this;

        },

        edit: function() {

            if (this.$el.hasClass('editing')) return false;

            this.$el.addClass('editing');

            this.$('input').focus();

            return this;

        },

        close: function() {

            this.model.set({
                title: this.$('input').val(),
                content: this.$('textarea').val()
            });

            this.$el.removeClass('editing');

            return this;

        }
    
    });

    var AddSlideForm = Backbone.View.extend({

        events: {
            'submit': 'add'
        },

        initialize: function() {

            

        },

        add: function() {

            app.collections.slides.add({
                title: this.$('#title').val(),
                content: this.$('#content').val()
            });

            this.el.reset();

            return false;

        }

    });

    return {
        Application: Application,
        Slides: Slides,
        Slide: Slide,
        AddSlideForm: AddSlideForm
    }

})();
