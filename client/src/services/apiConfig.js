import axios from "axios"

export const atAPI = axios.create({
  baseURL: `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}`
})
export const api = axios.create({
  baseURL: "http://localhost:3001"
})
export const config = {
  headers: {
    "Authorization": `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`
  }
}