import { useState } from 'react';
import Modal from 'react-modal';
import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore"; 
import "../styles/modal.css";

Modal.setAppElement('#root');

const ModalEdit = ({ isOpen, closeModal, taskId, task }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = async (e) => { 
    e.preventDefault() 
    const todoDocRef = doc(db, 'tasks', taskId) 
    try{ 
      await updateDoc(todoDocRef, { 
        title: editedTask, 
        description: editedTask 
      }) 
      alert("Success Edit")
      closeModal()

    } catch (err) { 
      alert(err) 
    } 
  }
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Task Modal"
      className="fixed inset-1/2 transform 
      -translate-x-1/2 
      -translate-y-1/2
       bg-white p-8 rounded-md shadow-md w-96 h-96"
    > 
    <div>
      
    <h2 className="text-2xl text-slate-700 font-bold mb-4">Edit Task</h2>
      <label className="block text-slate-700 mb-2">Old Task: { JSON.stringify(task) ? task.title : ''}</label>
      <input
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
        className="w-full text-slate-700 p-2 border rounded-md mb-4"
      />
      <button
        onClick={handleEdit}
        className="bg-green-500 text-slate-700 px-4 py-2 rounded-md mr-2"
      >
        Save Changes
      </button>
      <button
        className="bg-gray-400 text-slate-700 px-4 py-2 rounded-md"
        onClick={closeModal}
      >
        Cancel
      </button>
    </div>
      run dev
    </Modal>
  );
};

export default ModalEdit;
