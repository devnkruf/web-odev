import React, { useState, useEffect } from 'react';
import AramaCubugu from './components/AramaCubugu';
import KategoriFiltre from './components/KategoriFiltre';
import KitapListe from './components/KitapListe';
import FavoriPaneli from './components/FavoriPaneli';
import './App.css';

const kitaplarData = [
  { id: 1, baslik: "React'e Giriş", yazar: 'D. Usta', kategori: 'Web', favorideMi: false },
  { id: 2, baslik: 'İleri JavaScript', yazar: 'S. Kılıç', kategori: 'Web', favorideMi: false },
  { id: 3, baslik: 'Veri Yapıları', yazar: 'A. Demir', kategori: 'CS', favorideMi: false },
  { id: 4, baslik: 'Algoritmalar', yazar: 'E. Kaya', kategori: 'CS', favorideMi: false },
  { id: 5, baslik: 'UI/UX Temelleri', yazar: 'N. Akın', kategori: 'Tasarım', favorideMi: false },
];

const App = () => {
  const [aramaMetni, setAramaMetni] = useState(localStorage.getItem('aramaMetni') || '');
  const [kategori, setKategori] = useState('Tümü');
  
  // Favorileri localStorage'dan al
  const kayitliFavoriler = JSON.parse(localStorage.getItem('favoriler')) || [];
  const [favoriler, setFavoriler] = useState(kayitliFavoriler);

  // Kitapları favorilere göre güncelle
  const [kitaplar, setKitaplar] = useState(() => 
    kitaplarData.map(k => ({
      ...k,
      favorideMi: kayitliFavoriler.some(f => f.id === k.id)
    }))
  );

  // Arama metnini localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('aramaMetni', aramaMetni);
  }, [aramaMetni]);

  // Favorileri localStorage'a kaydet ve kitapları güncelle
  useEffect(() => {
    localStorage.setItem('favoriler', JSON.stringify(favoriler));
    setKitaplar(kitaplar.map(k => ({
      ...k,
      favorideMi: favoriler.some(f => f.id === k.id)
    })));
  }, [favoriler]);

  const favoriToggle = (id) => {
    const kitap = kitaplar.find((k) => k.id === id);
    if (favoriler.some(f => f.id === id)) {
      setFavoriler(favoriler.filter((f) => f.id !== id));
    } else {
      setFavoriler([...favoriler, kitap]);
    }
  };

  const favoridenCikar = (id) => {
    setFavoriler(favoriler.filter((f) => f.id !== id));
  };

  const kategoriler = [...new Set(kitaplarData.map((k) => k.kategori))];

  const filtrelenmisKitaplar = kitaplar.filter((kitap) => {
    const arananMetin = aramaMetni.toLowerCase();
    const kitapAdi = kitap.baslik.toLowerCase();
    const yazarAdi = kitap.yazar.toLowerCase();
    
    const aramayaUyuyor = kitapAdi.includes(arananMetin) || yazarAdi.includes(arananMetin);
    const kategoriyeUyuyor = kategori === 'Tümü' || kitap.kategori === kategori;
    
    return aramayaUyuyor && kategoriyeUyuyor;
  });

  return (
    <div className="App">
      <h1>Mini Kitaplık</h1>
      <div className="filtreler">
        <AramaCubugu aramaMetni={aramaMetni} setAramaMetni={setAramaMetni} />
        <KategoriFiltre kategori={kategori} setKategori={setKategori} kategoriler={kategoriler} />
      </div>
      <div className="icerik">
        <KitapListe kitaplar={filtrelenmisKitaplar} favoriToggle={favoriToggle} />
        <FavoriPaneli favoriler={favoriler} favoridenCikar={favoridenCikar} />
      </div>
    </div>
  );
};

export default App;
