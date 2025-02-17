import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import { generateConnectionsConfig } from '@layerzerolabs/metadata-tools'
import { OAppEnforcedOption, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const polygonContract: OmniPointHardhat = {
    eid: EndpointId.POLYGON_MAINNET,
    contractName: 'DenarioSilverOFTAdapter',
}
const plumeContract: OmniPointHardhat = {
    eid: EndpointId.PLUME_MAINNET,
    contractName: 'DenarioSilverOFT',
}
const optimismContract: OmniPointHardhat = {
    eid: EndpointId.OPTIMISM_V2_MAINNET,
    contractName: 'DenarioSilverOFT',
}
const arbitrumContract: OmniPointHardhat = {
    eid: EndpointId.ARBITRUM_MAINNET,
    contractName: 'DenarioSilverOFT',
}

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
            polygonContract, // srcContract
            plumeContract, // dstContract
            [['LayerZero Labs'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
            [1, 1], // [srcToDstConfirmations, dstToSrcConfirmations]
            [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
        ],
        // [
        //     polygonContract, // srcContract
        //     arbitrumContract, // dstContract
        //     [['LayerZero Labs'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
        //     [1, 1], // [srcToDstConfirmations, dstToSrcConfirmations]
        //     [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
        // ],
        // [
        //     polygonContract, // srcContract
        //     optimismContract, // dstContract
        //     [['LayerZero Labs'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
        //     [1, 1], // [srcToDstConfirmations, dstToSrcConfirmations]
        //     [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
        // ],
        // [
        //     optimismContract, // srcContract
        //     plumeContract, // dstContract
        //     [['LayerZero Labs'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
        //     [1, 1], // [srcToDstConfirmations, dstToSrcConfirmations]
        //     [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
        // ],
        // [
        //     optimismContract, // srcContract
        //     arbitrumContract, // dstContract
        //     [['LayerZero Labs'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
        //     [1, 1], // [srcToDstConfirmations, dstToSrcConfirmations]
        //     [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
        // ],
        // [
        //     arbitrumContract, // srcContract
        //     plumeContract, // dstContract
        //     [['LayerZero Labs'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
        //     [1, 1], // [srcToDstConfirmations, dstToSrcConfirmations]
        //     [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
        // ],
    ])

    return {
        contracts: [
            { contract: polygonContract },
            { contract: plumeContract },
            // { contract: optimismContract },
            // { contract: arbitrumContract },
        ],
        connections,
    }
}
