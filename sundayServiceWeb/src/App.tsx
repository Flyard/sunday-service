
import './App.css'
import NavBar from "@//components/header/navbar.tsx";
import {useEffect, useState} from "react";
import Playlists from '@//lib/playlists.ts';

import AddSongDialog from "@//components/addSongDialog.tsx";
import {Toaster} from "@//components/ui/toaster.tsx";
import SongCardList from "@//components/songCardList.tsx";


function App() {

    const [playlistValue, setPlaylistValue] = useState('');
    const [isPlaylistEmpty, setIsPlaylistEmpty] = useState(true);

    useEffect(() => {
        const playlists:Object[] = Playlists.getPlaylists();
        setPlaylistValue(JSON.stringify(playlists));
        setIsPlaylistEmpty(Playlists.isEmpty());
        console.log(isPlaylistEmpty)
    }, [])

  return (
    <>
        <div className="fixed top-0 left-0 w-full p-4">
            <NavBar/>
        </div>

        <div className={'pt-[calc(4rem)]'} id={'main'}>
            <div className={'flex flex-col justify-center items-center space-y-4'}>
                <AddSongDialog/>

                {isPlaylistEmpty ? (
                    <div className={'flex justify-center'}>
                        <h4>You don't have any song in your playlist. Please add at least one.</h4>
                    </div>

                ) : (
                    <div className={'flex justify-center items-center'}>
                        <div className={'w-full space-y-4'}>
                            <SongCardList/>
                        </div>
                    </div>
                )
                }
            </div>

        </div>


        <Toaster/>

    </>
  )
}

export default App
