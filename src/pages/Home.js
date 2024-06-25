import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faChessKing, faPuzzlePiece, faDice } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const HomePage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcmFkbWlucGFyZWV0bWFya2V0QCM3NSIsImV4cGlyZXNJbiI6IjFkIiwiaWF0IjoxNzE5MTk3NDIwLCJleHAiOjE3MjE3ODk0MjB9.vcbaMLj7_-R4hplFJ0Ha2uMfrcAA8c-AIAsXdgkXWvg';
  
        const response = await axios.get('https://api.klubbl.in/panaboard/boards', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        const allGames = response.data.data;
        const excludedIds = [
          215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230,
          231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 244, 245, 246, 247,
          248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263,
          264, 265, 266, 267, 268, 269, 270, 271
        ];
  
        const filteredGames = allGames.filter(game => !excludedIds.includes(game.id));
        setGames(filteredGames);
      } catch (error) {
        console.error('Error fetching games:', error);
        // Optionally, set error state to provide feedback to the user
      }
    };
  
    fetchData();
  }, []);
  

  const getIcon = (gameName) => {
    switch (gameName.toLowerCase()) {
      case 'rummy':
        return <FontAwesomeIcon icon={faChessKing} className="text-5xl text-indigo-500 mb-4" />;
      case 'puzzle':
        return <FontAwesomeIcon icon={faPuzzlePiece} className="text-5xl text-green-500 mb-4" />;
      default:
        return <FontAwesomeIcon icon={faDice} className="text-5xl text-blue-500 mb-4" />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 text-white">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center rounded-lg shadow-lg">
          <div className="text-3xl font-bold">GameZone</div>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            <Link to="/about" className="hover:text-gray-200">About</Link>
            <Link to="/contact" className="hover:text-gray-200">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-center py-20 mb-8 rounded-lg shadow-lg relative">
          <h1 className="text-6xl font-extrabold mb-4 animate-pulse">Explore Our Games</h1>
          <p className="text-xl">Join and play the most exciting games online!</p>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-50 rounded-lg"></div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map(game => (
            <div key={game.id} className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 duration-300">
              <div className="p-6">
                <div className="mb-4">
                  {getIcon(game.name)}
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-text">{game.name}</h2>
                <p className="text-lg mb-2">{game.id}. {game.name}</p>
                <div className="text-gray-300">
                  <p><strong>Open Bids:</strong> {game.openBids}</p>
                  <p><strong>Close Bids:</strong> {game.closeBids}</p>
                  <p><strong>Open Results:</strong> {game.openResults}</p>
                  <p><strong>Close Results:</strong> {game.closeResults}</p>
                </div>
              </div>
              <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
                <Link to="/next-page" className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:translate-y-1 hover:scale-110">
                  <FontAwesomeIcon icon={faPlayCircle} className="mr-2 text-xl" />
                  Play Now
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-110 transition duration-300 ease-in-out">
                  Join Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-4 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white text-center rounded-lg shadow-lg">
        <p>&copy; 2024 GameZone. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link to="#" className="hover:text-gray-400">Facebook</Link>
          <Link to="#" className="hover:text-gray-400">Twitter</Link>
          <Link to="#" className="hover:text-gray-400">Instagram</Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
