// <web-baraa id="8" name="Event Name" date="2024-10-5" time="11:00pm" decsription="tailbar" location="Улаанбаатар ХУД 15-байр" price="free" category="sport"></web-baraa>
            //deerhiig home html <section class="baraanuud"> heseg dotor hiij ugnu 
class Web extends HTMLElement {
  constructor() {
      super();
      this.shadowRoot
  }

  connectedCallback() {
      this.id = this.getAttribute("id");
      this.name = this.getAttribute("name");
      this.date = this.getAttribute("date");
      this.time = this.getAttribute("time");
      this.location = this.getAttribute("location");
      this.price = this.getAttribute("price");
      this.description = this.getAttribute("description");
      this.category = this.getAttribute("category");

      this.render();
      this.setupEventListeners();
      this.updateSagsCounter();
      this.updateLikeStatus();
  }

  render() {
      this.innerHTML = `
          <article class="event-card">
              <img src="https://picsum.photos/id/${this.id}/200/150" alt="${this.name}" class="event-image">
              <section class="bicheesuud">
                  <h3>${this.name}</h3>
                  <p>Date: ${this.date} Time: ${this.time}</p>
                  <p>Location: ${this.location}</p>
                  <p>Description: ${this.description}</p>
                  <p>Category: ${this.category}</p>
              </section>
              <div class="Love">
                  <p>Price: ${this.price}</p>
                  <input class="check" type="checkbox" id="like-toggle-${this.id}" />
                  <label class="container" for="like-toggle-${this.id}">
                      <i class="fa-regular fa-heart icon inactive"></i>
                      <i class="fa-solid fa-heart icon active"></i>
                  </label>
              </div>
              <button class="negdeh-towch">Join Event</button>
          </article>
      `;
  }



  setupEventListeners() {
      const joinButton = this.querySelector(".negdeh-towch");
      const likeToggle = this.querySelector(".check");

      if (joinButton) {
          joinButton.addEventListener("click", () => {
              let joinedEvents = JSON.parse(localStorage.getItem("joinedEvents")) || [];
              if (!joinedEvents.includes(this.id)) {
                  joinedEvents.push(this.id);
                  localStorage.setItem("joinedEvents", JSON.stringify(joinedEvents));
                  let count = parseInt(localStorage.getItem("sagsCount") || "0") + 1;
                  document.querySelector(".sags").textContent = count;
                  localStorage.setItem("sagsCount", count);
              } else {
                  alert("Энэ эвентэд аль хэдийн нэгдсэн байна!");
              }
          });
      }

      if (likeToggle) {
          likeToggle.addEventListener("change", () => {
              let likedEvents = JSON.parse(localStorage.getItem("likedEvents")) || [];
              if (likeToggle.checked) {
                  if (!likedEvents.includes(this.id)) {
                      likedEvents.push(this.id);
                  }
              } else {
                  likedEvents = likedEvents.filter(eventId => eventId !== this.id);
              }
              localStorage.setItem("likedEvents", JSON.stringify(likedEvents));
              this.updateLikeCount();
          });
      }
  }

  updateSagsCounter() {
      const sagsCounter = document.querySelector(".sags");  
      let savedCount = localStorage.getItem("sagsCount");
      if (sagsCounter && savedCount) {
          sagsCounter.textContent = savedCount;
      }
  }

  updateLikeStatus() {
      const likeToggle = this.querySelector(".check");
      const likedEvents = JSON.parse(localStorage.getItem("likedEvents")) || [];
      if (likedEvents.includes(this.id)) {
          likeToggle.checked = true;
      }
  }

  updateLikeCount() {
      const likeCounter = document.querySelector(".like");
      if (likeCounter) {
          const likedEvents = JSON.parse(localStorage.getItem("likedEvents")) || [];
          likeCounter.textContent = likedEvents.length;
      }
  }
}

window.customElements.define("web-baraa", Web);

document.addEventListener("DOMContentLoaded", () => {
  const likeCounter = document.querySelector(".like");
  if (likeCounter) {
      const likedEvents = JSON.parse(localStorage.getItem("likedEvents")) || [];
      likeCounter.textContent = likedEvents.length;
  }

  const sagsCounter = document.querySelector(".sags");
  if (sagsCounter) {
      let savedCount = localStorage.getItem("sagsCount") || "0";
      sagsCounter.textContent = savedCount;
  }
});
