import { Face, Network } from '@haechi-labs/face-sdk';
import { Kit, getWalletConnect } from '@haechi-labs/face-kit';
import { Env } from '@haechi-labs/face-types';
import { useRecoilState } from 'recoil';

import { resolveApiKey } from '../config/apiKey';
import { faceAtom, kitAtom } from '../store';
import { networkAtom } from '../store/networkAtom';
import Box from './common/Box';
import Button from './common/Button';
import Message from './common/Message';
import {LoginProvider} from '@haechi-labs/face-types';

const networkList = [
  Network.SAND_VERSE,
  Network.OASYS,
  Network.OASYS_TESTNET,
];

const title = 'Connect Network';

function ConnectNetwork() {
  const [face, setFace] = useRecoilState(faceAtom);
  const [kit, setKit] = useRecoilState(kitAtom);
  const [, setNetwork] = useRecoilState(networkAtom);

  const connectTo = (network) => {
    setNetwork(network);

    console.log(network);
    const face = new Face({
      // This is just a test api key, so just hard-code it
      apiKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8Okg6t42RostBqGMdqi6IULmUDx-Mcgh6_HMQlyVaHiIOAxOPH_Ffq5TggxH6EZAX_zSCPKERRMbZuv2StMAoWpMuWncU1vkZnwoYbKRk-PgbhxBJgsNpOtCoy259YObAo5m9CMOdlDLpSm3tmm9RhQcIXMa_eL-lVsbI9u5cUQIDAQAB",
      network: Network.SAND_VERSE,
      notificationOptions: {
        type: 'toast',
      },
    });
    console.log(face.internal);
    setFace(face);
  
    const newkit = new Kit(face, {
      providers: [ 
        LoginProvider.Google,
      ],
      externalWalletOptions: {
        wallets: [
          getWalletConnect(
            { 
              options: 
              { 
                projectId: "803519edcc2b2ef1f394fb89c96cb9d9",
              }, 
              // chains: [
              //   {
              //     id: 20197,
              //     name: "Sandverse",
              //     network: "Oasys Sandverse",
              //     nativeCurrency: "OAS",
              //     rpcUrls: {
              //       default: { "http": ["https://rpc.sandverse.oasys.games"]}, 
              //       public: { "http": ["https://rpc.sandverse.oasys.games"]}
              //     },
              //   }
              // ]
            }
          )
        ],
        expanded: false,
      },
    });
    setKit(newkit)
  };

  if (face) {
    return (
      <Box title={title}>
        <Message type="info">Connected</Message>
      </Box>
    );
  }

  const resolveNetworkName = (network) => {
    switch (network) {
      case Network.SAND_VERSE:
        return 'Sand Verse';
      case Network.OASYS:
        return 'Oasys';
      case Network.OASYS_TESTNET:
        return 'Oasys Testnet';
      default:
        throw new Error('unsupported network error');
    }
  };

  return (
    <Box title={title}>
      {networkList.map((network) => (
        <Button key={network} onClick={() => connectTo(network)}>
          Connect to {resolveNetworkName(network)}
        </Button>
      ))}
    </Box>
  );
}

export default ConnectNetwork;
