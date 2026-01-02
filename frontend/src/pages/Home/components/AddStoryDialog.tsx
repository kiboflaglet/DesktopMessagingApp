import axios from "axios";
import { X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useState, type FormEvent } from "react";
import { API } from "../../../constants";
import { useUserContext } from "../../../providers/userContext";
import UserAvatar from "./UserAvatar";

const AddStoryDialog = () => {

    const [content, setContent] = useState("")
    const [open, setOpen] = useState(false)
    const user = useUserContext()

    const submit = (event: FormEvent) => {
        event.preventDefault()
        if (!content.length) return;
        if (!user) return;
        axios.post(API + "/users/stories/new", {
            content,
            userId: user.id
        })
            .then(res => {
                if (res.data?.success) {
                    setOpen(false)
                }
            })
    }


    return (
        <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
            <Dialog.Trigger asChild>
                <button>

                    <UserAvatar
                        name='Add story'
                        badge="add"
                    />
                </button>

            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="border fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
                    <Dialog.Title className="m-0 mb-2 text-[17px] font-medium text-mauve12">
                        Add Story
                    </Dialog.Title>
                    <form onSubmit={submit}>

                        <fieldset className="mb-[15px] flex flex-col  gap-3">
                            <textarea
                                autoFocus
                                onChange={(event) => setContent(event.target.value)}
                                className="inline-flex p-2  h-[100px] w-full  items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                                id="name"
                                defaultValue=""
                            />
                        </fieldset>
                        <div className="mt-[25px] flex justify-end">
                            <button type="submit" className="border inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 outline-none outline-offset-1 hover:bg-green5 focus-visible:outline-2 focus-visible:outline-green6 select-none">
                                Create
                            </button>
                        </div>
                    </form>

                    <Dialog.Close asChild>
                        <button
                            className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                            aria-label="Close"
                        >
                            <X />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )

}
    ;

export default AddStoryDialog;
