import { BigNumber } from 'ethers';
import { expect } from 'chai';

import { ethers } from 'hardhat';

describe('ZerionGenesisNFT', () => {
  let owner;
  let factory;
  let nft;

  before(async () => {
    factory = await ethers.getContractFactory('ZerionGenesisNFT');
    nft = await factory.deploy(
      [
        'metadata_ipfs_hash_0',
        'metadata_ipfs_hash_1',
        'metadata_ipfs_hash_2',
        'metadata_ipfs_hash_3',
        'metadata_ipfs_hash_4',
        'metadata_ipfs_hash_5',
        'metadata_ipfs_hash_6',
        'metadata_ipfs_hash_7',
        'metadata_ipfs_hash_8',
        'metadata_ipfs_hash_9',
      ],
      'metadata_ipfs_hash',
      '0x013333338d8d8d8d8d8d',
      'Test',
      'TST',
      parseInt(new Date() / 1000, 10) + 6 * 24 * 60 * 60,
    );

    [owner] = await ethers.getSigners();
  });

  it('Should indicate that NFT is not minted', async () => {
    expect(await nft.claimed(owner.address)).to.be.false;
  });

  it('Should mint once for one account', async () => {
    await nft.claim();
    let balances = await nft.balanceOfBatch(
      Array(10).fill(owner.address),
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    );

    expect(balances.reduce((a, c) => a.add(c))).to.be.equal(BigNumber.from('1'));
  });

  it('Should indicate that NFT is minted', async () => {
    expect(await nft.claimed(owner.address)).to.be.true;
  });

  it('Should not mint twice for same account', async () => {
    await expect(nft.claim()).to.be.reverted;
  });

  it('Should be correct rarities', async () => {
    const rarities = [1, 51, 51, 51, 141, 141, 141, 141, 141, 141, 0];

    // eslint-disable-next-line no-restricted-syntax
    for await (const id of Array.from({ length: 11 }, (_, i) => i)) {
      if (id === parseInt(id, 10)) {
        // eslint-disable-next-line no-await-in-loop
        const rarity = await nft.rarity(id);
        expect(rarity).to.be.equal(rarities[id]);
      }
    }
  });

  it('Should be correct URIs', async () => {
    // eslint-disable-next-line no-restricted-syntax
    for await (const id of Array.from({ length: 10 }, (_, i) => i)) {
      if (id === parseInt(id, 10)) {
        // eslint-disable-next-line no-await-in-loop
        const uri = await nft.uri(id);
        expect(uri).to.be.equal(`ipfs://metadata_ipfs_hash_${id}`);
      }
    }

    let uri = await nft.uri(10);
    expect(uri).to.be.equal('');
  });

  it('Should be correct name', async () => {
    const name = await nft.name();
    expect(name).to.be.equal('Test');
  });

  it('Should be correct symbol', async () => {
    const symbol = await nft.symbol();
    expect(symbol).to.be.equal('TST');
  });

  it('Should be correct contract URI', async () => {
    const contractURI = await nft.contractURI();
    expect(contractURI).to.be.equal('ipfs://metadata_ipfs_hash');
  });

  it('Should support contractURI interface', async () => {
    const supports = await nft.supportsInterface('0xe8a3d485');
    expect(supports).to.be.equal(true);
  });

  it('Should not claim after the deadline', async () => {
    let badNft = await factory.deploy(
      [
        'metadata_ipfs_hash_0',
        'metadata_ipfs_hash_1',
        'metadata_ipfs_hash_2',
        'metadata_ipfs_hash_3',
        'metadata_ipfs_hash_4',
        'metadata_ipfs_hash_5',
        'metadata_ipfs_hash_6',
        'metadata_ipfs_hash_7',
        'metadata_ipfs_hash_8',
        'metadata_ipfs_hash_9',
      ],
      'metadata_ipfs_hash',
      '0x013333338d8d8d8d8d8d',
      'Test',
      'TST',
      parseInt(new Date() / 1000, 10) - 1000,
    );
    await expect(badNft.claim()).to.be.reverted;
  });
});
