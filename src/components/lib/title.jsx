import React from 'react'

const Title = ({title}) => {
  return (
    <>
        <div className='w-full p-2 border border-gray-500 rounded-lg shadow-lg'>
            <span className='font-semibold capitalize'>{title}</span>
        </div> 
    </>
  )
}

export default Title
