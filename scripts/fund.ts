import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { copyFileSync } from "fs"
import { ethers, getNamedAccounts } from "hardhat"
import { FundMe } from "../typechain-types"

async function main() {
    const accounts = await ethers.getSigners()
    const deployer: SignerWithAddress = accounts[0]
    const fundMe: FundMe = await ethers.getContract("FundMe", deployer.address)
    const sendEther = ethers.utils.parseEther("0.05")

    console.log("Funding Contract...")
    const transactionResponse = await fundMe.fund({ value: sendEther })
    await transactionResponse.wait(1)
    console.log("Funded!")
}

main()
    .then(() => process.exit(0))
    .catch((e: any) => {
        console.log(e)
        process.exit(1)
    })
