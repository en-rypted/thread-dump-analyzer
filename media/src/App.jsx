import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Summery } from "./components/Summery.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { Tabs, Drawer, Button } from "@chakra-ui/react";
import { ToggleTip } from "@/components/ui/toggle-tip";
import {
  LuFolder,
  LuSquareCheck,
  LuUser,
  LuNotebook,
  LuClock,
  LuInfo,
} from "react-icons/lu";
import ThreadCard from "./components/ThreadCard.jsx";
import { ThreadsByState } from "./components/ThreadsByState.jsx";
import { TimeStampDrawer } from "./components/TimeStampDrawer.jsx";

const dataDummy = [
  {
    timestamp: "12/2/2034 13:12:23",
    threads: [
      {
        name: "Thread-1",
        threadNo: "11",
        category: "APPLICATION",
        daemon: false,
        priority: 5,
        osPriority: "0",
        tid: "0x00007f8e3c002800",
        nid: "0x3b03",
        state: "BLOCKED",
        stateDetails: "on object monitor",
        stackTrace: ["com.example.LockExample.methodA(LockExample.java:12)"],
        waitingOnLock: "0x00000000d010c6e0",
        ownsLocks: ["0x00000000d010c6f0"],
      },
      {
        name: "Thread-2",
        threadNo: "12",
        category: "APPLICATION",
        daemon: false,
        priority: 5,
        osPriority: "0",
        tid: "0x00007f8e3c003000",
        nid: "0x3b04",
        state: "BLOCKED",
        stateDetails: "on object monitor",
        stackTrace: ["com.example.LockExample.methodB(LockExample.java:22)"],
        waitingOnLock: "0x00000000d010c6f0",
        ownsLocks: ["0x00000000d010c6e0"],
      },
      {
        name: "Thread-3",
        threadNo: "13",
        category: "APPLICATION",
        daemon: false,
        priority: 5,
        osPriority: "0",
        tid: "0x00007f8e3c004000",
        nid: "0x3b05",
        state: "RUNNABLE",
        stackTrace: ["com.example.Worker.run(Worker.java:45)"],
        ownsLocks: [],
      },
      {
        name: "Thread-4",
        threadNo: "14",
        category: "APPLICATION",
        daemon: false,
        priority: 5,
        osPriority: "0",
        tid: "0x00007f8e3c005000",
        nid: "0x3b06",
        state: "WAITING",
        stateDetails: "parking",
        stackTrace: [
          "java.util.concurrent.locks.LockSupport.park(LockSupport.java:194)",
          "java.util.concurrent.FutureTask.awaitDone(FutureTask.java:425)",
          "java.util.concurrent.FutureTask.get(FutureTask.java:207)",
        ],
        ownsLocks: [],
      },
    ],
    threadDeadlocks: {
      jvmReportedDeadlocks: [],
      inferredDeadlocks: {
        "0x00007f8e3c002800--}0x00007f8e3c003000": {
          "0x00007f8e3c003000": {
            name: "Thread-2",
            threadNo: "12",
            category: "APPLICATION",
            daemon: false,
            priority: 5,
            osPriority: "0",
            tid: "0x00007f8e3c003000",
            nid: "0x3b04",
            state: "BLOCKED",
            stateDetails: "on object monitor",
            stackTrace: [
              "com.example.LockExample.methodB(LockExample.java:22)",
            ],
            waitingOnLock: "0x00000000d010c6f0",
            ownsLocks: ["0x00000000d010c6e0"],
          },
          "0x00007f8e3c002800": {
            name: "Thread-1",
            threadNo: "11",
            category: "APPLICATION",
            daemon: false,
            priority: 5,
            osPriority: "0",
            tid: "0x00007f8e3c002800",
            nid: "0x3b03",
            state: "BLOCKED",
            stateDetails: "on object monitor",
            stackTrace: [
              "com.example.LockExample.methodA(LockExample.java:12)",
            ],
            waitingOnLock: "0x00000000d010c6e0",
            ownsLocks: ["0x00000000d010c6f0"],
          },
        },
      },
    },
    threadGroupResult: {
      waiting: [
        {
          name: "Thread-4",
          threadNo: "14",
          category: "APPLICATION",
          daemon: false,
          priority: 5,
          osPriority: "0",
          tid: "0x00007f8e3c005000",
          nid: "0x3b06",
          state: "WAITING",
          stateDetails: "parking",
          stackTrace: [
            "java.util.concurrent.locks.LockSupport.park(LockSupport.java:194)",
            "java.util.concurrent.FutureTask.awaitDone(FutureTask.java:425)",
            "java.util.concurrent.FutureTask.get(FutureTask.java:207)",
          ],
          ownsLocks: [],
        },
      ],
      runnable: [
        {
          name: "Thread-3",
          threadNo: "13",
          category: "APPLICATION",
          daemon: false,
          priority: 5,
          osPriority: "0",
          tid: "0x00007f8e3c004000",
          nid: "0x3b05",
          state: "RUNNABLE",
          stackTrace: ["com.example.Worker.run(Worker.java:45)"],
          ownsLocks: [],
        },
      ],
      timedWaiting: [],
      blocked: [
        {
          name: "Thread-1",
          threadNo: "11",
          category: "APPLICATION",
          daemon: false,
          priority: 5,
          osPriority: "0",
          tid: "0x00007f8e3c002800",
          nid: "0x3b03",
          state: "BLOCKED",
          stateDetails: "on object monitor",
          stackTrace: ["com.example.LockExample.methodA(LockExample.java:12)"],
          waitingOnLock: "0x00000000d010c6e0",
          ownsLocks: ["0x00000000d010c6f0"],
        },
        {
          name: "Thread-2",
          threadNo: "12",
          category: "APPLICATION",
          daemon: false,
          priority: 5,
          osPriority: "0",
          tid: "0x00007f8e3c003000",
          nid: "0x3b04",
          state: "BLOCKED",
          stateDetails: "on object monitor",
          stackTrace: ["com.example.LockExample.methodB(LockExample.java:22)"],
          waitingOnLock: "0x00000000d010c6f0",
          ownsLocks: ["0x00000000d010c6e0"],
        },
      ],
    },
    threadSummary: {
      totalThreads: 4,
      deadlockedThreads: 1,
      waitingThreads: 1,
      runnableThreads: 1,
      timedWaitingThreads: 0,
      blockedThreads: 2,
      topWaitingMethod:
        "java.util.concurrent.locks.LockSupport.park(LockSupport.java:194)",
      topRunnableMethod: "com.example.Worker.run(Worker.java:45)",
    },
  },
   {
    timestamp: "12/3/2034 13:12:23",
    threads: [
      {
        name: "Thread-1",
        threadNo: "11",
        category: "APPLICATION",
        daemon: false,
        priority: 5,
        osPriority: "0",
        tid: "0x00007f8e3c002800",
        nid: "0x3b03",
        state: "BLOCKED",
        stateDetails: "on object monitor",
        stackTrace: ["com.example.LockExample.methodA(LockExample.java:12)"],
        waitingOnLock: "0x00000000d010c6e0",
        ownsLocks: ["0x00000000d010c6f0"],
      },
      {
        name: "Thread-2",
        threadNo: "12",
        category: "APPLICATION",
        daemon: false,
        priority: 5,
        osPriority: "0",
        tid: "0x00007f8e3c003000",
        nid: "0x3b04",
        state: "BLOCKED",
        stateDetails: "on object monitor",
        stackTrace: ["com.example.LockExample.methodB(LockExample.java:22)"],
        waitingOnLock: "0x00000000d010c6f0",
        ownsLocks: ["0x00000000d010c6e0"],
      },
      {
        name: "Thread-3",
        threadNo: "13",
        category: "APPLICATION",
        daemon: false,
        priority: 5,
        osPriority: "0",
        tid: "0x00007f8e3c004000",
        nid: "0x3b05",
        state: "RUNNABLE",
        stackTrace: ["com.example.Worker.run(Worker.java:45)"],
        ownsLocks: [],
      },
      {
        name: "Thread-4",
        threadNo: "14",
        category: "APPLICATION",
        daemon: false,
        priority: 5,
        osPriority: "0",
        tid: "0x00007f8e3c005000",
        nid: "0x3b06",
        state: "WAITING",
        stateDetails: "parking",
        stackTrace: [
          "java.util.concurrent.locks.LockSupport.park(LockSupport.java:194)",
          "java.util.concurrent.FutureTask.awaitDone(FutureTask.java:425)",
          "java.util.concurrent.FutureTask.get(FutureTask.java:207)",
        ],
        ownsLocks: [],
      },
    ],
    threadDeadlocks: {
      jvmReportedDeadlocks: [],
      inferredDeadlocks: {
        "0x00007f8e3c002800--}0x00007f8e3c003000": {
          "0x00007f8e3c003000": {
            name: "Thread-2",
            threadNo: "12",
            category: "APPLICATION",
            daemon: false,
            priority: 5,
            osPriority: "0",
            tid: "0x00007f8e3c003000",
            nid: "0x3b04",
            state: "BLOCKED",
            stateDetails: "on object monitor",
            stackTrace: [
              "com.example.LockExample.methodB(LockExample.java:22)",
            ],
            waitingOnLock: "0x00000000d010c6f0",
            ownsLocks: ["0x00000000d010c6e0"],
          },
          "0x00007f8e3c002800": {
            name: "Thread-1",
            threadNo: "11",
            category: "APPLICATION",
            daemon: false,
            priority: 5,
            osPriority: "0",
            tid: "0x00007f8e3c002800",
            nid: "0x3b03",
            state: "BLOCKED",
            stateDetails: "on object monitor",
            stackTrace: [
              "com.example.LockExample.methodA(LockExample.java:12)",
            ],
            waitingOnLock: "0x00000000d010c6e0",
            ownsLocks: ["0x00000000d010c6f0"],
          },
        },
      },
    },
    threadGroupResult: {
      waiting: [
        {
          name: "Thread-4",
          threadNo: "14",
          category: "APPLICATION",
          daemon: false,
          priority: 5,
          osPriority: "0",
          tid: "0x00007f8e3c005000",
          nid: "0x3b06",
          state: "WAITING",
          stateDetails: "parking",
          stackTrace: [
            "java.util.concurrent.locks.LockSupport.park(LockSupport.java:194)",
            "java.util.concurrent.FutureTask.awaitDone(FutureTask.java:425)",
            "java.util.concurrent.FutureTask.get(FutureTask.java:207)",
          ],
          ownsLocks: [],
        },
      ],
      runnable: [
        {
          name: "Thread-3",
          threadNo: "13",
          category: "APPLICATION",
          daemon: false,
          priority: 5,
          osPriority: "0",
          tid: "0x00007f8e3c004000",
          nid: "0x3b05",
          state: "RUNNABLE",
          stackTrace: ["com.example.Worker.run(Worker.java:45)"],
          ownsLocks: [],
        },
      ],
      timedWaiting: [],
      blocked: [
        {
          name: "Thread-1",
          threadNo: "11",
          category: "APPLICATION",
          daemon: false,
          priority: 5,
          osPriority: "0",
          tid: "0x00007f8e3c002800",
          nid: "0x3b03",
          state: "BLOCKED",
          stateDetails: "on object monitor",
          stackTrace: ["com.example.LockExample.methodA(LockExample.java:12)"],
          waitingOnLock: "0x00000000d010c6e0",
          ownsLocks: ["0x00000000d010c6f0"],
        },
        {
          name: "Thread-2",
          threadNo: "12",
          category: "APPLICATION",
          daemon: false,
          priority: 5,
          osPriority: "0",
          tid: "0x00007f8e3c003000",
          nid: "0x3b04",
          state: "BLOCKED",
          stateDetails: "on object monitor",
          stackTrace: ["com.example.LockExample.methodB(LockExample.java:22)"],
          waitingOnLock: "0x00000000d010c6f0",
          ownsLocks: ["0x00000000d010c6e0"],
        },
      ],
    },
    threadSummary: {
      totalThreads: 24,
      deadlockedThreads: 3,
      waitingThreads: 5,
      runnableThreads: 3,
      timedWaitingThreads: 5,
      blockedThreads: 3,
      topWaitingMethod:
        "java.util.concurrent.locks.LockSupport.park(LockSupport.java:194)",
      topRunnableMethod: "com.example.Worker.run(Worker.java:45)",
    },
  },
];

function App() {
  const [threadDumpData, setThreadDumpData] = useState(null);
  const [data,setData] = useState([]);
  const chnageTheadDumpData = (index) => {
    setThreadDumpData(data[index]);
    setIsOpen(false)
  };
  const [timestamps ,setTimetamps] = useState([]);
  const [isOpen , setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
     const vscode = window.acquireVsCodeApi();
    vscode.postMessage({ command: 'hello', text: 'Hi from React!' });

    const handleMessage = (event) => {
      const message = event.data;

      if (message.command === "loadThreads") {
        try {
          const threads = message.data;
          console.log("Received threads:", threads);
          let time = threads.map(item=>item.timestamp);
          console.log(time);
          setTimetamps([...time])
          setData(threads);
          setThreadDumpData(threads[0]);
        } catch (err) {
          console.error("Invalid JSON received from extension:", err);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

/// web socket start here
  //  useEffect(() => {
  //   // Connect to WebSocket
  //   const ws = new WebSocket('ws://localhost:3000');

  //   ws.onopen = () => {
  //     console.log('WebSocket connected');
  //     ws.send(JSON.stringify({ type: 'init', payload: 'Hello from React!' }));
  //   };

  //   ws.onmessage = (event) => {
  //     try {
  //       const message = JSON.parse(event.data);

  //       if (message.type === 'threadsAnalysis') {
  //         console.log('📥 Received threadsAnalysis:', message.payload);
  //         let time = message.payload.map(item=>item.timestamp);
  //         console.log(time);
  //         setTimetamps([...time])
  //         setData(message.payload);
  //         setThreadDumpData(message.payload[0]);
  //       } else if (message.type === 'welcome') {
  //         console.log('👋 Server says:', message.payload);
  //       } else {
  //         console.warn('Unknown message type:', message.type);
  //       }
  //     } catch (e) {
  //       console.error('❌ Error parsing WebSocket message:', e);
  //       console.error('❌ Error parsing WebSocket message:',event.data );
  //     }
  //   };

  //   ws.onerror = (err) => {
  //     console.error('WebSocket error:', err);
  //   };

  //   ws.onclose = () => {
  //     console.log('WebSocket closed');
  //   };

  //   setSocket(ws);

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  // const sendMessage = () => {
  //   if (socket && input.trim() !== '') {
  //     socket.send(input);
  //    // setMessages(prev => [...prev, `You: ${input}`]);
  //     setInput('');
  //   }
  // };

  // return (<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
  //   {/* <h1>HIIIII</h1> */}
  //   {threadDumpData && <Dashboard summary={threadDumpData.summary} />}

  // </div>)

  return (
    <>
     <Button colorPalette="teal" variant="surface" marginBottom="20px" onClick={()=>{setIsOpen(true)}}>
            <LuClock />{" "}
            {threadDumpData?.timestamp
              ? "Time Stamp : " + threadDumpData.timestamp
              : ""}
            <LuInfo />
          </Button>
  
       {timestamps.length != 0 && <TimeStampDrawer data={timestamps} onThreadDataChnage={chnageTheadDumpData} isOpen={isOpen} closeDrawer={()=>{setIsOpen(false)}}/>}
  
      <Tabs.Root fitted defaultValue="summary">
        <Tabs.List>
          <Tabs.Trigger value="summary">
            <LuNotebook />
            Summary
          </Tabs.Trigger>
          <Tabs.Trigger value="threads">
            <LuFolder />
            Threads
          </Tabs.Trigger>
          <Tabs.Trigger value="tasks">
            <LuSquareCheck />
            Settings
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="summary">
          {threadDumpData && (
            <Dashboard summary={threadDumpData.threadSummary} />
          )}
        </Tabs.Content>
        <Tabs.Content value="threads">
           {threadDumpData && (  <ThreadsByState threadsByState={threadDumpData.threadGroupResult} /> )}
        </Tabs.Content>
        <Tabs.Content value="tasks">
          Manage your tasks for freelancers
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

export default App;
