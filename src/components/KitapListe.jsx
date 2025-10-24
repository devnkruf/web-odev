import React from 'react';
import KitapKarti from './KitapKarti';

const KitapListe = ({ kitaplar, favoriToggle }) => {
  return (
    <div className="kitap-liste">
      {kitaplar.map((kitap) => (
        <KitapKarti key={kitap.id} kitap={kitap} favoriToggle={favoriToggle} />
      ))}
    </div>
  );
};

export default KitapListe;
