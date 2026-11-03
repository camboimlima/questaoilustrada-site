/* Questão Ilustrada — rastreio de origem (UTM) + Microsoft Clarity */
(function () {
  var CLARITY_ID = 'z615m5xdsq';
  var KEYS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','src','sck'];
  var ls = function(){ try { return window.localStorage; } catch(e){ return null; } }();
  function get(k){ try { return ls && ls.getItem(k); } catch(e){ return null; } }
  function set(k,v){ try { ls && ls.setItem(k,v); } catch(e){} }

  /* 1. Clarity */
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window,document,"clarity","script",CLARITY_ID);

  /* consentimento: aviso simples com opção de recusar (LGPD) */
  function applyConsent(v){
    try { window.clarity('consentv2', v==='no'
      ? {ad_Storage:'denied', analytics_Storage:'denied'}
      : {ad_Storage:'granted', analytics_Storage:'granted'}); } catch(e){}
  }
  var consent = get('qi_consent');
  if (consent === 'no') applyConsent('no');

  /* 2. captura de UTM */
  var q = new URLSearchParams(location.search), found = {}, has = false;
  KEYS.forEach(function(k){ var v=q.get(k); if(v){ found[k]=v; has=true; } });
  if (!has && document.referrer) {
    try {
      var h = new URL(document.referrer).hostname;
      if (h !== location.hostname) {
        var m = /instagram|l\.instagram/.test(h) ? 'instagram'
              : /youtube|youtu\.be/.test(h) ? 'youtube'
              : /tiktok/.test(h) ? 'tiktok'
              : /google\./.test(h) ? 'google'
              : /whatsapp|wa\.me/.test(h) ? 'whatsapp' : h;
        found = {utm_source:m, utm_medium:'referral'}; has = true;
      }
    } catch(e){}
  }
  if (has) {
    var js = JSON.stringify(found);
    set('qi_last', js);
    if (!get('qi_first')) set('qi_first', js);
  }
  var cur = {};
  try { cur = JSON.parse(get('qi_last') || '{}'); } catch(e){}
  var first = {};
  try { first = JSON.parse(get('qi_first') || '{}'); } catch(e){}

  /* 3. tags no Clarity (filtráveis no painel) */
  function tag(k,v){ if(v) try { window.clarity('set',k,v); } catch(e){} }
  tag('utm_source', cur.utm_source); tag('utm_medium', cur.utm_medium);
  tag('utm_campaign', cur.utm_campaign); tag('utm_content', cur.utm_content);
  tag('origem_primeiro_toque', first.utm_source);

  /* 4. repassa UTM para links internos e para o checkout da Kiwify */
  function decorate(a){
    var u; try { u = new URL(a.getAttribute('href'), location.href); } catch(e){ return; }
    var kiwify = /(^|\.)kiwify\.com\.br$/.test(u.hostname);
    var internal = u.hostname === location.hostname && !/\.(pdf|jpg|jpeg|png|webp|svg|zip|js|css)$/i.test(u.pathname);
    if (!kiwify && !internal) return;
    if (internal && (u.pathname===location.pathname || (a.getAttribute('href')||'').charAt(0)==='#')) return;
    KEYS.forEach(function(k){ if(cur[k] && !u.searchParams.has(k)) u.searchParams.set(k, cur[k]); });
    if (kiwify) {
      if (first.utm_source && !u.searchParams.has('s1')) u.searchParams.set('s1', first.utm_source);
      if (!u.searchParams.has('s2')) u.searchParams.set('s2', location.pathname.replace(/\//g,'') || 'home');
    }
    a.href = u.toString();
  }
  function decorateAll(){ var l=document.querySelectorAll('a[href]'); for(var i=0;i<l.length;i++) decorate(l[i]); }
  document.addEventListener('DOMContentLoaded', function(){ decorateAll(); setTimeout(decorateAll,600); });
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]'); if(!a) return;
    decorate(a);
    if (/kiwify\.com\.br/.test(a.href)) {
      try { window.clarity('event','clique_comprar'); } catch(_){}
      try { if (window.fbq) window.fbq('track','InitiateCheckout'); } catch(_){}
    }
  }, true);

  /* 5. aviso de privacidade */
  function aviso(){
    if (window.QI_SEM_AVISO || get('qi_consent') || document.getElementById('qiN')) return;
    var b = document.createElement('div');
    var alto = document.getElementById('flut') ? 84 : 12;
    b.style.cssText='position:fixed;left:12px;right:12px;bottom:'+alto+'px;z-index:99999;max-width:560px;margin:auto;background:#17191b;color:#E6E2D6;border:1px solid #333;border-radius:12px;padding:12px 14px;font:14px/1.4 system-ui,sans-serif;box-shadow:0 6px 24px #0008;display:flex;gap:10px;align-items:center;flex-wrap:wrap';
    b.innerHTML='<span style="flex:1;min-width:200px">Usamos análise anônima de navegação para melhorar o site.</span>'
      +'<button id="qiN" style="background:none;border:1px solid #555;color:#E6E2D6;border-radius:8px;padding:8px 12px;cursor:pointer">Não permitir</button>'
      +'<button id="qiY" style="background:#8CC8E6;border:0;color:#0D0E0F;border-radius:8px;padding:8px 14px;font-weight:700;cursor:pointer">Ok</button>';
    document.body.appendChild(b);
    function done(v){ set('qi_consent',v); applyConsent(v); b.remove(); }
    b.querySelector('#qiY').onclick=function(){done('yes')};
    b.querySelector('#qiN').onclick=function(){done('no')};
  }
  window.qiAviso = aviso; /* /teste: chama o aviso só depois do resultado */
  /* o aviso espera a pessoa rolar ou 20 s, para não cobrir o botão principal */
  document.addEventListener('DOMContentLoaded', function(){
    if (get('qi_consent')) return;
    var t = setTimeout(aviso, 20000);
    window.addEventListener('scroll', function f(){
      if (window.scrollY > 500) { clearTimeout(t); window.removeEventListener('scroll', f); aviso(); }
    }, {passive:true});
  });
})();
