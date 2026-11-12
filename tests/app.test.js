const test=require('node:test');
const assert=require('node:assert/strict');
const {sanitizeText,validRecord,starter}=require('../app.js');
test('starter data contains valid amenity records',()=>{assert.ok(starter.length>0);assert.ok(starter.every(validRecord))});
test('validRecord rejects invalid quantities and statuses',()=>{assert.equal(validRecord({id:'x',name:'Towels',location:'Pool',quantity:2,status:'Available'}),true);assert.equal(validRecord({id:'x',name:'Towels',location:'Pool',quantity:-1,status:'Available'}),false);assert.equal(validRecord({id:'x',name:'Towels',location:'Pool',quantity:2,status:'Broken'}),false);assert.equal(validRecord(null),false)});
test('sanitizeText encodes HTML-sensitive characters',()=>{assert.equal(sanitizeText('<img src="x">'),'&lt;img src=&quot;x&quot;&gt;');assert.equal(sanitizeText('Pool & Spa'),'Pool &amp; Spa')});
test('sanitizeText handles null and numbers',()=>{assert.equal(sanitizeText(null),'');assert.equal(sanitizeText(42),'42')});