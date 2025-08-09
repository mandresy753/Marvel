import React, { useState } from 'react';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import CharacterForm from './components/CharacterForm';

export default function App() {
  const [view, setView] = useState('list'); // 'list', 'detail', 'add', 'edit'
  const [selectedId, setSelectedId] = useState(null);
  const [editCharacter, setEditCharacter] = useState(null);

  const handleSelectCharacter = (id) => {
    setSelectedId(id);
    setView('detail');
  };

  const handleAddCharacter = () => {
    setEditCharacter(null);
    setView('add');
  };

  const handleEditCharacter = (character) => {
    setEditCharacter(character);
    setView('edit');
  };

  const handleBackToList = () => {
    setSelectedId(null);
    setEditCharacter(null);
    setView('list');
  };

  const handleSaved = (character) => {
    setSelectedId(character.id);
    setView('detail');
  };

  const handleDelete = () => {
    setSelectedId(null);
    setView('list');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'list' && (
        <CharacterList
          onSelectCharacter={handleSelectCharacter}
          onAddCharacter={handleAddCharacter}
        />
      )}
      {view === 'detail' && selectedId !== null && (
        <CharacterDetail
          id={selectedId}
          onBack={handleBackToList}
          onEdit={handleEditCharacter}
          onDelete={handleDelete}
        />
      )}
      {(view === 'add' || view === 'edit') && (
        <CharacterForm
          character={editCharacter}
          onCancel={handleBackToList}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
