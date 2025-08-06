export class ThreadSummary {
  constructor(
    totalThreads = 0,
    deadlockedThreads = 0,
    waitingThreads = 0,
    runnableThreads = 0,
    timedWaitingThreads = 0,
    blockedThreads = 0,
    topWaitingMethod = '',
    topRunnableMethod = ''
  ) {
    this.totalThreads = totalThreads;
    this.deadlockedThreads = deadlockedThreads;
    this.waitingThreads = waitingThreads;
    this.runnableThreads = runnableThreads;
    this.timedWaitingThreads = timedWaitingThreads;
    this.blockedThreads = blockedThreads;
    this.topWaitingMethod = topWaitingMethod;
    this.topRunnableMethod = topRunnableMethod;
  }

}
