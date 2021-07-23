async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    'Deploying Zerion NFT contract with the account:',
    deployer.address,
  );

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const factory = await ethers.getContractFactory('ZerionGenesisNFT');
  const contract = await factory.deploy(
    [
      'QmR7eMsARNESDzyzBuU9zwZzmcPfCKVk6zqRU4zBsvz5uj',
      'QmRJK5RyepFc4pdwtEWY95vJDFFHzRSRyC9qrNTioWJ1Qy',
      'QmcxJX7kFLopmM37Ae8UHxeYSKrDAs9JC7HioCLHNEiGwK',
      'QmcJcryEHLbiH3i6kqiHHC3VA8z6Txac8CLGhb99jzstZj',
      'QmXBUGFTXuAeBfK9oB9G1NAhGq7AwosWjHFRHMdahETeRK',
      'QmUayvfE9vG9tteDa4kxrsKREV3YFPtB7ktGTRVyEKC8rz',
      'QmbQnyFtdRbeSvqhSQN9QohGa6XngmkckjgbfhUij93uSy',
      'QmZqSzJkojyjQeAh72GPLpN9bbJ1V8dokKHVb6XCMnpwnk',
      'QmdE24n5j3HSPC6LzRGuKQF4efKD5QFDY9HLXzhAM5gnoa',
      'QmUVbQ5GT9iTrTavXtzpq4vd4jGXetCqKLDYae45CpPaaS',
    ],
    'QmX8YMHZwrgJcHQjBuEmmVGvD9dWnuhd2gzXw2w5j3Re3A',
    '0x013333338d8d8d8d8d8d',
    'Zerion Genesis Collection',
    'ZGC',
    1627776000,
  );

  console.log('Contract address:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
