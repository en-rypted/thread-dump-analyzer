import React, { useCallback, useRef, useState } from "react";
import ThreadCard, { ThreadListPreviewCustom } from "./ThreadCard.jsx";
import {Span,Text, Box, Collapsible,Flex,Stack,Accordion, Wrap } from "@chakra-ui/react";
import { LuClock, LuTimer, LuLock, LuActivity, LuCpu, LuZap, LuMemoryStick, LuMicroscope, LuSatelliteDish, LuBug, LuServer, LuEye, LuUser, LuTrash2 } from "react-icons/lu";
import { ImBlocked } from "react-icons/im";
import { FaRunning } from "react-icons/fa";
import { VariableSizeList as List } from 'react-window';
import { ThreadStat } from "./ThreadStat.jsx";


export const ThreadsByState = ({ threadsByState }) => {
  return (
    <Stack width="full" marginTop={'15vh'} padding={'40px'}>
      {/* <Heading size="md">Product details</Heading> */}
      <Accordion.Root collapsible defaultValue={[]}>
         {Object.keys(threadsByState).map((state) => (
          Array.isArray(threadsByState[state]) && 
          <Accordion.Item key={state} value={state}>
            <Accordion.ItemTrigger>
                <Flex justifyContent="space-between"  width="full" padding="4" borderWidth="1px" borderRadius="md" boxShadow="sm" marginBottom="2">
                <Box display="flex" alignItems="center" gap="2"> 
              {getIcon(state)} 
                 <Text>{state.charAt(0).toUpperCase() + state.slice(1).toLowerCase()}</Text>
                 </Box>
               <Accordion.ItemIndicator />
               </Flex>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody> <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              padding="4"
              borderWidth="1px"
              key={state}
            >
               <VirtualizedThreadList threads={threadsByState[state]} />
            </Box></Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Stack>
  )
}

export const ThreadByStateCard = ({threadsByState,summary}) =>{
  return (
    <Box  padding={'200px'} style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '40px' ,scale: '1', rowGap: '40px'}}>
         {Object.keys(threadsByState).map((state) => (
          Array.isArray(threadsByState[state]) ? 
            <ThreadList key={state} threads={threadsByState[state]} summary={summary} state={state}></ThreadList> : Object.keys(threadsByState[state]).map((item) => {
              return <ThreadList key={item} threads={threadsByState[state][item]} summary={summary} state={item}></ThreadList>
            })
          ))}
    </Box>
  )
}

export const ThreadList = ({threads,state,summary}) =>{
 const [isTrdLstOpen,setIsTrdLstOpen] = useState(false)
  return <><Box onClick={()=>{setIsTrdLstOpen(true)}}><ThreadStat  value={(summary[state+"Threads"] || threads.length )|| 0} total={summary.totalThreads} label={state} color={getColor(state)} icon={state} /></Box>
            <ThreadListPreviewCustom title={`${threads.length} threads of ${state}`} isOpen={isTrdLstOpen} threads={threads} close={()=>{setIsTrdLstOpen(false)}}/>
              </>
}

export const VirtualizedThreadList = ({ threads }) => {
  const listRef = useRef();

  // Estimate item size or measure dynamically if needed
  const getItemSize = useCallback((index) => {
    const thread = threads[index];
    const baseHeight = 250;
    const stackLines = thread.stackTrace?.length || 0;
    return baseHeight  // Adjust line height
  }, [threads]);

  const Row = ({ index, style }) => (
    <div style={{ ...style, padding: '4px' }}>
      <ThreadCard thread={threads[index]} />
    </div>
  );

  return (
    <List
      ref={listRef}
      height={1000}
      width="100%"
      itemCount={threads.length}
      itemSize={getItemSize}
    >
      {Row}
    </List>
  );
};
export const getIcon = (state) => {
  switch (state) {
    case "runnable": return <FaRunning />;
    case "blocked": return <ImBlocked />;
    case "waiting": return <LuClock />;
    case "timedWaiting": return <LuTimer />;
    case "deadlocked": return <LuLock />;
     case "gcThreads": return <LuTrash2 />;          // Garbage collection
    case "compiler": return <LuCpu />;              // Just-In-Time compiler
    case "finalizer": return <LuZap />;             // Object finalization
    case "reference": return <LuMemoryStick />;     // Reference handler
    case "signal": return <LuSatelliteDish />;      // Signal dispatcher
    case "vm": return <LuServer />;                 // VM-level threads
    case "jfr": return <LuEye />;                   // Java Flight Recorder
    case "daemon": return <LuBug />;                // Daemon threads
    case "nonDaemon": return <LuUser />;  
    default: return <LuActivity />;
  }
}

export const getColor = (state) => {
  switch (state) {
    case "runnable": return 'green';
    case "blocked": return 'black';
    case "waiting": return 'yellow';
    case "timedWaiting": return 'blue';
    case "deadlocked": return 'red';
    case "gcThreads": return 'teal';         // GC
    case "compiler": return 'cyan';          // JIT compiler
    case "finalizer": return 'pink';         // Finalizer
    case "reference": return 'orange';       // Reference handler
    case "signal": return 'purple';          // Signal dispatcher
    case "vm": return 'blue';                // VM internal
    case "jfr": return 'indigo';             // JFR
    case "daemon": return 'gray';            // Daemon thread
    case "nonDaemon": return 'white';  
    default: return 'purple';
  }
}
