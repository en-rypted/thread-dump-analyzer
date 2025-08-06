// ThreadAnalyzerService.js

import { ThreadDumpParser } from './ThreadDumpParser.js';
import { ThreadSummary } from '../model/ThreadSummary.js';

 export class ThreadAnalyzerService {
  static async getThreadAnalysis(file) {
    const threads = await ThreadDumpParser.parseMultiple(file);

    for (const threadDumpSnapshot of threads) {
      ThreadDumpParser.analyzeSnapshot(threadDumpSnapshot);
      threadDumpSnapshot.threadSummary = ThreadAnalyzerService.getSummary(threadDumpSnapshot);
    }

    return threads;
  }

  static getTopMethod(threads) {
    for (const thread of threads) {
      if (thread.stackTrace && thread.stackTrace.length > 0) {
        return thread.stackTrace[0]; // top frame (most recent call)
      }
    }
    return 'N/A';
  }

  static getSummary(snapshot) {
    const summary = new ThreadSummary();
    summary.setTotalThreads(snapshot.threads.length);
    summary.setDeadlockedThreads(
      Object.keys(snapshot.threadDeadlocks.inferredDeadlocks || {}).length +
      (snapshot.threadDeadlocks.jvmReportedDeadlocks?.length || 0)
    );
    summary.setWaitingThreads(snapshot.threadGroupResult.waiting.length);
    summary.setRunnableThreads(snapshot.threadGroupResult.runnable.length);
    summary.setTimedWaitingThreads(snapshot.threadGroupResult.timedWaiting.length);
    summary.setBlockedThreads(snapshot.threadGroupResult.blocked.length);
    summary.setTopWaitingMethod(ThreadAnalyzerService.getTopMethod(snapshot.threadGroupResult.waiting));
    summary.setTopRunnableMethod(ThreadAnalyzerService.getTopMethod(snapshot.threadGroupResult.runnable));
    return summary;
  }
}


