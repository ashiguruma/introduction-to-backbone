/**
 * Collections Namespace
 *
 * The Collections namespace holds all the Collections used in our app
 * Collections can be created like so:
 *
 * var slides = new Collections.Slides();
 *
 */
var Collections = (function() {

    /**
     * Create a Slides Collection definition that will be used to hold the slides
     * in our presentation
     */
    var Slides = Backbone.Collection.extend({
        /**
         * Pass a reference the the Slide Model into the Collection
         * This way, when we add a slide (or slides) to the slides
         * collection the Slide Model will automatically be used
         */
        model: Models.Slide,

        // The initialize() method is called when the collection is instantiated
        initialize: function() {

            // Nothing to do here at the moment

        }

    });

    // Expose Collections for use in the app
    return {
        Slides: Slides
    }

})();
