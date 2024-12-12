// <gobi-product></gobi-product>
import html from "./utility.js";

class EventProduct extends HTMLElement {
    constructor() {
        super(); // always call super() first in the ctor.
        this.innerHTML = html`
                    <a href="###">
                <article class="event-card">
                    <img src="https://picsum.photos/id/1/200/150" alt="user photo" class="event-image">

                    <section class="bicheesuud">
                        <h3>Event Name</h3>
                           <p>Data : 2024-10-5 Time:11:00 pm</p>
                        <p>Locaiotn:Улаанбаатар ХУД 15-байр</p>
                        <p>decsription: tailbar</p>
                    </section>

                    <div class="Love">
                        <p>Free</p>
                        <input class="check" type="checkbox" id="like-toggle-0" />
                        <label class="container" for="like-toggle-0">
                            <i class="fa-regular fa-heart icon inactive"></i>
                            <i class="fa-solid fa-heart icon active"></i>
                        </label>
                    </div>
                    <button role="button" class="negdeh-towch">Join Event</button>
                </article>
            </a>`
    }
    connectedCallback() {
        this.querySelector("button").addEventListener("click", () => {
            const myCart = document.querySelector("event-shoppingcart");
            myCart.AddToCart(this);
            myCart.color = "#ff0000";
            // MyApp.SetState("lastColor", "#0f0");
            // MyApp.AddProductToShoppingCart(this);
            // alert(MyApp.GetState("lastColor"));
        })
    }
    disconnectedCallback() {

    }
    attributeChangedCallback(attrName, oldVal, newVal) {

    }
}

window.customElements.define('event-product', EventProduct); 
