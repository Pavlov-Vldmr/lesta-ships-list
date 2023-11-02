import { Input } from "@chakra-ui/input"
const Filters = ({columnFilters, setColumnFilters} : any) => {
    const task = columnFilters.find(
        (f: { id: any }) => f.id === 'title'
    )?.value || '';
    const onFilterChange = (id: any, value: string) => setColumnFilters (
        ( prev: any[]) => prev.filter((f: { id: any; }) => f.id !== id).concat({
            id, value
        })
    )
    return (
       <> 
       <Input  w={"12rem"}
       variant="filled" type="text"  placeholder="Название корабля" value={task} 
       onChange={(e) => onFilterChange("title", e.target.value)}></Input>
       </>
    )
}

export default Filters
