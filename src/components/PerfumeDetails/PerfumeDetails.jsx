import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import * as perfumeService from '../../services/perfumeService';
import { AuthedUserContext } from '../../App';

const PerfumeDetails = ({ handleDeletePerfume }) => {
  const { perfumeId } = useParams();
  const [perfume, setPerfume] = useState(null);
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchPerfume = async () => {
      const perfumeData = await perfumeService.show(perfumeId);
      setPerfume(perfumeData);
    };
    fetchPerfume()
  }, [perfumeId])

  if (!perfume) return <main>Loading...</main>

  return (
    <main>
      <header>
        <h1>{perfume.name}</h1>
        <p>
          Added by {perfume.author?.username || 'Unknown'} on{' '}
          {new Date(perfume.createdAt).toLocaleDateString()}
        </p>
        {perfume.author._id === user._id && (
          <>
            <Link to={`/perfumes/${perfumeId}/edit`}>🌸Edit🌸</Link>  
            <br />
            <button onClick={() => handleDeletePerfume(perfumeId)}>Delete</button>
          </>
        )}
      </header>
      <section>
        <h2>{perfume.name} Details:</h2>
        <p>Cost: ${perfume.cost}</p>
        <p>Length of Wear: {perfume.duration}</p>
        <p>Status: {perfume.wantOwnStatus}</p>
      </section>
      <section>
        <h2>Key Notes:</h2>
        {perfume.keynotes.length ? (
          <ul>
            {perfume.keynotes.map((keyNote, index) => (
              <li key={index}>
                {keyNote.note} ({keyNote.type}) - Added by {keyNote.author?.username || 'Unknown'} on{' '}
                {new Date(keyNote.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No keynotes available.</p>
        )}
      </section>
    </main>
  );
};

export default PerfumeDetails;