
tmpl.mailbox_pager = function(_, pr) {

	this.node = _('div.b-pager', {css: pr.css}
		, _((pr.next_page ? 'a' : 'span')
			, {
				css: 'b-pager-next',
				title: (pr.next_page ? "Перейти на следующую страницу":''),
				href: (pr.url_mask ? String(pr.url_mask).replace('%s', pr.num+1) : '#/p'+(pr.num+1))
			}

			, _('span.b-pager-text', "Следующая")
			, _('span.b-pager-key'
				, ' Ctrl '
				, _('span.b-pager-arr'
					, '\u2192' //'→'
				)
			)

		)


		, _((pr.prev_page ? 'a' : 'span')
			, {
				css: 'b-pager-prev',
				title: (pr.prev_page ? "Перейти на предыдущую страницу":''),
				href: (pr.url_mask ? String(pr.url_mask).replace('%s', pr.num-1) : '#/p'+(pr.num-1))
			}

			, _('span.b-pager-key'
				, _('span.b-pager-arr'
					, '\u2190' //'←'
				)
				, ' Ctrl '
			)
			, _('span.b-pager-text', "Следующая")
		)


		, _('span.b-pager-box'
			, _.map(pr.pages, function(v) {
				if (v.is_selected) {
					return _('span.b-pager-page b-pager-page--selected', {title: "Текущая страница", text: v.num})
				};

				return _('a.b-pager-page'
					, {
						href: pr.url_mask ? String(pr.url_mask).replace('%s', v.num) : '#/p'+v.num,
						title: ("Перейти на страницу %s").replace('%s', v.num),
						text: (v.is_skip ?'...' : v.num)
					}
				);
			})
		)
	)
};

