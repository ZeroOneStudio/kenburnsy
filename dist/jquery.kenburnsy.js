/*
 *  Kenburnsy - v0.0.3
 *  Easy to use JQuery plugin to make slideshows with Ken Burns effect
 *  
 *
 *  Made by Zero.One
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {
    var pluginName = 'kenburnsy',
        defaults = {
          fullscreen: false,
          duration: 9000,
          fadeInDuration: 1500,
          width: null,
          height: null
        };

    //
    // Private properties
    //
    var 
      images = [],
      slides = [],
      transitions = {
        zoomOut: function (slide, duration) {
          $(slide)
            .velocity({
              rotateZ: '3deg',
              scale: '1.1'
            }, 0)
            .velocity({
              translateZ: 0,
              rotateZ: '0deg',
              scale: '1'
            }, duration);
        },
        zoomIn: function (slide, duration) {
          $(slide)
            .velocity({
              rotateZ: '0deg',
              scale: '1'
            }, 0)
            .velocity({
              translateZ: 0,
              rotateZ: '3deg',
              scale: '1.1'
            }, duration);
        }
      };

    //
    // Private methods
    //
    var preloadImages = function (images, callback) {
      var deferreds;

      deferreds = images.map(function (i, imageEl) {
        var promise = new jQuery.Deferred(function () {
          imageEl.addEventListener('load', this.resolve);
        });
        return promise;
      });

      $.when(deferreds).done(callback);
    };

    function Plugin (element, options) {
      this.el = element;
      this.$el = $(element);
      this.settings = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;
      this.index = 0;
      this.init();
    }

    $.extend(Plugin.prototype, {
      init: function () {
        var settings = this.settings;

        this.$el.addClass(function () {
          var classes = [pluginName];

          if (settings.fullscreen) { classes.push('fullscreen'); }

          return classes.join(' ');
        });

        images = this.$el
          .children()
          .map(function (i, imageEl) {
            return $(imageEl).prop('src');
          })
          .map(function (i, imageURL) {
            var proxyImage = new Image();
            proxyImage.src = imageURL;
            return proxyImage;
          });

        // TODO: Remove need of "binding" buildScene()
        preloadImages(images, this.buildScene.bind(this));
      },

      revealSlide: function (slide) {
        var $el = this.$el;

        $(slide).velocity({ opacity: 0 }, 0, function () {
          $(this).appendTo($el);
        }).velocity({ opacity: 1, translateZ: 0 }, { duration: this.settings.fadeInDuration, queue: false });
      },

      show: function (index) {
        var keys = Object.keys(transitions),
            transition = transitions[keys[Math.floor(keys.length * Math.random())]],
            duration = this.settings.duration,
            slide = slides[index];

        this.revealSlide(slide);
        transition(slide, duration);
      },

      next: function () {
        this.index = this.index === slides.length - 1 ? 0 : this.index + 1;
        this.show(this.index);
      },

      buildScene: function () {
        var el = this.el;

        el.innerHTML = '';

        slides = images.map(function () {
          var slide = document.createElement('div');
          slide.style.backgroundImage = 'url(' + this.src + ')';
          slide.className = 'slide';

          el.appendChild(slide);

          return slide;
        });

        if (!this.settings.fullscreen) {
          // TODO: For some reason dimensions appears to be 0 in Safari sometimes
          this.$el.width(this.settings.width || images[0].naturalWidth || images[0].width);
          this.$el.height(this.settings.height || images[0].naturalheight || images[0].height);
        }

        // TODO: Remove need of "binding" next()
        // TODO: Play just animation first — then start loop with revealing next slide
        this.show(0);
        setInterval( this.next.bind(this), (this.settings.duration - this.settings.fadeInDuration) );
      }
    });




    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
      this.each(function() {
        if ( !$.data( this, 'plugin_' + pluginName ) ) {
          $.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
        }
      });

      // chain jQuery functions
      return this;
    };

})( jQuery, window, document );
