import { atAPI, config } from "../services/apiConfig";
import { useState,  useEffect } from "react";
// import homeFloral from "../assets/home-floral.jpg"
import BigButton from "../components/BigButton";

export default function Home({restricted, user}) {

  const [homeData, setHomeData] = useState({
    fields: {
      home_img: [
        {
          id: ""
        }
      ],
      header_1: "",
      header_2: "",
      sub_header: ""
    }
  })
  const [airtableData, setAirtableData] = useState([])
  const [refresh, setRefresh] = useState(false)

  const [edit, setEdit] = useState(false)


  const getAirtableHome = async () => {
    const {data} = await atAPI.get('/home/?sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=asc', config)
    const firstRecord = data.records[0]
    setHomeData({
      fields: {
        home_img: [
          {
            id: firstRecord.fields.home_img[0].id
          }
        ],
        header_1: firstRecord.fields.header_1,
        header_2: firstRecord.fields.header_2,
        sub_header: firstRecord.fields.sub_header
      }
    })
    setAirtableData(data.records)
  }

  const deleteRecord = async (recordID) => {
    const {status} = await atAPI.delete(`/home/${recordID}`, config)
    if(status === 200){
      setRefresh(prev => !prev)
    }
  }

  useEffect(() => {
    getAirtableHome()
  }, [refresh])
  
  useEffect(() => {
    if((airtableData.length > 1) && airtableData[1].fields.home_img){
      deleteRecord(airtableData[0].id)
    }else if ((airtableData.length > 1) && !airtableData[1].fields.home_img){
      deleteRecord(airtableData[1].id)
    }
  }, [airtableData])

  const handleChange = (e) => {
    const {name, value} = e.target
    setHomeData(prev => ({
      fields: {
        ...prev.fields,
        [name]: value
      }
    }))
  }


  const handleSubmit = async () => {
    // I'm always going to update the first record.
    const {status} = await atAPI.patch(`/home/${airtableData[0].id}`, homeData ,config)
    if(status === 200){
      setRefresh(prev => !prev)
      setEdit(false)
    }
  }

  if(!user?.isAdmin && !user?.isOwner && restricted){
    return (
      <div className='no-access'>
          <h1>Sorry. You do not have access to this page.</h1>
      </div>
    )
  }

  return (
    <div className={`home-screen ${restricted && "restricted-screen"}`}>
      {restricted && <p className="admin-info">To update the headers below, click the "Edit" button. Once you are happy with the text, click "Submit" to save the changes for public viewing.</p>}
      <section>
        { (restricted && edit) ? 
          <>
            <input className="header-home-input" type="text" name="header_1" onChange={(e) => handleChange(e)} value={homeData?.fields?.header_1}/>
            <input className="header-home-input" type="text" name="header_2" onChange={(e) => handleChange(e)} value={homeData?.fields?.header_2}/>
          </>
          :
          <>
            <h1>{airtableData[0]?.fields.header_1}</h1>
            <h1 className="shifted-header-home">{airtableData[0]?.fields?.header_2}</h1>
          </>
        }
      </section>
      {!edit && <BigButton text="Browse our Services" screen="services"/>}
      { (restricted && edit) ?
        <input className="subheader-home-input" type="text" name="sub_header" onChange={(e) => handleChange(e)} value={homeData?.fields?.sub_header} />
        :
        <p className="subheader-home">{airtableData[0]?.fields.sub_header}</p>
      }
      {restricted && <button className={`edit-cancel-btn ${edit ? 'cancel': 'edit'}`} onClick={() => setEdit(prev => !prev)}>{edit ? "Cancel" : "Edit"}</button>}
      {(edit && restricted) && <button className="save-btn" onClick={handleSubmit}>Save</button>}
      <div>
        <img src={airtableData[0]?.fields?.home_img[0].url} alt="floral center piece"/>
      </div>
      { restricted &&
        <>
          {restricted && <p className="admin-info">To update the image above, use the form below to upload a new image to the database. *WARNING* The new image will be live at this point. Refresh the page to see the new image.</p>}
          <div className="get-pic-container">
            <button className="big-secure-btn" onClick={() => setRefresh(prev => !prev)}>Refresh Page</button>
          </div>
          <iframe className="airtable-embed" src="https://airtable.com/embed/shrqgKj7juCAXE8kO" frameBorder="0" width="100%" height="500px" style={{background: "transparent", border: "1px solid #ccc"}} title="airtable"></iframe>
        </>
      }
    </div>
  )
}
