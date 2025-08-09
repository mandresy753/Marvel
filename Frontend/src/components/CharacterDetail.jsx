import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CharacterDetail({ id, onBack, onEdit, onDelete }) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`http://localhost:3000/characters/${id}`)
      .then(res => {
        setCharacter(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Personnage non trouvé');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Voulez-vous vraiment supprimer ce personnage ?')) {
      axios.delete(`http://localhost:3000/characters/${id}`)
        .then(() => {
          onDelete();
        })
        .catch(() => {
          alert('Erreur lors de la suppression');
        });
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <p className="text-gray-500 text-lg">Chargement...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <p className="text-red-600 text-lg">{error}</p>
      <button
        onClick={onBack}
        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Retour à la liste
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white max-w-md w-full rounded-lg shadow-md p-8">
        <button
          onClick={onBack}
          className="mb-6 text-blue-600 underline hover:text-blue-800"
          aria-label="Retour à la liste des personnages"
        >
          ← Retour à la liste
        </button>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">{character.name}</h2>
        <p className="mb-2 text-gray-700"><span className="font-semibold">Nom réel :</span> {character.realName}</p>
        <p className="mb-6 text-gray-600 italic"><span className="font-semibold">Univers :</span> {character.universe}</p>
        <div className="flex space-x-4">
          <button
            onClick={() => onEdit(character)}
            className="flex-1 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-500 transition"
          >
            Modifier
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
