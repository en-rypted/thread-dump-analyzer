// ThreadDumpParser.js

import { ThreadDumpSnapshot } from '../model/ThreadDumpSnapshot';
import { ThreadInfo } from '../model/ThreadInfo.js';
import { ThreadCategory } from '../model/ThreadCategory.js';

export class ThreadDumpParser {
  static async parseMultiple(fileContent) {
    const lines = fileContent.split(/\r?\n/);
    const snapshots = [];
    let currentThreads = [];
    let current = null;
    let currentTimestamp = null;
    let previousTimestamp = null;
    let deadLockThread = new ThreadInfo();

    const timestampPattern = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;
    const dumpStart = /^Full thread dump.*/;
    const header = /^\"([^\"]+)\"\s+#(\d+)\s*(daemon)?\s+prio=(\d+)\s+os_prio=(\S+)\s+tid=(\S+)\s+nid=(\S+).*/;
    const otherHeaderPattern = /^\"([^\"]+)\"\s*(daemon)?\s*os_prio=(\d+)\s+tid=([^\s]+)\s+nid=([^\s]+)\s*(\S+)?/;
    const state = /^\s+java\.lang\.Thread\.State:\s+(\S+)(?: \(([^)]+)\))?/;
    const stack = /^\s+at (.+)/;
    const waiting = /waiting to lock <([^>]+)>/;
    const owns = /locked <([^>]+)>/;
    const blocked = /blocked on <([^>]+)>/;
    const jvmDeadlockStart = /^Found one Java-level deadlock:/;

    let insideJvmDeadlock = false;
    let deadLockv1 = false;
    let deadLockv2 = false;
    let jvmDeadlockGroup = [];

    for (const line of lines) {
      const tsMatch = timestampPattern.exec(line);
      if (tsMatch) {
        previousTimestamp = currentTimestamp;
        currentTimestamp = tsMatch[1];
      }

      if (dumpStart.test(line) && currentThreads.length > 0) {
        snapshots.push(ThreadDumpParser.buildSnapshot(currentThreads, previousTimestamp));
        currentThreads = [];
      }

      if (jvmDeadlockStart.test(line)) {
        insideJvmDeadlock = true;
        jvmDeadlockGroup = [];
        continue;
      }

      if (insideJvmDeadlock || deadLockv1 || deadLockv2) {
        if (line.startsWith('"')) {
          const deadLockHeaderv1 = /^\"([^\"]+)\":\s*$/;
          const fullLockLine = /\"([^\"]+)\" is waiting to lock monitor (0x[0-9a-fA-F]+) \(object (0x[0-9a-fA-F]+)\)/;
          let m;

          if ((m = deadLockHeaderv1.exec(line))) {
            deadLockThread = new ThreadInfo();
            deadLockThread.name = m[1];
            deadLockv1 = true;
            continue;
          } else if ((m = fullLockLine.exec(line))) {
            deadLockThread = new ThreadInfo();
            deadLockThread.name = m[1];
            deadLockThread.waitingOnLock = m[2];
            deadLockv2 = true;
            continue;
          }
        } else if (deadLockv1 || deadLockv2) {
          const waitingToLockObject = /waiting to lock <(0x[0-9a-fA-F]+)> \(a ([^\)]+)\)/;
          const waitingToLockMonitor = /waiting to lock monitor (0x[0-9a-fA-F]+)/;
          const objectHeldBy = /\(object (0x[0-9a-fA-F]+), a ([^\)]+)\),\s+<-- held by ([^\s]+)/;
          const heldByThread = /which is held by \"([^\"]+)\"/;

          let m;

          if (deadLockv1 && (m = waitingToLockMonitor.exec(line))) {
            deadLockThread.waitingOnLock = m[1];
            continue;
          } else if (deadLockv1 && (m = objectHeldBy.exec(line))) {
            deadLockThread.heldByThread = m[3];
            deadLockThread.ownsLocks.push(m[1]);
            jvmDeadlockGroup.push(deadLockThread);
            deadLockThread = new ThreadInfo();
            deadLockv1 = false;
            continue;
          } else if (deadLockv1 && (m = waitingToLockObject.exec(line))) {
            deadLockThread.waitingOnLock = m[1];
            deadLockv2 = true;
            deadLockv1 = false;
            continue;
          } else if (deadLockv2 && (m = heldByThread.exec(line))) {
            deadLockThread.heldByThread = m[1];
            jvmDeadlockGroup.push(deadLockThread);
            deadLockThread = new ThreadInfo();
            deadLockv2 = false;
            continue;
          }
        } else if (line.trim() === '') {
          insideJvmDeadlock = false;
          if (jvmDeadlockGroup.length > 0 && snapshots.length > 0) {
            snapshots[snapshots.length - 1].threadDeadlocks.jvmReportedDeadlocks.push(jvmDeadlockGroup);
          }
        }
        continue;
      }

      let m;
      if ((m = header.exec(line))) {
        if (current) currentThreads.push(current);
        current = new ThreadInfo();
        current.name = m[1];
        current.threadNo = m[2];
        current.daemon = !!m[3];
        current.priority = parseInt(m[4], 10);
        current.osPriority = m[5];
        current.tid = m[6];
        current.nid = m[7];
        current.category = ThreadCategory.APPLICATION;
        continue;
      } else if ((m = otherHeaderPattern.exec(line))) {
        current = new ThreadInfo();
        current.name = m[1];
        current.daemon = !!m[2];
        current.osPriority = m[3];
        current.tid = m[4];
        current.nid = m[5];
        current.state = m[6]?.toUpperCase();
        current.category = ThreadDumpParser.classifyThread(current.name);
        continue;
      }

      if (!current) continue;

      if ((m = state.exec(line))) {
        current.state = m[1];
        current.stateDetails = m[2];
      } else if ((m = stack.exec(line))) {
        current.stackTrace.push(m[1]);
      } else if ((m = waiting.exec(line))) {
        current.waitingOnLock = m[1];
      } else if ((m = owns.exec(line))) {
        current.ownsLocks.push(m[1]);
      } else if ((m = blocked.exec(line))) {
        current.blockedOn = m[1];
      }
    }

    if (current) currentThreads.push(current);
    if (currentThreads.length > 0) {
      snapshots.push(ThreadDumpParser.buildSnapshot(currentThreads, currentTimestamp));
    }

    return snapshots;
  }

  static buildSnapshot(threads, timestamp) {
    const snapshot = new ThreadDumpSnapshot();
    snapshot.timestamp = timestamp;
    snapshot.threads = threads.slice();
    return snapshot;
  }

  static classifyThread(name) {
    if (/GC|Garbage|Mark|Sweep|Scavenge|Gang/.test(name)) return ThreadCategory.GC;
    if (/Compiler|C1|C2/.test(name)) return ThreadCategory.COMPILER;
    if (name.includes('Finalizer')) return ThreadCategory.FINALIZER;
    if (name.includes('Reference Handler')) return ThreadCategory.REFERENCE;
    if (name.includes('Signal Dispatcher')) return ThreadCategory.SIGNAL;
    if (name.includes('VM Thread')) return ThreadCategory.VM;
    if (name.includes('JFR') || name.includes('Flight Recorder')) return ThreadCategory.JFR;
    return ThreadCategory.APPLICATION;
  }

  static analyzeSnapshot(snapshot) {
    const mayBeDeadlocks = {};

    for (const t of snapshot.threads) {
      switch (t.state) {
        case 'RUNNABLE':
          snapshot.threadGroupResult.runnable.push(t);
          break;
        case 'WAITING':
          snapshot.threadGroupResult.waiting.push(t);
          break;
        case 'TIMED_WAITING':
          snapshot.threadGroupResult.timedWaiting.push(t);
          break;
        case 'BLOCKED':
          snapshot.threadGroupResult.blocked.push(t);
          break;
      }

      if (t.waitingOnLock && t.ownsLocks.length > 0) {
        mayBeDeadlocks[t.waitingOnLock] = t;
      }
    }

    const waitingOnList = Object.keys(mayBeDeadlocks);
    const mayBeDeadThreadInfoList = Object.values(mayBeDeadlocks);

    for (const waitingOn of waitingOnList) {
      let currentWaitingOn = waitingOn;
      const cycle = {};
      for (let i = 0; i < mayBeDeadThreadInfoList.length; i++) {
        const currentThread = mayBeDeadThreadInfoList[i];
        if (currentThread.ownsLocks.includes(currentWaitingOn)) {
          if (Object.keys(cycle).length === 0) {
            cycle[currentThread.tid] = currentThread;
            currentWaitingOn = currentThread.waitingOnLock;
            i = -1;
          } else {
            if (cycle[currentThread.tid]) {
              const id = Object.keys(cycle).sort().join('--}');
              if (!snapshot.threadDeadlocks.inferredDeadlocks[id]) {
                snapshot.threadDeadlocks.inferredDeadlocks[id] = { ...cycle };
              }
              break;
            } else {
              cycle[currentThread.tid] = currentThread;
              currentWaitingOn = currentThread.waitingOnLock;
              i = -1;
            }
          }
        }
      }
    }
  }
}
