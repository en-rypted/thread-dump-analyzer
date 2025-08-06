import { Box, EmptyState, Icon, List, VStack } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"

export const EmptyStateCustom = ({title,desc,icon}) => {
  return (
    <Box marginTop={'15vh'} height={'70vh'} display={'flex'} alignContent={'center'} justifyContent={'center'} alignItems={'center'}>
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Icon as={icon || HiColorSwatch} />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title || 'No results found'}</EmptyState.Title>
          <EmptyState.Description>
            {desc || 'No content'}
          </EmptyState.Description>
        </VStack>
        {/* <List.Root variant="marker">
          <List.Item>Try removing filters</List.Item>
          <List.Item>Try different keywords</List.Item>
        </List.Root> */}
      </EmptyState.Content>
    </EmptyState.Root>
    </Box>
  )
}
