// Fetch the JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // event-type array unshin events hadgalah
        const events = data["event-type"];
        setupFilters(events);  //events iig setupFilter luu damjuulah
    })
    .catch(error => console.error('Error fetching JSON:', error));





//end ymar button daragdsan teruugeer uudiig list hiij  , 
function setupFilters(events) {
    // radio button 
    const radioButtons = document.querySelectorAll('input[name="eventType"]');
    radioButtons.forEach(button => { //forEach ashiglan (eventType) turliin buh buttoniig addEventListener nemj baigaa
        button.addEventListener('change', () => filterEvents(events));  //end 'change' hiih bolgond tuhain (eventType)-iin button tohiroh productiig [filterEvents(events)]-enuuger shuult hiin harulj baigaa
    });

    // Checkbox 
    const checkboxes = document.querySelectorAll('.date-filter input[type="checkbox"]'); //.date-filter class dotroh checbox uudiig
    checkboxes.forEach(box => {           //
        box.addEventListener('change', () => filterEvents(events));  //checbox songogdson songogdoogui ali ch tohioldold duudagdana
    });

    // setupFilter anh fetch dotor duudagdah ued shuultuuriig idwehjuulj ugnu.
    filterEvents(events);
}



// Main filter function
function filterEvents(events) {
    // Төрлийг сонгоогүй үед бүх төрлийн баримтыг харах          //end eventType turliin "value" ymar baigaag  shuune (online eswel offline) ymarch click hiigdeegui bol both ehleed shuud ugnu.
    const selectedType = document.querySelector('input[name="eventType"]:checked')?.value || "both";  // "both" ni online dolon offline 2uulng ni ehleed haruulna
    const dateFilters = Array.from(document.querySelectorAll('.date-filter input[type="checkbox"]:checked'))  //Array.from() ene ni songogdson elementiig massiv bolgon hurwuuleh 
        .map(checkbox => checkbox.id); //ene sonsogdson buh checkbox iin id nuudiig massiv hrlbereer uurtuu awah 

    // umnuh uzuultuudiig tsewerleh
    const eventContainer = document.querySelector('.baraanuud');
    eventContainer.innerHTML = '';  //gol zorilgo dawtagdsan aguulga uusghegui...

    // "both" сонгогдсон бол "online" ба "offline" аль алиныг нь үзүүлэх
    if (selectedType === "both") {
        // Тус бүрийн төрлөөр арга хэмжээг гаргах
        ['online', 'offline'].forEach(type => {
            const filteredEvents = events[type];
            displayFilteredEvents(filteredEvents, dateFilters, eventContainer);
        });
    } else {
        // Сонгосон төрлөөр шүүж, үр дүнг гаргах
        const filteredEvents = events[selectedType];
        displayFilteredEvents(filteredEvents, dateFilters, eventContainer);
    }
}

// Арга хэмжээг гаргах тусдаа функц
function displayFilteredEvents(filteredEvents, dateFilters, eventContainer) {

    filteredEvents.forEach(category => {  //online offline turliig shuune
        Object.keys(category).forEach(cat => { //turul dotroh game, sport geh met shuune
            const catEvents = category[cat]; // game sport dotrohiig burdiin shune

            catEvents.forEach(event => {   //event.date bolon dateFilter hereglegchiin songoson date taarsan ugugdliig shuuh 
                if (matchesDateFilter(event.date, dateFilters)) { eventContainer.innerHTML += createEventCard(event, cat); }
            });
        });
    });
}


// event ognoo bolon hereglegchiin songoson arga hemjee hoorond tohiroh eshiig shalgana
function matchesDateFilter(eventDate, dateFilters) {
    if (dateFilters.length === 0) return true;  //end checkbox songogdson eshiig shalgana..

    const today = new Date();  //odoo tsagiin date hadgal huwisagch
    const eventDay = new Date(eventDate);//event date iig hadgalah huwidsagch

    if (dateFilters.includes('today') && isSameDay(today, eventDay)) return true;

    if (dateFilters.includes('tomorrow')) {
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1); // Маргаашийн огноог олох
        if (isSameDay(tomorrow, eventDay)) return true;
    }

    if (dateFilters.includes('this weekend') && isThisWeekend(eventDay)) return true;

    if (dateFilters.includes('this month') && isSameMonth(eventDay)) return true;


    return false;
}

// haritsulaltiin function 
function isSameDay(date1, date2) {
    return date1.toDateString() === date2.toDateString(); //toDateString ognoo sar jil awj adil baigaa eshiig shalgana
}


//ene 7 honoo hongiin eventuudiig harulah
function isThisWeekend(eventDate) {
    const today = new Date(); // Өнөөдрийн огноо
    const eventDay = new Date(eventDate); // Арга хэмжээний огноо

    const dayOfWeek = today.getDay(); // Өнөөдөр долоо хоногийн хэд дэх өдөр вэ? (0 = Ням, 6 = Бямба)

    // Хэрэв өнөөдөр Ням гараг бол зөвхөн өнөөдрийн арга хэмжээг шалгана
    if (dayOfWeek === 0) {
        return isSameDay(today, eventDay);
    }

    // Долоо хоногийн өнөөдрөөс Ням гараг хүртэлх өдрийг тооцоолох
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - dayOfWeek));

    // Арга хэмжээний огноо өнөөдрөөс Ням гараг хүртэлх хугацаанд багтаж байгаа эсэхийг шалгах
    return eventDay >= today && eventDay <= endOfWeek;
}



//ene sariin eventiig haruulah 
function isSameMonth(date) {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Энэ сарын сүүлчийн өдөр
    //endOfMonth ene sariin suuliin udriig hadgalana
    //today.getFullYear() нь одоогийн жил.
    //today.getMonth() + 1 нь дараагийн сар руу шилжинэ (0-based index учир +1 нэмнэ).
    //0 өдөр сонгох нь тухайн сарын сүүлийн өдрийг өгнө.

    return date >= today && date <= endOfMonth;
}




// Create an event card HTML
function createEventCard(event, category) {
    return `
        <article class="event-card">
            <img src="${event.image || 'https://via.placeholder.com/200x150'}" alt="${event.name}" class="event-image">
            <section class="bicheesuud">
                <h3>${event.name}</h3>
                <p>Date:${event.date} Time:${event.time}</p>
                <p>Location:${event.location}</p>
                <p>Description:${event.description}</p>
                <p>Angilal:${category}</p> 
            </section>
            <div class="Love">
                <p>Price:${event.price}</p>
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

