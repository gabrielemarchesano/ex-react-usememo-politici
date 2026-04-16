import { useEffect, useMemo, useState } from "react";

function App() {

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
          <div className="card" key={politician.id}>
            <div className="card-image">
              <img src={politician.image} alt={politician.name} style={{width: 300, borderRadius: 3}}/>
            </div>
            <div className="card-body">
              <h3>{politician.name}</h3>
              <p><strong>{politician.position}</strong></p>
              <p>{politician.biography}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default App
