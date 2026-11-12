(() => {
'use strict';
const KEY='haven-house-amenities-v1';
const starter=[
{id:'1',name:'Pool towels',location:'Pool deck',quantity:42,status:'Available',updated:'Today, 10:15 AM'},
{id:'2',name:'Spa robes',location:'Wellness suite',quantity:8,status:'Low stock',updated:'Today, 09:40 AM'},
{id:'3',name:'Welcome hampers',location:'Front desk',quantity:16,status:'Available',updated:'Today, 09:20 AM'},
{id:'4',name:'Yoga mats',location:'Fitness studio',quantity:0,status:'Maintenance',updated:'Yesterday'},
{id:'5',name:'Umbrellas',location:'Main entrance',quantity:12,status:'Available',updated:'Yesterday'},
{id:'6',name:'Kids activity kits',location:'Family lounge',quantity:5,status:'Low stock',updated:'Yesterday'}
];
const $=s=>document.querySelector(s);
let items=typeof document!=='undefined'?readItems():[...starter],toastTimer;
function validRecord(x){return !!x&&typeof x.id==='string'&&typeof x.name==='string'&&typeof x.location==='string'&&Number.isInteger(x.quantity)&&x.quantity>=0&&['Available','Low stock','Maintenance'].includes(x.status)}
function readItems(){try{const saved=localStorage.getItem(KEY);if(!saved)return [...starter];const data=JSON.parse(saved);return Array.isArray(data)?data.filter(validRecord):[...starter]}catch(e){console.warn('Could not load local data; using sample data.',e);return [...starter]}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(items))}catch(e){notify('Could not save changes on this device.');console.error(e)}}
function sanitizeText(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function track(action){console.info('[Analytics] User interacted with Boutique Hotel Amenities UI: '+action)}
function notify(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2500)}
function stats(){$('#total').textContent=items.length;$('#available').textContent=items.filter(x=>x.status==='Available').length;$('#attention').textContent=items.filter(x=>x.status!=='Available').length;$('#locations').textContent=new Set(items.map(x=>x.location)).size}
function locations(){const select=$('#location'),old=select.value;select.replaceChildren(new Option('All locations','all'));[...new Set(items.map(x=>x.location))].sort().forEach(x=>select.add(new Option(x,x)));select.value=[...select.options].some(o=>o.value===old)?old:'all'}
function render(){
 const q=$('#search').value.trim().toLowerCase(),s=$('#status').value,l=$('#location').value;
 const filtered=items.filter(x=>(x.name+' '+x.location).toLowerCase().includes(q)&&(s==='all'||x.status===s)&&(l==='all'||x.location===l));
 const tbody=$('#rows');tbody.replaceChildren();
 filtered.forEach(item=>{
  const tr=document.createElement('tr');
  const name=document.createElement('td');name.className='amenity';name.textContent=item.name;
  const place=document.createElement('td');place.textContent=item.location;
  const qty=document.createElement('td');qty.textContent=String(item.quantity);
  const status=document.createElement('td'),pill=document.createElement('span');pill.className='pill '+item.status.toLowerCase().replace(/\s/g,'-');pill.textContent=item.status;status.append(pill);
  const updated=document.createElement('td');updated.textContent=item.updated||'—';
  const action=document.createElement('td'),edit=document.createElement('button');edit.type='button';edit.className='edit';edit.textContent='Edit';edit.setAttribute('aria-label','Edit '+item.name);edit.addEventListener('click',()=>openModal(item.id));action.append(edit);
  tr.append(name,place,qty,status,updated,action);tbody.append(tr);
 });
 const noResults=filtered.length===0;$('#empty').hidden=!noResults;$('#table-card').hidden=noResults;$('#count').textContent=`Showing ${filtered.length} of ${items.length} amenities`;stats();locations();
}
function clearErrors(){['name','place','quantity'].forEach(k=>{$('#'+k+'-error').textContent='';$('#'+k).removeAttribute('aria-invalid')});$('#form-error').textContent=''}
function openModal(id=''){
 const form=$('#form');form.reset();clearErrors();$('#item-id').value=id;
 const old=items.find(x=>x.id===id);$('#modal-title').textContent=old?'Edit amenity':'Add an amenity';
 if(old){$('#name').value=old.name;$('#place').value=old.location;$('#quantity').value=old.quantity;$('#item-status').value=old.status}
 $('#modal').showModal();$('#name').focus();
}
function submit(event){
 event.preventDefault();clearErrors();
 const data={name:$('#name').value.trim(),location:$('#place').value.trim(),quantity:Number($('#quantity').value),status:$('#item-status').value};
 let ok=true;
 [['name',data.name.length>0&&data.name.length<=60,'Enter a name (1–60 characters).'],['place',data.location.length>0&&data.location.length<=50,'Enter a location (1–50 characters).'],['quantity',Number.isInteger(data.quantity)&&data.quantity>=0&&data.quantity<=9999,'Enter a whole number from 0 to 9999.']].forEach(([key,pass,msg])=>{if(!pass){ok=false;$('#'+key+'-error').textContent=msg;$('#'+key).setAttribute('aria-invalid','true')}});
 if(/[<>]/.test(data.name)||/[<>]/.test(data.location)){ok=false;$('#form-error').textContent='Remove HTML characters from text fields.';if(/[<>]/.test(data.name))$('#name').setAttribute('aria-invalid','true');if(/[<>]/.test(data.location))$('#place').setAttribute('aria-invalid','true')}
 if(!['Available','Low stock','Maintenance'].includes(data.status))ok=false;
 if(!ok){$('#form-error').textContent=$('#form-error').textContent||'Please correct the highlighted fields.';return}
 const id=$('#item-id').value,updated='Today, '+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
 if(id){items=items.map(x=>x.id===id?{...x,...data,updated}:x);track('amenity updated');notify('Amenity details updated.')}
 else{items.unshift({id:String(Date.now()),...data,updated});track('amenity added');notify('Amenity added to the directory.')}
 save();$('#modal').close();render();
}
function load(){$('#loading').hidden=false;$('#table-card').hidden=true;$('#empty').hidden=true;setTimeout(()=>{$('#loading').hidden=true;render()},400)}
if(typeof document!=='undefined'){
 $('#add').addEventListener('click',()=>openModal());$('#add-top').addEventListener('click',()=>openModal());
 $('#close').addEventListener('click',()=>$('#modal').close());$('#cancel').addEventListener('click',()=>$('#modal').close());
 $('#form').addEventListener('submit',submit);$('#search').addEventListener('input',render);$('#status').addEventListener('change',render);$('#location').addEventListener('change',render);
 $('#clear').addEventListener('click',()=>{$('#search').value='';$('#status').value='all';$('#location').value='all';track('filters cleared');render()});
 $('#today').textContent=new Date().toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'}).toUpperCase();load();
}
if(typeof module!=='undefined'&&module.exports)module.exports={sanitizeText,validRecord,starter};
})();