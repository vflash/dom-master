dom-master
==================================================
Небольшая функция domMaster для постройки DOMHTML используя стилистику javascript 


Описание
--------------------------------------

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
