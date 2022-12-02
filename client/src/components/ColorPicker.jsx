import React from 'react'
import { GithubPicker } from 'react-color'
import { useState } from 'react'

export const ColorPicker = ({setColor}) => {
    const [currentColor, setCurrentColor] = useState();

    const handleOnChange = (color) =>{
        setCurrentColor(color.hex);
        // console.log(color.hex);
        setColor(currentColor)
    }

    return (
        <div className='outline-none resize-none block p-1 m-1 '>
                <div>
                    <GithubPicker 
                    color={currentColor}
                    onChangeComplete={handleOnChange}/>
                </div>
        </div>
    )
}