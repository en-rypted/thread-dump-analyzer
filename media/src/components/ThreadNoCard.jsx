import React from 'react'
import { Card, Avatar, Button } from '@chakra-ui/react'
export const ThreadNoCard = ({ threadCount, threadState ,icon,color}) => {
  return (
     <Card.Root  width="320px" variant={'subtle'} key={'subtle'} colorScheme={color} boxShadow="md" borderRadius="md" p="4" m="2">
      
            <Card.Body gap="2" flexDirection="row" justifyContent="space-around" alignItems="center">
               {icon}
              <Card.Title mb="5">{threadCount}</Card.Title>
              <Card.Description>
                {threadState}
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline">View Details</Button>
            </Card.Footer>
          </Card.Root>
  )
}
