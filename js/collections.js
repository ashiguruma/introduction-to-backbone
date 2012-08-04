var Collections = (function() {

    var Slides = Backbone.Collection.extend({
        model: Models.Slide
    });

    return {
        Slides: Slides
    }

})();
