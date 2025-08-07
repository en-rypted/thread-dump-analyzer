import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Summery } from "./components/Summery.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { Tabs, Drawer, Button, Box, Heading, Wrap, Code } from "@chakra-ui/react";
import { ToggleTip } from "@/components/ui/toggle-tip";
import {
  LuFolder,
  LuSquareCheck,
  LuUser,
  LuNotebook,
  LuClock,
  LuInfo,
} from "react-icons/lu";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { CgRowLast } from "react-icons/cg";
import { FaSkull } from "react-icons/fa";
import { ThreadByStateCard, ThreadsByState, VirtualizedThreadList } from "./components/ThreadsByState.jsx";
import { TimeStampDrawer } from "./components/TimeStampDrawer.jsx";
import {dataDummy} from '../../test/dummyData'
import Deadlock from "./components/Deadlock";
import { LastExecutedMethods } from "./components/LastExecutedMethods";
import { PiTreeStructure } from "react-icons/pi";


function App() {
  const [threadDumpData, setThreadDumpData] = useState(null);
  const [data,setData] = useState([]);
  const chnageTheadDumpData = (index) => {
   
    setThreadDumpData({...data[index]});
    setIsOpen(false)
  };
  const [timestamps ,setTimetamps] = useState([]);
  const [isOpen , setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    //  const vscode = window.acquireVsCodeApi();
    // vscode.postMessage({ command: 'hello', text: 'Hi from React!' });
     let timeDummy = dataDummy.map(item=>item.timestamp);
          console.log(timeDummy);
          setTimetamps([...timeDummy])
         
          setData(dataDummy);
          setThreadDumpData(dataDummy[0]);
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
    <Box height='17.5vh' width='100%' backgroundColor={'#242424'}  position={'fixed'} zIndex={'9'} padding={'30px'}>
     <Button colorPalette="teal" variant="surface" marginBottom="20px" onClick={()=>{setIsOpen(true)}}  position={'fixed'} >
            <LuClock />{" "}
            {threadDumpData?.timestamp
              ? "Time Stamp : " + threadDumpData.timestamp
              : ""}
            <LuInfo />
          </Button>
    </Box>
       {timestamps.length != 0 && <TimeStampDrawer data={timestamps} onThreadDataChnage={chnageTheadDumpData} isOpen={isOpen} closeDrawer={()=>{setIsOpen(false)}}/>}
  
      <Tabs.Root variant={'subtle'}  defaultValue="summary"  >
        <Tabs.List position={'fixed'} top={'12%'} zIndex={'9'} width={'100%'} paddingLeft={'30px'} paddingRight={'30px'} >
          <Tabs.Trigger value="summary">
            <LuNotebook size={'18'} />
            Summary
          </Tabs.Trigger>
          <Tabs.Trigger value="threads">
            <PiTreeStructure size={'20'} />
            Threads
          </Tabs.Trigger>
          <Tabs.Trigger value="deadlocks">
            <FaSkull size={'18'}  />
            Deadlocks
          </Tabs.Trigger>
          <Tabs.Trigger value="lastExecutedMethods">
            <CgRowLast size={'25'} />
            Last Executed Methods
          </Tabs.Trigger>
           <Tabs.Trigger value="cpuConsumingThreads">
            <HiOutlineCpuChip size={'22'} />
            CPU Consuming Threads
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="summary">
          {threadDumpData && (
            <Dashboard threadByState={threadDumpData.threadGroupResult} summary={threadDumpData.threadSummary} />
          )}
        </Tabs.Content>
        <Tabs.Content value="threads">
           {threadDumpData && (  <ThreadByStateCard threadsByState={threadDumpData.threadGroupResult} summary={threadDumpData.threadSummary} /> )}
        </Tabs.Content>
        <Tabs.Content value="deadlocks">
           {threadDumpData &&<Deadlock thread={threadDumpData.threadDeadlocks.jvmReportedDeadlocks.length != 0 ? threadDumpData.threadDeadlocks.jvmReportedDeadlocks[0] : [] }/>}
        </Tabs.Content>
         <Tabs.Content value="lastExecutedMethods">
           {threadDumpData &&<LastExecutedMethods lastExecutedMethods={threadDumpData.lastExecutedMethods} totalThreadSize={threadDumpData.threadSummary.totalThreads}/>}
        </Tabs.Content>
        <Tabs.Content value="cpuConsumingThreads">
           {threadDumpData && 
              <Box  marginTop={'15vh'} height={'70vh'} padding={"50px"} >
                <Wrap>
                  <Heading size={'lg'} fontFamily={'monospace'}>Threads flagged as RUNNABLE but exhibiting idle behavior (e.g., sleeping, parking) are excluded. <Code size={'lg'} colorPalette={'orange'}>{threadDumpData.threadGroupResult.runnable.filter(thread=>isMisleadingRunnable(thread)).length + " threds out of " + threadDumpData.threadSummary.runnableThreads + " threads" } </Code></Heading>
                  <VirtualizedThreadList threads={threadDumpData.threadGroupResult.runnable.filter(thread=>isMisleadingRunnable(thread))}></VirtualizedThreadList>
                </Wrap>
              </Box>
           }
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

const misleadingPatterns = [
  /socketRead0/i,
  /read\(.*InputStream/i,
  /Scanner\.next/i,
  /Thread\.sleep/i,
  /LockSupport\.park/i,
  /sun\.nio\.ch\./i,
];

const misleadingStateDetails = [
  /parking/i,
  /waiting on condition/i,
  /sleeping/i,
  /waiting/i,
];

function isMisleadingRunnable(thread) {
  if (thread.state !== 'RUNNABLE') return false;

  const hasMisleadingStack = thread.stackTrace?.some(line =>
    misleadingPatterns.some(pattern => pattern.test(line))
  );

  const hasMisleadingStateDetails = thread.stateDetails &&
    misleadingStateDetails.some(pattern =>
      pattern.test(thread.stateDetails)
    );

  return hasMisleadingStack;
}

export default App;
