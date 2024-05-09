'use client'
import { FiTrash2 } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import React, { useEffect, useState } from 'react'
import axios from "axios";

const Home = () => {
  const [clearNotes, setClearNotes] = useState("");
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [notes, setNotes] = useState([]);
  const [id, setId] = useState(null);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/api/');
        setNotes(res.data.data); 
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNotes();
  }, []);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`/api/getOne?id=${req.body.id}`);
        setNotes(res.data.data); 
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNotes();
  }, []);

  const submitHandle = async () => {
    try {
      await axios.post('/api/create', { note: clearNotes });
      const res = await axios.get('/api/');
      setNotes(res.data.data);
      setClearNotes("");
    } catch (error) {
      console.log(error.message);
    }
  };
 
  const updateNote = (note, noteID) => {
    setShowUpdateBox(true);
    setClearNotes(note);
    setId(noteID);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/update?id=${id}`, { note: clearNotes });
      setClearNotes("");
      const res = await axios.get('/api/');
      setNotes(res.data.data);
      setShowUpdateBox(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteNote = (noteID) => {
    setShowDeleteBox(true);
    setId(noteID);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/delete?id=${id}`);
      const res = await axios.get('/api/');
      setNotes(res.data.data);
      setShowDeleteBox(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='bg-white min-h-screen'>
      <div className='pt-5 px-3 max-w-[1200px] text-blue-700 mx-auto text-3xl font-semibold'>Notes Application</div>
      <div className='max-w-[1200px] mx-auto'><textarea value={clearNotes} onChange={(event) => setClearNotes(event.target.value)} onSubmit={() => submitHandle()} type="text" name="note" id="note" className='p-3 w-full min-h-48 text-blue-500 mx-auto text-xl font-semibold rounded-md border border-blue-700 mt-7 outline-none' /></div>
      <div className='max-w-[1200px] flex justify-end items-center gap-3 mx-auto'>
        <div>
          <button onClick={() => setClearNotes("")} className='bg-white border border-blue-700 text-blue-700 p-3 uppercase text-sm rounded-md min-w-32'>clear</button>
        </div>
        <div>
          <button className='bg-blue-600 text-white p-3 uppercase text-sm rounded-md min-w-32' type='submit' onClick={() => submitHandle()}>Add</button>
        </div>
      </div>

      <div className='max-w-[1200px] mx-auto mt-10'>  
        {
          notes.map((v, i) => {
            return (
              <div className='bg-blue-700 py-1 rounded-md shadow-lg mb-5' key={i}>
                <div className='bg-[#fefefe] rounded-sm p-3 flex flex-col gap-3'>
                  <p className="text-blue-500">{v.note}</p>
                  <div className='justify-end flex gap-2'>
                    <div onClick={() => deleteNote(v._id)} className="bg-red-500 rounded-md p-2 cursor-pointer w-max text-white"><FiTrash2 /></div>
                    <div onClick={() => updateNote(v.note, v._id)} className="bg-blue-500 rounded-md p-2 cursor-pointer w-max text-white"><LuPencil /></div>
                  </div>
                </div>
              </div>
            )
          })
        }   
      </div>

      <div onClick={() => setShowUpdateBox(false)} style={{ display: showUpdateBox ? 'block' : 'none' }} className="fixed w-screen h-screen overflow-hidden inset-0 bg-gray-700 bg-opacity-10 backdrop-filter backdrop-blur-md z-30 py-32">
        <div onClick={(event) => event.stopPropagation()} className="max-w-[1000px] h-max w-full bg-white mx-auto rounded-lg shadow-2xl p-7">
        <div className="text-blue-500 text-2xl uppercase">Edit the note</div>
          <p className="text-yellow-500 text-lg mt-3">NOTE: This action is irreversible. Notes, once updated, can not be trailed back to previous versions.</p>

          <textarea className='p-3 w-full min-h-48 text-blue-500 mx-auto text-xl font-semibold rounded-md border border-blue-700 mt-7 outline-none' onChange={(event) => setClearNotes(event.target.value)} value={clearNotes} name="updateNote" id="update note"></textarea>

          <div className="flex justify-end gap-3 mt-5">
            <button onClick={() => setShowUpdateBox(false)} className='bg-white border border-blue-700 text-blue-700 p-3 uppercase text-sm rounded-md min-w-32'>Cancel</button>
            <button className='bg-blue-700 text-white p-3 uppercase text-sm rounded-md min-w-32' onClick={() => handleUpdate()}>Update</button>
          </div>
        </div>
      </div>
      
      <div onClick={() => setShowDeleteBox(false)} style={{ display: showDeleteBox ? 'block' : 'none' }} className="fixed w-screen h-screen inset-0 bg-gray-700 bg-opacity-10 backdrop-filter backdrop-blur-md z-30 py-56">
        <div onClick={(event) => event.stopPropagation()} className="max-w-[1000px] h-max w-full bg-white mx-auto rounded-lg shadow-2xl p-7">
          <div className="text-blue-500 text-2xl uppercase">Are you sure to delete this note?</div>
          <p className="text-red-500 text-lg mt-3">NOTE: This action is irreversible. Deleted notes can not be recovered.</p>

          <div className="flex justify-end gap-3 mt-5">
            <button onClick={() => setShowDeleteBox(false)} className='bg-white border border-blue-700 text-blue-700 p-3 uppercase text-sm rounded-md min-w-32'>Cancel</button>
            <button className='bg-red-500 text-white p-3 uppercase text-sm rounded-md min-w-32' onClick={() => handleDelete()}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home