
import React from 'react'
import ThreadGaugeChart from './ThreadGaugeChart.jsx'
import { Summery } from './Summery.jsx'
import DonoutChart from './DonoutChart.jsx'
import { Box,Text } from '@chakra-ui/react'
import { ThreadNoCard } from './ThreadNoCard.jsx'
import { FaRunning } from "react-icons/fa";
import { ThreadStat } from './ThreadStat.jsx'
import { ThreadList } from './ThreadsByState.jsx'
// summary.runnableThreads || 0,
//           summary.waitingThreads || 0,
//           summary.timedWaitingThreads || 0,
//           summary.blockedThreads || 0,
//           summary.deadlockedThreads || 0,
export const Dashboard = ({summary,threadByState}) => {
  return (
    <Box marginTop={'15vh'} height={'100%'} width={'100%'} display={'flex'} justifyContent={'center'} padding="20px 200px 0px 170px"   >
      <Box  display="flex" flexDirection="column" justifyContent="space-around" width="100%" >
       
        <Box  display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width={"100%"} height={'550px'}>
            <Box  style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '50px' ,scale: '1.08', rowGap: '60px'}}>
                {summary.runnableThreads != 0 && <ThreadList threads={threadByState.runnable} summary={summary} state={'runnable'} />}
                {summary.blockedThreads != 0 && <ThreadList threads={threadByState.blocked} summary={summary} state={'blocked'} />}
                {/* {summary.deadlockedThreads != 0 && <ThreadGaugeChart value={summary.deadlockedThreads || 0} total={summary.totalThreads} label="Deadlocked Threads" color="#ed3a3aff" />} */}
                {summary.waitingThreads != 0 && <ThreadList threads={threadByState.waiting} summary={summary} state={'waiting'} />}
                {summary.timedWaitingThreads != 0 && <ThreadList threads={threadByState.timedWaiting} summary={summary} state={'timedWaiting'} />}
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


