export class ThreadDeadlocks {
  constructor() {
    this.jvmReportedDeadlocks = []; // Array of arrays of ThreadInfo
    this.inferredDeadlocks = {};    // Nested map: { [lockId: string]: { [threadId: string]: ThreadInfo } }
  }
}
