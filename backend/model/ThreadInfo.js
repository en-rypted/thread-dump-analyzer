// ThreadInfo.js

 export class ThreadInfo {
  constructor() {
    this.name = '';
    this.threadNo = '';
    this.category = ''; // assuming ThreadCategory is a string enum
    this.daemon = false;
    this.priority = 0;
    this.osPriority = '';
    this.tid = '';
    this.nid = '';
    this.state = '';
    this.stateDetails = '';
    this.stackTrace = [];
    this.waitingOnLock = '';
    this.ownsLocks = [];
    this.blockedOn = '';
    this.heldByThread = '';
  }
}

