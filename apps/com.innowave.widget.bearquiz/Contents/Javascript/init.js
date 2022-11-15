include('Javascript/Core/ApplicationManager.js');
include('Javascript/Views/intro.js');
include('Javascript/Views/help.js');
include('Javascript/Views/exit.js');
include('Javascript/Views/theme.js');
include('Javascript/Views/question.js');
include('Javascript/Views/result.js');


Theme.set({
	BaseFocus: {
		applyLayer: function (frame, args, theme) {
			if (!frame.hasClass('BaseFocus')) {
				frame.removeClass('BaseFocus');
				return frame;
			}
			return;
		},
		styles: {
			//backgroundColor: "rgba(0, 0, 0, 0)"
		}
		
	},
	BaseGlow: {
		styles: {
			backgroundColor: "rgba(0, 0, 0, 0)"
		}
		
	}
});

MAF.application.init({
	views: [
		{ id: 'view-intro', viewClass: intro },
		{ id: 'view-help', viewClass: help },
		{ id: 'view-exit', viewClass: exit },
		{ id: 'view-theme', viewClass: theme },
		{ id: 'view-question', viewClass: question },
		{ id: 'view-result', viewClass: result }
	],
	defaultViewId: 'view-intro',
	settingsViewId: null
});

