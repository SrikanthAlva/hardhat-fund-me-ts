import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import {
    developmentChains,
    DECIMALS,
    INTITIAL_ANSWER,
} from "../helper-hardhat-config"

const deployMocks: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId || ""

    const args = [DECIMALS, INTITIAL_ANSWER]

    if (developmentChains.includes(network.name)) {
        log("Local network detected. Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks Deployed!!!")
        log("-------------------------------------------")
    }
}

export default deployMocks
deployMocks.tags = ["mocks", "all"]
