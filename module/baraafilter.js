import displayFilteredEvents from "./display";



export default function setupFilter(events ) {
    const radioButtons = document.querySelectorAll('input[name="eventType"]');
    radioButtons.forEach(button => {
        button.addEventListener('change', () => filterEvents(events));
    });

    const checkboxes = document.querySelectorAll('.data-filter input[type="checkbox"]');
    checkboxes.forEach(box => {
        box.addEventListener('change', () => filterEvents(events));
    });

    filterEvents(events);
}

export function filterEvents(events) {
    const selectedType = document.querySelector('input[name="eventType"]:checked')?.value || "both";
    const dataFilter = Array.from(document.querySelectorAll('.data-filter input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.id);

    const eventContainer = document.querySelector('.baraanuud');
    eventContainer.innerHTML = '';

    if (selectedType === "both") {
        ['online', 'offline'].forEach(type => {
            const filteredEvents = events[type];
            displayFilteredEvents(filteredEvents, dataFilter, eventContainer);
        });
    } else {
        const filteredEvents = events[selectedType];
        displayFilteredEvents(filteredEvents, dataFilter, eventContainer);
    }
}



// event ognoo bolon hereglegchiin songoson arga hemjee hoorond tohiroh eshiig shalgana
//checkbox shuult
export function matchesDateFilter(eventDate, dateFilters) {
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


// haritsuulaltiin function 
function isSameDay(date1, date2){
    //toDateString ognoo sar jil awj adil baigaa eshiig shalgana
    return date1.toDateString() ===  date2.toDateString();
}


//ene 7 hongiin eventuudiig harulah 
function isThisWeekend(eventDate){
    const today = new Date(); //unuuduriin ogno 
    const eventDay = new Date(eventDate); //arga hemjeenii ognoo


    // Unuudur doloo hongiin hed dehi udur we? (0 = Ням, 6 = Бямба)
    const dayOfWeek = today.getDay();

    //herew unuudur nym garag bol, zuwhun unuuduriig haruulah 
    if (dayOfWeek === 0 ){
        return isSameDay(today, eventDay);
    }

    //doloo hongiin unuuduruus nym garag hurtelh udriig tootsoloh 
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - dayOfWeek));
    

    //Arga hemjeenii ognoo unuuduruus Nym garag hurtelh hugatsaand bagtaj baigaa eseh..
    return eventDay >= today && eventDay <= endOfWeek;
}


//ene sariin eventiig haruulah
function isSameMonth(date){
    const today = new Date();
    //endOfMonth ene sariin suuliin udriig hadgalana
    //today.getFullYear() нь одоогийн жил.
    //today.getMonth() + 1 нь дараагийн сар руу шилжинэ (0-based index учир +1 нэмнэ).
    //0 өдөр сонгох нь тухайн сарын сүүлийн өдрийг өгнө.
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return date >= today && date <= endOfMonth;
    
    
}

