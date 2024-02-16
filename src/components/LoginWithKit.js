import {
  Blockchain,
  isEthlikeBlockchain,
  LoginProvider,
  networkToBlockchain,
} from '@haechi-labs/face-types';
import { ethers, BigNumber, providers } from 'ethers';
import * as nearAPI from 'near-api-js';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { config as nearConfig } from '../config/near';
import { faceAtom, kitAtom } from '../store';
import { accountAtom } from '../store/accountAtom';
import CheckboxList from './CheckboxList';
import Box from './common/Box';
import Button from './common/Button';
import Message from './common/Message';

const title = 'Log in';
function LoginWithKit() {
  const face = useRecoilValue(faceAtom);
  const kit = useRecoilValue(kitAtom);
  const [, setAccount] = useRecoilState(accountAtom);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginProviders, setLoginProviders] = useState([]);


  async function login() {
    // Just a dirty test to check if we can do a transaction on Sandverse using a WalletConnect wallet
    // See https://faucet.sandverse.oasys.games/ for the faucet for Sandverse
    // 1. Connect Kit
    // 2. Get the current block (read query test)
    // 3. Send some Sandverse OAS to an arbitrary address

    const ntwk = await kit.face.getChainId()
    console.log("ntwk", ntwk)
    const connectedWallet = await kit.connect();
    console.log('Kit connect response:', connectedWallet);  // <- Connected wallet has chainId = 20197

    const baseProvider = await connectedWallet.connector.getProvider()
    console.log("baseProvider", baseProvider)               // <- The base provider has chainId = 1
    const provider = new providers.Web3Provider(
      baseProvider, { name: "Oasys Sandverse", chainId: 20197}
    );
    console.log("provider", provider)                       // <- Cannot force the chainId

    const signer = provider.getSigner();
    const blk = await provider.getBlock()
    console.log(blk)                                        // <- I'm getting the latest block from Eth mainnet

    const receiverAddress = '0xBEF0fed0499014dE99D43BebB5A2EA0f30F68c35';
    const amount = ethers.utils.parseEther('0.00001');
    
    const tx = await signer.sendTransaction({
        to: receiverAddress,
        value: amount,
    });
    
    const receipt = await tx.wait();
    console.log(receipt)
    const txHash = receipt.transactionHash;
    console.log(txHash)
  }

  async function logout() {
    // await face.auth.logout();
    await kit.logout()
    setIsLoggedIn(false);
    setAccount({});
  }

  useEffect(() => {
    if (!kit) {
      return;
    }
    // kit.auth.isLoggedIn().then((result) => {
    //   setIsLoggedIn(result);

    //   // if (result) {
    //   //   getAccountInfo();
    //   // }
    // });
  }, [face]);

  if (!kit) {
    return (
      <Box title={title}>
        <Message type="danger">You must connect to the network first.</Message>
      </Box>
    );
  }

  return (
    <Box title={title}>
      {isLoggedIn ? (
        <>
          <Message type="info">Log in succeed</Message>
          {/* <Button onClick={getAccountInfo}>Get account information</Button> */}
          <Button onClick={logout}>Log out</Button>
        </>
      ) : (
        <>
          <CheckboxList
            items={Object.values(LoginProvider).map((p) => ({ key: p }))}
            state={loginProviders}
            setState={setLoginProviders}
          />
          <Button onClick={login}>Log in with Kit + Do a test tx</Button>
        </>
      )}
    </Box>
  );
}

export default LoginWithKit;
