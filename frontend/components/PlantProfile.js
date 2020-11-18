import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserId, isCreator } from '../lib/auth'
import axios from 'axios'

const PlantProfile = (props) => {
  // Carrying formData over from addPlant
  // const profilePlant = props.location.state.formData

  // Carrying plant ID over from addPlant
  const plantId = props.match.params.plantId

  const token = localStorage.getItem('token')
  const [plantData, updatePlantData] = useState({})

  useEffect(() => {
    axios.get(`/api/plants/${plantId}`)
      .then((resp) => {
        updatePlantData(resp.data)
        console.log(resp.data)
      })
  }, [])

  function handleDelete() {
    axios.delete(`/api/plants/${plantId}`, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then(() => {
        props.history.push('/plant-search')
      })
  }
  return <main>
    <section className="cover">
      <h1>Plant Profile</h1>
    </section>

    <section className="content">
      <section className="margin">
        <h4>{plantData.scientificName}</h4>
        <h2>{plantData.commonName}</h2>
        <div className="header-title extra-space">
          {/* Making left section and right edit icon align center */}
          <div className="header-icon">
            {/* Making 'Messages' and the icon align center */}
            <img src="../images/book.svg" alt="message-icon" />
            <h6>INSERT LIBRARY SCHEMA</h6>
          </div>
          <div>
            <img src="../images/share.svg" alt="edit-icon" />
          </div>
        </div>

        <hr className="hr-less-space" />

        <div className="bio">
          <h5>SYNONYMS</h5>
          <p>We have to insert the synonyms into the plant schema.</p>
        </div>

        {plantData.outdoor === true ?
          <div className="profile-info">
            <img src="../images/deer-green.svg" alt="deer" />
            <h4>Outdoor</h4>
          </div>
          :
          <div className="profile-info">
            <img src="../images/fireplace-green.svg" alt="fireplace" />
            <h4>Indoor</h4>
          </div>
        }

        <div className="profile-info add-space">
          <img src="../images/pine-tree.svg" alt="pine-tree" />
          <h4>{plantData.plantType}</h4>
        </div>

        <div className="care-notes">
          <h4>User Notes</h4>
          <p>{plantData.careNotes}</p>
          <p>{plantData.createdAt}</p>
        </div>
        <div>
          {isCreator(plantData.user) &&
            <Link to={`/edit-plant/${plantId}`}><button className="button-green">Edit plant</button>
            </Link>}
          {isCreator(plantData.user) && <button className="button-green button-red" onClick={handleDelete}
          >Delete Plant </button>}
        </div>

      </section>
    </section>
  </main>


}

export default PlantProfile



{/* <div>
    <h1>hello plant profile</h1>
    <h1>{profilePlant.commonName}</h1>
    <h1>{profilePlant.scientificName}</h1>
    <img src={profilePlant.image}></img>
    <h1>{profilePlant.outdoor}</h1>
    <h1>{profilePlant.plantType}</h1>
    <h1>Care Notes: {profilePlant.careNotes}</h1>
    <p>Date added to profile</p>
    {isCreator(plantData.user) &&
      <Link to={`/edit-plant/${plantId}`}>Edit plant
      </Link>}
    {isCreator(plantData.user) && <button onClick={handleDelete}
    >Delete Plant </button>}
    <button>Share</button>
  </div> */}