import { useEffect, useState } from 'react';
import { useNFTCollection } from '@thirdweb-dev/react';

export function NftList() {
  // React state for a list of nfts in the nft collection
  const [nfts, setNFTs] = useState<any>([]);
  console.log('RENDERING');

  // initialize the SDK and get the NFT Collection module
  // get the contract address (0x...) from your dashboard!
  const nftCollectionAddress = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
  // const nftCollectionAddress = '0x572f96AE65938A2F5B234143d7F8bcE0e2B94FBb';
  const nftCollection = useNFTCollection(nftCollectionAddress);
  console.log('nftCollection', nftCollection);

  useEffect(() => {
    const fetchNFTs = async () => {
      const nftList = await nftCollection?.getAll();
      setNFTs(nftList);
    };

    fetchNFTs();
  }, []);

  // render the list of nfts
  console.log('The nfts are: ', nfts);

  return nfts.map((nft: any) => (
    <p key={nft.metadata.id.toString()}>NFT name: {nft.metadata.name}</p>
  ));
}
