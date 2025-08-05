import React, { useCallback, useRef } from "react";
import ThreadCard from "./ThreadCard.jsx";
import {Span,Text, Box, Collapsible,Flex,Stack,Accordion } from "@chakra-ui/react";
import { LuActivity, LuChevronDown, LuClock, LuLock, LuSquareCheck, LuTimer } from "react-icons/lu";
import { FaRunning } from "react-icons/fa";
import { VariableSizeList as List } from 'react-window';


export const ThreadsByState = ({ threadsByState }) => {
  return (
    <Stack width="full">
      {/* <Heading size="md">Product details</Heading> */}
      <Accordion.Root collapsible defaultValue={[]}>
         {Object.keys(threadsByState).map((state) => (
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

const VirtualizedThreadList = ({ threads }) => {
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
const getIcon = (state) => {
  switch (state) {
    case "runnable": return <FaRunning />;
    case "blocked": return <LuSquareCheck />;
    case "waiting": return <LuClock />;
    case "timedWaiting": return <LuTimer />;
    case "deadlocked": return <LuLock />;
    default: return <LuActivity />;
  }
}
