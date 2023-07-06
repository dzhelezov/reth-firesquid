
# RETH indexing squid

This a squid indexing Transfer and Approval events of the [RETH pool contract](https://etherscan.io/token/0xae78736cd615f374d3085123a210448e74fc6393). It is a benchmark to compare with [reth-indexer](https://github.com/joshstevens19/reth-indexer)


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
