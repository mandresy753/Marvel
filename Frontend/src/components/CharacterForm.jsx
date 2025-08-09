import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CharacterForm({ character, onCancel, onSaved }) {
  const [formData, setFormData] = useState({
    name: '',
    realName: '',
    universe: ''
  });

  useEffect(() => {
    if (character) {
      setFormData({
        name: character.name,
        realName: character.realName,
        universe: character.universe
      });
    }
  }, [character]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (character) {
      // update
      axios.put(`http://localhost:3000/characters/${character.id}`, formData)
        .then(res => onSaved(res.data))
        .catch(err => alert('Erreur lors de la mise à jour'));
    } else {
      // create
      axios.post('http://localhost:3000/characters', formData)
        .then(res => onSaved(res.data))
        .catch(err => alert('Erreur lors de la création'));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{character ? 'Modifier le personnage' : 'Ajouter un personnage'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="name">Nom du personnage</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="realName">Nom réel</label>
          <input
            id="realName"
            name="realName"
            value={formData.realName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="universe">Univers</label>
          <input
            id="universe"
            name="universe"
            value={formData.universe}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            {character ? 'Enregistrer' : 'Ajouter'}
          </button>
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
