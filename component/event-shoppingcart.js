// <my-shoppingcard></my-shoppingcard>
import html from './utility.js'


class EventShoppingcart extends HTMLElement {
    constructor() {
        super(); // always call super() first in the ctor.
        this.products = [];

        if (this.getAttribute("color") != null)
            this.#Render(this.getAttribute("color"));
        else
            this.#Render();
    }

    #Render(backgroundColor = "#000") {
        this.innerHTML = html`
     
            <ul>
                <li><i class="fa-solid fa-cart-shopping"></i>
                    <a href="#" class="menu-item">Joined</a>
                    
                </li>
            </ul>
             <div class="count1" style="display: none;">${this.products.length}</div>
    <style>
.count1 {
    position: absolute; /* Харьцангуй байрлалд ашиглана */
    top: 20px; /* Joined текстийн доош 20px байрлалд */
    left: 60%; /* Элементын голоос хойш байрлах */
    transform: translateX(-50%); /* Голлуулж тохируулах */
    background-color:${backgroundColor};/*#ff0000;  Арын өнгө (улаан) */
    color: #fff; /* Текстийн өнгө (цагаан) */
    border-radius: 50%; /* Дугуй болгох */
    width: 15px; /* Тойргийн өргөн */
    height: 15px; /* Тойргийн өндөр */
    display: flex; /* Дотоод текстийг төвд байрлуулах */
    justify-content: center;
    align-items: center;
    font-size: 10px; /* Текстийн хэмжээ */
    font-weight: bold;
    z-index: 10; /* Давхаргын дээд талд харуулах */
}

    </style>
    `
    this.countElement = this.querySelector(".count1");
    if (this.products.length > 0) {
        this.countElement.style.display = 'flex'; // Хэрэв бүтээгдэхүүн байна бол харуулна
    }
    }

    


    AddToCart(myProduct) {
        this.products.push(myProduct);
        this.#Render();
    }
    connectedCallback() {

    }
    disconnectedCallback() {
    }



    get productCount() {
        return this.products.length;
    }

    set color(colorValue) {
        this.#Render(colorValue);
    }

    static get observedAttributes() {
        return ['color'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "color":
                this.#Render(this.getAttribute("color"));
                break;

            default:
                break;
        }
    }
}

window.customElements.define('event-shoppingcart', EventShoppingcart);