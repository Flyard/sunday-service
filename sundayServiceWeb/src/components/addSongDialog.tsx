import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@//components/ui/dialog.tsx";
import {Button} from "@//components/ui/button.tsx";
import {Plus} from "lucide-react";
import AddSongToQueueModal from "@//components/addSongToQueueModal.tsx";
import {useEffect, useState} from "react";

export default function AddSongDialog() {

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus/>
                    Add a song
                </Button>
            </DialogTrigger>
            <DialogContent className={'sm:max-w-sm'}>
                <DialogHeader>
                    <DialogTitle>
                        Add a song to your playlist
                    </DialogTitle>
                    <DialogDescription>
                        Choose a song you want to add to your playslit, and press enter
                    </DialogDescription>
                </DialogHeader>
                <AddSongToQueueModal/>
            </DialogContent>
        </Dialog>
    )
}