import { Badge, FormatNumber, HStack, Icon, Progress, Stat } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"
import { getIcon } from "./ThreadsByState"
import ClickBounceBox from "./animation/ClickBounceBox"
function formatCamelCase(str) {
  if (!str) return '';
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')  // insert space before capital letters
    .replace(/^./, match => match.toUpperCase()); // capitalize first letter
}
export const ThreadStat = ({value,label,total,color,icon}) => {
  return (
    <ClickBounceBox>
    <Stat.Root minW={'200px'}  colorPalette={color} borderWidth="1px" p="4" rounded="md">
      <HStack justify="space-between">
        <Stat.Label>
            <Badge variant='subtle' colorPalette={color} gap="0">
            {formatCamelCase(label)}
            </Badge></Stat.Label>
            {getIcon(icon)}
      </HStack>
      <Stat.ValueText>
        <FormatNumber
          value={value}
          style="decimal"
          
          maximumFractionDigits={0}
        />
      </Stat.ValueText>
      <Stat.HelpText mb="2">No of threads</Stat.HelpText>
      <Progress.Root defaultValue={value/total*100}>
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Stat.Root>
    </ClickBounceBox>
  )
}
