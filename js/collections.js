var Collections = (function() {

    var Slides = Backbone.Collection.extend({
        model: Models.Slide,
    
        initialize: function() {
        
        }
    
    });

    return {
        Slides: Slides
    }

})();
