import {
  Box,
  Flex,
  Text,
  Badge,
  Icon,
  Stack,
  Code,
  useDisclosure,
  Button,
  VStack,
  Collapsible,
  Clipboard,
  IconButton,
  Dialog,
  CloseButton,
  Portal,
  HStack,
} from "@chakra-ui/react";
import {
  LuCpu,
  LuLock,
  LuUser,
  LuActivity,
  LuChevronDown,
  LuChevronUp,
  LuSquareCheck,
  LuClipboardCopy,
  LuSearch,
} from "react-icons/lu";
import { FaStackOverflow } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { useRef, useState } from "react";
import { VirtualizedThreadList } from "./ThreadsByState";

function ThreadCard({ thread,close  }) {
  const { isOpen, onToggle } = useDisclosure();
  const [open, setOpen] = useState(false);
  const stackTraceText = thread.stackTrace.join("\n");

  const previewLine = thread.stackTrace[0] || "No stack trace";
  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      shadow="md"
      p={5}
      bg="gray.50"
      _dark={{ bg: "gray.800" }}
      width="100%"
    >
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontWeight="bold" fontSize="xl">
          {thread.name}
        </Text>
        <Box  align="center" width={'150px'}>
          <Badge
          colorPalette={getStateColor(thread.state)}
          px={2}
          py={0.5}
          borderRadius="md"
        >
          {thread.state}
        </Badge>
        <CloseButton marginLeft={"20px"} onClick={()=>{close()}}/>
        </Box>
        
      </Flex>

      <Stack spacing={2} fontSize="sm">
        <Flex align="center" gap={2}>
          <Icon as={LuUser} />
          <Text>
            Priority: <Code>{thread.priority}</Code>
          </Text>
        </Flex>

        <Flex align="center" gap={2}>
          <Icon as={LuActivity} />
          <Text>
            OS Priority: <Code>{thread.osPriority}</Code>
          </Text>
        </Flex>

        <Flex align="center" gap={2}>
          <Icon as={LuSquareCheck} />
          <Text>
            Daemon: <Code>{thread.daemon ? "Yes" : "No"}</Code>
          </Text>
        </Flex>

        <Flex align="center" gap={2}>
          <Icon as={LuActivity} />
          <Text>
            TID: <Code>{thread.tid}</Code>, NID: <Code>{thread.nid}</Code>
          </Text>
        </Flex>

        <Flex align="center" gap={2}>
          <Icon as={LuLock} />
          <Text>
            Owns Locks:{" "}
            {thread.ownsLocks.length > 0
              ? thread.ownsLocks.map((lock, i) => <Code key={i}>{lock}</Code>)
              : "None"}
          </Text>
        </Flex>
        <Collapsible.Root open={open} onOpenChange={() => setOpen(!open)}>
          <Stack  spacing={3} mt={4}>
            <Collapsible.Trigger paddingY="2">
              <Flex align="center" gap={2}>
                <Icon as={FaStackOverflow} />
                <Text fontWeight="medium">Stack Trace:</Text>
              </Flex>
            </Collapsible.Trigger>
            {/* Preview line when collapsed */}
            {!open && (
              <Text colorScheme="green" fontSize="sm" fontFamily={'monospace'} width={"100%"} pl={6}>
                <Code>{previewLine}</Code> …{" "}
                <u onClick={() => setOpen(true)}>show more</u>
              </Text>
            )}

            <Collapsible.Content>
              <Box
                bg="gray.900"
                color="green.200"
                p={4}
                borderRadius="md"
                overflowX="auto"
                whiteSpace="pre-wrap"
              >
                <Flex justify="flex-end" mb={1} gap={2} >
                  <Clipboard.Root value={stackTraceText}>
                    <Clipboard.Trigger asChild>
                      
                        <IconButton variant="surface" size="2xs">
                          <Clipboard.Indicator />
                        </IconButton>
                     
                    </Clipboard.Trigger>
                  </Clipboard.Root>
                  <IconButton
                    aria-label="Show less"
                    size="2xs"
                    variant="ghost"
                    onClick={() => setOpen(false)}
                    title="Show less"
                  >
                    <LuChevronUp />
                  </IconButton>
                </Flex>

                <Code whiteSpace="pre" colorScheme="green" fontSize="sm" p='3' lineHeight="short" fontFamily={'monospace'} width={"100%"}>
                    {thread.stackTrace.map((line) => line).join("\n")}
                </Code>
              </Box>
            </Collapsible.Content>
          </Stack>
        </Collapsible.Root>
      </Stack>
    </Box>
  );
}

const ThreadCardPreview = ({thread}) => {
  const [isOpen ,setIsOpen]= useState(false);
  return (
    <Dialog.Root size="xl"  placement={'center'} motionPreset={'slide-in-top'} open={isOpen}>
      <Dialog.Trigger asChild>
        <Box
      borderWidth="1px"
      borderRadius="2xl"
      shadow="md"
      p={5}
      bg="gray.50"
      _dark={{ bg: "gray.800" }}
      width="100%"
        marginBottom="4"
    >
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontWeight="bold" fontSize="xl">
          {thread.name}
        </Text>
        <Badge
          colorPalette={getStateColor(thread.state)}
          px={2}
          py={0.5}
          borderRadius="md"
        >
          {thread.state}
        </Badge>
      </Flex>
      <Stack spacing={2} fontSize="sm">
        <Flex align="center" gap={2}>
          <Icon as={LuUser} />
          <Text>
            Priority: <Code>{thread.priority}</Code>
          </Text>
        </Flex>

        <Flex align="center" gap={2}>
          <Icon as={LuActivity} />
          <Text>
            OS Priority: <Code>{thread.osPriority}</Code>
          </Text>
        </Flex>

        <Flex align="center" gap={2}>
          <Icon as={LuSquareCheck} />
          <Text>
            Daemon: <Code>{thread.daemon ? "Yes" : "No"}</Code>
          </Text>
        </Flex>

        <Flex align="center" gap={2}>
          <Icon as={LuActivity} />
          <Text>
            TID: <Code>{thread.tid}</Code>, NID: <Code>{thread.nid}</Code>
            ....
          </Text>
        </Flex>
        <Flex align="center" gap={2} onClick={()=>{setIsOpen(true)}}>
          <Icon as={ CgDetailsMore } />
          <Text cursor={'button'} color={'teal'}>
            View Details
          </Text>
        </Flex>
    </Stack>
    </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" width="-moz-max-content">
           
              <ThreadCard thread={thread} close={()=>{setIsOpen(false)}}></ThreadCard>
          
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )

  

  //  <>
  //       <Box
  //     borderWidth="1px"
  //     borderRadius="2xl"
  //     shadow="md"
  //     p={5}
  //     bg="gray.50"
  //     _dark={{ bg: "gray.800" }}
  //     width="100%"
  //       marginBottom="4"
  //   >
  //     <Flex justify="space-between" align="center" mb={3}>
  //       <Text fontWeight="bold" fontSize="xl">
  //         {thread.name}
  //       </Text>
  //       <Badge
  //         colorPalette={getStateColor(thread.state)}
  //         px={2}
  //         py={0.5}
  //         borderRadius="md"
  //       >
  //         {thread.state}
  //       </Badge>
  //     </Flex>
  //     <Stack spacing={2} fontSize="sm">
  //       <Flex align="center" gap={2}>
  //         <Icon as={LuUser} />
  //         <Text>
  //           Priority: <Code>{thread.priority}</Code>
  //         </Text>
  //       </Flex>

  //       <Flex align="center" gap={2}>
  //         <Icon as={LuActivity} />
  //         <Text>
  //           OS Priority: <Code>{thread.osPriority}</Code>
  //         </Text>
  //       </Flex>

  //       <Flex align="center" gap={2}>
  //         <Icon as={LuSquareCheck} />
  //         <Text>
  //           Daemon: <Code>{thread.daemon ? "Yes" : "No"}</Code>
  //         </Text>
  //       </Flex>

  //       <Flex align="center" gap={2}>
  //         <Icon as={LuActivity} />
  //         <Text>
  //           TID: <Code>{thread.tid}</Code>, NID: <Code>{thread.nid}</Code>
  //           ....
  //         </Text>
  //       </Flex>
  //       <Flex align="center" gap={2} onClick={()=>{isOpen.current=false}}>
  //         <Icon as={ CgDetailsMore } />
  //         <Text cursor={'button'} color={'teal'}>
  //           View Details
  //         </Text>
  //       </Flex>
  //   </Stack>
  //   </Box>
    
  //     <Portal ref={isOpen} disabled={isOpen.current}>
       
          
          
  //             <ThreadCard thread={thread} colse={()=>{isOpen.current = true}}></ThreadCard>
          
        
       
  //     </Portal>
  //  </>
  //)
}

function getStateColor(state) {
  switch (state) {
    case "RUNNABLE":
      return "green";
    case "BLOCKED":
      return "red";
    case "WAITING":
    case "TIMED_WAITING":
      return "yellow";
    default:
      return "gray";
  }
}

export const ThreadCardPreviewCustom = ({thread , isOpen,close}) => {
 // const [isOpen ,setIsOpen]= useState(false);
  return (
    <Dialog.Root size="xl"  placement={'center'} motionPreset={'slide-in-top'} open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" width="-moz-max-content">
           
              <ThreadCard thread={thread} close={()=>{close()}}></ThreadCard>
          
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export const ThreadListPreviewCustom = ({title, threads , isOpen,close}) => {
 // const [isOpen ,setIsOpen]= useState(false);
  return (
    <Dialog.Root size="cover"  placement={'center'} motionPreset={'slide-in-top'} open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" width="-moz-max-content">
            <Dialog.Header>
              <Box display={'flex'} width={'100%'} alignContent={'center'} justifyContent={'space-between'}>
              <Text fontFamily={'monospace'} fontSize={'larger'}>{title}</Text>
              <CloseButton   onClick={()=>{close()}}/>
               </Box>
              </Dialog.Header>
              <Box padding={'0px 40px 0px 40px'} overflow={'hidden'} scrollBehavior={'smooth'}>
                  <VirtualizedThreadList threads={threads} ></VirtualizedThreadList>
              </Box>
            
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default ThreadCardPreview;
