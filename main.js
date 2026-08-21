/* replay the hero walk-on whenever it scrolls into view (home page only) */
(function(){
  var hero = document.querySelector('.hero');
  if(!hero || !('IntersectionObserver' in window)) return; /* no hero on subpages */
  hero.classList.remove('play');
  new IntersectionObserver(function(es){
    es.forEach(function(e){ hero.classList.toggle('play', e.isIntersecting); });
  }, {threshold:.25}).observe(hero);
})();

/* reveal-on-scroll — with fail-safes so content can never stay hidden */
(function(){
  var els = document.querySelectorAll('.rv');
  function showAll(){ els.forEach(function(el){ el.classList.add('in'); }); }
  if(!('IntersectionObserver' in window)
     || matchMedia('(prefers-reduced-motion: reduce)').matches
     || document.hidden){ showAll(); return; }
  var fired = false;
  var io = new IntersectionObserver(function(es){
    fired = true;
    es.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(el, i){
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    io.observe(el);
  });
  /* if rendering is throttled and the observer never delivers, reveal everything */
  setTimeout(function(){ if(!fired) showAll(); }, 4000);
})();
