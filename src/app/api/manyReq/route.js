import { NextResponse } from 'next/server'
import axios from "axios"
import { headers } from "next/headers"

const header = new Headers(headers)
header.set('Access-Control-Request-Headers', '*')

export const POST = async (req) => {
    const body = await req.json()
    try {
        const { data } = await axios.post(`${process.env.BASE_URL}/insertMany`, body, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.API_DB
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export const PATCH = async (req) => {
    const body = await req.json()
    
    try {
        const { data } = await axios.post(`${process.env.BASE_URL}/deleteMany`, body, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.API_DB
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}