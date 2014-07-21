;(function ( $, window, document, undefined ) {
    var pluginName = 'kenburnsy',
        defaults = {
          fullscreen: false,
          duration: 9000,
          fadeInDuration: 1500
    };

    var 
      index = 0,
      images = [],
      slides = [],
      transitions = {
        default: function (slide, duration) {
          $(slide)
            .velocity({
              rotateZ: '3deg',
              scale: '1.1'
            }, 0)
            .velocity({
              rotateZ: '0deg',
              scale: '1'
            }, duration);
        }
      };

    function Plugin (element, options) {
      this.el = element;
      this.$el = $(element);
      this.settings = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;
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
          .map(function () {
            return $(this).prop('src');
          })
          .map(function () {
            var proxyImage = new Image();
            proxyImage.src = this;
            return proxyImage;
          });

        this.$el.imagesLoaded(this.buildScene.bind(this));
      },

      revealSlide: function (slide) {
        var $el = this.$el;

        $(slide).velocity({ opacity: 0 }, 0, function () {
          $(this).appendTo($el);
        }).velocity('fadeIn', { duration: this.settings.fadeInDuration, queue: false });
      },

      next: function () {
        this.revealSlide(slides[index]);
        transitions['default'](slides[index], this.settings.duration);
        index = index === slides.length - 1 ? 0 : index + 1;
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
          this.$el.css({
            width: this.settings.width || (images[0].width + 'px'),
            height: this.settings.height || (images[0].height + 'px')
          });
        }

        this.next();
        setInterval(this.next.bind(this), (this.settings.duration - this.settings.fadeInDuration) );
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
