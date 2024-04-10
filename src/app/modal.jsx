"use client"
import { deleteData, generate, getData, postData, postMany, shuffleArray, updateData } from '@/utils/actions'
import React, { useEffect, useState } from 'react'

const ModalForm = ({ setIp, setPopUp, ip, device }) => {
    const [content, setContent] = useState(null)
    const [kernel, setKernel] = useState(null)
    const [keyword, setKeyword] = useState([])
    const [limit, setLimit] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData('keyword').then(data => {
            setKeyword(data)
        })
    }, [])

    const handleKernel = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // declare value name

        // const fingerprint = formData.get('fingerprint_key')
        // const captha = formData.get('captha_key')
        const report = parseInt(formData.get('report_interval'))
        const notif = parseInt(formData.get('notif'))
        const account = parseInt(formData.get('account'))
        const content = parseInt(formData.get('content'))
        const cluster = parseInt(formData.get('cluster'))

        await getData('device', { ip_address: ip }).then((data) => {
            let oldData = data[0]
            // setIp()
            delete oldData._id
            setKernel({
                ...oldData,
                // fingerprint_key: fingerprint,
                // captha_key: captha,
                report_interval: report <= 0 ? 1 : report,
                report_on_value: notif > 100 ? 100 : notif,
                thread: {
                    account: account,
                    content: content,
                    upload: account,
                },
                status: true,
                cluster_size: 2
            })
        })
    }

    const handleContent = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        setLimit(parseInt(formData.get('keyword')) * parseInt(formData.get('limit')) * 6)
        let output = []
        for (let i = 0; i < parseInt(formData.get('keyword')); i++) {
            output.push({
                ip_address: ip,
                audio: formData.get('url'),
                duration: parseInt(formData.get('duration')),
                keyword: keyword[i].keyword,
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

    const handleWordList = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        deleteData('data',{'ip_address':ip,'status':false})

        let word = shuffleArray(keyword).slice(0, 7).map(val => val.keyword)

        let sentence = []

        function generateCombinations(prefix, remainingWords) {
            if (prefix.length === word.length) {
                sentence.push(prefix.join(' '))
                return
            }

            for (let i = 0; i < remainingWords.length; i++) {
                let newPrefix = prefix.concat(remainingWords[i]);
                let newRemaining = remainingWords.slice(0, i).concat(remainingWords.slice(i + 1));
                generateCombinations(newPrefix, newRemaining);
            }
        }

        generateCombinations([], word)

        const result = shuffleArray(sentence)

        let arrVal = []
        for (let i = 0; i < limit; i++) {
            arrVal.push({
                ip_address: ip,
                status: true,
                use_ip: "",
                type: "word_list",
                text: result[i],
                update_at: {
                        $timestamp: {
                            "t": Number(Math.floor(Date.now() / 1000)),
                            "i": 1
                        }
                    },
                    created_at: {
                        $timestamp: {
                            "t": Number(Math.floor(Date.now() / 1000)),
                            "i": 1
                        }
                    }
            })
        }
        
        if (arrVal.length > 0 && (arrVal.length + (limit / 6  / content[0].limit)) < 1000) {
            try {
                await updateData('device', { ip_address: ip }, kernel)

                await postMany('data',arrVal)

                for (let i = 0; i < content.length; i++) {
                    await postData('data', content[i]);
                }

                window.alert(`keyword = ${limit / 6 / content[0].limit}, wordlist = ${arrVal.length}, jumlah = ${arrVal.length + (limit / 6 / content[0].limit)}`)
                
                setIp("")
                setPopUp(false)
                setContent([])
                setKernel([])
                setLoading(false)
                setTimeout(() => {
                    window.location.reload()
                }, 800)
            } catch (error) {
                console.log(error)
                window.alert("gagal upload")
            }

        } else {
            window.alert('data over')

            setIp("")
            setPopUp(false)
            setContent([])
            setKernel([])
            setLoading(false)

            setTimeout(() => {
                window.location.reload()
            }, 800)
        }
    }

    return (
        <div className="w-full min-h-screen bg-black/30 absolute left-0 flex justify-center items-center">
            {kernel === null && ip !== "" && (
                (
                    <div className='w-1/2 bg-white p-2 space-y-3'>
                        <div className="w-full text-end">
                            <button className="bg-red-800 py-1 px-3 font-semibold text-white rounded" onClick={() => {
                                setPopUp(false)
                                setIp("")
                            }}>Close</button>
                        </div>
                        <h1 className="w-full text-center font-semibold text-xl">Kernel Setting</h1>
                        <form className='grid md:grid-cols-2 grid-cols-1 gap-3 place-items-start' onSubmit={handleKernel}>

                            <div className='flex flex-col items-start justify-center w-full'>
                                <label htmlFor="report_interval">Report Interval /detik</label>
                                <input type="number" min={1} name='report_interval' className='focus:outline-none w-full py-1 px-3 rounded border border-blue-400' required />
                            </div>


                            <div className='flex flex-col items-start justify-center w-full'>
                                <label htmlFor="notif">Notif Interval ( persen )</label>
                                <input type="number" min={1} name='notif' className='focus:outline-none w-full py-1 px-3 rounded border border-blue-400' required />
                            </div>

                            <div className='flex flex-col items-start justify-center w-full'>
                                <label htmlFor="account">Thread Account</label>
                                <input type="number" min={1} name='account' className='focus:outline-none w-full py-1 px-3 rounded border border-blue-400' required />
                            </div>

                            <div className='flex flex-col items-start justify-center w-full'>
                                <label htmlFor="content">Thread Content</label>
                                <input type="number" min={1} name='content' className='focus:outline-none w-full py-1 px-3 rounded border border-blue-400' required />
                            </div>

                            <button className='py-1 px-3 md:col-span-2 col-span-1 w-full bg-blue-600 font-semibold text-lg text-white rounded-lg' type='submit'>Next</button>
                        </form>
                    </div>

                )
            )}

            {
                kernel !== "" && ip === "" && (
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
                )}
            {kernel !== null && ip !== null && (
                // data content
                <div className="w-5/6 bg-white p-4 space-y-3">
                    <div className="w-full text-end">
                        <button className="bg-red-800 py-1 px-3 font-semibold text-white rounded" onClick={() => {
                            setPopUp(false)
                            setIp("")
                        }}>Close</button>
                    </div>
                    {content === null && keyword.length > 0 ? (
                        <>
                            <h1 className="w-full text-center font-semibold text-xl">Isi Content</h1>
                            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                                <form method='post' className='flex flex-col gap-2' onSubmit={handleContent}>
                                    <label htmlFor="keyword">Jumlah Keyword (tersedia : {keyword?.length}):</label>
                                    <input type='number' id="keyword" name="keyword" rows="4" cols="50" className='border border-blue-500 p-2' required />

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
                            <h1 className="w-full text-center font-semibold text-xl">Generate WordList</h1>
                            <div className='w-full flex justify-center items-center gap-2 flex-wrap'>
                                <form className='grid grid-cols-1 gap-3 place-items-start' onSubmit={handleWordList}>
                                        <button className='py-1 px-3 md:col-span-2 col-span-1 w-full bg-blue-600 font-semibold text-lg text-white rounded-lg' type='submit'>Next</button>
                                    {/* {!loading ? (
                                        <button className='py-1 px-3 md:col-span-2 col-span-1 w-full bg-blue-600 font-semibold text-lg text-white rounded-lg' type='submit'>Next</button>
                                    ) : (
                                        <div>Generate Proses</div>
                                    )} */}
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