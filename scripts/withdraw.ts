import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethers } from "hardhat"
import { FundMe } from "../typechain-types"

async function main() {
    const accounts = await ethers.getSigners()
    const deployer: SignerWithAddress = accounts[0]
    const fundMe: FundMe = await ethers.getContract("FundMe", deployer.address)

    console.log("Withdrawing Funds....")
    const transactionResponse = await fundMe.withdraw()
    await transactionResponse.wait(1)
    console.log("Funds Withdrawn!")
}

main()
    .then(() => process.exit(0))
    .catch((e: any) => {
        console.log(e)
        process.exit(1)
    })
