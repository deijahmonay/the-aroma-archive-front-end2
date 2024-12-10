import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import * as perfumeService from '../../services/perfumeService'

const PerfumeDetails = (props) => {
  const {perfumeId} = useParams()
  const [perfume, setPerfume] = useState(null)

  useEffect(() => {
    const fetchPerfume = async () => {
      const perfumeData = await perfumeService.show(perfumeId)
      setPerfume(perfumeData);
      console.log("perfume details useEffect() perfume is: ", perfumeData);
    }
    fetchPerfume()
  }, [perfumeId])

  if(!perfume) return <main>Loading...</main>

  return (
    <main>
      <header>
        <h1>{perfume.name}</h1>
        <p>
          Added by {perfume.author?.username || 'Unknown'} on{' '}
          {new Date(perfume.createdAt).toLocaleDateString()}
        </p>
      </header>
      <section>
      <h2>{perfume.name} Details:</h2>
      <p>Cost: ${perfume.cost}</p>
      <p>Length of Wear: {perfume.duration}</p>
      </section>
      <section>
        <h2>Key Notes:</h2>
        {perfume.keynotes.length ? (
          <ul>
            {perfume.keyNotes.map((keyNote, index) => (
          <li key={index}>
           {keyNote.note} ({keyNote.type}) - Added by {keyNote.author?.username || 'Unknown'} on {new Date(keyNote.createdAt).toLocaleDateString()}
           </li>
          ))}
          </ul>
        ) : (
          <p>No keynotes available.</p>
        )}
      </section>
    </main>
  )  
}

export default PerfumeDetails