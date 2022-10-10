import React from 'react'
import {
    MessageOutlined
  } from '@ant-design/icons';
  import moment from "moment";


const Message = ({data,deleteMessages}) => {

    const {id,source,text,timestamp} = data

  return (
    <div className='message_container' >
        <div className='message_container_row' >
            <MessageOutlined />

            ~{source} - <span className='message_text' > {moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')}</span>
            <button className='delete_button' onClick={()=>deleteMessages(id)} >Delete</button>
        </div>
        <p className='message_text' >
            {text}
        </p>
    </div>
  )
}

export default Message