"use client"
import { getData, postMany } from '@/utils/actions'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [device,setDevice] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        getData('device').then((res) => {
            setDevice(res)
        })
    }, [])

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.target)

        let temp = []
        for (let i = 0; i < formData.get('email').split('\n').map((item) => item.trim()).length; i++) {
            temp.push({
                ip_address: formData.get('rdp'),
                email: formData.get('email').split('\n').map((item) => item.trim())[i]
            })
        }

        if(temp.length < 1000){
            try {
                postMany('email',temp)
                window.alert("success")
                setTimeout(() => {
                    window.location.reload()
                },800)
            } catch (error) {
                window.alert(error)
            }
        }else{
            window.alert("over data, minimal input data 1000")
        }
    }

    return (
        <>
        {device.length > 0 && (
            <form className='grid grid-cols-1 w-full gap-3' onSubmit={handleSubmit}>
                <div className='w-full flex justify-between items-center'>
                    <label htmlFor="rdp">RDP</label>
                    <select name="rdp" className='p-2 border border-blue-500' id="rdp">
                        <option value="">-- pilih --</option>
                        {device.map((row,i) => {
                            return(
                                <option key={i} value={row.ip_address}>{row.ip_address}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <label htmlFor="email">Email & Password</label>
                    <textarea name="email" id="email" cols="30" rows="10" className='p-2 border border-blue-500'></textarea>
                </div>
                <div className='w-full'>
                    {!loading && (
                        <button type='submit' className='w-full py-2 bg-blue-500 font-semibold text-white rounded'>Submit</button>
                    )}
                </div>
            </form>
        )}
        </>
    )
}

export default Page