const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXV0b21hdGVkIiwia2lkIjoiblNYdzJWenhmaSIsIm9pZCI6IkxtWTJLZ1pmcTQiLCJ1aWQiOiJHUnZfUWgxTGE0IiwiaWF0IjoxNzAzNDQzNDkyLCJleHAiOjE3MzQ5Nzk0OTJ9.m3AaDWMlO00vEd7v6VqRCR8F22_ujKdN1m9RVD24CHo';
const addressesApiUrl = 'https://sobol.io/d/api/v1/org/LmY2KgZfq4/addresses';
const teamsApiUrl = 'https://sobol.io/d/api/v1/org/LmY2KgZfq4/teams';
// The CORS Anywhere proxy URL
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

// Combined URL with the proxy
const proxiedAddressUrl = `${proxyUrl}${addressesApiUrl}`;
const proxiedTeamsUrl = `${proxyUrl}${teamsApiUrl}`;

const headers = {
  'Authorization': `Bearer ${apiKey}`
};

const SobolAPI = async () => {
  try {
    // Fetch data from the Sobol API
    const addressResponse = await fetch(proxiedAddressUrl, { headers });
    const teamResponse = await fetch(proxiedTeamsUrl, { headers });
    // Check if the request was successful
    if (!addressResponse.ok) {
      console.log(addressResponse)
      throw new Error(`HTTP error! status: ${addressResponse.status}`);
    }

    if (!teamResponse.ok) {
      console.log(teamResponse)
      throw new Error(`HTTP error! status: ${teamResponse.status}`);
    }

    // Parse the JSON response
    const addressData = await addressResponse.json();
    const teamData = await teamResponse.json();

    // Log the data to the console
    console.log(addressData);
    console.log(teamData);
    return addressData; // Return the data for further processing if needed
  } catch (error) {
    // Log any errors to the console
    console.error('Failed to fetch data from Sobol:', error);
    throw error; // Re-throw the error for handling by the caller
  }
};

export default SobolAPI;
