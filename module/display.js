import { matchesDateFilter } from "./baraafilter";


export default function displayFilteredEvents(filteredEvents, dateFilters, eventContainer) {

    filteredEvents.forEach(category => {  //online offline turliig shuune
        Object.keys(category).forEach(cat => { //turul dotroh game, sport geh met shuune
            const catEvents = category[cat]; // game sport dotrohiig burdiin shune

            catEvents.forEach(event => {   //event.date bolon dateFilter hereglegchiin songoson date taarsan ugugdliig shuuh 
                if (matchesDateFilter(event.date, dateFilters)) { eventContainer.innerHTML += createEventCard(event, cat); }
            });
        });
    });
}

function createEventCard(event, category) {
    return `
        <article class="event-card">
            <img src="${event.image || 'https://via.placeholder.com/200x150'}" alt="${event.name}" class="event-image">
            <section class="bicheesuud">
                <h3>${event.name}</h3>
                <p>Date: ${event.date} Time: ${event.time}</p>
                <p>Location: ${event.location}</p>
                <p>Description: ${event.description}</p>
                <p>Angilal: ${category}</p> 
            </section>
            <div class="Love">
                <p>Price: ${event.price}</p>    
                <input class="check" type="checkbox" id="like-toggle-${event.id}">
                <label class="container" for="like-toggle-${event.id}">
                    <i class="fa-regular fa-heart icon inactive"></i>
                    <i class="fa-solid fa-heart icon active"></i>
                </label>
            </div>
            <button class="negdeh-towch">Join Event</button>
        </article>
    `;
}
