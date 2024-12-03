import SongCard from "@//components/ui/songCard.tsx";

import Playlists from "@//lib/playlists.ts";
import Song from "@//lib/interfaces.ts";


export default function SongCardList() {

    const playlist:Song[] = Playlists.getPlaylists();
    return(
    <div className={'space-y-4'}>
        {playlist.map((song:Song) => (

            <div>
                <SongCard
                    title={song.title}
                    tonalite={song.tonalite}
                    category={song.category}
                    number={song.number}>
                </SongCard>


                {/*<div className={'flex flex-col justify-center'}>*/}
                {/*    <Button size={'icon'} variant={'ghost'}>*/}
                {/*        <Pencil/>*/}
                {/*    </Button>*/}
                {/*    <Button variant={'ghost'} size={'icon'}>*/}
                {/*        <Trash2 color={'red'} />*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>

        ))}
    </div>
    )
}



