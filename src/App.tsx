import React, { useState, useMemo } from 'react';
import { Skull, Video } from 'lucide-react';
import MovieTable from './components/MovieTable';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import Footer from './components/Footer';
import { Movie } from './types';

const initialMovies: Movie[] = [
  {
    id: 1,
    title: "The Blair Witch Project",
    year: 1999,
    director: "Daniel Myrick, Eduardo Sánchez",
    description: "Tres estudiantes de cine desaparecen mientras graban un documental sobre una leyenda local, dejando atrás solo su metraje encontrado.",
    category: "Found Footage",
    image: "https://m.media-amazon.com/images/M/MV5BNzQ1NDBlNDItMDAyYS00YTI2LTgwMmYtMzAwMzg4NDFlM2ZmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    imdbLink: "https://www.imdb.com/title/tt0185937/"
  },
  {
    id: 2,
    title: "Paranormal Activity",
    year: 2007,
    director: "Oren Peli",
    description: "Una pareja instala cámaras en su casa para capturar evidencia de una presencia perturbadora.",
    category: "Found Footage",
    image: "https://m.media-amazon.com/images/M/MV5BMjY1NjcxODQ4MV5BMl5BanBnXkFtZTcwMzUxNjM4Mg@@._V1_SX300.jpg",
    imdbLink: "https://www.imdb.com/title/tt1179904/"
  },
  {
    id: 3,
    title: "REC",
    year: 2007,
    director: "Jaume Balagueró, Paco Plaza",
    description: "Una reportera y su camarógrafo quedan atrapados en un edificio infestado de zombis.",
    category: "Found Footage",
    image: "https://pics.filmaffinity.com/AaREC-273731015-large.jpg",
    imdbLink: "https://www.imdb.com/title/tt1038988/"
  },
  {
    id: 4,
    title: "Cloverfield",
    year: 2008,
    director: "Matt Reeves",
    description: "Un grupo de amigos intenta sobrevivir en Nueva York durante un ataque de una criatura gigante.",
    category: "Found Footage",
    image: "https://m.media-amazon.com/images/M/MV5BZDNhNDJlNDktZDI4OC00OTE3LWI2M2UtOThkNTFkNjBjYzRmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
    imdbLink: "https://www.imdb.com/title/tt1060277/"
  },
  {
    id: 5,
    title: "Grave Encounters",
    year: 2011,
    director: "The Vicious Brothers",
    description: "El equipo de un programa de televisión sobre fenómenos paranormales queda atrapado en un hospital psiquiátrico abandonado.",
    category: "Found Footage",
    image: "https://m.media-amazon.com/images/M/MV5BMTMzMzI4NTQwMl5BMl5BanBnXkFtZTcwMzYwMzMwNg@@._V1_.jpg",
    imdbLink: "https://www.imdb.com/title/tt1703199/"
  },
  {
    id: 6,
    title: "28 Days Later",
    year: 2002,
    director: "Danny Boyle",
    description: "Un hombre despierta del coma para encontrar un mundo devastado por un virus que convierte a las personas en zombis rabiosos.",
    category: "Zombies",
    image: "https://m.media-amazon.com/images/M/MV5BYTFkM2ViMmQtZmI5NS00MjQ2LWEyN2EtMTI1ZmNlZDU3MTZjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    imdbLink: "https://www.imdb.com/title/tt0289043/"
  },
  {
    id: 7,
    title: "Shaun of the Dead",
    year: 2004,
    director: "Edgar Wright",
    description: "Un vendedor desmotivado y su mejor amigo intentan sobrevivir a un apocalipsis zombi en Londres.",
    category: "Zombies",
    image: "https://m.media-amazon.com/images/M/MV5BMTg5Mjk2NDMtZTk0Ny00YTQ0LWIzYWEtMWI5MGQ0Mjg1OTNkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    imdbLink: "https://www.imdb.com/title/tt0365748/"
  },
  {
    id: 8,
    title: "Train to Busan",
    year: 2016,
    director: "Yeon Sang-ho",
    description: "Pasajeros en un tren de Seúl a Busan luchan por sobrevivir durante un apocalipsis zombi que se desata en Corea del Sur.",
    category: "Zombies",
    image: "https://m.media-amazon.com/images/M/MV5BMTkwOTQ4OTg0OV5BMl5BanBnXkFtZTgwMzQyOTM0OTE@._V1_SX300.jpg",
    imdbLink: "https://www.imdb.com/title/tt5700672/"
  },
  {
    id: 9,
    title: "Primer",
    year: 2004,
    director: "Shane Carruth",
    description: "Dos ingenieros inventan accidentalmente una máquina que permite viajar en el tiempo, con consecuencias inesperadas.",
    category: "Viajes en el Tiempo",
    image: "https://www.cinemascomics.com/wp-content/uploads/2017/03/explicacion-de-primer.jpg",
    imdbLink: "https://www.imdb.com/title/tt0390384/"
  },
  {
    id: 10,
    title: "Timecrimes",
    year: 2007,
    director: "Nacho Vigalondo",
    description: "Un hombre accidentalmente viaja una hora atrás en el tiempo, desencadenando una serie de eventos cada vez más complicados.",
    category: "Viajes en el Tiempo",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Cronocrimenes.jpg/220px-Cronocrimenes.jpg",
    imdbLink: "https://www.imdb.com/title/tt0480669/"
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Movie>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(initialMovies.map(movie => movie.category)));
  }, []);

  const filteredMovies = useMemo(() => {
    return initialMovies.filter(movie =>
      (movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
       movie.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === null || movie.category === selectedCategory)
    );
  }, [searchTerm, selectedCategory]);

  const sortedMovies = useMemo(() => {
    return [...filteredMovies].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredMovies, sortColumn, sortDirection]);

  const handleSort = (column: keyof Movie) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black py-6 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"}}></div>
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center mb-4 sm:mb-0">
            <Skull className="mr-2" />
            <Video className="mr-2" />
            Mis Películas de Terror Favoritas
          </h1>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        <MovieTable
          movies={sortedMovies}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;