
import React from 'react'
import ThreadGaugeChart from './ThreadGaugeChart.jsx'
import { Summery } from './Summery.jsx'
import DonoutChart from './DonoutChart.jsx'
import { Box,Text } from '@chakra-ui/react'
import { ThreadNoCard } from './ThreadNoCard.jsx'
import { FaRunning } from "react-icons/fa";
// summary.runnableThreads || 0,
//           summary.waitingThreads || 0,
//           summary.timedWaitingThreads || 0,
//           summary.blockedThreads || 0,
//           summary.deadlockedThreads || 0,
export const Dashboard = ({summary}) => {
  return (
    <Box marginTop={'15vh'} height={'100%'} width={'100%'} display={'flex'} justifyContent={'center'} padding="20px 200px 0px 170px"   >
      <Box  display="flex" flexDirection="column" justifyContent="space-around" width="100%" >
        <Text fontSize="lg" fontWeight="bold">Total No of Threads: {summary.totalThreads || 0}</Text>
        <Box  display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width={"100%"} height={'550px'}>
            <Box  style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '30px' ,scale: '0.8', rowGap: '0px'}}>
                {summary.runnableThreads != 0 && <ThreadGaugeChart value={summary.runnableThreads || 0} total={summary.totalThreads} label="Runnable Threads" color="#22c55e" />}
                {summary.blockedThreads != 0 && <ThreadGaugeChart value={summary.blockedThreads || 0} total={summary.totalThreads} label="Blocked Threads" color="#232020ff" />}
                {/* {summary.deadlockedThreads != 0 && <ThreadGaugeChart value={summary.deadlockedThreads || 0} total={summary.totalThreads} label="Deadlocked Threads" color="#ed3a3aff" />} */}
                {summary.waitingThreads != 0 && <ThreadGaugeChart value={summary.waitingThreads || 0} total={summary.totalThreads} label="Waiting Threads" color="#ede43aff" />}
                {summary.timedWaitingThreads != 0 && <ThreadGaugeChart value={summary.timedWaitingThreads || 0} total={summary.totalThreads} label="Timed Waiting Threads" color="#3accedff" />}
            </Box>
            <Box>
                {/* <Summery summary={summary}/> */}
                <DonoutChart data={[
                  {name: "Runnable Threads", value: summary.runnableThreads || 0, color: "#22c55e"},
                  {name: "Waiting Threads", value: summary.waitingThreads || 0, color: "#ede43aff"},
                  {name: "Timed Waiting Threads", value: summary.timedWaitingThreads || 0, color: "#3accedff"},
                  {name: "Blocked Threads", value: summary.blockedThreads || 0, color: "#232020ff"},
                  //{name: "Deadlocked Threads", value: summary.deadlockedThreads || 0, color: "#ed3a3aff"}
                ]}/>
            </Box>
          
          </Box>      
        </Box>
    </Box>
  
  )
}
