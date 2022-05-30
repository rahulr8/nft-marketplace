import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

// This depend on your HTTP Server setup. In this example, we're using next.js
// api handlers.
export default function mint(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  // initialize the SDK and get the NFT Collection module
  // get the contract address (0x...) from your dashboard!
  const nft = ThirdwebSDK.fromPrivateKey(
    '6f7a6eca74cc5451399a098636088520f07c76b5ff0fbd3c0c05a095d2c7da1f', // My private key (env file)
    'rinkeby' // Blockchain network
  ).getNFTCollection('0x572f96AE65938A2F5B234143d7F8bcE0e2B94FBb'); // Smart contract address

  // returning the HTTP response. This depends on the HTTP server framework.
  return new Promise<void>((resolve) => {
    const { address } = req.body;

    // This NFT will be minted to the wallet address that was requested.
    nft
      .mintTo(address, {
        name: 'Testing another animal',
        description: '2nd test',
        image:
          'https://ipfs.pixura.io/ipfs/QmUyARmq5RUJk5zt7KUeaMLYB8SQbKHp3Gdqy5WSxRtPNa/SeaofRoses.jpg',
        // How do we add metadata here??
      })
      .then((metadata) => {
        // Returning the NFT metadata to the client requested.
        res.status(200).json(metadata);
        resolve();
      });
  });
}
