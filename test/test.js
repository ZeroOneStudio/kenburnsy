describe('Kenburnsy', function () {
  it('should be added to jQuery as a plugin', function () {
    expect($.fn.kenburnsy).to.be.a('function');
  });

  it('should have current index defaults to 0');

  describe('Constructor', function () {
    it('should read given image urls and store them in a variable');
  });

  describe('Private functions', function () {

    describe('Image preloader', function () {
      it('should preload image');
      it('should preload array of images');
    });

    it('should add classes to element');
    it('should add slide element to DOM with given image url as a background');
    it('should reveal image at given index');
    it('should animate image at given index');

  });

  describe('API', function () {
    it('should initialize and build scene');
    it('should add new images');
    it('should remove images');
    it('should show slide at given index');
    it('should switch to next slide');
    it('should switch to previous slide');
    it('should start animation loop');
    it('should stop animation loop');
  });
});