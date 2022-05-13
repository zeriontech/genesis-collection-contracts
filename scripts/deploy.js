import { ipfsHashes, contractIpfsHash, rarities, name, symbol, deadline } from './arguments';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    'Deploying Zerion NFT contract with the account:',
    deployer.address,
  );

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const factory = await ethers.getContractFactory('ZerionGenesisNFT');
  const contract = await factory.deploy(
    ipfsHashes, contractIpfsHash, rarities, name, symbol, deadline,
  );

  console.log('Contract address:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
