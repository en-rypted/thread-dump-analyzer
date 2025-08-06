import React, { useState } from 'react'
import { Table ,HStack, Progress,Text,Code, Stack, Collapsible, Box, Flex, IconButton} from "@chakra-ui/react"
import { LuChevronUp } from 'react-icons/lu'
import { ThreadListPreviewCustom } from './ThreadCard'

export const LastExecutedMethods = ({lastExecutedMethods,totalThreadSize}) => {
   
  return (
    <Box width={'100%'} marginTop={'15vh'} padding={'40px'}>
    <Table.Root size="lg"  >
      <Table.Header  >
        <Table.Row>
          <Table.ColumnHeader>Thread Count</Table.ColumnHeader>
          <Table.ColumnHeader>Method</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Percentage</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(lastExecutedMethods).map((key) => (
          <Table.Row key={key}>
            <Table.Cell>{lastExecutedMethods[key].length} threads</Table.Cell>
            <Table.Cell>
                {/* <Text fontSize="sm" fontFamily={'monospace'} pl={6}>
                   
                                <Code color={"yellow.300"}>{key}…{" "}</Code> 
                                <u>show more</u>
                    
                </Text> */}
                 <StackTrace lastMethod={key} stackTrace={lastExecutedMethods[key][0].stackTrace} threads={lastExecutedMethods[key]} />
            </Table.Cell>
            <Table.Cell textAlign="end"> 
                <Progress.Root defaultValue={Math.floor(lastExecutedMethods[key].length/totalThreadSize*100)} maxW="sm" colorPalette={"green"}>
      <HStack gap="5">
        <Progress.Track flex="1">
          <Progress.Range />
        </Progress.Track>
        <Progress.ValueText>{Math.floor(lastExecutedMethods[key].length/totalThreadSize*100)}%</Progress.ValueText>
      </HStack>
    </Progress.Root> </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </Box>
  )
}

const StackTrace =({lastMethod,stackTrace,threads})=>{
   const [open, setOpen] = useState(false);
   const [isTrdLstOpen,setIsTrdLstOpen] = useState(false)
    return(
    <>
    <Collapsible.Root key={lastMethod}
                 open={open} onOpenChange={() => setOpen(!open)}>
                          <Stack  spacing={3} mt={4}>
                            {!open && (
                              <Text colorScheme="green" fontSize="sm" fontFamily={'monospace'} width={"100%"} pl={6}>
                                <Code color={'yellow.300'}>{lastMethod}</Code> …{" "}
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
                                  {/* <Clipboard.Root value={stackTraceText}>
                                    <Clipboard.Trigger asChild>
                                      
                                       
                                     
                                    </Clipboard.Trigger>
                                  </Clipboard.Root> */}
                                   <IconButton variant="surface" size="2xs" padding={'1'} onClick={()=>{setIsTrdLstOpen(true)}}>
                                          <Text>Show Threads</Text>
                                    </IconButton>
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
                
                                <Code whiteSpace="pre" fontSize="sm" p='3' lineHeight="short" fontFamily={'monospace'} width={"100%"}>
                                    {stackTrace.map((line) => line).join("\n")}
                                </Code>
                              </Box>
                            </Collapsible.Content>
                            </Stack>
                </Collapsible.Root>
                <ThreadListPreviewCustom title={`${threads.length} threads of methods ${lastMethod}`} isOpen={isTrdLstOpen} threads={threads} close={()=>{setIsTrdLstOpen(false)}}/>
                </>
    )
}
