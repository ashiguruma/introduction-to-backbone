var Models = (function() {

    var Slide = Backbone.Model.extend({
    
        defaults: {
            title: 'Untitled Slide',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            active: false
        },

        initialize: function() {

            

        },

        show: function() {

            this.set({active: true});

        },

        hide: function() {

            this.set({active: false});

        }
    
    });

    return {
        Slide: Slide
    }

})();
