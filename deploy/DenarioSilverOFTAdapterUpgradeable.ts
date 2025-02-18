import assert from 'assert'

import { Contract } from 'ethers'
import { type DeployFunction } from 'hardhat-deploy/types'

import { getDeploymentAddressAndAbi } from '@layerzerolabs/lz-evm-sdk-v2'

const contractName = 'DenarioSilverOFTAdapterUpgradeable'

const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    assert(deployer, 'Missing named deployer account')

    if (hre.network.config.oftAdapter == null) {
        console.warn(`oftAdapter not configured on network config, skipping OFTWrapper deployment`)
        return
    }
    const { tokenAddress } = hre.network.config.oftAdapter

    const signer = (await hre.ethers.getSigners())[0]
    assert(deployer, 'Missing signer account')

    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)
    console.log(`Token : ${tokenAddress}`)
    console.log(`Signer: ${signer.address}`)

    const { address, abi } = getDeploymentAddressAndAbi(hre.network.name, 'EndpointV2')
    const endpointV2Deployment = new Contract(address, abi, signer)

    try {
        const proxy = await hre.ethers.getContract(contractName)
        console.log(`Proxy: ${proxy.address}`)
    } catch (e) {
        console.log(`Proxy not found`)
    }

    await deploy(contractName, {
        from: signer.address,
        args: [tokenAddress, endpointV2Deployment.address], // replace '0x' with the address of the ERC-20 token
        log: true,
        waitConfirmations: 1,
        skipIfAlreadyDeployed: false,
        proxy: {
            proxyContract: 'OpenZeppelinTransparentProxy',
            owner: signer.address,
            execute: {
                init: {
                    methodName: 'initialize',
                    args: [signer.address],
                },
            },
        },
    })
}

deploy.tags = [contractName]

export default deploy
