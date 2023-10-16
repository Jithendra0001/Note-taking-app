import React,{useState,useEffect} from 'react'
import { useParams, } from "react-router-dom";
import { useNavigate } from "react-router";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    const params = useParams();
    const history = useNavigate();
    let [note,setNote] = useState(null);

    useEffect(()=>{
        getNote(params.id);},[params.id])

    let getNote = async (vaar)=>{
        console.log("getnote");
        if(vaar==="new") return
        let response = await fetch(`/api/notes/${vaar}`)
        let data = await response.json();
        setNote(data);
    }

    let createNote=async ()=>{
        console.log("create");
        let response = null;
        response = await fetch('/api/notes/create/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote=async ()=>{
        console.log("update");
        let response = null;
        response = await fetch(`/api/notes/${params.id}/update/`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        // if(response.status === 200) return;
        console.log(response);
    }

    let deleteNote=async ()=>{
        console.log("delete");
        fetch(`/api/notes/${params.id}/delete/`,{
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json'
            }
        }
        )
        history('/');
    }

    let handleSubmit=(e)=>{
        e.preventDefault();
        if(params.id !=="new" && note.body === '')
        {
            deleteNote();
        }else if(params.id !== "new"){
            updateNote();
        }else if(params.id === "new" && note)
        {
            createNote();
        }
        console.log("home page");
        history('/');
        //redirecting user
    }
    const onChangeHandler=(e)=>{
        // const list=note;
        // list["body"]=e.target.value;
        setNote({...note,"body":e.target.value});
        console.log(e.target.value);
    }


  return (
    <div className="note">
        {/* <p>{note?.body}</p> */}
        <div className="note-header">
            <h3>
                 <ArrowLeft onClick={handleSubmit}/>
            </h3>
            {params.id !=='new'?(
                <button onClick={deleteNote} >Delete</button>
            ):(
                <button onClick={handleSubmit}>Done</button>
            )}
        </div>
        <textarea value={note?.body} onChange={onChangeHandler}></textarea>
    </div>
  )
}

export default NotePage
