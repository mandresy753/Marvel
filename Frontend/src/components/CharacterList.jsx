import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CharacterList({ onSelectCharacter, onAddCharacter }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/characters')
      .then(res => {
        setCharacters(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-lg">Chargement des personnages...</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Liste des personnages</h1>
        <button
          onClick={onAddCharacter}
          className="w-full mb-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          aria-label="Ajouter un personnage"
        >
          + Ajouter un personnage
        </button>
        <ul className="space-y-4 max-h-[400px] overflow-auto">
          {characters.map(char => (
            <li
              key={char.id}
              onClick={() => onSelectCharacter(char.id)}
              className="cursor-pointer p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg hover:bg-blue-50 transition"
              tabIndex={0}
              onKeyPress={e => {
                if (e.key === 'Enter') onSelectCharacter(char.id);
              }}
              aria-label={`Voir détails de ${char.name}`}
            >
              <h2 className="text-xl font-semibold text-gray-900">{char.name}</h2>
              <p className="text-gray-600">{char.realName}</p>
              <p className="text-sm text-gray-500 italic">Univers: {char.universe}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
