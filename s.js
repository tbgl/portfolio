function e(id) { return document.getElementById(id) }
function show(el) { a(el, 'hidden', false ) }
function hide(el) { a(el, 'hidden', true ) }
function q(query) { return document.querySelector(query) }
function qa(query) { return document.querySelectorAll(query) }
function qe(el, query) { return el.querySelector(query) }
function qea(el, query) { return el.querySelectorAll(query) }
function t(el, text) { el.innerText = text || '' }
function tg(el) { return el.innerText }
function add(el, child) { el.append(child) }
function sadd(el, child) { el.prepend(child) }
function c(el) { return document.createElement(el) }
function a(el, atr, val) { el.setAttribute(atr, val) }
function ag(el, atr) { return el.getAttribute(atr) }
function ao(el, obj) { for(atr in obj) { el.setAttribute(atr, obj[atr].replace(/_/g, '-')) } }
function ar(el, atr) { el.removeAttribute(atr) }
function s(el, key, value) { el.style[key] = value }
function ss(el, style) { el.style = style }
function ca(el, clas) { el.classList.add(clas) }
function cr(el, clas) { el.classList.remove(clas) }
function ct(el, clas) { el.classList.toggle(clas) }
function ih(el, html) { el.innerHTML = html }
function oh(el, html) { el.outerHTML = html }
function ds(key, value) { window.localStorage.setItem(key, value) }
function dg(key) { return window.localStorage.getItem(key) }
function dso(key, obj) { window.localStorage.setItem(key, JSON.stringify(obj)) }
function dgo(key) { return JSON.parse(window.localStorage.getItem(key)) }
function p(el) { return el.parentNode }
function gp(el) { return p(p(el)) }
function si(el) { return p(el).children }
function sn(el) { return el.nextSibling }
function sn(el) { return el.previousSibling }

function so(obj) {
    var st = ''
    for(s in obj) { st += s + ':' + obj[s] + '; ' }
    return st.replace(/_/g, '-')
}

function ce(obj) { 
    const el = c(obj.e || 'div')
    obj.id ? a(el, 'id', obj.id) : null 
    obj.cl ? a(el, 'class', obj.cl) : null
    obj.t ? t(el, obj.t) : null
    obj.a ? ao(el, obj.a) : null
    obj.so ? ss(el, so(obj.so)) : null
    if(obj.c && obj.c.length) { for(ch of obj.c) { add(el,ce(ch)) } }
    return el
}

function obj(el) {
    var o = {}
    o.e = el.nodeName
    if(el.attributes.length) {
        o.a = {}
        for(attr of el.attributes) {o.a[attr.name] = attr.value}
    }
    if(el.children.length) {
        o.c = []
        for(ch of el.children) {o.c.push(obj(ch))}
        const cln = el.cloneNode(true)
        const cl = cln.children.length
        for(var i = 0; i < cl; i++) { cln.children[0].remove() }
        if(cln.innerText && cln.innerText.length) { o.t = cln.innerText.trim()}
    }
    else if(el.innerText && el.innerText.length ) { o.t = el.innerText.trim()}
    return o
}

function lw(w) {
    const head = q('head')
    const body = q('body')
    for(h of w.head) { add(head, ce(h)) }
    for(b of w.body) { add(body, ce(b)) }
}


function mw(document) {
    var w = {head: [], body: []}
    for(h of q('head').children) { w.head.push(obj(h))}
    for(b of q('body').children) { w.body.push(obj(b))}
    return w
}

function mo(o = {}, objects = []) {
    let ob = o
    //iterate objects from array
    for(let i = 0; i < objects.length; i++) {
        //iterate properties of object
        let object = objects[i]
        for(prop in object) {
            //if property is not an object assign it
            if(typeof object[prop] !== 'object' ) {
                ob[prop] = object[prop]
            }
            else if(Array.isArray(object[prop])) {
                console.log('hooray, an array - what to do?')
            }
            //if it is itterate the object
            else {
                ob[prop] = mo(ob[prop], [object[prop]])
            }
        }
    }

    return ob
}

function coe(obj) {
    const el = ce({
        a: {o: JSON.stringify(obj)},
        t: obj.e
    })
    return el
}

function notify(m, style = 'z-index: 100; padding: 22px; background-color: #ddd; color: #222; display: flex; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; right: 0; bottom: 0;  font-size: 22px;') {
    const n = c('div')
    ss(n, style)
    t(n, m)

    const x = c('div')
    t(x, 'ok')
    a(x, 'onclick', 'p(this).remove()')
    ss(x, 'position: fixed; bottom: 0; margin: 1em; padding: 1em; cursor: pointer; text-align: center; background-color: #222; color: #ddd;')
    add(n,x)

    add(q('body'), n)
}