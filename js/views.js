var Views = (function() {

    var Application = Backbone.View.extend({

        

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
        template: _.template($('#slide-template').html()),

        initialize: function() {

            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);

        },

        render: function() {

            this.$el.html(this.template(this.model.toJSON()));

            return this;

        }
    
    });

    var SlideForm = Backbone.View.extend({

        events: {
            'submit': 'add'
        },

        initialize: function() {

        },

        add: function() {

            app.collections.slides.add({
                title: this.$('#title').val(),
                content: this.$('#content').val()
            })

            return false;

        }

    });

    return {
        Application: Application,
        Slides: Slides,
        Slide: Slide,
        SlideForm: SlideForm
    }

})();
