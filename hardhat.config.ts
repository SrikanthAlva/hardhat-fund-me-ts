import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"
import "hardhat-deploy"

const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || ""
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
            {
                version: "0.6.6",
            },
        ],
    },
    networks: {
        hardhat: {},
        rinkeby: {
            chainId: 4,
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        kovan: {
            chainId: 42,
            url: KOVAN_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        localhost: {
            // This is a persistant hardhat local node.
            chainId: 31337,
            url: "http://127.0.0.1:8545/",
            // accounts: [] // need not mention accounts as hardhat local node will provide from its default 10 accounts.
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-reporter.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
    namedAccounts: {
        // accounts in each network can be named.
        deployer: {
            // deployer is the name for account[0] in the networks
            default: 0,
            // 31337: 1 //can set the default account based on network as well
        },
        user: {
            // user is the name for account[1] in the networks
            default: 1,
        },
    },
}

export default config
