import { useAddress, useMetamask } from '@thirdweb-dev/react';

export function MintButton() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const onMintHandler = async () => {
    // make a backend server api request to mint an NFT
    await fetch('/api/mint_animal', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });
  };

  // Allow minting only if address is present
  return address ? (
    <button type="button" onClick={onMintHandler}>
      Mint an animal
    </button>
  ) : (
    <button type="button" onClick={connectWithMetamask}>
      Connect with Metamask
    </button>
  );
}
