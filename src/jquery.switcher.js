/*!
 * Switcher 1.0.0
 *
 * Copyright © Capiner https://capiner.com
 * MIT License https://github.com/capiner/switcher/blob/master/LICENSE
 */
(function($){
	$.Switcher = function(options, element){
		this.e = $(element);
		this.o = $.extend(true, {}, $.Switcher.defaults, options);
		this.s = this.e.children('div');
		this.init()
	};
	$.Switcher.prototype = {
		init: function(){
			var self = this,
				$title1 = self.s.children(self.o.titleClass + ':first'),
				$panel1 = self.s.children(self.o.panelClass + ':first'),
				$titles = self.s.children(self.o.titleClass),
				$panels = self.s.children(self.o.panelClass);
			$titles.on('click', function(){
				if (self.e.hasClass('tabbable') || self.e.hasClass('accordion')){
					var $item = $(this);
					self.toggle($item);
					return false
				}
			});
			function windowResize(){
				if (self.e.hasClass('tabbable') || self.e.hasClass('accordion')){
					if (self.o.opened == 'tab'){
						if (self.e.hasClass('tabbable'))
							$titles.addClass('active'), $panels.addClass('active').css('display','inline-block');
					} else if (self.o.opened == 'accordion'){
						if (self.e.hasClass('accordion'))
							$titles.addClass('active'), $panels.addClass('active').css('display','block');
					} else if (self.o.opened){
						$titles.addClass('active'), $panels.addClass('active');
						if (self.e.hasClass('tabbable'))
							$panels.css('display','inline-block');
						if (self.e.hasClass('accordion'))
							$panels.css('display','block');
					}
					if (self.o.firstActive == 'tab'){
						if (self.e.hasClass('tabbable'))
							$title1.addClass('active'), $panel1.addClass('active').css('display','inline-block');
					} else if (self.o.firstActive == 'accordion'){
						if (self.e.hasClass('accordion'))
							$title1.addClass('active'), $panel1.addClass('active').css('display','block');
					} else if (self.o.firstActive){
						$title1.addClass('active'), $panel1.addClass('active');
						if (self.e.hasClass('tabbable'))
							$panel1.css('display','inline-block');
						if (self.e.hasClass('accordion'))
							$panel1.css('display','block');
					}
					if (self.o.autoCollapse == 'tab'){
						self.e.hasClass('tabbable') ?
							self.e.addClass('auto'):
							self.e.removeClass('auto');
					} else if (self.o.autoCollapse == 'accordion'){
						self.e.hasClass('accordion') ?
							self.e.addClass('auto'):
							self.e.removeClass('auto');
					} else if (self.o.autoCollapse){
						self.e.addClass('auto');
					}
					if (self.o.opener){
						self.s.find(self.o.titleClass).each(function(){
							$(this).find(self.o.openerClass + ':first').empty().append(self.o.opener)
						})
					}
					if (self.o.closer){
						self.s.find(self.o.titleClass + '.active').each(function(){
							$(this).find(self.o.openerClass + ':first').empty().append(self.o.closer)
						})
					}
				}
			} windowResize();
			if (self.o.threshold){
				if (window.innerWidth < self.o.threshold)
					var i = 1;
				else
					var i = 0;
				$(window).resize(function(){
					if (window.innerWidth < self.o.threshold){
						if (i == 0)
							$titles.removeClass('active'), $panels.removeClass('active').css('display',''), windowResize(), i = 1;
					} else {
						if (i == 1)
							$titles.removeClass('active'), $panels.removeClass('active').css('display',''), windowResize(), i = 0;
					}
				})
			}
		},
		toggle: function($item){
			var self = this,
				$target = self.s.children('#' + $item.attr('data-target')),
				$titles = $item.siblings(self.o.titleClass),
				$panels = $target.siblings(self.o.panelClass);
			if ($item.hasClass('active')){
				if (self.o.autoCollapse == 'tab'){
					if (self.e.hasClass('tabbable'))
						$titles.removeClass('active'), $panels.fadeOut(self.o.speed,self.o.easing).removeClass('active');
				} else if (self.o.autoCollapse == 'accordion'){
					if (self.e.hasClass('accordion'))
						$titles.removeClass('active'), $panels.slideUp(self.o.speed,self.o.easing).removeClass('active');
				} else if (self.o.autoCollapse){
					$titles.removeClass('active'), $panels.removeClass('active');
					if (self.e.hasClass('tabbable'))
						$panels.fadeOut(self.o.speed,self.o.easing);
					if (self.o.autoCollapse == 'accordion')
						$panels.slideUp(self.o.speed,self.o.easing);
				}
				if (self.o.manualCollapse == 'tab'){
					if (self.e.hasClass('tabbable'))
						$item.removeClass('active'), $target.stop(true,true).removeClass('active').fadeOut(self.o.speed,self.o.easing);
				} else if (self.o.manualCollapse == 'accordion'){
					if (self.e.hasClass('accordion'))
						$item.removeClass('active'), $target.stop(true,true).removeClass('active').slideUp(self.o.speed,self.o.easing);
				} else if (self.o.manualCollapse){
					$item.removeClass('active'), $target.stop(true,true).removeClass('active');
					if (self.e.hasClass('tabbable'))
						$target.fadeOut(self.o.speed,self.o.easing);
					if (self.e.hasClass('accordion'))
						$target.slideUp(self.o.speed,self.o.easing);
				}
			} else {
				if (self.o.autoCollapse == 'tab'){
					$item.addClass('active'), $target.stop(true,true).addClass('active');
					if (self.e.hasClass('tabbable'))
						$target.fadeIn(self.o.speed,self.o.easing).css('display','inline-block'), $titles.removeClass('active'), $panels.removeClass('active').fadeOut(self.o.speed,self.o.easing);
					if (self.e.hasClass('accordion'))
						$target.slideDown(self.o.speed,self.o.easing);
				} else if (self.o.autoCollapse == 'accordion'){
					$item.addClass('active'), $target.stop(true,true).addClass('active');
					if (self.e.hasClass('tabbable'))
						$target.fadeIn(self.o.speed,self.o.easing).css('display','inline-block');
					if (self.e.hasClass('accordion'))
						$target.slideDown(self.o.speed,self.o.easing), $titles.removeClass('active'), $panels.removeClass('active').slideUp(self.o.speed,self.o.easing);
				} else if (self.o.autoCollapse){
					$item.addClass('active'), $target.stop(true,true).addClass('active'), $titles.removeClass('active'), $panels.removeClass('active');
					if (self.e.hasClass('tabbable'))
						$target.fadeIn(self.o.speed,self.o.easing).css('display','inline-block'), $panels.fadeOut(self.o.speed,self.o.easing);
					if (self.e.hasClass('accordion'))
						$target.slideDown(self.o.speed,self.o.easing), $panels.slideUp(self.o.speed,self.o.easing);
				} else {
					$item.addClass('active'), $target.stop(true,true).addClass('active');
					if (self.e.hasClass('tabbable'))
						$target.fadeIn(self.o.speed,self.o.easing).css('display','inline-block');
					if (self.e.hasClass('accordion'))
						$target.slideDown(self.o.speed,self.o.easing);
				}
			}
			if (self.o.opener){
				self.s.find(self.o.titleClass).each(function(){
					$(this).find(self.o.openerClass + ':first').empty().append(self.o.opener)
				})
			}
			if (self.o.closer){
				self.s.find(self.o.titleClass + '.active').each(function(){
					$(this).find(self.o.openerClass + ':first').empty().append(self.o.closer)
				})
			}
		}
	};
	$.fn.Switcher = function(options){
		if (typeof options === 'string'){
			var args = Array.prototype.slice.call(arguments, 1);
			this.each(function(){
				var Switcher = $.data(this, 'Switcher');
				Switcher[options].apply(Switcher, args)
			})
		} else {
			this.each(function(){
				var Switcher = $.data(this, 'Switcher');
				if (!Switcher) $.data(this, 'Switcher', new $.Switcher(options, this))
			})
		}
		return this
	};
	$.Switcher.defaults = {
		threshold      : '768',
		titleClass     : '.title',
		panelClass     : '.panel',
		openerClass    : '.opener',
		opened         : false,
		firstActive    : true,
		autoCollapse   : 'dual',
		manualCollapse : 'accordion',
		speed          : 300,
		easing         : 'swing',
		opener         : null,
		closer         : null
    }
})(jQuery)