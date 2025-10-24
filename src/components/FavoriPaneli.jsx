import React from 'react';

const FavoriPaneli = ({ favoriler, favoridenCikar }) => {
  return (
    <div className="favori-paneli">
      <h3>Favoriler ({favoriler.length})</h3>
      <ul>
        {favoriler.map((kitap) => (
          <li key={kitap.id}>
            • {kitap.baslik} <button onClick={() => favoridenCikar(kitap.id)}>Kaldır</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriPaneli;
