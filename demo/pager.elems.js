
// extend ui pager
elems.pager = new function() {
	function comp(master, pr) {
		this.master = master;

		if (pr.num > 0) this.num = pr.num;
		if (pr.max > 0) this.max = pr.max;
		if (pr.css) this.css = pr.css;

		if (pr.url_mask) this.url_mask = pr.url_mask;
		if (pr.url_first) this.url_first = pr.url_first;


		res(this);
	};

	comp.prototype = {
		nodeType: -1, // флаг для мастера

		max: 1,
		num: 1,

		set: function(p, v) {
			var ch;
			if (typeof p === 'object') {
				if (p.max > 0 && p.max !== this.max) {
					ch = true;
					this.max = p.max;
				};

				if (p.num > 0 && p.num !== this.num) {
					ch = true;
					this.num = p.num;
				};
			};

			if (ch) {
				res(this);
			};
		}
	};


	function res(ui) {
		var pr = {}, num = ui.num, max, pages=[], A = 1, B, i;

		max  = ui.max > 1 ? ui.max : 1;
		num = num > 1 ? (num > max ? max : num) : 1;


		if (num > 7) {
			pages = [{num:1}, {num:2}, {num:2 + ((num - 5)>>1), is_skip: true}];
			A = num - 3;
		};

		//B = max - num > 6 ? (A+6) : max;
		if (max - num <= 6) {
			B = max;
			A = max - 6;
		} else {
			B = A+6;
		};


		for (i = A; i <= B; i++) {
			pages.push({num: i, is_selected: i == num});
		};

		if (max - num > 6) {
			pages = pages.concat([{num: 1+num+((max-num)>>1), is_skip: true}, {num: max-1}, {num: max}])
		};

		var nn = new tmpl.mailbox_pager(ui.master, {
			css: ui.css,
			url_mask: ui.url_mask, //'#/page/'

			pages: pages,
			next_page: num !== B,
			prev_page: num !== 1,
			num: num,
			max: max
		});

		if (ui.node) {
			if (i = ui.node.parentNode) {
				i.replaceChild(nn.node, ui.node)
			};
		};

		ui.node = nn.node;
		ui.nodes = nn;
	};

	return comp;
};

