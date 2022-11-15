define('MAF.control.PageIndicator', function () {
	return new MAF.Class({
		ClassName: 'ControlPageIndicator',

		Extends: MAF.control.Button,

		Protected: {
			dispatchEvents: function (event, payload) {
				switch(event.type) {
					case 'navigate':
						if (event.detail && event.detail.direction) {
							if (event.detail.direction === 'left' || event.detail.direction === 'right') {
								event.preventDefault();
								return this.shiftSource(event.detail.direction);
							}
						}
						break;
				}
				this.parent(event, payload);
			},
			createContent: function () {
				this.content = new MAF.element.Text({
					ClassName: this.ClassName + 'TextLink'
				}).appendTo(this);
			},
			buildDots: function (curpage, pagecount, state) {
				var dots = '';
				for (var i = 0; i < pagecount; i++) {
					dots += FontAwesome.get(curpage === i ? 'circle-blank' : 'circle') + ' ';
				}
				return dots.trim();
			},
			buildText: function (curpage, pagecount, state) {
				if (this.config.updateText && this.config.updateText.call) {
					return this.config.updateText(curpage, pagecount, state);
				} else {
					return FontAwesome.get('caret-left') + ' ' + widget.getLocalizedString('PAGE', [parseInt(curpage, 10) + 1, pagecount]) + ' ' + FontAwesome.get('caret-right');
				}
			},
			onSourceUpdated: function (event) {
				return this.update(event.payload);
			}
		},

		config: {
			threshold: 0,
			arrowPadding: 6,
			imageSources: null,
			autoDisableWhenEmpty: true
		},

		initialize: function () {
			this.parent();
			var source = this.config.sourceElement || this.config.source;
			if (source) {
				this.attachToSource(source);
			}
			this.config.source = null;
			delete this.config.source;
			this.config.sourceElement = null;
			delete this.config.sourceElement;
		},

		attachToSource: function (source) {
			if (!source || source === this.source) {
				return this.update();
			}
			this.source = source;
			this.onSourceUpdated.subscribeTo(this.source, 'onStateUpdated', this);
			return this.update();
		},

		getSourceCurrentPage: function () {
			return this.source ? this.source.getCurrentPage() : 1;
		},

		getSourcePageCount: function () {
			return this.source ? this.source.getPageCount() : 1;
		},

		getSourceCarousel: function () {
			return this.source ? this.source.config.carousel : false;
		},

		update: function (state) {
			var currentPage = state && state.currentPage ? state.currentPage : this.getSourceCurrentPage() || 0,
				pageCount = state && state.pageCount ? state.pageCount : this.getSourcePageCount() || 1,
				useDots = pageCount < (parseInt(this.config.threshold, 10) || 0),
				build = useDots ? this.buildDots : this.buildText;

			this.content.setText(build.call(this, currentPage, pageCount, state));

			if (useDots) {
				this.element.wantsFocus = false;
				this.content.setStyle('fontSize', 14);
			} else if (pageCount > 0) {
				this.element.wantsFocus = true;
				this.content.setStyle('fontSize', null);
			}

			if (this.config.focus === false) {
				this.element.wantsFocus = false;
			}

			if (this.config.autoDisableWhenEmpty) {
				this.setDisabled((pageCount < 2));
			}

			return this;
		},

		shiftSource: function (direction) {
			this.source.shift(direction);
		},

		suicide: function () {
			delete this.previousPage;
			delete this.source;
			this.parent();
		}
	});
}, {
	ControlPageIndicator: {
		renderSkin: function (state, w, h, args, theme) {
			var ff = new Frame();
			theme.applyLayer('BaseGlow', ff);
			if (state === 'focused') {
				theme.applyLayer('BaseFocus', ff);
			}
			theme.applyLayer('BaseHighlight', ff);
			return ff;
		},
		styles: {
			width: 'inherit',
			height: '38px'
		}
	},
	ControlPageIndicatorTextLink: {
		styles: {
			width: 'inherit',
			height: 'inherit',
			anchorStyle: 'center'
		}
	}
});
