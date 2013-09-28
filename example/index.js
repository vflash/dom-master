window.onload = function() {
	var _ = master, pager;

	_(document.body
		, _('p.demo_tmpl' // #1  demo tmpl
			, _(elems.pager, {max: 20, num: 1, url_mask: '#/page/%s'})
			, _(elems.pager, {max: 20, num: 13, url_mask: '#/page/%s'})
			, _(elems.pager, {max: 20, num: 20, url_mask: '#/page/%s'})
		)


		, _('p.demo_ui' // #2 demo ui
			, pager = _(elems.pager, {max: 20, num: 20, url_mask: '#/page/%s'})
		)
	);


	var step = 1, num = 1;
	setInterval(function() {
		num += step;

		if (num > pager.max) {
			num = pager.max-1;
			step = -1;

		} else if (num < 1) {
			step = 1;
			num = 2;
		};

		pager.set({num: num});
	}, 250)
};