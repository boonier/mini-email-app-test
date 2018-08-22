export async function fetchData(url) {
    try {
    	if(typeof url !== 'string') return null;
        const response = await fetch(url);
        return response;
    }
    catch(err) {
        console.error("fetching data errorrrr!", err);
    }
}

export function createMarkup(input) {
	if(typeof input !== 'string') return null;
    return {__html: input}
}