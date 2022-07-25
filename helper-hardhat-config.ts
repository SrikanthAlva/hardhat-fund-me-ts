export interface networkConfigItem {
    ethUsdPriceFeed?: string
    blockConfirmations?: number
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const DECIMALS = 8
export const INTITIAL_ANSWER = 200000000000

export const networkConfig: networkConfigInfo = {
    localhost: {},
    hardhat: {},
    rinkeby: {
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
        blockConfirmations: 6,
    },
    kovan: {
        ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
        blockConfirmations: 6,
    },
    polygon: {
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
        blockConfirmations: 6,
    },
}

export const developmentChains = ["hardhat", "localhost"]
