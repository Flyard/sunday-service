import {Card, CardDescription, CardHeader, CardTitle} from '@//components/ui/card.tsx'
import Song from "@//lib/interfaces.ts";
export default function SongCard(props:Song) {

    function upperToLower(str:string) {
        console.log(str)
        if(str === 'antema' || str === 'tsanta') {
            const upper = str.substring(0, 1).toUpperCase();
            const lower = str.substring(1, str.length).toLowerCase();
            return upper + lower

        } else {
            return str.toUpperCase()

        }

    }



    return(
        <Card>
            <CardHeader className={'grid grid-cols-3'}>
                <div className={'col-span-1'}>
                    <div className={'box-border h-16 w-16 bg-black rounded-xl flex items-center justify-center'}>
                        <span className={'text-white'}>{props.tonalite}</span>
                    </div>
                </div>

                <div className={'col-span-2'}>
                    <CardDescription>{upperToLower(props.category)} {props.number}</CardDescription>
                    <CardTitle>{upperToLower(props.title)}</CardTitle>
                </div>
            </CardHeader>
        </Card>
    )
}