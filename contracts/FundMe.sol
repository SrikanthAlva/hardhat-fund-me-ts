//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./PriceConverter.sol";
import "hardhat/console.sol";

//----Style Guide----//
// // Outside Contract
// // // Pragma , Import, Errors, Interfaces, Libraries, Contract

// // Inside Contract
// // // Type Declaration, State Variables, Events, Modifiers, Functions

// // Functions
// // // Constructor, recieve, fallback, external, public, internal, private, veiw and pure

//----Style Guide----//

error FundMe__NotEnoughEther(); // This helps in identifying the contract at which error has been triggered
error FundMe__WithdrawFailedSend();
error FundMe__WithdrawFailedCall();
error FundMe__NotContractOwner();

/**
    @title A contract for crowd funding
    @author Srikanth Alva
    @notice This contract is Demo for sample funding contract
    @dev This implements price feed as a library
 */
contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18;
    address private immutable i_owner;

    address[] private s_funders;
    mapping(address => uint256) private s_addressToAmountFunded;
    AggregatorV3Interface private s_priceFeed;

    modifier onlyOnwer() {
        if (msg.sender != i_owner) {
            revert FundMe__NotContractOwner();
        }
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    /**
        @notice This function funds the contract
        @dev This implements price feed as out library
     */
    function fund() public payable {
        // console.log("Min USD: ", MINIMUM_USD);
        // console.log("Price Value: ", msg.value.getConversionRate(s_priceFeed));
        // require(
        //     msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
        //     "You need to spend more ETH!"
        // );
        if (msg.value.getConversionRate(s_priceFeed) < MINIMUM_USD) {
            revert FundMe__NotEnoughEther();
        }
        // if (s_addressToAmountFunded[msg.sender] == 0) {
        // }
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdraw() public onlyOnwer {
        for (uint256 index = 0; index < s_funders.length; index++) {
            s_addressToAmountFunded[s_funders[index]] = 0;
        }
        s_funders = new address[](0);

        // payable(msg.sender).transfer(address(this).balance);
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);

        // if (!sendSuccess) {
        //     revert FundMe__WithdrawFailedSend();
        // }

        //call
        // (bool callSuccess, bytes memory dataReturned) = payable(msg.sender).call{value: address(this).balance}("");
        (bool callSuccess, ) = i_owner.call{value: address(this).balance}("");

        if (!callSuccess) {
            revert FundMe__WithdrawFailedCall();
        }
    }

    function cheaperWithdraw() public onlyOnwer {
        address[] memory funders = s_funders;
        for (uint256 index = 0; index < funders.length; index++) {
            s_addressToAmountFunded[funders[index]] = 0;
        }
        s_funders = new address[](0);

        (bool callSuccess, ) = i_owner.call{value: address(this).balance}("");

        if (!callSuccess) {
            revert FundMe__WithdrawFailedCall();
        }
    }

    function getaddressToAmountFunded(address fundingAddress)
        public
        view
        returns (uint256)
    {
        return s_addressToAmountFunded[fundingAddress];
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getVersion() public view returns (uint256) {
        return s_priceFeed.version();
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
