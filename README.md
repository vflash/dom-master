dom-master
==================================================
Небольшая функция domMaster для постройки DOMHTML используя стилистику javascript 


Использовать **domMaster** можно как модуль **scmod** так и самостоятельным файлом. 
**domMaster** это обычная фукция, которая делает две веши: создает элемент и наполняет элемент содержимым.


###Коротко о главном:###

```js
	//
	var _ = domMaster;

	//## создаение html элемента
	var node = _('div'); // аналог document.createElement('div')
	var node = _('div.css_className');  // с указанием атрибута [class]
	var node = _('div.css_className#id_element');	// с указанием атрибута [id]
	var node = _('div.css_className#id_element', {title: "title text", style: 'color: #000;', ...});	// с указанием других атрибутов

	//## создаение элемента через вызов конструктора
	// cmps.elementBlock = function(master, options) {... код ...}
	var node = _(cmps.elementBlock);	// анологично new cmps.elementBlock(domMaster, false)
	var node = _(cmps.elementBlock, options);	// анологично new cmps.elementBlock(domMaster, options)


	//## наполнение элемента другими элементами
	var node = _('div.css_classname#id_element' // создаваемый элемент node
		, _('hr') // созданный <hr> будет добавлен по аналогии -- node.appendchild( document.createElement('hr') )
		, "text text text"  // текстовый аргумент будет добавлен как текстовый элемент -- node.appendchild( document.createtextnode("text text text") )
		, 123456789 // по анологи с текстом будет создан текстовый элемент -- node.appendchild( document.createtextnode(123456789) )
		, false // true|false|null|undefined|function - будут проигнорированы

		, [_('hr'), _('hr'), "text", [.., ...], ...] // все элементы массива будут добавленны в node. 

		, _('span.text', "text")
	);


```

###Компоненты:###

Кроме html элементов div, span, ol, li ,table, ...  можно оперировать и компонентами. <br>
Компонент это js-обьект с обязательным своством **nodeType** меньше нуля **{nodeType: -1, ...}**. <br>
У компонента есть не обязательные свойства **node** и **box**, {nodeType: -1, node: elementRoot, box: elementBox} .<br>
Если требуется возможность вставлять html-древо компонета в другое дерево то у компонета должно быть свойство **node**.<br>
Если требуется вставлять HTML в этот компонет, то должно быть свойство **box**. Если своства **box** нет то его роль выполняет свойство **node** .

```js
// пример компонента cmps.block
cmps.block = function(_, options) {
	this.nodeType = -1;

	this.node = _('div.block-root'
		, _('h4.block-head'
			, _.text(options.title)
		)
		, this.box = _('div.block-box')
	);
}

function create() {
	var _ = domMaster;
	
	var x = _('section'
		, _(cmps.block, {title: "Example text"}
			, _('p'
				, "Text Text Text"
			)
		)
	);
	
	console.log(x.outerHTML); 
	/* 
	<section>
		<div class="block-root">
			<h4 class="block-head">Example text</h4>
			<div class="block-box">
				<p>Text Text Text</p>
			</div>
		</div>
	</section>
	*/

};

```

Если у компонента есть метод **x.appendChild(elem)**  то domMaster игнорирует **x.box** и вставляет элементы в компонент через эту функцию.

```js
// пример использования метода appendChild компоненте
cmps.block = function(_, options) {
	this.nodeType = -1;

	this.appendChild = function(n) {
		if (!n || n.nodeName !== 'P') return;
		this.box.appendChild(n)
	};

	this.node = _('div.block-root'
		, _('h4.block-head'
			, _.text(options.title)
		)
		, this.box = _('div.block-box')
	);
}

function create() {
	var _ = domMaster;
	
	var x = _('section'
		, _(cmps.block, {title: "Example text"}
			, _('p', "Text1 Text1 Text1")
			, _('i', "Text2 Text2 Text2")
			, _('p', "Text3 Text3 Text3")
		)
	);
	
	console.log(x.outerHTML); 
	/* 
	<section>
		<div class="block-root">
			<h4 class="block-head">Example text</h4>
			<div class="block-box">
				<p>Text1 Text1 Text1</p>
				<p>Text3 Text3 Text3</p>
			</div>
		</div>
	</section>
	*/

};

```





