"use client"

import Datatable from "@/components/lib/datatable";
import Title from "@/components/lib/title";
import { getData, factorial } from "@/utils/actions";
import { useEffect, useState } from "react";
import ModalForm from "./modal";
import getBrowserFingerprint from "get-browser-fingerprint";

export default function Home() {
    const [keyword, setKeyword] = useState([])
    const [wordList, setWordList] = useState([])
    const [device, setDevice] = useState([])
    const [ip, setIp] = useState("")
    const [popUp, setPopUp] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const fingerprint = getBrowserFingerprint()
            console.log(fingerprint)
        }

        getData('data', { type: "data_keyword" }).then((res) => {
            setKeyword(res)
        })

        getData('data', { type: "word_list" }).then((res) => {
            setWordList(res)
        })

        getData('device').then((res) => {
            setDevice(res)
        })
    }, [])

    return (
        <>
            {popUp && (
                <ModalForm device={device} ip={ip} setIp={setIp} setPopUp={setPopUp} />
            )}
            <div className="flex justify-center items-center flex-col gap-6">

                <div className="w-full">
                    <button className="w-full py-2 rounded-lg shadow-md bg-blue-500 font-semibold text-white" onClick={() => setPopUp(true)}>Add Data</button>
                </div>

                {keyword.length > 0 && (
                    <div className="w-full">
                        <Title title={"keyword"} />
                        <Datatable data={keyword} exclude={['_id', 'created_at', 'update_at', 'duration', 'time_limit', 'audio', 'max_error']} />
                    </div>
                )}

                {wordList.length > 0 && (
                    <div className="w-full">
                        <Title title={"word list"} />
                        <Datatable data={wordList} exclude={['_id', 'created_at', 'update_at']} />
                    </div>
                )}
            </div>
        </>
    )
}
