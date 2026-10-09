const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = s => String(s).normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
let catalog,settings,active='all',selected=new Map(),detailProduct,opener;
const money = n => n == null ? '<strong class="missing">Precio pendiente</strong>' : `<strong>$${n.toLocaleString('en-US')}</strong>`;
const priceBoxes = p => `<div class="prices"><div><small>Al contado · USD</small>${money(p.cashPrice)}</div><div><small>Total financiado · USD</small>${money(p.financedPrice)}</div></div>`;
const category = p => catalog.categories.find(c=>c.id===p.category)?.name ?? p.category;
const variant = p => p.variants[selected.get(p.id)??0];
const swatches = p => `<div class="swatches" role="group" aria-label="Colores de ${esc(p.name)}">${p.variants.map((v,i)=>`<button class="swatch" style="--swatch:${esc(v.color)}" data-product="${p.id}" data-variant="${i}" aria-label="${esc(v.name)}" title="${esc(v.name)}" aria-pressed="${i===(selected.get(p.id)??0)}"></button>`).join('')}<span class="variant-name">${esc(variant(p)?.name??'Color pendiente')}</span></div>`;
function whatsapp(p){
 if(!settings.whatsapp) return '<a class="wa-btn" href="#contacto" aria-label="WhatsApp pendiente de configurar para Greenway">WhatsApp · pendiente</a>';
 const msg=p?`Hola, me interesa ${p.name}, ${variant(p)?.name??''}. ¿Me pueden dar más información?`:'Hola, quiero información sobre el catálogo de Greenway.';
 return `<a class="wa-btn" href="https://wa.me/${encodeURIComponent(settings.whatsapp)}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp ↗</a>`;
}
function render(){
 const q=normalize($('#search').value.trim());
 const list=catalog.products.filter(p=>(active==='all'||p.category===active)&&normalize([p.name,p.brand,p.description,category(p),...p.variants.map(v=>v.name)].join(' ')).includes(q));
 const sort=$('#sort').value;
 if(sort!=='default')list.sort((a,b)=>a.cashPrice==null?(b.cashPrice==null?0:1):b.cashPrice==null?-1:sort==='asc'?a.cashPrice-b.cashPrice:b.cashPrice-a.cashPrice);
 $('#count').textContent=`${list.length} de ${catalog.products.length} productos`;
 $('#empty').hidden=!!list.length;
 $('#products').innerHTML=list.map(p=>`<article class="card" data-id="${p.id}"><button class="image-button" data-detail="${p.id}" aria-label="Ver detalle de ${esc(p.name)}"><span class="category-label">${esc(category(p))}</span><img class="card-photo" src="${esc(variant(p)?.image)}" alt="${esc(p.name+' · '+variant(p)?.name)}" loading="lazy" width="400" height="280"></button><div class="card-body"><h3>${esc(p.name)}</h3><p class="description">${esc(p.description||'Descripción pendiente de completar.')}</p>${swatches(p)}${priceBoxes(p)}<div class="card-actions"><button class="detail-btn" data-detail="${p.id}">Ver detalles ↗</button>${whatsapp(p)}</div></div></article>`).join('');
 $('#categories').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.category===active));
}
function detail(p){
 detailProduct=p;
 const items=[p.notes,p.deliveryDays?`Plazo indicado en la ficha: ${p.deliveryDays} días`:'',...p.tags].filter(Boolean);
 $('#detail-content').innerHTML=`<div class="detail-layout"><div><img src="${esc(variant(p)?.image)}" alt="${esc(p.name+' · '+variant(p)?.name)}">${swatches(p)}</div><div><p class="eyebrow">${esc(category(p))}</p><h2 id="detail-title">${esc(p.name)}</h2><p>${esc(p.description||'Descripción pendiente de completar.')}</p>${priceBoxes(p)}${p.shippingUSA!=null?`<p>Envío a EE. UU.: $${p.shippingUSA}<br>Envío a Cuba: $${p.shippingCuba}</p>`:''}${items.length?`<ul>${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}<p class="small">Fuente: ${esc(catalog.source)}. Confirmá precios, entrega y disponibilidad antes de comprar.</p>${whatsapp(p)}</div></div>`;
}
function closeDetail(){ $('#detail').close();detailProduct=null;opener?.focus(); }
async function init(){
 try{
 const responses=await Promise.all([fetch('data/catalog.json'),fetch('data/settings.json')]);
 if(responses.some(r=>!r.ok))throw Error('Catalog unavailable');
 [catalog,settings]=await Promise.all(responses.map(r=>r.json()));
 const heroSlides = [
  {category:'Triciclos',id:'producto-42'},
  {category:'Kits de paneles solares',id:'producto-57'},
  {category:'Motos',id:'producto-14'},
  {category:'Dirt bikes',id:'producto-61'},
  {category:'Bicis eléctricas',id:'producto-68',color:'Verde'}
 ].map(slide=>({...slide,product:catalog.products.find(p=>p.id===slide.id)})).filter(slide=>slide.product);
 let heroIndex=0;
 const showHeroSlide=()=>{
  const slide=heroSlides[heroIndex],product=slide.product;
  const photo=product.variants.find(v=>v.name===slide.color)??product.variants[0];
  $('#hero-image').src=photo.image;
  $('#hero-image').alt=slide.category+' · '+product.name+' · '+photo.name;
  $('#hero-name').textContent=product.name;
  $('.art-label').textContent=slide.category.toUpperCase();
 };
 heroSlides.forEach(slide=>{const photo=slide.product.variants.find(v=>v.name===slide.color)??slide.product.variants[0];const image=new Image();image.src=photo.image;});
 showHeroSlide();
 setInterval(()=>{heroIndex=(heroIndex+1)%heroSlides.length;showHeroSlide();},3000);
 $('#categories').innerHTML=[{id:'all',name:'Todos'},...catalog.categories].map(c=>`<button data-category="${c.id}" aria-pressed="${c.id==='all'}">${esc(c.name)}</button>`).join('');
 $('#contact-fields').innerHTML=settings.whatsapp?whatsapp(): '<p><b>WhatsApp:</b> pendiente de completar</p>';
 $('#contact-fields').innerHTML+=`<p><b>Email:</b> ${settings.email?`<a href="mailto:${esc(settings.email)}">${esc(settings.email)}</a>`:'pendiente de completar'}</p><p><b>Dirección:</b> ${esc(settings.address||'pendiente de completar')}</p>`;
 render();
 }catch(e){$('#error').hidden=false;$('#count').textContent='Catálogo no disponible';console.error(e);}
}
$('#search').addEventListener('input',()=>catalog&&render());$('#sort').addEventListener('change',()=>catalog&&render());
$('#categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){active=b.dataset.category;render();}});
$('#reset').addEventListener('click',()=>{active='all';$('#search').value='';$('#sort').value='default';render();});
document.addEventListener('click',e=>{
 const sw=e.target.closest('[data-variant]');if(sw){selected.set(sw.dataset.product,Number(sw.dataset.variant));render();if(detailProduct){detail(detailProduct);$('#detail').querySelector(`[data-variant="${sw.dataset.variant}"]`)?.focus();}return;}
 const b=e.target.closest('[data-detail]');if(b){opener=b;detail(catalog.products.find(p=>p.id===b.dataset.detail));$('#detail').showModal();}
 if(e.target.closest('#detail a[href="#contacto"]'))closeDetail();
});
$('#detail .close').addEventListener('click',closeDetail);
$('#detail').addEventListener('cancel',e=>{e.preventDefault();closeDetail();});
$('#detail').addEventListener('click',e=>{if(e.target===$('#detail')){const r=$('#detail').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDetail();}});
init();
