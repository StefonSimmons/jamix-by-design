import { atAPI , config} from "../services/apiConfig"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'


export default function Packages({restricted, user}) {
    const [refresh, setRefresh] = useState()
    const [isOpen, setToggle] = useState({})

    const [packageData, setPackageData] = useState([])
    const [airtablePackages, setAirtablePackages] = useState([])

    useEffect(() => {
        const getAirtablePackages = async () => {
            const {data} = await atAPI.get("/packages/?view=Gridview", config)

            const eventsObj = data.records.reduce((acc, curr) => {
                acc[curr.fields.name] = false
                return acc
            }, {})
            setToggle(eventsObj)
            setAirtablePackages(data.records)
            setPackageData(data.records.map(p => {
                const {id, ...rest} = p.fields
                return ({
                    id: p.id,
                    fields: {...rest}
                })
            }))
          }
          getAirtablePackages()
    }, [refresh])

    const togglePackageCard = (service) => {
        setToggle(prev => ({
            ...prev,
            [service]: !prev[service]
        }))
    }


    // EDITTING STUFF
    const navigate = useNavigate()
    const [editID, activateEditID] = useState(null)
    const [previewIDs, activatePreviewIDs] = useState([])

    const handleEditID = (e) => {
        e.stopPropagation()
        activateEditID(e.target.id)
    }

    const handlePreview = (e) => {
        e.preventDefault()
        setAirtablePackages(packageData)
        activatePreviewIDs(prev => ([...prev, parseInt(editID)]))
        activateEditID(null)
    }

    const handleUpdate = (e) => {
        const {name, value, dataset:{packageId}} = e.target
        setPackageData(prev => {
            return prev.map(p => {
                if(packageId === p.id){
                    return {
                        id: p.id,
                        fields: {
                            ...p.fields,
                            [name]: value,
                        }
                    }
                }else{
                    return p
                }
            })
        })
    }

    const handleSubmit= async() => {
        const {data} = await atAPI.put("/packages/?view=Gridview", {records: packageData},config)
        if(data.records.length){
            activateEditID(null)
            activatePreviewIDs([])
            setRefresh(prev => !prev)
        }
    }

    if(restricted && !user){
        navigate('/')
    } 

    return (
        <>
            {restricted ?
            <>
                <ul className="packages">
                {airtablePackages.map((service, idx) => {
                    const onePackage = packageData.find((_,jdx) => jdx === parseInt(editID))
                    return (
                    <div key={idx}>
                        { parseInt(editID) === idx ?
                        <form onSubmit={handlePreview} className="package-card">
                            <input type="text" placeholder="Package Name" data-package-id={onePackage.id} name="name" value={onePackage.fields.name} onChange={(e) => handleUpdate(e)}/>
                            <input type="text" placeholder="Short Description" data-package-id={onePackage.id} name="sub_name" value={onePackage.fields.sub_name} onChange={(e) => handleUpdate(e)}/>
                            <input type="text" placeholder="Price" data-package-id={onePackage.id} name="price" value={onePackage.fields.price} onChange={(e) => handleUpdate(e)}/>
                            <textarea type="text" placeholder="Full Description" data-package-id={onePackage.id} name="description" value={onePackage.fields.description} rows="8" onChange={(e) => handleUpdate(e)}/>
                            <button onClick={() => activateEditID(null)}>Cancel</button>
                            <input type="submit" value="Preview" />
                        </form>
                        :
                        <li key={idx} className={`package-card ${isOpen[service.fields.name] ? 'open' : 'close'} ${previewIDs.includes(idx) ? 'preview': ''}`} onClick={() => togglePackageCard(service.fields.name)} >
                            <div className="package-header">
                                <h3>{service.fields.name}</h3>
                                <p>{service.fields.sub_name}</p>
                                <div className={`arrow ${isOpen[service.fields.name] ? 'open' : 'close'}`}></div>
                            </div>
                            <div className={`package-description-container ${isOpen[service.fields.name] ? 'open' : 'close'}`}>
                                <p className="package-description">{service.fields.description}</p>
                                <p className="package-price">starting @ {service.fields.price}</p>
                                <button onClick={(e) => handleEditID(e)} id={idx}>Edit</button>
                                <button>Delete</button>
                            </div>
                        </li>
                        }
                    </div>
                )})}
                </ul>
                <button className="packages-live-btn" onClick={handleSubmit}>Go Live</button>
                <iframe className="airtable-embed" src="https://airtable.com/embed/shr9jRgZMKBIHOsyl" frameBorder="0" width="100%" height="700px" style={{background: "transparent", border: "1px solid #ccc"}} title="airtable"></iframe>
            </>
                :
                <ul className="packages">
                {airtablePackages.map((service, idx) => {
                    return service.fields.isLive && (
                    <li key={idx} className={`package-card ${isOpen[service.fields.name] ? 'open' : 'close'}`} onClick={() => togglePackageCard(service.fields.name)} >
                        <div className="package-header">
                            <h3>{service.fields.name}</h3>
                            <p>{service.fields.sub_name}</p>
                            <div className={`arrow ${isOpen[service.fields.name] ? 'open' : 'close'}`}></div>
                        </div>
                        <div className={`package-description-container ${isOpen[service.fields.name] ? 'open' : 'close'}`}>
                            <p className="package-description">{service.fields.description}</p>
                            <p className="package-price">starting @ {service.fields.price}</p>
                        </div>
                    </li>
                    )
                })}
            </ul>
            }
        </>
    )
}
