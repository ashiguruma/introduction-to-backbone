var Views = (function() {

    var Application = Backbone.View.extend({

        

    });

    var Slides = Backbone.View.extend({

        render: function() {
            var self = this;

            // Collect a slide view for each slide in the collection
            var slides = this.collection.map(function(slide) {

                // Create a new view for the slide and return it's element
                return new Views.Slide({ model: slide }).render().el;

            });

            // Add the slides elements to the slides list element
            self.$el.append(slides);

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

    return {
        Application: Application,
        Slides: Slides,
        Slide: Slide
    }

})();
