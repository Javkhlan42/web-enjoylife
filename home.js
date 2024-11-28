// Fetch the JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const events = data["event-type"];
        setupFilters(events); // events-ийг setupFilters рүү дамжуулах
        applyURLFilters(events); // URL-ийн параметраар шүүх функц дуудах
    })
    .catch(error => console.error('Error fetching JSON:', error));

function setupFilters(events) {
    // Radio button 
    const radioButtons = document.querySelectorAll('input[name="eventType"]');
    radioButtons.forEach(button => {
        button.addEventListener('change', () => updateURLAndFilter(events));
    });

    // Checkbox 
    const checkboxes = document.querySelectorAll('.date-filter input[type="checkbox"]');
    checkboxes.forEach(box => {
        box.addEventListener('change', () => updateURLAndFilter(events));
    });

    filterEvents(events); // Эхний байдлаар шүүх
}

function updateURLAndFilter(events) {
    const selectedType = document.querySelector('input[name="eventType"]:checked')?.value || "both";
    const dateFilters = Array.from(document.querySelectorAll('.date-filter input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.id);

    // URL-г шинэчлэх
    const params = new URLSearchParams(window.location.search);
    params.set('eventType', selectedType);
    params.set('dateFilters', dateFilters.join(','));
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

    // Шүүх
    filterEvents(events);
}

function applyURLFilters(events) {
    const params = new URLSearchParams(window.location.search);
    const selectedType = params.get('eventType') || "both";
    const dateFilters = (params.get('dateFilters') || "").split(',').filter(Boolean);

    // Radio button сонголтыг тохируулах
    if (selectedType) {
        const radioButton = document.querySelector(`input[name="eventType"][value="${selectedType}"]`);
        if (radioButton) radioButton.checked = true;
    }

    // Checkbox-уудыг тохируулах
    dateFilters.forEach(filter => {
        const checkbox = document.getElementById(filter);
        if (checkbox) checkbox.checked = true;
    });

    // Шүүх функц дуудах
    filterEvents(events);
}

// Main filter function
function filterEvents(events) {
    const selectedType = document.querySelector('input[name="eventType"]:checked')?.value || "both";
    const dateFilters = Array.from(document.querySelectorAll('.date-filter input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.id);

    // Уг үзүүлэлтийг цэвэрлэх
    const eventContainer = document.querySelector('.baraanuud');
    eventContainer.innerHTML = '';

    if (selectedType === "both") {
        ['online', 'offline'].forEach(type => {
            const filteredEvents = events[type];
            displayFilteredEvents(filteredEvents, dateFilters, eventContainer);
        });
    } else {
        const filteredEvents = events[selectedType];
        displayFilteredEvents(filteredEvents, dateFilters, eventContainer);
    }
}

function displayFilteredEvents(filteredEvents, dateFilters, eventContainer) {
    filteredEvents.forEach(category => {
        Object.keys(category).forEach(cat => {
            const catEvents = category[cat];

            catEvents.forEach(event => {
                if (matchesDateFilter(event.date, dateFilters)) {
                    eventContainer.innerHTML += createEventCard(event, cat);
                }
            });
        });
    });
}

function matchesDateFilter(eventDate, dateFilters) {
    if (dateFilters.length === 0) return true;

    const today = new Date();
    const eventDay = new Date(eventDate);

    if (dateFilters.includes('today') && isSameDay(today, eventDay)) return true;

    if (dateFilters.includes('tomorrow')) {
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        if (isSameDay(tomorrow, eventDay)) return true;
    }

    if (dateFilters.includes('this weekend') && isThisWeekend(eventDay)) return true;

    if (dateFilters.includes('this month') && isSameMonth(eventDay)) return true;

    return false;
}

function isSameDay(date1, date2) {
    return date1.toDateString() === date2.toDateString();
}

function isThisWeekend(eventDate) {
    const today = new Date();
    const eventDay = new Date(eventDate);

    const dayOfWeek = today.getDay();

    if (dayOfWeek === 0) {
        return isSameDay(today, eventDay);
    }

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - dayOfWeek));

    return eventDay >= today && eventDay <= endOfWeek;
}

function isSameMonth(date) {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return date >= today && date <= endOfMonth;
}

// Create an event card HTML
function createEventCard(event, category) {
    return `
        <article class="event-card">
            <img src="${event.image || 'https://via.placeholder.com/200x150'}" alt="${event.name}" class="event-image">
            <section class="bicheesuud">
                <h3>${event.name}</h3>
                <p>Date: ${event.date} Time: ${event.time}</p>
                <p>Location: ${event.location}</p>
                <p>Description: ${event.description}</p>
                <p>Ангилал: ${category}</p> 
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
