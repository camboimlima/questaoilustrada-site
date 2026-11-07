/* Oferta Reta Final do Combo ENEM.
   Entra sozinha em 08/11 às 19h30 e sai em 14/11 às 23h59 (horário de Brasília).
   Para ver antes, abra qualquer página com ?oferta=1 no fim do endereço. */
(function(){
var INI=Date.parse('2026-11-08T19:30:00-03:00'),FIM=Date.parse('2026-11-14T23:59:59-03:00'),CUP='RETAFINAL';
var prev=/[?&]oferta=1/.test(location.search),agora=Date.now();
var on=prev||(agora>=INI&&agora<=FIM);
window.QI_OFERTA={on:on,fim:FIM,preco:'18,95',de:'37,90',cupom:CUP};
if(!on)return;
document.documentElement.classList.add('qi-on');
function p2(n){return (n<10?'0':'')+n}
function falta(){var s=Math.max(0,(FIM-Date.now())/1e3|0),d=s/86400|0,h=(s%86400)/3600|0,m=(s%3600)/60|0;
 return d>0?d+'d '+p2(h)+'h '+p2(m)+'min':p2(h)+':'+p2(m)+':'+p2(s%60)}
function pronto(){
 document.querySelectorAll('a[href*="pay.kiwify.com.br/ExLvoff"]').forEach(function(a){try{var u=new URL(a.href);u.searchParams.set('coupon',CUP);a.href=u.toString()}catch(e){}});
 document.querySelectorAll('[data-of]').forEach(function(e){e.innerHTML=e.getAttribute('data-of')});
 document.querySelectorAll('.qi-of').forEach(function(e){e.hidden=false});
 document.querySelectorAll('.qi-nof').forEach(function(e){e.hidden=true});
 var css=document.createElement('style');
 css.textContent='.qi-faixa{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:2px 10px;background:#8CC8E6;color:#0D0E0F!important;font:600 13.5px/1.3 Inter,system-ui,sans-serif;padding:7px 12px;text-align:center;text-decoration:none}'+
  '.qi-faixa b{font-family:Sora,Inter,sans-serif;font-weight:800}.qi-faixa s{opacity:.65}.qi-faixa em{font-style:normal;font-weight:800}.qi-faixa .qi-t{background:#0D0E0F;color:#8CC8E6;border-radius:6px;padding:1px 7px;font-variant-numeric:tabular-nums}'+
  '.qi-faixa.solta{position:sticky;top:0;z-index:60}@media(max-width:520px){.qi-faixa>b{display:none}.qi-faixa{font-size:13px;padding:6px 10px}}';
 document.head.appendChild(css);
 var f=document.createElement('a');f.className='qi-faixa';
 f.href=/comboenem/.test(location.pathname)?'#oferta':'/comboenem?utm_source=site&utm_medium=faixa&utm_campaign=retafinal';
 f.innerHTML='<b>Semana da Matemática</b><span>Combo pela metade: <s>R$ 37,90</s> <em>R$ 18,95</em></span><span class="qi-t">acaba em <span class="qi-falta"></span></span>';
 var bar=document.querySelector('header.bar');
 if(bar)bar.insertBefore(f,bar.firstChild);else{f.classList.add('solta');document.body.insertBefore(f,document.body.firstChild)}
 function tk(){var t=falta();document.querySelectorAll('.qi-falta').forEach(function(e){e.textContent=t})}
 tk();setInterval(tk,1000);
 try{window.clarity&&window.clarity('set','oferta','retafinal')}catch(e){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',pronto);else pronto();
})();
