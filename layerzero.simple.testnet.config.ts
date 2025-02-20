import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import { generateConnectionsConfig } from '@layerzerolabs/metadata-tools'
import { OAppEnforcedOption, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const upgradableOFTAdapter = 'DenarioSilverOFTAdapterUpgradeable'
const upgradableOFT = 'DenarioSilverOFTUpgradeable'

const amoyContract: OmniPointHardhat = {
    eid: EndpointId.AMOY_V2_TESTNET,
    contractName: upgradableOFTAdapter,
}
const optimismContract: OmniPointHardhat = {
    eid: EndpointId.OPTSEP_V2_TESTNET,
    contractName: upgradableOFT,
}
const arbitrumContract: OmniPointHardhat = {
    eid: EndpointId.ARBSEP_V2_TESTNET,
    contractName: upgradableOFT,
}
// currently there is no layerzero contract deployment on testnet
// const plumeTestnetContract: OmniPointHardhat = {
//     eid: EndpointId.PLUME_TESTNET,
//     contractName: 'DenarioSilverOFT',
// }
// TODO: Etherlink
// TODO: TON
// TODO: BINANCE

const EVM_ENFORCED_OPTIONS: OAppEnforcedOption[] = [
    {
        msgType: 1,
        optionType: ExecutorOptionType.LZ_RECEIVE,
        gas: 80000,
        value: 0,
    },
    {
        msgType: 2,
        optionType: ExecutorOptionType.LZ_RECEIVE,
        gas: 80000,
        value: 0,
    },
    {
        msgType: 2,
        optionType: ExecutorOptionType.COMPOSE,
        index: 0,
        gas: 80000,
        value: 0,
    },
]

export default async function () {
    const connections = await generateConnectionsConfig([
        [
            amoyContract, // srcContract
            arbitrumContract, // dstContract
            [['LayerZero Labs'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
            [1, 1], // [srcToDstConfirmations, dstToSrcConfirmations]
            [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
        ],
        [
            amoyContract, // srcContract
            optimismContract, // dstContract
            [['LayerZero Labs'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
            [1, 1], // [srcToDstConfirmations, dstToSrcConfirmations]
            [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
        ],
        [
            optimismContract, // srcContract
            arbitrumContract, // dstContract
            [['LayerZero Labs'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
            [1, 1], // [srcToDstConfirmations, dstToSrcConfirmations]
            [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
        ],
    ])

    return {
        contracts: [{ contract: amoyContract }, { contract: optimismContract }, { contract: arbitrumContract }],
        connections,
    }
}
