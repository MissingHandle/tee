tee.js
======

A small html-snippet helper library.

Created for use in client-side javascript, tee.js defines a global object, 
't', which lets you write small snippets of sugary, no-mistakes HTML.

t provides a function for every html5 tag, and allows you to pass in both content and attributes on the tag.

Examples
--------
```
t.h1({ class: 'first-snippet'}, "Hello World" )
```
returns:
```
"<h1 class='first-snippet'>Hello World</h1>"
```

Pass arguments in either order.
```
t.h1("Hello World", { class: 'first-snippet'})
```
returns
```
"<h1 class='first-snippet'>Hello World</h1>"
```

Tags are also nestable:
```
t.div({ class: 'parent'}, t.p({ class: 'child'}, "text"));
```
returns
```
"<div class='parent'><p class='child'>text</p></div>"
```

Dependencies
------------
underscore.js
