class ShpReaction extends HTMLElement {
    constructor() {
        super();
        this.reacted = false;
    }

    #render() {
        this.innerHTML = `
        <button>${this.icon}<span>${this.count}</span></button>
        `;
    }
    connectedCallback() {
        this.icon = this.getAttribute("icn") || "👍🏻";
        this.count = this.getAttribute("cnt") || 0;
        this.#render();
        this.querySelector("button")
            .addEventListener("click",
                e => {
                    const too = this.querySelector("button span");
                    let cnt = Number(too.innerText);
                    too.innerText = this.reacted ? --cnt : ++cnt;
                    // if (this.reacted)
                    //     too.innerText = cnt - 1;
                    // else
                    //     too.innerText = cnt + 1;

                    this.reacted = !this.reacted;

                    //yag heregtei component ni 
                    // this.parentElement
                    //     .parentElement
                    //     .reactionClicked(this.reacted);

                    const evnt = new CustomEvent("shp-reacted",
                        {
                            detail: {
                                type: this.reacted,
                                productid: 3
                            }
                        });
                    
                    window
                        .dispatchEvent(evnt);
                })
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('shp-reaction', ShpReaction);