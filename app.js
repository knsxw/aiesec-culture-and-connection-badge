'use strict';
const $ = (id) => document.getElementById(id);
const canvas = $('badge');
const ctx = canvas.getContext('2d');
const art = new Image();
let portrait = null;
let accent = '#ffad42';
let artReady = false;
let uploadSequence = 0;
const fields = ['name', 'role', 'pass', 'headline', 'tag', 'zoom', 'position-x', 'position-y'];
function text(value, x, y, size, color = '#fff6ec', weight = '500', maxWidth = 930, family = 'Space Grotesk') {
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${weight} ${size}px "${family}", sans-serif`;
  while (ctx.measureText(value).width > maxWidth && size > 14) {
    size -= 1;
    ctx.font = `${weight} ${size}px "${family}", sans-serif`;
  }
  ctx.fillText(value, x, y);
}
function rounded(x, y, w, h, r, color) {
  ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
}
function bat(x, y, size) {
  ctx.save(); ctx.translate(x, y); ctx.scale(size, size); ctx.fillStyle = '#11091e';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-20,-30,-52,-37,-75,-18); ctx.quadraticCurveTo(-44,-22,-43,6); ctx.quadraticCurveTo(-20,-5,-14,20); ctx.lineTo(0,30); ctx.lineTo(14,20); ctx.quadraticCurveTo(20,-5,43,6); ctx.quadraticCurveTo(44,-22,75,-18); ctx.bezierCurveTo(52,-37,20,-30,0,0); ctx.fill(); ctx.restore();
}
function render() {
  ctx.clearRect(0,0,1080,1920);
  ctx.fillStyle = '#24113c'; ctx.fillRect(0,0,1080,1920);
  if (artReady) ctx.drawImage(art,0,0,1080,1080);
  const fade = ctx.createLinearGradient(0,650,0,1250); fade.addColorStop(0,'#24113c00'); fade.addColorStop(.7,'#24113cf5'); fade.addColorStop(1,'#24113c'); ctx.fillStyle=fade;ctx.fillRect(0,650,1080,1270);
  const glow=ctx.createRadialGradient(540,1250,0,540,1250,650);glow.addColorStop(0,'#61378055');glow.addColorStop(1,'#24113c00');ctx.fillStyle=glow;ctx.fillRect(0,800,1080,1120);
  // Keep the event poster intact, with the personal information below its title.
  rounded(330,57,420,60,30,'#160b29d9');text('HALLOWEEN EDITION',540,88,23,accent,'600',380);
  const cx=540, cy=1130, radius=255;
  ctx.beginPath();ctx.arc(cx,cy,radius+14,0,Math.PI*2);ctx.fillStyle=accent;ctx.fill();
  ctx.beginPath();ctx.arc(cx,cy,radius+6,0,Math.PI*2);ctx.fillStyle='#24113c';ctx.fill();
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.clip();
  if(portrait){
    const diameter=radius*2; const scale=Math.max(diameter/portrait.width,diameter/portrait.height)*Number($('zoom').value);
    const w=portrait.width*scale,h=portrait.height*scale;
    const x=cx-w/2+Number($('position-x').value)*(w-diameter)/2;
    const y=cy-h/2+Number($('position-y').value)*(h-diameter)/2;
    ctx.drawImage(portrait,x,y,w,h);
  }else{
    ctx.fillStyle='#49315e';ctx.fillRect(cx-radius,cy-radius,radius*2,radius*2);
    ctx.fillStyle='#8e6da7';ctx.beginPath();ctx.arc(cx,cy-65,79,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(cx,cy+180,165,150,0,0,Math.PI*2);ctx.fill();
    text('YOUR PHOTO HERE',cx,cy+208,20,'#fff0df','500');
  }ctx.restore();
  bat(190,980,.72);bat(885,1290,.65);
  text($('headline').value.toUpperCase(),540,800,31,accent,'600');
  text($('name').value.trim() || 'Your name',540,1480,78,'#fff7ed','700',930);
  const role=$('role').value.trim();
  if(role) text(role,540,1570,34,'#cdb8dc','400');
  const pass=$('pass').value.toUpperCase();ctx.font='600 24px "DM Sans",sans-serif';const pw=Math.min(850,Math.max(260,ctx.measureText(pass).width+84));
  rounded(540-pw/2,role ? 1650 : 1590,pw,62,31,accent);text(pass,540,role ? 1682 : 1622,24,'#24113c','700',pw-40);
  ctx.strokeStyle='#76558a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(90,1795);ctx.lineTo(990,1795);ctx.stroke();
  text($('tag').value.trim(),540,1847,27,'#cdb8dc','400',930);
  canvas.setAttribute('aria-label',`Story badge for ${$('name').value.trim()||'your name'}, ${$('pass').value}, AIESEC Culture & Connection Night`);
}
function message(value){$('feedback').textContent=value;}
art.onload=()=>{artReady=true;render();};
art.onerror=()=>message('The event artwork could not load. Refresh the page before downloading.');
art.src='assets/event-artwork.jpg';
fields.forEach(id=>$(id).addEventListener('input',()=>{$('zoom-value').value=`${Math.round(Number($('zoom').value)*100)}%`;render();}));
document.querySelectorAll('.swatch').forEach(button=>button.addEventListener('click',()=>{accent=button.dataset.color;document.querySelectorAll('.swatch').forEach(b=>{const chosen=b===button;b.classList.toggle('selected',chosen);b.setAttribute('aria-pressed',String(chosen));b.textContent=chosen?'✓':'';});$('color-name').textContent=button.getAttribute('aria-label');render();}));
$('upload').addEventListener('click',()=>$('photo').click());
$('photo').addEventListener('change',()=>{
  const file=$('photo').files[0];if(!file)return;
  const sequence=++uploadSequence;
  if(!['image/jpeg','image/png','image/webp','image/avif'].includes(file.type)){message('Please choose a JPG, PNG, WebP or AVIF image.');$('photo').value='';return;}
  if(file.size>15*1024*1024){message('Please choose a photo smaller than 15 MB.');$('photo').value='';return;}
  const url=URL.createObjectURL(file);const image=new Image();
  image.onload=()=>{URL.revokeObjectURL(url);if(sequence!==uploadSequence)return;portrait=image;$('photo-controls').disabled=false;$('remove').hidden=false;$('zoom').value='1';$('zoom-value').value='100%';$('position-x').value='0';$('position-y').value='0';$('photo-status').textContent=file.name;message('Photo added. Adjust the framing to make it yours.');render();};
  image.onerror=()=>{URL.revokeObjectURL(url);if(sequence!==uploadSequence)return;message('This photo could not be opened. Please try another image.');$('photo').value='';};image.src=url;
});
$('remove').addEventListener('click',()=>{uploadSequence++;portrait=null;$('photo').value='';$('photo-controls').disabled=true;$('remove').hidden=true;$('photo-status').textContent='A good portrait works like magic.';message('');render();});
$('download').addEventListener('click',async()=>{
  if(!portrait){message('Add your photo to finish your badge.');$('upload').focus();return;}
  if(!$('name').value.trim()){message('Add your name to finish your badge.');$('name').focus();return;}
  if(!artReady){message('Please wait for the event artwork to load, or refresh the page.');return;}
  $('download').disabled=true;
  try{await document.fonts.ready;render();const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('Export failed');const url=URL.createObjectURL(blob);const link=document.createElement('a');link.download=`aiesec-halloween-${$('name').value.trim().replace(/[^a-z0-9_-]+/gi,'-')||'badge'}.png`;link.href=url;link.click();setTimeout(()=>URL.revokeObjectURL(url),60000);message('Your badge is ready! Share the PNG to your story.');}catch{message('The download could not be created. Please try again.');}finally{$('download').disabled=false;}
});
$('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('caption').textContent);$('copy').textContent='Copied ✓';setTimeout(()=>$('copy').textContent='Copy caption ↗',2500);}catch{message('Copy is unavailable here. Select and copy the caption text below the preview.');}});
render();document.fonts.ready.then(render);
