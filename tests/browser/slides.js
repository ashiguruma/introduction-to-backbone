var should = chai.Should();

/**
 * Single Slide instance tests
 *
 * A Slide defines the structure of a single slide
 */
describe('Slide', function(){

    var slide = null;

    before(function() {

        slide = new Models.Slide();

    });

    it('should be an object', function() {

        slide.should.be.a('object');

    });

    describe('#defaults', function() {

        it('should have a default of title', function() {

            slide.should.have.deep.property('attributes.title')
            .and.be.a('string');

        });

        it('should have default content', function() {

            slide.should.have.deep.property('attributes.content')
            .and.be.a('string');

        });

        it('should have a default active state of true', function() {

            slide.should.have.deep.property('attributes.active')
            .and.be.a('boolean')
            .and.be.true;

        });

    });

    describe('#hide', function() {

        it('should set the active state to false', function() {

            slide.hide();
            slide.get('active').should.be.false;

        });

    });

    describe('#show', function() {

        it('should set the active state to true', function() {

            slide.show();
            slide.get('active').should.be.true;

        });

    });

});

/**
 * Slide Collection tests
 *
 * A collection holds multiple slide models
 */
describe('Slides', function() {

    var slides = null

    before(function() {

        slides = new Collections.Slides();

    });

    it('should be an object', function() {

        slides.should.be.a('object');

    });

});
