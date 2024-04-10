import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNewCard } from '../services/api';
import "../App.css";

function AddNewCard() 
{
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });
  const [cardNumberError, setCardNumberError] = useState('');
  const [cardholderNameError, setCardholderNameError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [flipCard, setFlipCard] = useState(false);

  const navigate = useNavigate();

  const formatCardNumber = (value) => {
    return value
      .replace(/[^0-9/]/g, '') // For Removing spaces
      .replace(/(\d{4})(?=\d)/g, '$1 ') // Adding space after every 4 digits
      .trim(); // Removing trailing space
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value).slice(0, 19);
    setCardDetails({ ...cardDetails, cardNumber: formattedValue });
    setCardNumberError(formattedValue.replace(/\s/g, '').length === 16 ? '' : 'Card number must have 16 digits.');
  };

  const handleCardholderNameChange = (e) => {
    const alphabeticValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setCardDetails({ ...cardDetails, cardholderName: alphabeticValue });
    setCardholderNameError(/^[a-zA-Z\s]*$/.test(alphabeticValue) ? '' : 'Name must contain only letters.');
  };

  const handleExpiryDateChange = (e) => {
    const expiryValue = e.target.value.replace(/[^0-9/]/g, '').replace(/^(0[1-9]|1[0-2])$/, '$1/').slice(0, 5);
    setCardDetails({ ...cardDetails, expiryDate: expiryValue });
    setExpiryDateError(expiryValue.length === 5 ? '' : 'Enter a valid expiry date in MM/YY format.');
  };

  const handleCVVChange = (e) => {
    const cvvValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
    setCardDetails({ ...cardDetails, cvv: cvvValue });
    setCvvError(cvvValue.length === 3 ? '' : 'CVV must be 3 digits.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardNumberError && !cardholderNameError && !expiryDateError && !cvvError) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        await addNewCard({ ...cardDetails }, user.token);
        navigate('/card-history'); 
      } catch (error) {
        alert('Check Incorrect Number... Enter  Valid Card Details Correctly 🤨😒');
      }
    }
  };


  const handleCVVFocus = () => {
    setFlipCard(true);
  };

const handleCVVBlur = () => {
  setFlipCard(false);
  };

  

  function renderCardPreview() {
  return (
    <div className={`card-preview ${flipCard ? 'flipped' : ''}`}>
      <div className="card-side front">
       
        <div className="card-number">{cardDetails.cardNumber || '#### #### #### ####'}</div>
        <div className="card-name">{cardDetails.cardholderName.toUpperCase() || 'CARDHOLDER NAME'}</div>
        <div className="expiry">
          <span className="expiry-label ">Expires </span>
          <span className="expiry-date">{cardDetails.expiryDate || 'MM/YY'}</span>
        </div>
      </div>
      <div className="card-side back">
      
        <div className="cvv-bar"></div>
        <div className="cvv-display">
          <span className="cvv">{cardDetails.cvv || 'CVV'}</span>
        </div>
      </div>
    </div>
  );
  }
const handleBackToDashboard = () => {
  navigate('/dashboard'); 
  };



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      
      <button
        onClick={handleBackToDashboard}
        className="self-start mb-4 px-4 py-2 text-sm text-blue-700 bg-blue-200 rounded hover:bg-blue-300"
      >
        Back to Dashboard
      </button>
      <div className="max-w-md w-full space-y-8">
      
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Card</h2>

        {/* Card Preview at the top */}

        <div className="flex justify-center">
          {renderCardPreview()}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardNumberChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="#### #### #### ####"
                pattern="\d{4} \d{4} \d{4} \d{4}"
                title="Enter a 16-digit card number in the format: 1234 5678 9012 3456"
                required
              />
              {cardNumberError && <p className="mt-2 text-sm text-red-600">{cardNumberError}</p>}
            </div>
          </div>
  
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={cardDetails.cardholderName}
                onChange={handleCardholderNameChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                placeholder="NAME SURNAME"
                pattern="[A-Za-z ]{2,}"
                title="Enter the cardholder's name"
                required
              />
              {cardholderNameError && <p className="mt-2 text-sm text-red-600">{cardholderNameError}</p>}
            </div>
          </div>
  
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleExpiryDateChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                placeholder="MM/YY"
                pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                title="Enter the expiry date in the format MM/YY"
                required
              />
              {expiryDateError && <p className="mt-2 text-sm text-red-600">{expiryDateError}</p>}
            </div>
          </div>
  
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCVVChange}
                onFocus={handleCVVFocus}
                onBlur={handleCVVBlur}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                placeholder="123"
                pattern="\d{3}"
                title="Enter the 3-digit CVV number"
                required
              />
              {cvvError && <p className="mt-2 text-sm text-red-600">{cvvError}</p>}
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Card
            </button>
          </div>
        </form>
        {/* Show validation errors */}
        {(cardNumberError || cardholderNameError || expiryDateError || cvvError) && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                {/* Error Icon */}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  There are errors with your submission
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {cardNumberError && <li>{cardNumberError}</li>}
                    {cardholderNameError && <li>{cardholderNameError}</li>}
                    {expiryDateError && <li>{expiryDateError}</li>}
                    {cvvError && <li>{cvvError}</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
  
export default AddNewCard;