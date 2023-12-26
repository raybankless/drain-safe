const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXV0b21hdGVkIiwia2lkIjoiblNYdzJWenhmaSIsIm9pZCI6IkxtWTJLZ1pmcTQiLCJ1aWQiOiJHUnZfUWgxTGE0IiwiaWF0IjoxNzAzNDQzNDkyLCJleHAiOjE3MzQ5Nzk0OTJ9.m3AaDWMlO00vEd7v6VqRCR8F22_ujKdN1m9RVD24CHo';
const addressesApiUrl = 'https://sobol.io/d/api/v1/org/LmY2KgZfq4/addresses';
const headers = {
    'Authorization': `Bearer ${apiKey}`
};

const SobolAPI = async () => {
    try {
        // Fetch data from the Sobol API
        const response = await fetch(addressesApiUrl, { headers: headers });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Log the data to the console
        console.log(data);
        return data; // Return the data for further processing if needed
    } catch (error) {
        // Log any errors to the console
        console.error('Failed to fetch data from Sobol:', error);
        throw error; // Re-throw the error for handling by the caller
    }
};

export default SobolAPI;
