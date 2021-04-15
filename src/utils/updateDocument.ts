import * as superagent from "superagent"

const localHost = 'http://localhost:3000'

export const updateDocument = async (name: string) => {
    const savedLatestVersion = await superagent.get("http://localhost:3000/version/chrome")
    console.log(savedLatestVersion.body)
}
