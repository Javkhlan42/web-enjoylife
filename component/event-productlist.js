// <event-productlist></event-productlist>
import "./event-product.js";

class EventProductlist extends HTMLElement {
    constructor() {
        super(); // always call super() first in the ctor.
        this.innerHTML = `
        <style> 
        .product-list{
            display:flex;
            flex-direction: ${ this.getAttribute("direction") }; 
            gap:2ch;
            flex-wrap: wrap;}

        .product-list > event-product{
            flex: 1 1;
        }
      </style>
    <div class="product-list">
        <event-product></event-product>
        <event-product></event-product>
        <event-product></event-product>
    </div>`;
    }
    connectedCallback() {

    }
    disconnectedCallback() {

    }
    attributeChangedCallback(attrName, oldVal, newVal) {

    }
}

window.customElements.define('event-productlist', EventProductlist);