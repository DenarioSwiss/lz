// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import './type-extensions'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    paths: {
        cache: 'cache/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        //
        // MAINNET DEPLOYMENT
        //
        polygon: {
            eid: EndpointId.POLYGON_MAINNET,
            url: process.env.RPC_URL_POLYGON,
            accounts,
            oftAdapter: {
                tokenAddress: process.env.DSC_POLYGON || '',
            },
        },
        optimism: {
            eid: EndpointId.OPTIMISM_V2_MAINNET,
            url: process.env.RPC_URL_OPTIMISM_V2,
            accounts,
        },
        arbitrum: {
            eid: EndpointId.ARBITRUM_MAINNET,
            url: process.env.RPC_URL_ARBITRUM,
            accounts,
        },
        ethereum: {
            eid: EndpointId.ETHEREUM_MAINNET,
            url: process.env.RPC_URL_ETHEREUM,
            accounts,
        },
        plume: {
            eid: EndpointId.PLUME_MAINNET,
            url: process.env.RPC_URL_PLUME,
            accounts,
        },
        //
        // TESTNET DEPLOYMENT
        //
        'polygon-amoy': {
            eid: EndpointId.AMOY_V2_TESTNET,
            url: process.env.RPC_URL_AMOY || 'https://polygon-amoy-bor-rpc.publicnode.com',
            accounts,
            oftAdapter: {
                tokenAddress: process.env.DSC_AMOY || '',
            },
        },
        // apparently there is no plume testnet providing layerzero.
        // we will use arbitrum sepolia for testing.
        // 'plume-devnet': {
        //     eid: EndpointId.PLUME_TESTNET,
        //     url: process.env.RPC_URL_PLUME || 'https://test-rpc.plumenetwork.xyz',
        //     accounts,
        // },
        'optimism-testnet': {
            eid: EndpointId.OPTIMISM_V2_TESTNET,
            url: process.env.RPC_URL_OPTIMISM_V2_TESTNET,
            accounts,
        },
        'arbitrum-testnet': {
            eid: EndpointId.ARBITRUM_TESTNET,
            url: process.env.RPC_URL_ARBITRUM_TESTNET,
            accounts,
        },
        sepolia: {
            eid: EndpointId.SEPOLIA_TESTNET,
            url: process.env.RPC_URL_SEPOLIA,
            accounts,
        },
        //
        //
        //
        hardhat: {
            // Need this for testing because TestHelperOz5.sol is exceeding the compiled contract size limit
            allowUnlimitedContractSize: true,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
    layerZero: {
        // You can tell hardhat toolbox not to include any deployments (hover over the property name to see full docs)
        deploymentSourcePackages: [],
        // You can tell hardhat not to include any artifacts either
        // artifactSourcePackages: [],
    },
}

export default config
