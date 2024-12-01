

export default async function Data() {
    
        const response = await fetch('./data.json');
        const data = await response.json();
        const events =await data["event-type"];
        return events;

}
