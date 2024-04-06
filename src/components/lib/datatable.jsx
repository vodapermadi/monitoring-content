"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Datatable = ({ data, exclude, routeLink, action = null }) => {
    const router = useRouter()
    const url = window.location.pathname

    // header
    const checkHeader = Object.keys(data[0])
    const header = checkHeader.filter((row) => !exclude.includes(row))

    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [item, setItem] = useState(5)
    const startPage = (currentPage - 1) * item
    const endPage = (startPage + item)
    const paginateData = data?.slice(startPage, endPage)
    const pageCount = Math.ceil(data?.length / item)

    return (
        <>
            {paginateData.length > item && (
                <div className='px-4 py-2 flex justify-between items-center border rounded shadow-md'>
                    <div className='flex gap-2 items-center'>
                        {currentPage !== 1 ? (
                            <button className='rounded-full shadow-lg bg-white p-2 disabled:bg-gray-300' onClick={() => setCurrentPage(currentPage - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeWidth={3} d="M22 12H2m9-9l-9 9l9 9"></path>
                                </svg>
                            </button>
                        ) : (
                            <button className='rounded-full shadow-lg bg-white p-2 disabled:bg-gray-300' disabled onClick={() => setCurrentPage(currentPage - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeWidth={3} d="M22 12H2m9-9l-9 9l9 9"></path>
                                </svg>
                            </button>
                        )}
                        <span className='font-semibold text-sm'>
                            page {currentPage} of {pageCount}
                        </span>
                        {currentPage === pageCount ? (
                            <button className='rounded-full shadow-lg bg-white p-2 disabled:bg-gray-300' disabled onClick={() => setCurrentPage(currentPage + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeWidth={3} d="M2 12h20m-9-9l9 9l-9 9"></path>
                                </svg>
                            </button>
                        ) : (
                            <button className='rounded-full shadow-lg bg-white p-2' onClick={() => setCurrentPage(currentPage + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeWidth={3} d="M2 12h20m-9-9l9 9l-9 9"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className=''>
                        <button className='text-sm font-semibold bg-gray-50 hover:scale-110 duration-200 border p-2.5 w-10 h-10 rounded-full shadow-xl' onClick={() => setItem(Number(item) !== 20 ? Number(item) + 5 : 5)}>{item}</button>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto shadow-md bg-gray-400 my-2 rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                        <tr>
                            {header.map((row, i) => {
                                return (
                                    <th key={i} scope="col" className="px-6 py-3 text-start">
                                        {row}
                                    </th>
                                )
                            })}
                            {action !== null && (
                                <th className='px-6 py-3 text-start'>
                                    action
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginateData.map((row, i) => {
                            let bgColorClass
                            if (row.status == true) {
                                bgColorClass = "bg-green-100 hover:bg-green-200";
                            } else if (row.status === "null" || row.status === "") {
                                bgColorClass = "bg-yellow-100 hover:bg-yellow-200";
                            } else if (row.status === false) {
                                bgColorClass = "bg-red-100 hover:bg-red-200";
                            }
                            return (
                                <tr key={i} className={`border-b cursor-pointer duration-150 ${bgColorClass}`} onClick={() => routeLink !== undefined && routeLink !== null ? router.push(`${url}/${row[routeLink]}`) : null}>
                                    {header.map((head, index) => {
                                        return (
                                            <td key={index} className="px-6 py-4 whitespace-nowrap">
                                                {row[head] !== "" && row[head] !== undefined && row[head] !== null ? row[head].toString() : "null"}
                                            </td>
                                        )
                                    })}
                                    {action !== null && (
                                        <td className="px-6 py-4">
                                            {action.map((act, jindex) => {
                                                return (
                                                    <button key={jindex} onClick={() => act.action(row)} className={`py-2 px-3 ${act.color} text-sm font-semibold text-white rounded`}>{act.title}</button>
                                                )
                                            })}
                                        </td>
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {data.length > item && (
                <div className='px-4 py-2 flex justify-between items-center border rounded shadow-md'>
                    <div className='flex gap-2 items-center'>
                        {currentPage !== 1 ? (
                            <button className='rounded-full shadow-lg bg-white p-2 disabled:bg-gray-300' onClick={() => setCurrentPage(currentPage - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeWidth={3} d="M22 12H2m9-9l-9 9l9 9"></path>
                                </svg>
                            </button>
                        ) : (
                            <button className='rounded-full shadow-lg bg-white p-2 disabled:bg-gray-300' disabled onClick={() => setCurrentPage(currentPage - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeWidth={3} d="M22 12H2m9-9l-9 9l9 9"></path>
                                </svg>
                            </button>
                        )}
                        <span className='font-semibold text-sm'>
                            page {currentPage} of {pageCount}
                        </span>
                        {currentPage === pageCount ? (
                            <button className='rounded-full shadow-lg bg-white p-2 disabled:bg-gray-300' disabled onClick={() => setCurrentPage(currentPage + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeWidth={3} d="M2 12h20m-9-9l9 9l-9 9"></path>
                                </svg>
                            </button>
                        ) : (
                            <button className='rounded-full shadow-lg bg-white p-2' onClick={() => setCurrentPage(currentPage + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeWidth={3} d="M2 12h20m-9-9l9 9l-9 9"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className=''>
                        <button className='text-sm font-semibold bg-gray-50 hover:scale-110 duration-200 border p-2.5 w-10 h-10 rounded-full shadow-xl' onClick={() => setItem(Number(item) !== 20 ? Number(item) + 5 : 5)}>{item}</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Datatable
