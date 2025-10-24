import React from 'react';

const KitapKarti = ({ kitap, favoriToggle }) => {
  const { id, baslik, yazar, kategori, favorideMi } = kitap;

  return (
    <div className="kitap-karti">
      <div>
        <h3>{baslik}</h3>
        <p>{yazar} · {kategori}</p>
      </div>
      <button className={favorideMi ? 'favoride' : ''} onClick={() => favoriToggle(id)}>
        {favorideMi ? '★ Favoride' : '☆ Favori Ekle'}
      </button>
    </div>
  );
};

export default KitapKarti;
