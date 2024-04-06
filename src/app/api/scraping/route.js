import { NextResponse } from "next/server"
import puppeteer from "puppeteer"

const delay = (time) => {
    return new Promise((resolve) => { 
        setTimeout(resolve, time)
    });
 }

export const GET = async() => {
    let browser
    try {
        browser = await puppeteer.launch({
            headless:"shell",
            defaultViewport:{
                height:800,
                width:1900
            }
        })
        const page = await browser.newPage()
        await page.goto('https://ahrefs.com/youtube-keyword-tool')
        await page.locator("#root > div.css-1hct6u4-layout.css-1o7li20-layoutOverflow > section.css-1x5msv2-section.css-1uqhpv8-sectionColor.css-1yfydii.css-19msw4o > div > div > div > div.css-186bnk2.css-1rcne62-stack.css-1imox1-stackGridRows.css-1bjhv8d.css-1vznryd.css-4h77q2 > div.css-5bxd5y > div > form > div > div.css-y9lfrs.css-1rcne62-stack.css-1imox1-stackGridRows.css-1bjhv8d.css-1vznryd.css-4h77q2 > div.css-y9lfrs.css-1rcne62-stack.css-1imox1-stackGridRows.css-1bjhv8d.css-1vznryd > div > input").fill("street food")
        await page.locator("#root > div.css-1hct6u4-layout.css-1o7li20-layoutOverflow > section.css-1x5msv2-section.css-1uqhpv8-sectionColor.css-1yfydii.css-19msw4o > div > div > div > div.css-186bnk2.css-1rcne62-stack.css-1imox1-stackGridRows.css-1bjhv8d.css-1vznryd.css-4h77q2 > div.css-5bxd5y > div > form > div > div.css-1wi5h2-row.css-thegtf > button").click()
        await delay(4000)
        await page.locator("#challenge-stage > div > label > input[type=checkbox]").click()
        const shoot = await page.screenshot({type:"png"})
        await delay(2000)
        const init = {
            headers:{
                "Content-Type":"image/png"
            }
        }

        return new Response(shoot,init)
    } catch (error) {
        return NextResponse.json({"error":error})
    }finally{
        if(browser){
            await browser.close()
        }
    }
}