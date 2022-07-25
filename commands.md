yarn init -y
yarn add --dev hardhat
yarn hardhat // Choose Typescript Project
yarn hardhat compile
yarn add --dev prettier prettier-plugin-solidity
yarn add --dev dotenv

yarn add --dev solhint
yarn add --dev @chainlink/contracts // For AggregatorV3 Contract
yarn add --dev hardhat-deploy
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers // picks contracts to deploy from the deploy folder in series

yarn add --dev @nomiclabs/hardhat-etherscan // Its pre installed with "yarn hardhat"
yarn add --dev hardhat-gas-reporter // Its pre installed with "yarn hardhat"
yarn add --dev solidity-coverage // Its pre installed with "yarn hardhat"

yarn solhint --init
yarn solhint 'contracts/_.sol'
yarn solhint 'contracts/_.sol' --fix // Fix Solidity Lint Issues

yarn prettier --write . // Fix Formating with prettier
yarn hardhat coverage // Generate Test Coverage Report

yarn hardhat compile

yarn hardhat deploy // Deploys to local hardhat based on files in deploy folder in series
yarn hardhat deploy --tags mocks // Deploys only files tagged as "mocks"
yarn hardhat deploy --network rinkeby //Deploys to rinkeby testnet

yarn hardhat test // Runs tests on local hardhat network
yarn hardhat test --grep funded // Runs onlyTests with description "funded" in it
yarn hardhat test --network rinkeby // Runs tests on rinkeby testnet

yarn hardhat node // Start persistant hardhat node
// On a New Tab
// yarn hardhat run scripts/fund.ts --network localhost // Executes scripts on persistant hardhat node
// yarn hardhat run scripts/withdraw.ts --network localhost // Executes scripts on persistant hardhat node

////////////////////////////////
//Additional Scripts from Simple Storage File
yarn hardhat run scripts/deploy.ts // deploys to local hardhat
yarn hardhat run scripts/deploy.ts --network hardhat
yarn hardhat run scripts/deploy.ts --network rinkeby
yarn hardhat // List hardhat commands available
yarn hardhat block-number // Execution of new task block-number local hardhat
yarn hardhat block-number --network rinkeby // Execution of new task block-number rinkeby
yarn hardhat node // Creates a persistent hardhat node with 10 accounts
yarn hardhat console --network localhost // Allows to intreact with nodes using command line
yarn hardhat clean // Delets Artifacts Folders
yarn hardhat test // Executes Tests
yarn hardhat test --grep store // Executes tests with description "store"
yarn hardhat coverage // Generates code coverage report
