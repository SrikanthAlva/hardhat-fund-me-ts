import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { FundMe } from "../../typechain-types"
import { assert } from "chai"
import { network, ethers, getNamedAccounts } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Tests", async function () {
          let deployer: SignerWithAddress
          let fundMe: FundMe
          const sendValue = ethers.utils.parseEther("0.1")
          beforeEach(async () => {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              const trasactionResponse = await fundMe.withdraw()
              trasactionResponse.wait(1)

              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(
                  endingFundMeBalance.toString() +
                      " should equal 0, running assert equal..."
              )
              assert.equal(endingFundMeBalance.toString(), "0")
          })
      })
