"use client"
import React, { useState } from 'react'

const ModalForm = ({ setIp, setPopUp, ip, device }) => {
    const [content, setContent] = useState(null)

    const handleContent = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)

        let output = []
        for (let i = 0; i < formData.get('keyword').split('\n').map(item => item.trim()).filter(item => item !== '').length; i++) {
            output.push({
                ip_address: ip,
                audio: formData.get('url'),
                duration: parseInt(formData.get('duration')),
                keyword: formData.get('keyword').split('\n').map(item => item.trim()).filter(item => item !== '')[i],
                time_limit: parseInt(formData.get('time_limit')),
                limit: parseInt(formData.get('limit')),
                min_duration: parseInt(formData.get('min_duration')),
                max_duration: parseInt(formData.get('max_duration')),
                resolusi: parseInt(formData.get('resolusi')),
                max_error: parseInt(formData.get('max_error')),
                total_audio: parseInt(formData.get('total_audio')),
                type: "data_keyword",
                status: true
            })
        }
        setContent(output)
    }

    const handleWordList = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const text = formData.get('text').split('\n').map(item => item.trim()).filter(item => item !== '')
        let arrVal = []
        for (let i = 0; i < text.length; i++) {
            arrVal.push({
                ip_address: ip,
                status: true,
                use_ip: "",
                type: "word_list",
                text: formData.get('text').split('\n').map(item => item.trim()).filter(item => item !== '')[i]
            })
        }
        wordList(arrVal)
    }

    return (
        <div className="w-full min-h-screen bg-black/30 absolute left-0 flex justify-center items-center">
            {ip === "" ? (
                // menu pilih rdp
                <div className="w-1/2 bg-white p-2 space-y-3">
                    <div className="w-full text-end">
                        <button className="bg-red-800 py-1 px-3 font-semibold text-white rounded" onClick={() => {
                            setPopUp(false)
                            setIp("")
                        }}>Close</button>
                    </div>
                    <h1 className="w-full text-center font-semibold text-xl">Pilih RDP</h1>
                    <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                        {device.length > 0 && device.map((row, i) => {
                            return (
                                <button key={i} className="py-1 px-3 bg-blue-500 rounded font-semibold text-white" onClick={() => setIp(row.ip_address)}>{row.ip_address}</button>
                            )
                        })
                        }
                    </div>
                </div>
            ) : (
                <div className="w-5/6 bg-white p-4 space-y-3">
                    <div className="w-full text-end">
                        <button className="bg-red-800 py-1 px-3 font-semibold text-white rounded" onClick={() => {
                            setPopUp(false)
                            setIp("")
                        }}>Close</button>
                    </div>
                    {content === null ? (
                        <>
                            <h1 className="w-full text-center font-semibold text-xl">Isi Content</h1>
                            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                                <form method='post' className='flex flex-col gap-2' onSubmit={handleContent}>
                                    <label htmlFor="keyword">Keyword:</label>
                                    <textarea id="keyword" name="keyword" rows="4" cols="50" className='border border-blue-500 p-2' required></textarea>

                                    <label htmlFor="time_limit">Time Limit pencarian video : </label>
                                    <input required type="number" min={1} className='p-2 border border-blue-500' id="time_limit" name="time_limit" />

                                    <label htmlFor="limit">max video di ambil: </label>
                                    <input required type="number" min={1} className='p-2 border border-blue-500' id="limit" name="limit" />

                                    <label htmlFor="min_duration">Minimum Duration:</label>
                                    <input required type="number" min={1} className='p-2 border border-blue-500' id="min_duration" name="min_duration" />

                                    <label htmlFor="max_duration">Maximum Duration:</label>
                                    <input required type="number" min={1} className='p-2 border border-blue-500' id="max_duration" name="max_duration" />

                                    <label htmlFor="resolusi">Resolution:</label>
                                    <select className='p-2 border border-blue-500' id="resolusi" name="resolusi" >
                                        <option value="">-- pilih --</option>
                                        <option value="360">360p</option>
                                    </select>

                                    <label htmlFor="max_error">Maximum Error:</label>
                                    <input required type="number" min={1} className='p-2 border border-blue-500' id="max_error" name="max_error" />

                                    <label htmlFor="total_audio">Total Audio:</label>
                                    <input required type="number" min={1} className='p-2 border border-blue-500' id="total_audio" name="total_audio" />

                                    <label htmlFor="url">Audio URL:</label>
                                    <input required type="text" className='p-2 border border-blue-500' id="url" name="url" />

                                    <label htmlFor="duration">Audio Duration:</label>
                                    <input required type="number" min={1} className='p-2 border border-blue-500' id="duration" name="duration" />

                                    <button type="submit" className='py-1 px-3 md:col-span-2 w-full bg-blue-600 font-semibold text-lg text-white rounded-lg'>Submit</button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="w-full text-center font-semibold text-xl">Isi Word List</h1>
                            <div className='w-full flex justify-center items-center gap-2 flex-wrap'>
                                <form className='grid md:grid-cols-2 grid-cols-1 gap-3 place-items-start' onSubmit={handleWordList}>
                                    <div className='flex flex-col items-start justify-center w-full gap-1'>
                                        <label htmlFor="thread">Text</label>
                                        <textarea name='text' className='focus:outline-none w-full py-1 px-3 rounded border border-blue-400' required></textarea>
                                    </div>

                                    <button className='py-1 px-3 md:col-span-2 col-span-1 w-full bg-blue-600 font-semibold text-lg text-white rounded-lg' type='submit'>Next</button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            )}

        </div>
    )
}

export default ModalForm
