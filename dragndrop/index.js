var foo = document.getElementById('foo');
var bar = document.getElementById('bar');

var mousemove = Rx.Observable.fromEvent(document, 'mousemove');
var mousedown = Rx.Observable.fromEvent(foo, 'mousedown');
var mouseup = Rx.Observable.fromEvent(foo, 'mouseup');

var mousedrag = mousedown.flatMap(function(e) {
  var deltaX = e.offsetX;
  var deltaY = e.offsetY;

  return mousemove.map(function(e) {
    return {
      x: e.x - deltaX,
      y: e.y - deltaY
    };
  }).takeUntil(mouseup);
});

mousedrag.subscribe(function(evt) {
  foo.style.left =  evt.x + 'px';
  foo.style.top = evt.y + 'px';
})

mousedrag.subscribe(function(evt) {
  if(evt.x > 512) {
    bar.style.border = "3px solid #0CF";
  }
})
