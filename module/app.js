import Data from "./data";
import setupFilter, {filterEvents} from "./baraafilter";

async function Main() {
    const data = await Data();
    
    console.log(data);
    setupFilter(events);
}


Main();
