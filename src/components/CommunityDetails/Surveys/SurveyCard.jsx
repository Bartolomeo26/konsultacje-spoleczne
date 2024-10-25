import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SurveyCard()
{
    const [selectedOption, setSelectedOption] = useState('');
    const [customAnswer, setCustomAnswer] = useState('');
    const [isCustomAnswer, setIsCustomAnswer] = useState(false);
    const [voted, setVoted] = useState(false); // Zarządzanie stanem głosowania
    const [showResults, setShowResults] = useState(false); // Zarządzanie stanem modala z wynikami

    const handleOptionChange = (e) =>
    {
        const value = e.target.value;
        if (value === 'custom')
        {
            setIsCustomAnswer(true); // Wybrano opcję "Inna"
            setSelectedOption('');
        } else
        {
            setIsCustomAnswer(false); // Zresetuj stan custom input
            setSelectedOption(value);
        }
    };

    const handleCustomAnswerChange = (e) =>
    {
        setCustomAnswer(e.target.value);
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();


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
        labels: ['Bardzo dobry', 'Dobry', 'Średni', 'Słaby', 'Inna'],
        datasets: [
            {
                data: [40, 30, 20, 5, 5], // Przykładowe statyczne dane
                backgroundColor: ['#4caf50', '#ffeb3b', '#ff9800', '#f44336', '#9c27b0'],
                hoverBackgroundColor: ['#66bb6a', '#fff176', '#ffb74d', '#e57373', '#ba68c8'],
            },
        ],
    };

    return (
        <div className="max-w-sm mx-auto p-6 px-4 bg-white rounded-lg shadow-md mt-2">
            <h1 className="text-2xl font-semibold text-center mb-3">How can we improve transportation?</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* Odpowiedzi */}
                    <label
                        className={`flex items-center ${selectedOption === 'Introduce trolejbuses' && voted ? 'bg-green-100' : ''
                            } p-2 rounded-lg`}
                    >
                        <input
                            type="radio"
                            name="answer"
                            value="Bardzo dobry"
                            checked={selectedOption === 'Introduce trolejbuses'}
                            onChange={handleOptionChange}
                            className="form-radio text-indigo-600"
                            disabled={voted}
                        />
                        <span className="ml-2">Introduce trolejbuses</span>
                    </label>

                    <label
                        className={`flex items-center ${selectedOption === 'Dobry' && voted ? 'bg-green-100' : ''
                            } p-2 rounded-lg`}
                    >
                        <input
                            type="radio"
                            name="answer"
                            value="Dobry"
                            checked={selectedOption === 'Dobry'}
                            onChange={handleOptionChange}
                            className="form-radio text-indigo-600"
                            disabled={voted}
                        />
                        <span className="ml-2">Dobry</span>
                    </label>

                    <label
                        className={`flex items-center ${selectedOption === 'Średni' && voted ? 'bg-green-100' : ''
                            } p-2 rounded-lg`}
                    >
                        <input
                            type="radio"
                            name="answer"
                            value="Średni"
                            checked={selectedOption === 'Średni'}
                            onChange={handleOptionChange}
                            className="form-radio text-indigo-600"
                            disabled={voted}
                        />
                        <span className="ml-2">Średni</span>
                    </label>

                    <label
                        className={`flex items-center ${selectedOption === 'Słaby' && voted ? 'bg-green-100' : ''
                            } p-2 rounded-lg`}
                    >
                        <input
                            type="radio"
                            name="answer"
                            value="Słaby"
                            checked={selectedOption === 'Słaby'}
                            onChange={handleOptionChange}
                            className="form-radio text-indigo-600"
                            disabled={voted}
                        />
                        <span className="ml-2">Słaby</span>
                    </label>

                    <label
                        className={`flex items-center ${isCustomAnswer && voted ? 'bg-green-100' : ''
                            } p-2 rounded-lg`}
                    >
                        <input
                            type="radio"
                            name="answer"
                            value="custom"
                            checked={isCustomAnswer}
                            onChange={handleOptionChange}
                            className="form-radio text-indigo-600"
                            disabled={voted}
                        />
                        <span className="ml-2">Other (your custom answer)</span>
                    </label>

                    {isCustomAnswer && (
                        <input
                            type="text"
                            value={customAnswer}
                            onChange={handleCustomAnswerChange}
                            placeholder="Wpisz swoją odpowiedź"
                            className="mt-1 mb-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={voted}
                        />
                    )}
                </div>

                {!voted ? (
                    <button
                        type="submit"
                        className="w-full mt-2 bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-300"
                    >
                        Vote
                    </button>
                ) : (
                    <div className="flex justify-center space-x-2 mt-2">
                        <button
                            onClick={handleUndoVote}
                            className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
                        >
                            Undo Vote
                        </button>
                        <button
                            onClick={handleShowResults}
                            className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        >
                            View Results
                        </button>
                    </div>
                )}
            </form>

            <div className="flex justify-center text-center mt-2 text-sm">
                <p>
                    This survey is a conclusion for discussion:{' '}
                    <Link to="/communities/1/discussions/1">
                        <span className="block font-bold text-sm">How can we improve transportation in Piaski?</span>
                    </Link>
                </p>
            </div>

            {/* Modal z wynikami */}
            {showResults && (
                <div className="fixed inset-0 bg-black z-20 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Survey Results</h3>
                        <Pie data={data} />
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SurveyCard;
