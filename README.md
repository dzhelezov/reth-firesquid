[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/subsquid-labs/evm-logs-example)

# USDC transfers indexing squid

This example squid indexes USDC transfers by tracking the historical `Transfer(address,address,uint256)` logs emitted by the [USDC contract](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48) on the Ethereum Mainnet. 
For an extensive reference of Squid SDK and the Subsquid ecosystem, go to the [docs](https://docs.subsquid.io).

One can use this example as a template for scaffolding a new squid project with [`sqd init`](https://docs.subsquid.io/squid-cli/):

```bash
sqd init my-new-squid --template https://github.com/subsquid-labs/evm-logs-example
```


## Prerequisites

- Node v16.x
- Docker
- [Squid CLI](https://docs.subsquid.io/squid-cli/)

## Running 

Navigate to the example folder.

```bash
npm ci
sqd build
# start the database
sqd up
# starts a long-running ETL and blocks the terminal
sqd process

# starts the GraphQL API server at localhost:4350/graphql
sqd serve
```
