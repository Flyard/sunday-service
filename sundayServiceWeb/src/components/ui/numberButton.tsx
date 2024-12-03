import { Button } from '../ui/button.tsx'
interface NumberButtonProps {
    number: number;
    onDigitPress: (digit:number) => void;
}
export default function NumberButton({number, onDigitPress} :NumberButtonProps) {
    return(
        <Button
            variant={'ghost'}
            size={"default"}
            onClick={() => onDigitPress(number)}
        >
            {number}
        </Button>
    )
}