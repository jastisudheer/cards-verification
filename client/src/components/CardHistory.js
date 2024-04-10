import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCardHistory, deleteCardById } from '../services/api'; // Assume deleteCardById is implemented in your API services

function CardHistory() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = await getCardHistory(user.token);
        setCards(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
          console.error('No user token found');
          return;
        }
        await deleteCardById(cardId, user.token);
        // Refresh cards list
        const updatedCards = await getCardHistory(user.token);
        setCards(updatedCards);
      } catch (error) {
        console.error('Failed to delete the card', error);
      }
    }
  };


  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Navigate back to the dashboard page
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center pt-8">
      <button
        onClick={handleBackToDashboard}
        className="self-start mb-4 px-4 py-2 text-sm text-blue-700 bg-orange-200 rounded hover:bg-blue-300"
      >
        Back to Dashboard
      </button>
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Card History</h2>
      <div className="w-full max-w-3xl px-4">
        <ul className="bg-white rounded-lg border border-gray-200 w-full">
          {cards.map((card, index) => (
            <li key={index} className="px-6 py-4 border-b border-gray-200 w-full rounded-t-lg flex justify-between items-center">
              <span className="text-gray-900 font-medium">{card.cardholderName}</span>
              <div className="flex items-center">
                <span className="text-indigo-600 mr-4">{`${card.cardNumber.substring(0, 4)} **** **** ${card.cardNumber.slice(-4)}`}</span>
                <button
                  onClick={() => handleDeleteCard(card._id)} // Pass the card's id to the delete function
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {cards.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">No card history available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardHistory;
