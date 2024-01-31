'use client'
import React from 'react'
const emojis =  ['😀','😇','😈','😎','😐','😑','😕','😗','😙'
,'😛','😟','😦','😧','😬','😮','😯','😴','😶','💜','💛','💘','😁','😂','😅'
,'😍','😡']


const EmojiList = ({insertEmoji}) => {
  return (
    <div className='contEmoji'>
        {
            emojis.map((emoji,index)=>(
                <div key={index} onClick={()=>{insertEmoji(emoji)}}>{emoji}</div>
            ))
        }
    </div>
  )
}

export default EmojiList