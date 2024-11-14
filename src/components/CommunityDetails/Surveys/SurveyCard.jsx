import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SurveyCard()
{
    const [selectedOption, setSelectedOption] = useState('');
    const [customAnswer, setCustomAnswer] = useState('');
    const [voted, setVoted] = useState(false); // Zarządzanie stanem głosowania
    const [showResults, setShowResults] = useState(false); // Zarządzanie stanem modala z wynikami

    const handleOptionChange = (e) =>
    {
        const value = e.target.value;
        setSelectedOption(value);
        if (value !== 'custom')
        {
            setCustomAnswer(''); // Resetuj własną odpowiedź, jeśli nie wybrano custom
        }
    };

    const handleCustomAnswerChange = (e) =>
    {
        setCustomAnswer(e.target.value);
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        const finalAnswer = selectedOption === 'custom' ? customAnswer : selectedOption;
        console.log('Final answer:', finalAnswer);
        alert('Ankieta wysłana: ' + finalAnswer);
        setVoted(true); // Po zagłosowaniu pokaż nowe przyciski
    };

    const handleUndoVote = () =>
    {
        setVoted(false); // Cofnij głos
        setSelectedOption('');
        setCustomAnswer('');
    };

    const handleShowResults = () =>
    {
        setShowResults(true); // Pokaż modal z wynikami
    };

    const handleCloseModal = () =>
    {
        setShowResults(false); // Zamknij modal
    };

    // Dane statyczne do wykresu kołowego
    const data = {
        labels: ['Clean transport', 'More seats', 'Introduce electric vehicles', 'More routes', 'Different'],
        datasets: [
            {
                data: [40, 30, 20, 5, 5], // Przykładowe statyczne dane
                backgroundColor: ['#4caf50', '#ffeb3b', '#ff9800', '#f44336', '#9c27b0'],
                hoverBackgroundColor: ['#66bb6a', '#fff176', '#ffb74d', '#e57373', '#ba68c8'],
            },
        ],
    };

    return (
        <div className="max-w-sm border-2 mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-4">How can we improve transportation?</h1>
            <form onSubmit={handleSubmit} className="space-y-2">
                <div className="space-y-2">
                    {/* Odpowiedzi */}
                    <label className={`flex items-center ${selectedOption === 'Bardzo dobry' && voted ? 'bg-green-100' : ''} p-2 rounded-lg`}>
                        <input
                            type="radio"
                            name="answer"
                            value="Bardzo dobry"
                            checked={selectedOption === 'Bardzo dobry'}
                            onChange={handleOptionChange}
                            className="form-radio text-indigo-600"
                            disabled={voted}
                        />
                        <span className="ml-2">Regular cleaning and maintenance of vehicles.</span>
                    </label>

                    <label className={`flex items-center ${selectedOption === 'Dobry' && voted ? 'bg-green-100' : ''} p-2 rounded-lg`}>
                        <input
                            type="radio"
                            name="answer"
                            value="Dobry"
                            checked={selectedOption === 'Dobry'}
                            onChange={handleOptionChange}
                            className="form-radio text-indigo-600"
                            disabled={voted}
                        />
                        <span className="ml-2">Ability to track routes in real-time through an app.</span>
                    </label>

                    <label className={`flex items-center ${selectedOption === 'Średni' && voted ? 'bg-green-100' : ''} p-2 rounded-lg`}>
                        <input
                            type="radio"
                            name="answer"
                            value="Średni"
                            checked={selectedOption === 'Średni'}
                            onChange={handleOptionChange}
                            className="form-radio text-indigo-600"
                            disabled={voted}
                        />
                        <span className="ml-2">Increasing seating availability on crowded lines.</span>
                    </label>

                    <label className={`flex items-center ${selectedOption === 'Słaby' && voted ? 'bg-green-100' : ''} p-2 rounded-lg`}>
                        <input
                            type="radio"
                            name="answer"
                            value="Słaby"
                            checked={selectedOption === 'Słaby'}
                            onChange={handleOptionChange}
                            className="form-radio text-indigo-600"
                            disabled={voted}
                        />
                        <span className="ml-2">Introducing electric or hybrid vehicles.</span>
                    </label>

                    {/* Pole tekstowe dla własnej odpowiedzi jako część odpowiedzi */}
                    <label className="flex items-center p-2 rounded-lg">
                        <input
                            type="radio"
                            name="answer"
                            value="custom"
                            checked={selectedOption === 'custom'}
                            onChange={handleOptionChange}
                            className="form-radio text-indigo-600"
                            disabled={voted}
                        />
                        <input
                            type="text"
                            value={customAnswer}
                            onChange={handleCustomAnswerChange}
                            placeholder="Your answer"
                            className="ml-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={selectedOption !== 'custom' || voted}
                        />
                    </label>
                </div>

                {!voted ? (
                    <button type="submit" className="w-full bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-300">
                        Vote
                    </button>
                ) : (
                    <div className="space-x-4 flex justify-center">
                        <button onClick={handleUndoVote} type="button" className="bg-red-500 text-white w-1/2 py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200">
                            Undo Vote
                        </button>
                        <button onClick={handleShowResults} type="button" className="bg-green-500 text-white w-1/2 py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200">
                            View Results
                        </button>
                    </div>
                )}
            </form>

            <div className="flex justify-center text-center mt-5">
                <p>This survey is a conclusion for consultation: <Link to="/communities/1/discussions/1"><span className="block font-bold">How can we improve transportation in Piaski?</span></Link></p>
            </div>

            {showResults && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Survey Results</h3>
                        <Pie data={data} />
                        <button onClick={handleCloseModal} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SurveyCard;
