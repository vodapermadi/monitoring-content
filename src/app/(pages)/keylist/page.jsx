"use client"
import Datatable from '@/components/lib/datatable'
import { getData } from '@/utils/actions'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [keyword, setKeyword] = useState([])
    const [wordlist, setWordList] = useState([])

    useEffect(() => {
        getData('keyword').then((data) => {
            let newData = []
            data && data.forEach((row) => {
                newData.push({
                    _id: row._id,
                    keyword: row.keyword,
                    category: row.category,
                    status: true,
                    created_at: row.created_at,
                })
            })
            setKeyword(newData)
        })

        getData('wordlist').then((data) => {
            setWordList(data)
        })
    }, [])

    return (
        <>
            {keyword.length > 0 && (
                <Datatable data={keyword} exclude={['_id', 'created_at', 'update_at']} />
            )}

            {wordlist.length > 0 && (
                <Datatable data={wordlist} exclude={['_id', 'created_at', 'update_at']} />
            )}
        </>
    )
}

export default Page