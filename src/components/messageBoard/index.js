import React, { useEffect, useState } from 'react'
import Message from './message'
import Swal from 'sweetalert2'
import { doFetch } from '../../utils/helperFunctions'


const BASE_URL = `https://mapi.harmoney.dev`
const MESSAGES = `/api/v1/messages/`

const DUMMY_DATA = [
    {
        "id": 3,
        "text": "hello world!",
        "source": "kd-test",
        "timestamp": "2022-03-02T10:41:41.454425Z"
    },
    {
        "id": 4,
        "text": "another one!",
        "source": "kd-test",
        "timestamp": "2022-03-02T10:42:55.115057Z"
    }
]


const MessageBoard = () => {

    const [inputMessage,setInputMessage]= useState('')
    const[messageList,setMessageList]=useState([])
    const [isLoading,setIsLoading]=useState(false)

    const getMessages = async() =>{
        setIsLoading(true);

        const data = await doFetch("GET", {}, `${BASE_URL}${MESSAGES}`);

        if (data) {
            setMessageList(data)
        } else { 
            Swal.fire("Error!", );
        }

        setIsLoading(false);
    }

    const postMessage = async() =>{
        setIsLoading(true);
        let reqData = {"text":inputMessage}
        const data = await doFetch("POST", reqData, `${BASE_URL}${MESSAGES}`);

        if (data) {
           getMessages()
        } else { 
            Swal.fire("Error!", );
        }

        setIsLoading(false);
    }

    const deleteMessages = async (id)=>{
        setIsLoading(true);
        const data = await doFetch("DELETE", {}, `${BASE_URL}${MESSAGES}${id!=='All'?`${id}/`:''}`);
        if (data) {
            // setMessageList(data)
            getMessages()
        } else { 
            Swal.fire("Error!", );
        }

        setIsLoading(false);
    }

    useEffect(()=>{
        getMessages()
    },[])
 
  return (
    <div className='container' >
       { isLoading?
        <div>...LOADING</div>
       : 
        <>
            <h2 className='heading' >Chatter</h2>
            <p>Type something in the box below, then hit "Post"</p>
            <div className='input_form_row' >
                <input type="text" value={inputMessage} onChange={e=>setInputMessage(e.target.value)} />
                <button onClick={postMessage} >Post!</button>
                <button className='delete_all_button' onClick={()=>deleteMessages('All')} >Delete All</button>
            </div>

            {DUMMY_DATA.map((item)=>{
                return(
                    <Message data={item} key={item.id} deleteMessages={deleteMessages} />
                )
            })}
        </>}
    </div>
  )
}

export default MessageBoard