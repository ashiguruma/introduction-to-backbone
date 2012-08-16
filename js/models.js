/**
 * Models Namespace
 *
 * The Models namespace holds all the Models used in our app
 * Models can be created like so:
 *
 * var slide = new Models.Slide();
 *
 * In the case of Models their creation tends to be automatically
 * handled by a Collection e.g. slides.add(slide.toJSON())
 */
var Models = (function() {

    /**
     * Create a Slide Model definition that will be used to create slides
     */
    var Slide = Backbone.Model.extend({

        /**
         * Define some default values. These will be used upon creation
         * if a value is not specified
         */
        defaults: {
            title: 'Untitled Slide',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            active: false
        },

        // The initialize() method is called when the model is instantiated
        initialize: function() {

            // Nothing to do here at the moment

        },

        /**
         * The show() method is syntactic sugar for setting the active state to 'true'
         * This could be called from the slide view to show a slide
         */
        show: function() {

            // Set the 'active' property of the slide model to true
            this.set({active: true});

            // Return the model for chainability
            return this;

        },

        /**
         * The hide() method is syntactic sugar for setting the active state to 'false'
         * This could be called from the slide view to hide a slide
         */
        hide: function() {

            // Set the 'active' property of the slide model to false
            this.set({active: false});

            // Return the model for chainability
            return this;

        }

    });

    // Expose Models for use in the app
    return {
        Slide: Slide
    }

})();
