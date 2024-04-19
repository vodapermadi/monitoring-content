"use client"
import axios from "axios"

axios.create({
    headers: {
        'Access-Control-Request-Headers': '*',
    }
})

const db = "Tiktok"

export const wordRandom = [
    "Delicious",
    "Tempting",
    "Savory",
    "Fresh",
    "Appetizing",
    "Mouthwatering",
    "Flavorful",
    "Diverse",
    "Aromatic",
    "Satisfying"
]

export const splitArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }

    return result
}

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const getData = async (collection,filter=undefined) => {
    let value = {
        collection: collection,
        database:db,
        dataSource: "Cluster0",
        sort:{"created_at":-1}
    }

    if(filter !== undefined){
        value = {
            ...value,
            filter:filter
        }
    }

    const { data } = await axios.put("/api", JSON.stringify(value))
    return data
}

export const postData = async(collection,value) => {
    let val = {
        ...value,
        update_at:{$timestamp:{
            "t":Number(Math.floor(Date.now() / 1000)),
            "i":1
        }},
        created_at: {$timestamp:{
            "t": Number(Math.floor(Date.now() / 1000)),
            "i": 1
        }}
    }
    let body = {
        collection: collection,
        database:db,
        dataSource: "Cluster0",
    }

    body = {
        ...body,
        document:val
    }

    const { data } = await axios.post("/api", JSON.stringify(body))
    return data
}

export const postMany = async (collection, value) => {
    let body = {
        collection: collection,
        database: db,
        dataSource: "Cluster0",
    }

    body = {
        ...body,
        documents: value
    }

    const { data } = await axios.post("/api/manyReq", JSON.stringify(body))
    return data
}

export const updateData = async(collection,filter,value) => {
    let val = {
        ...value,
        created_at:{
            $timestamp:{
                "t":value.created_at.T,
                "i":value.created_at.I
            }
        },
        update_at: {
            $timestamp: {
                "t": Number(Math.floor(Date.now() / 1000)),
                "i": 1
            }
        }
    }

    let body = {
        collection: collection,
        database:db,
        dataSource: "Cluster0",
        filter:filter,
    }

    body = {
        ...body,
        update: val
    }
    const { data } = await axios.patch("/api", JSON.stringify(body))
    return data
}

export const deleteData = async(collection,filter) => {
    let body = {
        collection: collection,
        database:db,
        dataSource: "Cluster0",
        filter:filter,
    }

    const { data } = await axios.patch("/api/manyReq", JSON.stringify(body))
    return data
}