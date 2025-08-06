import { ThreadInfo } from './ThreadInfo.js';
import { ThreadDeadlocks } from './ThreadDeadlocks.js';
import { ThreadGroupResult } from './ThreadGroupResult.js';
import { ThreadSummary } from './ThreadSummary.js';

export class ThreadDumpSnapshot {
  constructor() {
    this.timestamp = '';
    this.threads = []; // Array of ThreadInfo
    this.threadDeadlocks = new ThreadDeadlocks();
    this.threadGroupResult = new ThreadGroupResult();
    this.threadSummary = new ThreadSummary();
  }
}

