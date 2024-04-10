import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminCards } from '../services/api';
import moment from 'moment';
import "../App.css";

function AdminPage() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = await getAdminCards(user.token);
        setCards(data);
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-6">
          <h2 className="text-2xl font-extrabold text-blue-900">All User Cards</h2>
          <button onClick={handleLogout} className="text-blue-800 hover:text-blue-600">
            Logout
          </button>
        </header>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {cards.map((card, index) => (
              <li key={index} className="px-6 py-4 hover:bg-blue-100 cursor-pointer">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <div className="text-sm font-medium text-blue-600">{card.cardholderName}</div>
                    <div className="text-sm text-gray-500">Created by: {card.user.username}</div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span
                      className="card-number-display"
                      onClick={() => openModal(card)}
                    >
                      {card.cardNumber.substring(0, 4)} **** **** {card.cardNumber.slice(-4)}
                    </span>
                    <span className="ml-4 text-sm text-gray-500">
                      {moment(card.createdAt).format('YYYY-MM-DD HH:mm')}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {selectedCard && (
          <Modal card={selectedCard} isOpen={!!selectedCard} onClose={closeModal} />
        )}
      </div>
    </div>
  );
}

function Modal({ isOpen, onClose, card }) {
  if (!isOpen) return null;

  return (
    <div className={`modal-background ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="card-preview">
          <div className="front">
            <div className="card-number">{card.cardNumber}</div>
            <div className="card-name">{card.cardholderName}</div>
            <div className="expiry">
              <span className="expiry-label">Expires</span>
              <span className="expiry-date">{card.expiryDate}</span>
            </div>
          </div>
        </div>
        <button className="close-modal" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
