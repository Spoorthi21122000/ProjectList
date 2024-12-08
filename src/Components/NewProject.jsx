import Input from "./Input.jsx"
import { useRef } from "react"
import Modal from "./Modal.jsx";

export default function NewProject({onAdd, onCancel}){

    const modal = useRef();

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave() {
        let enteredTitle= title.current.value;
        let entereddescription= description.current.value;
        let enteredDueDate= dueDate.current.value;

        if(enteredTitle.trim() === '' ||
         entereddescription === '' ||
          enteredDueDate === ''){
            modal.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: entereddescription,
            dueDate: enteredDueDate
        })
      }
    return (
        <>
        <Modal ref={modal} buttonCaption="Close" >
            <h2 className="text-xl font-bold text-stone-900 mt-4 my-4">Invalid Input</h2>
            <p className='text-stone-700 mb-4'>Oops... looks like you forgot to enter a value</p>
            <p className='text-stone-700 mb-4'>Please ensure you have entered all the input field </p>

        </Modal>
        <div  className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
        <li>
            <button  onClick={onCancel} className="text-stone-800 hover:text-stone-950">Cancel</button>
            </li>
        <li>
            <button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
            </li>
        </menu>

        <div>  
            <Input type="text" ref={title} label="Title"/>
            <Input ref={description}  label="Description" textArea/>
            <Input type="date" ref={dueDate} label = "Due Date"/>
        </div>
            </div> 
        </>)
}
    