// **********************************************************
// 
// tee - A small html-snippet helper library!
// 
// Adds a single global object, t, which provides methods for every html tag and returns
// the correclty formed html snippet as a string
// 
// Created for use in client-side javascript, 
// t writes small snippets of sugary, no-mistakes HTML.
//
// example:
// t.h1("Hello World", { class: 'first-snippet'}) = "<h1 class='first-snippet'>Hello World</h1>"
// 
// pass arguments in either order:
// t.h1({ class: 'first-snippet'}, "Hello World" ) = "<h1 class='first-snippet'>Hello World</h1>"
// 
// Dependencies:
// - underscore.js
// 
// **********************************************************
_.templateSettings = {
  interpolate : /\(\%\=(.+?)\%\)/g,
  evaluate    : /\(\%(.+?)\%\)/g,
  escape      : /\(\%\-(.+?)\%\)/g //interpolate with first escaping HTML
};

//internal var for storing all html-creating functions :).
window.t = {};

// MUST BE KEPT ALPHABETICAL TO BE PROPERLY USED WITH UNDERSCORE'S BINARY-SEARCH ALGO.
t.SELF_CLOSING_TAGS = [
  "area", "base", "br", "col", "command", 
  "embed", "hr", "img", "input", "keygen", 
  "link", "meta", "param", "source", "track", "wbr"
];

// Two underscore templates,
// one for self-closing tags, one for regular closing tags.
// used internally by 't'.
t.sc_template = _.template("<(%= tag %)(% _.each(atts, function(value, key) { %) (%= key %)='(%= value %)'(% }); %) />");
t.ct_template = _.template(
  "<(%= tag %)(% _.each(atts, function(value, key) { %) (%= key %)='(%= value %)'(% }); %)>" +
    "(%= content %)" + 
  "</(%= tag %)>"
);


// tag(_tag [, content] [, attributes])
// OR
// tag(_tag [, attributes] [, content])
//  
// _tag (string): the html tag to construct.
// content (content): what is output within the tag.
// attributes (object): the html attributes of the tag as an object.
// 
// returns the html string for the html tag as specified by '_tag', 
// with the passed in set of attributes and content.
t.tag = function(_tag) { //, atts, content

  if ( (arguments[1] !== undefined) && typeof(arguments[1]) === 'string' ) {
    content = arguments[1];
    atts = arguments[2] || {};
  } else {
    content = arguments[2] || '';
    atts = arguments[1] || {};
  };

  if (_tag) {

    // A Standard closing tag 
    if (_.indexOf(t.SELF_CLOSING_TAGS, _tag, true) == -1 ) {
      return t.ct_template({ tag: _tag, atts: atts, content: content }); 
    };

    // A self-closing tag
    return t.sc_template({ tag: _tag, atts: atts });

  } else {

    return '';

  };

};


// *************************
// 
// Tag Convenience methods
// delegate to t.tag
// 
// *************************
t._defineConvenienceMethod = function(_tag) {

  window.t[_tag] = function(atts, content) {
    return t.tag(_tag, atts, content)
  } 

};

_.each(
  ["html","head","title","base","link","meta","style","script","noscript","body","section","nav","article","aside","h1","h2","h3","h4","h5","h6","hgroup","header","footer","address","main","p","hr","pre","blockquote","ol","ul","li","dl","dt","dd","figure","figcaption","div","a","em","strong","small","s","cite","q","dfn","abbr","data","time","code","var","samp","kbd","sub","sup","i","b","u","mark","ruby","rt","rp","bdi","bdo","span","br","wbr","ins","del","img","iframe","embed","object","param","video","audio","source","track","canvas","map","area","svg","math","table","caption","colgroup","col","tbody","thead","tfoot","tr","td","th","form","fieldset","legend","label","input","button","select","datalist","optgroup","option","textarea","keygen","output","progress","meter","details","summary","command","menu"],
  function(html_tag) {
    t._defineConvenienceMethod(html_tag)
  }
);

// *************************
// 
// Functions that abstract html slightly in return for syntactic sugar
// 
// *************************


//formInput
//returns the html string for:
//a single form field of type 'type';
//with an optional label tag, 'label', 
//appropriately placed before or after the input based upon its type;
t.formInput = function(type, label, atts) {
  var content;
  atts.type = type;
  switch (type) {
    case "text":
    case "password":
      return t.label(label+" "+t.input(atts), atts.name) ;
      break;
    case "radio":
    case "checkbox":
      // return t.input(atts) + t.label(label, atts.id);
      if (atts.class == undefined) {
        atts.class = type 
      } else {
        atts.class = atts.class + " " + type
      }
      // return t.label(t.input(atts)+" "+label, atts.id);
      return t.label(t.input(atts)+" "+label, atts);
      break;
    case "option":
      return t.tag('option', atts, label);
      break;
    case "textarea":
      content = atts.value;
      delete atts.value;
      return t.label(label, atts.name) + t.div(t.tag('textarea', atts, content));
      break;
    default:
      return t.span("UNIMPLEMENTED FORM INPUT TYPE '" + type + "'", atts);
  };
};
