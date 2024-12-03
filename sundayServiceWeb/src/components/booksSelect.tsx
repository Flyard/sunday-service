import {Button} from "@//components/ui/button.tsx";
import {Select, SelectTrigger, SelectGroup, SelectContent, SelectItem, SelectLabel, SelectValue} from "@//components/ui/select.tsx";

const books:string[] = ['FFPM', 'FF', 'Antema', 'Tsanta'];




interface Book {
    onBookSelect: () => void;
}
export default function BooksSelect({onBookSelect} : Book) {
    return(
        <div>
            <Select onValueChange={onBookSelect}>
                <SelectTrigger className={'w-[180px]'}>
                    <SelectValue placeholder={'Books'}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Books</SelectLabel>
                        {books.map(book => (
                            <SelectItem
                                value={book}
                                key={book}
                            >{book}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}