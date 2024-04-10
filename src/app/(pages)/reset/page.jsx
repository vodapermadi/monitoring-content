"use client"
import Datatable from '@/components/lib/datatable'
import { deleteData, getData } from '@/utils/actions'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getData('device').then((res) => {
            setData(res)
        })
    }, [])

    const handleReset = (ip) => {
        deleteData('data', {ip_address:ip}).then((res) => {
            window.alert(res.deletedCount)
        })
    }

    return (
        <>
            {data.length > 0 && (
                <Datatable data={data} action={[{ "title": "reset", "color": "bg-red-600", "action": (row) => handleReset(row.ip_address)}]} exclude={['_id', 'created_at', 'update_at', 'route', 'report_on_value', 'thread', 'resource', 'fingerprint_key', 'captha_key', 'report_interval', 'cluster_size']} />
            )}
        </>
    )
}

export default page