import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as perfumeService from '../../services/perfumeService';

const PerfumeForm = ({ handleAddPerfume, handleUpdatePerfume }) => {
  const { perfumeId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    cost: 20,
    duration: '1-3 hours',
    wantOwnStatus: 'Want',
    keynotes: [],
  });

  const [keynote, setKeynote] = useState({
    note: 'Vanilla',
    type: 'Top Note',
  });

  useEffect(() => {
    const fetchPerfume = async () => {
      if (perfumeId) {
        const perfumeData = await perfumeService.show(perfumeId);
        setFormData(perfumeData)
      }
    };
    fetchPerfume()
  }, [perfumeId])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  };

  const handleKeynoteChange = (evt) => {
    setKeynote({ ...keynote, [evt.target.name]: evt.target.value })
  };

  const addKeynote = () => {
    setFormData({
      ...formData,
      keynotes: [...formData.keynotes, keynote],
    });
    setKeynote({
      note: 'Vanilla',
      type: 'Top Note',
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (perfumeId) {
      handleUpdatePerfume(perfumeId, formData);
    } else {
      handleAddPerfume(formData);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{perfumeId ? 'Edit Perfume' : 'New Perfume'}</h1>
        <label htmlFor="name-input">Perfume Name</label>
        <input
          required
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="brand-input">Brand</label>
        <input
          required
          type="text"
          name="brand"
          id="brand-input"
          value={formData.brand}
          onChange={handleChange}
        />
        <label htmlFor="cost-input">Cost (USD)</label>
        <input
          required
          type="number"
          name="cost"
          id="cost-input"
          min="20"
          value={formData.cost}
          onChange={handleChange}
        />
        <label htmlFor="duration-input">Duration of Wear:</label>
        <select
          required
          name="duration"
          id="duration-input"
          value={formData.duration}
          onChange={handleChange}
        >
          <option value="1-3 hours">1-3 hours</option>
          <option value="4-6 hours">4-6 hours</option>
          <option value="7-10 hours">7-10 hours</option>
          <option value="12+ hours">12+ hours</option>
        </select>
        <label htmlFor="wantOwnStatus-input">Want/Own Status</label>
        <select
          required
          name="wantOwnStatus"
          id="wantOwnStatus-input"
          value={formData.wantOwnStatus}
          onChange={handleChange}
        >
          <option value="Want">Want</option>
          <option value="Own">Own</option>
        </select>
        <hr />
        <h3>Add Keynote</h3>
        <label htmlFor="note-input">Note</label>
        <select
          required
          name="note"
          id="note-input"
          value={keynote.note}
          onChange={handleKeynoteChange}
        >
          {[
            'Vanilla', 'Citrus', 'Lavender', 'Amber', 'Sandalwood', 'Rose', 'Patchouli',
            'Jasmine', 'Musk', 'Bergamot', 'Orange', 'Cedarwood', 'Peach', 'Coconut',
            'Chocolate', 'Pineapple', 'Mint', 'Tobacco', 'Leather', 'Honey', 'Fruity',
            'Apple', 'Cherry', 'Fig', 'Oud'
          ].map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>
        <label htmlFor="type-input">Type</label>
        <select
          required
          name="type"
          id="type-input"
          value={keynote.type}
          onChange={handleKeynoteChange}
        >
          <option value="Top Note">Top Note</option>
          <option value="Middle Note">Middle Note</option>
          <option value="Base Note">Base Note</option>
        </select>
        <button type="button" onClick={addKeynote}>
          Add Keynote
        </button>
        <ul>
          {formData.keynotes.map((keynote, index) => (
            <li key={index}>
              {keynote.type}: {keynote.note}
            </li>
          ))}
        </ul>
        <hr />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default PerfumeForm;
