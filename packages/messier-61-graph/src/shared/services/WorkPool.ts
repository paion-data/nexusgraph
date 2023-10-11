/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { QueryResult } from 'neo4j-driver'
import { v4 as uuid } from 'uuid'

import BoltWorkerModule from 'shared/services/bolt/boltWorker'

export type WorkerMessageHandler = (message: {
  data: {
    type: string
    error: Error
    result: QueryResult
  }
}) => void

export enum WORKER_STATE {
  BUSY = 'busy',
  FREE = 'free'
}

class Work {
  public executed = false
  public onFinish?: (payload: any) => void = undefined

  constructor(
    public readonly id: string,
    public readonly payload: any,
    public readonly onmessage?: WorkerMessageHandler
  ) {}
}

class Worker {
  public work?: Work
  public state = WORKER_STATE.BUSY

  constructor(public readonly worker: BoltWorkerModule) {}

  executeInitial = () => {
    if (!this.work) {
      return
    }

    if (this.work.onmessage) {
      this.worker.onmessage = this.work.onmessage
    }

    this.execute(this.work.payload)
    this.work.executed = true
  }

  execute = (payload: any) => {
    if (payload) {
      this.worker.postMessage(payload)
    }
  }

  assignWork = (work: Work) => {
    this.state = WORKER_STATE.BUSY
    this.work = work
  }
}

class WorkPool {
  private readonly queue: Array<Work> = []
  private readonly register: Array<Worker> = []

  constructor(
    private readonly createWorker: () => BoltWorkerModule,
    private readonly maxPoolSize = 15
  ) {}

  getPoolSize(state?: any) {
    if (!state) {
      return this.register.length
    }
    return this.register.filter(w => w.state === state).length
  }

  getQueueSize() {
    return this.queue.length
  }

  getWorkerById(workId: string) {
    return this.register.find(worker => worker.work?.id === workId) ?? null
  }

  getWorkById(id: string) {
    return (
      // search through undone work
      this.queue.find(work => work.id === id) ??
      // search through work in progress
      this.register.find(worker => worker.work?.id === id)?.work ??
      null
    )
  }

  doWork({
    id,
    payload,
    onmessage
  }: {
    id: string
    payload?: any
    onmessage?: WorkerMessageHandler
  }) {
    const work = new Work(id || uuid(), payload, onmessage)
    this.addToQueue(work)
    this.next()
    return work
  }

  messageAllWorkers(msg: any) {
    this.register.forEach(worker => worker.worker.postMessage(msg))
  }

  finishWork(workId: string) {
    const worker = this.getWorkerById(workId)
    const work = this.getWorkById(workId)

    if (!work) {
      return
    }

    if (!work.executed) {
      this.removeFromQueue(work.id)
    }

    if (worker) {
      this.unregisterWorker(workId)
    }

    if (work.onFinish) {
      work.onFinish({ executed: work?.executed, id: workId })
    }
  }

  private getFreeWorker() {
    const freeWorker = this.register.find(
      worker => worker.state === WORKER_STATE.FREE
    )
    if (freeWorker) {
      return freeWorker
    }

    const poolSize = this.getPoolSize()
    if (poolSize < this.maxPoolSize) {
      const workerObj = new Worker(this.createWorker())
      this.register.push(workerObj)
      return workerObj
    }

    return null
  }

  private next() {
    if (!this.getQueueSize()) {
      return
    }
    const worker = this.getFreeWorker()
    if (!worker) {
      return
    }
    const work = this.queue.shift()
    if (!work) {
      return
    }

    worker.assignWork(work)
    worker.executeInitial()
  }

  private addToQueue(work: Work) {
    this.queue.push(work)
  }

  private removeFromQueue(workId: string) {
    const workIndex = this.queue.findIndex(el => el.id === workId)
    if (workIndex === -1) {
      return
    }
    this.queue.splice(workIndex, 1)
  }

  private unregisterWorker = (workId: string) => {
    const worker = this.register.find(worker => worker.work?.id === workId)
    if (!worker) {
      return
    }
    worker.state = WORKER_STATE.FREE
    this.next()
  }
}

export default WorkPool
