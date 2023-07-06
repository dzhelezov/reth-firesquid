import {BatchHandlerContext, BatchProcessorItem, EvmBatchProcessor, EvmBlock, LogItem} from '@subsquid/evm-processor'
import {Store, TypeormDatabase} from '@subsquid/typeorm-store'
import { lookupArchive } from '@subsquid/archive-registry'
import {Approval, Transfer} from './model'
import assert from 'assert'
import * as erc20 from './abi/erc20'

export const CONTRACT_ADDRESS = '0xae78736cd615f374d3085123a210448e74fc6393'

const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('eth-mainnet'),
    })
    .addLog(CONTRACT_ADDRESS, {
        range: {from: 11_446_767, to: 17_576_926},
        filter: [[erc20.events.Transfer.topic, erc20.events.Approval.topic]],
        data: {
            evmLog: {
                topics: true,
                data: true,
            }
        },
    })

type Item = BatchProcessorItem<typeof processor>
type Ctx = BatchHandlerContext<Store, Item>



processor.run(new TypeormDatabase(), async (ctx) => {
    let transfers: Transfer[] = []
    let approvals: Approval[] = []
    for (let block of ctx.blocks) {
        for (let log of block.items) {
            assert(log.kind == 'evmLog')
            if (log.address === CONTRACT_ADDRESS && log.evmLog.topics[0] === erc20.events.Transfer.topic) {
                transfers.push(getTransfer(log))
            }
            if (log.address === CONTRACT_ADDRESS && log.evmLog.topics[0] === erc20.events.Approval.topic) {
                approvals.push(getApproval(log))
            }
        }
    }
    await ctx.store.insert(transfers)
    await ctx.store.insert(approvals)
})

function getTransfer(item: LogItem<{evmLog: {topics: true; data: true}}>): Transfer {
    let event = erc20.events.Transfer.decode(item.evmLog)

    let spender = event.from.toLowerCase()
    let receiver = event.to.toLowerCase()
    let amount = event.value.toBigInt()

    return new Transfer({
        id: item.evmLog.id,
        spender,
        receiver,
        amount
    })
}


function getApproval(item: LogItem<{evmLog: {topics: true; data: true}}>): Approval {
    let event = erc20.events.Approval.decode(item.evmLog)

    let owner = event.owner.toLowerCase()
    let spender = event.spender.toLowerCase()
    let value = event.value.toBigInt()

    return new Approval({
        id: item.evmLog.id,
        owner,
        spender,
        value
    })
}



