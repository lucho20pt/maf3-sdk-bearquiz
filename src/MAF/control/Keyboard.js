define('MAF.control.Keyboard', function () {
	var keyboards = {},
		repeaters = {};
	var createKeyboard = function () {
		var repeater = repeaters[this._classID] = {
			valueChanged: (function () {
				this.fire('onValueChanged', {
					value: this.getValue()
				});
			}).bindTo(this),
			maxLengthExceeded: (function () {
				this.fire('onMaxLengthExceeded');
			}).bindTo(this),
			keyDown: (function (evt) {
				this.fire('onKeyDown', evt, evt.type ? evt : null);
			}).bindTo(this)
		};

		// @TODO replace container with the keyboard
		var keyboard = keyboards[this._classID] = new MAF.keyboard.ReuseKeyboard({
			focus:            this.config.focus,
			autoAdjust:       true,
			allowSpace:       this.config.allowSpace,
			maxLength:        this.config.maxLength,
			controlSize:      this.config.controlSize,
			startShifted:     this.config.startShifted,
			startExtended:    this.config.startExtended,
			startFocused:     this.config.startFocused,
			layout:           this.config.layout,
			availableLayouts: this.config.availableLayouts,
			wrapNavigation:   this.config.wrapNavigation
		});

		keyboard.element.hAlign = 'center';
		keyboard.element.owner = this;
		keyboard.appendTo(this.element);
		this.setStyle('height', keyboard.element.height);

		keyboard.onValueChanged = repeater.valueChanged;
		keyboard.onMaxLengthExceeded = repeater.maxLengthExceeded;
		keyboard.onKeyDown = repeater.keyDown;
	};
	return new MAF.Class({
		ClassName: 'ControlKeyboard',
		Extends: MAF.element.Container,

		config: {
			embedded: true,
			focus: true,
			controlSize: 'standard',
			autoAdjust: true,
			allowSpace: true,
			maxLength: 99,
			startShifted: false,
			wrapNavigation: true
		},

		Protected: {
			dispatchEvents: function (event, payload) {
				switch (event.type) {
					case 'focus':
						this.focus();
						break;
				}
			},
			generateStatePacket: function (packet) {
				return Object.merge({
					value: this.getValue(),
					focused: keyboards[this._classID].element.hasFocus
				}, packet);
			},
			inspectStatePacket: function (packet, focusOnly) {
				if (!this.config.guid) {
					return packet;
				}
				if (packet && !(this.config.guid in packet)) {
					return packet;
				}
				var data = packet && packet[this.config.guid],
					type = typeOf(data);
				if (type === 'null' || type === 'undefined') {
					return packet;
				}
				if (focusOnly) {
					if (data.focused) {
						this.focus();
					}
				} else {
					switch (type) {
						case 'boolean':
						case 'string':
							return this.setValue(data);
						case 'object':
							for (var item in data) {
								switch (item) {
									case 'value':
										if (data[item]) {
											this.setValue(data[item]);
										}
										break;
								}
							}
							break;
					}
				}
				return data;
			}
		},

		initialize: function () {
			if (this.config.autoAdjust && this.config.styles) {
				delete this.config.styles.height;
			}

			this.parent();

			this.element.wantsFocus = false;

			createKeyboard.call(this);

			if (this.config.value) {
				this.setValue(this.config.value);
			}
			delete this.config.value;

			if (this.config.autoAdjust) {
				this.setStyle('height', keyboards[this._classID].element.height);
			}
		},

		getValue: function () {
			return keyboards[this._classID].getValue();
		},

		setValue: function (value) {
			return keyboards[this._classID].setValue(value);
		},

		appendToValue: function (characters) {
			return keyboards[this._classID].appendToValue(characters);
		},

		deleteFromValue: function (count) {
			return keyboards[this._classID].deleteFromValue(count);
		},

		clearValue: function () {
			return keyboards[this._classID].clearValue();
		},

		loadLayout: function (layout, options) {
			return keyboards[this._classID].loadLayout(layout, options);
		},

		focus: function () {
			return keyboards[this._classID].focus();
		},

		resetFocus: function () {
			return keyboards[this._classID].resetFocus();
		},

		reset: function () {
			return keyboards[this._classID].reset();
		},

		getShiftState: function () {
			return keyboards[this._classID].getShiftState();
		},

		setShiftState: function (state) {
			return keyboards[this._classID].setShiftState(state);
		},

		toggleShift: function () {
			return keyboards[this._classID].toggleShift();
		},

		getExtendedState: function () {
			return keyboards[this._classID].getExtendedState();
		},

		setExtendedState: function (state) {
			return keyboards[this._classID].setExtendedState(state);
		},

		toggleExtendedState: function () {
			return keyboards[this._classID].toggleExtended();
		},

		toggleKey: function (key) {
			keyboards[this._classID].toggleKey(key);
		},

		suicide: function () {
			var classId = this._classID;
			if (keyboards[classId]) {
				keyboards[classId].suicide();
			}
			keyboards[classId] = null;
			delete keyboards[classId];
			repeaters[classId] = null;
			delete repeaters[classId];
			this.parent();
		}
	});
}, {
	ControlKeyboard: {
		styles: {
			width: 'inherit'
		}
	}
});
