import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";

export default function NewProject({onAdd,onCancel}) {
    const modal = useRef();

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave() {
        const enteredValue = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;


        //validations...
        if (enteredValue.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim()===''){
            // show error modal
            modal.current.open();
            return; // so that if we enter this if block then the below onAdd should not execute
        }

        onAdd({
            title: enteredValue,
            description: enteredDescription,
            dueDate: enteredDueDate
        });

    }

    return (
        <>
        <Modal ref={modal} buttonCaption="Okay" >
            <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
            <p className ='text-stone-600 mb-4'>Oops ... looks like you forgot to enter a value.</p>
            <p className='text-stone-600 mb-4' >Please make sure you provide valid value for every input field.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li><button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button></li>
                <li><button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={handleSave}>Save</button></li>
            </menu>
            <div>
                <Input type='text' ref={title} label='Title' />
                {/* <Input textArea label='Title' />  If instead of textArea={true} we set textArea then also it is set to true */}
                <Input ref={description} textArea label='Description' /> 
                <Input type='date' ref={dueDate} textArea={false} label='Due Date' />
            </div>
        </div>
        </>
    )
}