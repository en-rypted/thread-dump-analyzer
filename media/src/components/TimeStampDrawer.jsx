import React from 'react'
import {
  Button,
  CloseButton,
  Drawer,
  For,
  HStack,
  Portal,
  Box,
  Stack
} from "@chakra-ui/react"
import { LuClock } from 'react-icons/lu'

export const TimeStampDrawer = ({data,onThreadDataChnage,isOpen,closeDrawer}) => {
  return (
          <Drawer.Root placement={"start"} open={isOpen} lazyBehavior="keepMounted">
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content
                >
                  <Drawer.Header>
                    <Drawer.Title>File Name</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                     <Stack>
                        {data.map((timestamp,index)=>{
                          return (
                                <Button key={index} width="full" colorPalette="teal" variant="surface" onClick={()=>{onThreadDataChnage(index)}} >
                                        <LuClock />{timestamp ? timestamp: "There no Time Stamp"}
                                </Button>
                          )
                            
                        })}
                    </Stack>
                  </Drawer.Body>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton onClick={()=>{closeDrawer()}} size="sm" />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
            </Drawer.Root>
         
  )
}
