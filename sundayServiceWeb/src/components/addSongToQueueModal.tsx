import NumberButton from "@//components/ui/numberButton.tsx";
import {Button} from "@//components/ui/button.tsx";
import {Delete, Play, Plus} from "lucide-react";
import {Input} from '@//components/ui/input.tsx';
import {useEffect, useState} from "react";
import BooksSelect from "@//components/booksSelect.tsx";
import {Dialog} from '@//components/ui/dialog.tsx';
import {useToast} from "@//hooks/use-toast.ts";
import Playlists from '@//lib/playlists.ts';


export default function AddSongToQueueModal() {

    const [inputValue, setInputValue] = useState('')
    const [bookValue, setBookValue] = useState('');
    const [solfaValue, setSolfaValue] = useState({});
    const {toast} = useToast();

    function isAllowedToAdd(book:string, inputValue:number):boolean {
        let isAllowed:boolean = true;
        if(!book || !inputValue) {
            return false;
        }
        switch(book) {
            case 'FFPM':
                isAllowed = inputValue < 828;
                break;

            case 'FF':
                isAllowed = inputValue < 92;
                break;

            case 'ANTEMA':
                isAllowed = inputValue < 25;
                break;

            case 'TSANTA':
                isAllowed = inputValue < 15;
                break;

            default:
                break;

            }
        return isAllowed

    }



    const handleClick = (digit:number) => {
        if(inputValue.length === 0 && digit === 0) {
            return;
        }
        if(inputValue.length < 3) {
            setInputValue(prev => prev + digit);
        }
    }
    const handleDelete = () => {
        setInputValue(prev => prev.slice(0, -1));
    }

    const handleBookSelect = (book:string) => {
        setBookValue(book);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(bookValue !== '' && inputValue !== '') {
            if(isAllowedToAdd(bookValue.toUpperCase(), parseInt(inputValue))) {
                const newSolfaValue = {category: bookValue, number: inputValue}
                setSolfaValue(newSolfaValue);
                Playlists.addToPlaylist(solfaValue);

            } else {
                console.log('Not allowed')
            }
        }
    }



    const handleToast = () => {
        if((!bookValue || !inputValue) || !isAllowedToAdd(bookValue.toUpperCase(), parseInt(inputValue))) {
            toast({
                variant: "destructive",
                title: `${bookValue} ${inputValue} was not added`,
                description: `Ugh something happened.`,
            });


        } else {
            const newSolfaValue = {category: bookValue.toUpperCase(), number: parseInt(inputValue)}
            if(!Playlists.checkExistence(newSolfaValue)) {
                Playlists.addToPlaylist(newSolfaValue);
                toast({
                    title: `✅ ${bookValue} ${inputValue} was added.`,
                    description: `Good choice.`
                })
            } else {
                toast({
                    title: ` ⚠️ ${bookValue} ${inputValue} has already been added.`,
                    description: `Already there.`
                })
            }

        }
    }

    useEffect(() => {
        console.log(solfaValue)
    }, [solfaValue])

    const digits:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return(
        <>
                <div className={'flex flex-col space-y-4 justify-center items-center'}>

                    <Input
                        disabled
                        value={inputValue}
                        className={'text-center w-2/5 '}
                    />
                    <div className={'grid grid-cols-1 gap-6'}>
                        <div className={'grid grid-cols-3 gap-6'}>
                            {digits.map(num => (
                                <NumberButton
                                    key={num}
                                    number={num}
                                    onDigitPress={handleClick}
                                    type={'button'}
                                />
                            ))}
                        </div>
                        <div className={'grid grid-cols-3 gap-6'}>
                            <Button variant={'ghost'} type={'button'}/>
                            <NumberButton number={0} onDigitPress={handleClick} type={'button'}/>
                            <Button variant={'outline'} onClick={handleDelete} type={'button'}>
                                <Delete/>
                            </Button>
                        </div>

                    </div>

                    <div>
                        <BooksSelect onBookSelect={handleBookSelect}/>
                    </div>

                    <div>
                        <Button onClick={() => {handleToast(); handleSubmit}}>
                            Add
                        </Button>
                    </div>


                </div>
        </>
    )
}