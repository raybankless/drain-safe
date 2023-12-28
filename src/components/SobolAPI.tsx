import React, { useEffect, useState } from 'react';
import { Table } from '@gnosis.pm/safe-react-components';

type Address = {
  address: string;
  chainId: string;
  name: string;
  objectId: string;
};

const SobolAPI = () => {
  const [sobolData, setSobolData] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // API and Proxy URLs
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXV0b21hdGVkIiwia2lkIjoiblNYdzJWenhmaSIsIm9pZCI6IkxtWTJLZ1pmcTQiLCJ1aWQiOiJHUnZfUWgxTGE0IiwiaWF0IjoxNzAzNDQzNDkyLCJleHAiOjE3MzQ5Nzk0OTJ9.m3AaDWMlO00vEd7v6VqRCR8F22_ujKdN1m9RVD24CHo';   // Secure your API Key properly
  const addressesApiUrl = 'https://sobol.io/d/api/v1/org/LmY2KgZfq4/addresses';
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const proxiedAddressUrl = `${proxyUrl}${addressesApiUrl}`;
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'X-Requested-With': 'XMLHttpRequest'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(proxiedAddressUrl, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Address[] = await response.json();
        setSobolData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data from Sobol:', error);
        setError(error as Error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Sobol Data</h1>
      {error ? (
        <p>Failed to load data: {error.message}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table
          headers={[
            { id: 'col1', label: 'Name' },
            { id: 'col2', label: 'Address' },
            { id: 'col3', label: 'Chain ID' },
            { id: 'col4', label: 'Object ID' },
          ]}
          rows={sobolData.map((address, index) => ({
            id: `row${index}`,
            cells: [
              { content: address.name || 'N/A' },
              { content: address.address },
              { content: address.chainId },
              { content: address.objectId },
            ],
          }))}
        />
      )}
    </div>
  );
};

export default SobolAPI;
