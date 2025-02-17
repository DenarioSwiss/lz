# denario lz deployment playbook

## Test Deployments

### Target chains

Deployment takes place to the following testnets:

- Polygon Amoy (home chain)
- Arbitrum Sepolia
- Optimism Sepolia
- Sepolia
- Plume Devnet does not support LayerZero OFT token as of now

Planned testnet deployments for the following:

- Binance
- Etherlink
- Sepolia

### Process

Preconditions:

- `pnpm`
- api keys and rpc endpoints for the testnets
- contract address of the testnet token deployed on amoy.

- public/private key for deployer account
- sufficient balances for deployer account:
  -- ethereum
  -- sepolia
  -- polygon
  -- polygon amoy
  -- optimism mainnet
  -- optimism sepolia
  -- arbitrum mainnet
  -- arbitrum sepolia

0. Pull repo and install dependencies

1. if starting from scratch:

- take recent version after december 12, 2024 from LZ examples
- update `OFT` and `OFTAdapter` contract
- update `OFT` and `OFTAdapter` deployment scripts

2. add/cp .env file containing deployment address of existing token.
3. configure desired endpoints in `hardhat.config.ts`.
4. create and configure `layerzero.simple.config.ts`.

5. test rpc config: `npx hardhat lz:healthcheck:validate:rpcs`.

6. deploy to testnets: `npx hardhat lz:deploy` and select networks to deploy to.
