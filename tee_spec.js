describe('t', function(){

  var everyHTMLtag = [
    "html","head","title","base","link","meta","style","script","noscript","body",
    "section","nav","article","aside","h1","h2","h3","h4","h5","h6","hgroup","header","footer",
    "address","main","p","hr","pre","blockquote","ol","ul","li","dl","dt","dd","figure","figcaption",
    "div","a","em","strong","small","s","cite","q","dfn","abbr","data","time","code","var","samp",
    "kbd","sub","sup","i","b","u","mark","ruby","rt","rp","bdi","bdo","span","br","wbr","ins","del",
    "img","iframe","embed","object","param","video","audio","source","track","canvas","map","area","svg",
    "math","table","caption","colgroup","col","tbody","thead","tfoot","tr","td","th","form","fieldset","legend",
    "label","input","button","select","datalist","optgroup","option","textarea","keygen","output","progress",
    "meter","details","summary","command","menu"];

  beforeEach(function() {
    this.addMatchers({
      toBeAFunction: function() {
        return _.isFunction(this.actual);
      }
    });
  });

  it('should be defined', function(){
    expect(t).toBeDefined();
  });

  it('should have a method "tag"', function(){
    expect(t.tag).toBeAFunction();
  })

  it('.tag() should return the empty string', function(){
    expect(t.tag()).toBe("");
  })

  it('.tag("invalid-tag") should return the empty string', function(){
    expect(t.tag("div")).toBe("<div></div>");
  })

  it('.tag("input"), or any valid self-closing tag, should return the proper string', function(){
    expect(t.tag("input")).toBe("<input />");
  })

  it('.tag("div"), or any valid tag, should return the string that is that empty tag', function(){
    expect(t.tag("div")).toBe("<div></div>");
  })

  it('.tag("div", {id: "some-id"}), should correctly add the attribute to the tag', function(){
    expect(t.tag("div", {id: "some-id"})).toBe("<div id='some-id'></div>");
  });

  it('.tag("div", "content"), should correctly place content within the tag', function(){
    expect(t.tag("div", "content")).toBe("<div>content</div>");
  });

  it('.tag, should be able to handle both attributes and content in either order', function(){
    expect(t.tag("div", {id: "some-id"}, "content")).toBe("<div id='some-id'>content</div>");
    expect(t.tag("div", "content", {id: "some-id"})).toBe("<div id='some-id'>content</div>");
  });

  it('should have convenience methods defined for every html tag that delegate to tag', function() {
    spyOn(t, 'tag');
    _.each(everyHTMLtag, function(_tag) {
      (t[_tag])(null, null);
      expect(t.tag).toHaveBeenCalledWith(_tag, null, null)
    });
  })

});