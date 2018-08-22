export async function fetchData(url) {
    try {
        const response = await fetch(url);
        return response;
    }
    catch(err) {
        console.log("fetching data errorrrr!", err);
    }
}

// create test for?
export function createMarkup(code) { 
    return {__html: code}
}