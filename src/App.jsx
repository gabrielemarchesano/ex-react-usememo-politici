import React, { useEffect, useMemo, useState } from "react";

const PoliticianCard = React.memo(({ image, name, position, biography }) => {
  console.log("Render")
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={name} style={{ width: 300, borderRadius: 3 }} />
      </div>
      <div className="card-body">
        <h3>{name}</h3>
        <p><strong>{position}</strong></p>
        <p>{biography}</p>
      </div>
    </div>
  )
})

function App(){

  const [ politicians, setPoliticians ] = useState([]);
  const [ search, setSearch ] = useState("");

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error))
  }, [])

  const filteredPolitician = useMemo(() => {
    return politicians.filter(politician => politician.name.toLowerCase().includes(search.toLowerCase()) || politician.biography.toLowerCase().includes(search.toLowerCase()));
  }, [politicians, search])

  return (
    <>
      <input 
        type="text"
        onChange={event => setSearch(event.target.value)}
        value={search}
        placeholder="Cerca..."
      />
      {
        filteredPolitician.map(politician => (
          <PoliticianCard key={politician.id} {...politician} />
        ))
      }
    </>
  )
}

export default App
