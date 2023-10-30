import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    VStack,
    Flex,
} from '@chakra-ui/react'

const levels = [
    {level: 1, id: 0},
    {level: 2, id: 1},
    {level: 3, id: 2},
    {level: 4, id: 3},
    {level: 5, id: 4}

]



const LevelItem = ({ level, setColumnFilters }: any) => <Flex
    align='center'
    cursor={'pointer'}
    p={1.4}
    zIndex={999}
    position={'relative'}
    _hover={{
        bg: "gray.700"
    }}
    onClick={() => {
        console.log(level)
        setColumnFilters=(
            ( prev: any[]) => {
                console.log('lll');
                const leveles = prev.find((filter) => filter.id === 'level')?.value;
                if (!leveles) {
                    return prev.concat({
                        id: 'level',
                        value: [level.id]
                    });
                }
                return console.log('test')
            }
        )
    }}
    >
        {level.level}
    </Flex>



function FilterPopoverLevel ({columnFilters, setColumnFilters} : any) {
    const filterStatuses =
    columnFilters.find((f: { id: string }) => f.id === "level")?.value || [];

    return (
        <Popover isLazy>
            <PopoverTrigger>
                <Button>Уровень</Button>
            </PopoverTrigger>
            <PopoverContent backgroundColor='red.300'>
                <PopoverArrow />
                <PopoverBody backgroundColor={'gray.100'}>
                    <VStack align={'flex-start'} spacing={1}>
                        {levels.map(level =>
                            <LevelItem
                                level={level}
                                key={level.id}
                                
                                setColumnFilters={setColumnFilters}
                            >

                            </LevelItem>)}
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default FilterPopoverLevel