import React from 'react';
import { Movie } from '../types';
import { ArrowUpDown } from 'lucide-react';

interface MovieTableProps {
  movies: Movie[];
  sortColumn: keyof Movie;
  sortDirection: 'asc' | 'desc';
  onSort: (column: keyof Movie) => void;
}

const MovieTable: React.FC<MovieTableProps> = ({ movies, sortColumn, sortDirection, onSort }) => {
  const renderSortIcon = (column: keyof Movie) => {
    if (sortColumn === column) {
      return <ArrowUpDown className={`inline ml-1 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />;
    }
    return null;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 text-left cursor-pointer" onClick={() => onSort('title')}>
              Título {renderSortIcon('title')}
            </th>
            <th className="p-2 text-left cursor-pointer hidden sm:table-cell" onClick={() => onSort('year')}>
              Año {renderSortIcon('year')}
            </th>
            <th className="p-2 text-left cursor-pointer hidden md:table-cell" onClick={() => onSort('director')}>
              Director {renderSortIcon('director')}
            </th>
            <th className="p-2 text-left cursor-pointer" onClick={() => onSort('category')}>
              Categoría {renderSortIcon('category')}
            </th>
            <th className="p-2 text-left hidden lg:table-cell">Descripción</th>
            <th className="p-2 text-left">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-2">
                <a href={movie.imdbLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  {movie.title}
                </a>
              </td>
              <td className="p-2 hidden sm:table-cell">{movie.year}</td>
              <td className="p-2 hidden md:table-cell">{movie.director}</td>
              <td className="p-2">{movie.category}</td>
              <td className="p-2 hidden lg:table-cell">{movie.description}</td>
              <td className="p-2">
                <div className="relative overflow-hidden group">
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="w-16 h-24 sm:w-24 sm:h-36 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs sm:text-sm font-bold text-center px-1">{movie.title}</span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;