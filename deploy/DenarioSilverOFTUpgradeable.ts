import assert from 'assert'

import { Contract } from 'ethers'
import { type DeployFunction } from 'hardhat-deploy/types'

import { getDeploymentAddressAndAbi } from '@layerzerolabs/lz-evm-sdk-v2'

const contractName = 'DenarioSilverOFTUpgradeable'

const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    assert(deployer, 'Missing named deployer account')

    const signer = (await hre.ethers.getSigners())[0]
    assert(deployer, 'Missing signer account')

    console.log(`Contract: ${contractName}`)
    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)
    console.log(`Signer: ${signer.address}`)

    const { address, abi } = getDeploymentAddressAndAbi(hre.network.name, 'EndpointV2')
    const endpointV2Deployment = new Contract(address, abi, signer)

    await deploy(contractName, {
        from: signer.address,
        args: [endpointV2Deployment.address],
        log: true,
        waitConfirmations: 1,
        skipIfAlreadyDeployed: false,
        proxy: {
            proxyContract: 'OpenZeppelinTransparentProxy',
            owner: signer.address,
            execute: {
                init: {
                    methodName: 'initialize',
                    args: ['Denario Silver Coin', 'DSC', signer.address], // TODO: add name/symbol
                },
            },
        },
    })
}

deploy.tags = [contractName]

export default deploy
