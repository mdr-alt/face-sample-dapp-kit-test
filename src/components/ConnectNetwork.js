import { Face, Network } from '@haechi-labs/face-sdk';
import { useRecoilState } from 'recoil';

import { API_KEY } from '../config/apiKey';
import { faceAtom } from '../store';
import { networkAtom } from '../store/networkAtom';
import Box from './common/Box';
import Message from './common/Message';

function ConnectNetwork() {
  const [face, setFace] = useRecoilState(faceAtom);
  const [, setNetwork] = useRecoilState(networkAtom);

  const connectTo = (network) => {
    setNetwork(network);

    const face = new Face({
      apiKey: API_KEY,
      network: network,
    });
    setFace(face);
  };

  return (
    <Box title="Connect Network">
      {face ? (
        <Message type="info">Connected</Message>
      ) : (
        <>
          <button className="button" onClick={() => connectTo(Network.ETH_TESTNET)}>
            Connect to Ether Testnet
          </button>
          <button className="button" onClick={() => connectTo(Network.ETH_MAINNET)}>
            Connect to Ether Mainnet
          </button>
          <button className="button" onClick={() => connectTo(Network.MATIC_TESTNET)}>
            Connect to Polygon Testnet
          </button>
          <button className="button" onClick={() => connectTo(Network.MATIC_MAINNET)}>
            Connect to Polygon Mainnet
          </button>
        </>
      )}
    </Box>
  );
}

export default ConnectNetwork;
