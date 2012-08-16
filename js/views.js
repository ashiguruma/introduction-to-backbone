/**
 * Views Namespace
 *
 * Create a Views namespace that holds all our views in one place.
 * You can access views using Views.VIEWNAME e.g.
 *
 * var slide = new Views.Slide();
 *
 */
var Views = (function() {

    /**
     * Application View
     *
     * The application view takes care of displaying info related to the slides,
     * in this case some stats about the slides
     */
    var Application = Backbone.View.extend({

        /**
         * Assign a template for the stats.
         * Grab the HTML template from within #stats-template and use
         * Underscore's _.template method to create a template we can
         * add data to
         */
        statsTemplate: _.template($('#stats-template').html()),

        // Create some event listeners for our view
        events: {
            'updateStats': 'updateStats'
        },

        // The initialize() method is called when the view is instantiated
        initialize: function () {

            // When the Application view is created update the stats
            this.updateStats();

        },

        /**
         * The updateStats method will updates stats display in the DOM
         */
        updateStats: function() {

            /**
             * Two things are happening here.
             * 
             * First, create the stats HTML ready to be output:
             *
             * this.statsTemplate({ data });
             *
             * The 'data' in this case is the number of slides in the
             * slides collection
             *
             * Second, add the newly rendered HTML to the #stats element
             */
            this.$('#stats').html(this.statsTemplate({
                count: app.collections.slides.length
            }));

        }

    });

    /**
     * Slides Collection View
     *
     * The Slides view takes care of rendering and updating the slides collection
     * in the DOM
     */
    var Slides = Backbone.View.extend({

        // The initialize() method is called when the view is instantiated
        initialize: function() {

            /**
             * When a slide is added to the slides collection call the renderOne() method,
             * we also pass a reference to the model we've just added
             */
            this.collection.on('add', this.renderOne, this);

            /**
             * When a slide is added or deleted from the collection trigger the
             * custom updateStats method on the stats view
             */
            this.collection.on('add destroy', function() {
                $('#stats').trigger('updateStats');
            });

        },

        /**
         * The addAll() method returns an array of all the HTML slide elements
         */
        addAll: function() {

            // Create a reference to the view that we can use inside the map callback
            var self = this;

            // Collect a slide view for each slide in the collection and return them
            return this.collection.map(function(model) {

                // Create a new view for the slide and return it's element
                return self.addOne(model);

            });

        },

        /**
         * The addOne() method returns the HTML element for a single slide model
         */
        addOne: function (model) {

            // Create a new view for the slide and return it's element
            return new Views.Slide({ model: model }).render().el;

        },

        /**
         * Calling renderAll() will append the HTML for every slide in the slides
         * collection.
         *
         * We add all the slides at once because otherwise we have to call
         * append once for each slide. If you have a lot of slides this
         * can be painfully slow
         */
        renderAll: function() {

            // Add the slides elements to the slides list element
            this.$el.append(this.addAll());

            // Return the view for chainability
            return this;

        },

        /**
         * Calling renderOne will render a single slide model
         *
         * This is used when we're adding a slide to the collection
         */
        renderOne: function(model) {

            // Add the slide to the slides list element
            this.$el.append(this.addOne(model));

            // Return the view for chainability
            return this;

        }

    });

    /**
     * Slide Model View
     *
     * The Slide view takes care of rendering, updating and deleting single
     * slide models in the DOM
     */
    var Slide = Backbone.View.extend({

        // The tag that should be used when rendering a slide (e.g <li>)
        tagName: 'li',

        // Class names that should be applied to the tag (e.g. <li class="slide">)
        className: 'slide',

        /**
         * Assign a template for the Slide view.
         * Grab the HTML template from within #slide-template and use
         * Underscore's _.template method to create a template we can
         * add data to
         */
        template: _.template($('#slide-template').html()),

        /**
         * This defines some event we should react to
         *
         * The format for events is 'event_type target_element': 'method_name'
         *
         * So 'click button.done': 'close' will call close when the done button
         * is clicked
         *
         * If you don't specify a 'target_element' then the listener will be
         * attached to the view's element
         */
        events: {
            // When a slide element is double clicked call the edit() method
            'dblclick': 'edit',

            // When the done button element is clicked call the close() method
            'click button.done': 'close'
        },

        // The initialize() method is called when the view is instantiated
        initialize: function() {

            /**
             * If the slide model is changed in any way it will trigger a
             * change event. Here, listen for the change event and call
             * the render() method. The changes are immediately reflected
             * in the DOM
             */
            this.model.on('change', this.render, this);

            /**
             * If a model is deleted it will fire a destroy event. Here, listen
             * for the destroy event and call the remove() method. This will remove
             * the destroyed model's view from the page
             */
            this.model.on('destroy', this.remove, this);

        },

        /**
         * The render() method create the HTML for a slide model and
         * places it inside the view's HTML element
         */
        render: function() {

            /**
             * Two things are happening here.
             * 
             * First, create the slide HTML ready to be output:
             *
             * this.template(this.model.toJSON());
             *
             * this.model.toJSON() takes the slide model's data and passes
             * it to the template as JSON data which is then output as HTML
             *
             * Second, add the newly rendered HTML to the Slide view's element
             */
            this.$el.html(this.template(this.model.toJSON()));

            // Return the view for chainability
            return this;

        },

        /**
         * The edit() method, when called, will change the state of a slide view
         * so it can be edited
         */
        edit: function() {

            // If we're already editing this slide exit here
            if (this.$el.hasClass('editing')) return false;

            /**
             * Add the 'editing' class to the slide's element. CSS in application.css
             * takes care of showing the right parts
             */
            this.$el.addClass('editing');

            // Focus on the title input field
            this.$('input').focus();

            // Return the view for chainability
            return this;

        },

        /**
         * The close() method will switch the state of a slide back from the editing
         * state to the viewing state
         */
        close: function() {

            /**
             * Update the slide model with the values in the title and
             * content fields
             */
            this.model.set({
                title: this.$('input').val(),
                content: this.$('textarea').val()
            });

            /**
             * Remove the 'editing' class from the slide's element. CSS in application.css
             * takes care of hiding the right parts
             */
            this.$el.removeClass('editing');

            // Return the view for chainability
            return this;

        }
    
    });

    /**
     * Add a Slide Form View
     *
     * The add slide form view takes care of updating the slide collection
     * with the data for a new slide entered into the form
     */
    var AddSlideForm = Backbone.View.extend({

        events: {
            // Listen for the submit event on the form and call the add() method
            'submit': 'add'
        },

        /**
         * The add() method will take data entered into the add slide form
         * and create a new slide in the collection. The collection will then
         * take care of rendering the new slide
         */
        add: function() {

            /**
             * This block will add the new slide's data to a new slide in the slides
             * collection. The slides collection is kind enough to take care of creating
             * the new slide model for us when we call '.add()'
             */
            app.collections.slides.add({
                title: this.$('#title').val(),
                content: this.$('#content').val()
            });

            // Reset the add form so we can use it again
            this.el.reset();

            // Stop the submit event from bubbling up and forcing a page refresh
            return false;

        }

    });

    /**
     * Expose the Views
     *
     * This way we can control what views are available for use in the main application.
     * This way it's possible to create private views which are only ever used by other
     * views
     */
    return {
        Application: Application,
        Slides: Slides,
        Slide: Slide,
        AddSlideForm: AddSlideForm
    }

})();
