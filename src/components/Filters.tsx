import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import searchIcon from "./icons/SearchIcon"
import { Icon } from "@chakra-ui/icon"
import FilterPopoverLevel from "./filters/FilterPopoverLevel";
const Filters = ({columnFilters, setColumnFilters} : any) => {
    const task = columnFilters.find(
        (f: { id: any }) => f.id === 'title'
    )?.value || '';
    const onFilterChange = (id: any, value: any) => setColumnFilters (
        ( prev: any[]) => prev.filter((f: { id: any; }) => f.id !== id).concat({
            id, value
        })
    )
    return (
       <> <input type="text"  placeholder="Название корабля" value={task} 
       onChange={(e) => onFilterChange("title", e.target.value)}></input>
       <FilterPopoverLevel 
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
       </>
        // <InputGroup size='sm' maxW="10rem">
        //     <InputLeftElement pointerEvents={"none"}>
        //         <Icon as={searchIcon}></Icon>
        //         <Input type="text"
        //             variant={"filled"}
        //             placeholder="Название корабля"
        //             borderRadius={3} />
        //     </InputLeftElement>
        // </InputGroup>
    )
}

export default Filters
