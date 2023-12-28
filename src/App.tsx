import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BalancesTable from './components/BalancesTable';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { useSafeBalances } from './hooks/useSafeBalances';
import SobolAPI from './components/SobolAPI';

import { Title as OriginalTitle } from '@gnosis.pm/safe-react-components';

const Title = styled(OriginalTitle)`
  color: white;
`;

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK();
  const [balances] = useSafeBalances(sdk);
  const [sobolData, setSobolData] = useState<any>(null);
  const [error, setError] = useState<null>(null); // State to hold any errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SobolAPI(); // Call SobolAPI
        setSobolData(data); // Store the data in state
      } catch (err) {
        setError(error); // Store any errors in state
      }
    };

    fetchData(); // Invoke the async function
  }, []); // Empty dependency array means this effect runs once on mount

  console.log({ balances });

  return (
    <Container>
      <Title size="md">Safe: {safe.safeAddress}</Title>
      <BalancesTable balances={balances} />
      <SobolAPI />
      <div>
        {error && <p>Error fetching data: {error}</p>}
        {sobolData && <pre>{JSON.stringify(sobolData, null, 2)}</pre>}
      </div>
      {/* Uncomment and implement other components as needed */}
      {/* <Button size="lg" color="primary">
        Send the assets
      </Button> */}
    </Container>
  );
};

export default SafeApp;
