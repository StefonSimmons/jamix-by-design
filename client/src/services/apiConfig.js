export const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/users/?view=Gridview&fields%5B%5D=email&fields%5B%5D=isOwner&fields%5B%5D=isAdmin`
export const config = {
  headers: {
    "Authorization": `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`
  }
}