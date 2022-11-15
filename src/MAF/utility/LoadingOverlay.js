define('MAF.utility.LoadingOverlay', function () {
	return {
		show: function () {
			return this.active ? this.active : (this.active = true) && MAF.utility.BusyIndicators.check();
		},
		hide: function () {
			return this.active ? (this.active = false) || MAF.utility.BusyIndicators.check() : this.active;
		},
		on: function () {
			return this.show();
		},
		off: function () {
			return this.hide();
		},
		toggle: function () {
			return this.active ? this.hide() : this.show();
		},
		check: function () {
			return this.active;
		}
	};
});