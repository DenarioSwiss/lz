// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'
import '@openzeppelin/hardhat-upgrades'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-deploy-ethers'
import 'hardhat-contract-sizer'
import '@layerzerolabs/toolbox-hardhat'
import '@nomiclabs/hardhat-ethers'
import { task } from 'hardhat/config'
import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import './type-extensions'

const MNEMONIC = process.env.MNEMONIC
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

//
// custom tasks
//

task('dsc:balance', "Prints an account's DSC balance")
    .addParam('account', "The account's address")
    .setAction(async (taskArgs) => {
        const balance = await ethers.provider.getBalance(taskArgs.account)
        console.log(ethers.utils.formatEther(balance), 'ETH')
    })

//
//
//

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
        'polygon-mainnet': {
            eid: EndpointId.POLYGON_V2_MAINNET,
            url: process.env.RPC_URL_POLYGON,
            accounts,
            oftAdapter: {
                tokenAddress: process.env.DSC_POLYGON || '',
            },
        },
        'optimism-mainnet': {
            eid: EndpointId.OPTIMISM_V2_MAINNET,
            url: process.env.RPC_URL_OPTIMISM,
            accounts,
        },
        'arbitrum-mainnet': {
            eid: EndpointId.ARBITRUM_V2_MAINNET,
            url: process.env.RPC_URL_ARBITRUM,
            accounts,
        },
        'ethereum-mainnet': {
            eid: EndpointId.ETHEREUM_V2_MAINNET,
            url: process.env.RPC_URL_ETHEREUM,
            accounts,
        },
        'plume-mainnet': {
            eid: EndpointId.PLUME_V2_MAINNET,
            url: process.env.RPC_URL_PLUME,
            accounts,
        },
        //
        // TESTNET DEPLOYMENT
        //
        'amoy-testnet': {
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
        //     eid: EndpointId.PLUME_V2_TESTNET,
        //     url: process.env.RPC_URL_PLUME || 'https://test-rpc.plumenetwork.xyz',
        //     accounts,
        // },
        'optsep-testnet': {
            eid: EndpointId.OPTSEP_V2_TESTNET,
            url: process.env.RPC_URL_OPTIMISM_TESTNET,
            accounts,
        },
        'arbsep-testnet': {
            eid: EndpointId.ARBSEP_V2_TESTNET,
            url: process.env.RPC_URL_ARBITRUM_TESTNET,
            accounts,
        },
        'sepolia-testnet': {
            eid: EndpointId.SEPOLIA_V2_TESTNET,
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
