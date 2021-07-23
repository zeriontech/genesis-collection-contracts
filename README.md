# zerion-genesis-nft

This is a project with a simple NFT token.

The main functionality of this token is `claim()` function.
It can be called once per EOA (Ethereum address) and only within a deadline (5 days after the deployment).
For every account, `call()` function 'randomly' mints 1 of 10 NFT tokens with the following probabilities:

0. Legendary – 0.1%
1. Rare – 5.1%
2. Rare – 5.1%
3. Rare – 5.1%
4. Common – 14.1%
5. Common – 14.1%
6. Common – 14.1%
7. Common – 14.1%
8. Common – 14.1%
9. Common – 14.1%

The mainnet address is the following: [0x0000000000000000000000000000000000000000](https://etherscan.io/address/0x0000000000000000000000000000000000000000#code).

Call `claim()` function within a deadline and try your luck!
