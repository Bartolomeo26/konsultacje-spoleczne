import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SurveyCard()
{
    const [selectedOption, setSelectedOption] = useState('');
    const [voted, setVoted] = useState(false);
    const [showResults, setShowResults] = useState(false); 

    const handleOptionChange = (e) =>
    {
        const value = e.target.value;
        setSelectedOption(value);
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        const finalAnswer = selectedOption;
        console.log('Final answer:', finalAnswer);
        alert('Ankieta wysłana: ' + finalAnswer);
        setVoted(true); 
    };

    const handleUndoVote = () =>
    {
        setVoted(false); 
        setSelectedOption('');
    };

    const handleShowResults = () =>
    {
        setShowResults(true);
    };

    const handleCloseModal = () =>
    {
        setShowResults(false); 
    };

   
    const data = {
        labels: ['Clean transport', 'More seats', 'Introduce electric vehicles', 'More routes'],
        datasets: [
            {
                data: [40, 30, 20, 5], 
                backgroundColor: ['#4caf50', '#ffeb3b', '#ff9800', '#f44336'],
                hoverBackgroundColor: ['#66bb6a', '#fff176', '#ffb74d', '#e57373'],
            },
        ],
    };

    return (
        <div className="w-full border-2 mx-auto p-6 px-10 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-4">How can we improve transportation?</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 items-center gap-4">
                    
                    <label className="flex items-center">
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

                    <label className="flex items-center">
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

                    <label className="flex items-center">
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

                    <label className="flex items-center">
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

                </div>

                <div className='w-full flex justify-center'>
                    {!voted ? (
                        <button type="submit" className="w-1/2 bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-300">
                            Vote
                        </button>
                    ) : (
                        <div className="space-x-4 flex justify-center w-3/4">
                            <button onClick={handleUndoVote} type="button" className="bg-red-500 text-white w-1/2 py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200">
                                Undo Vote
                            </button>
                            <button onClick={handleShowResults} type="button" className="bg-green-500 text-white w-1/2 py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200">
                                View Results
                            </button>
                        </div>
                    )}
                </div>
            </form>

            <div className="flex justify-center text-center mt-5">
                <p>This survey is a conclusion for the consultation: <Link to="/communities/1/discussions/1"><span className="block font-bold">How can we improve transportation in Piaski?</span></Link></p>
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
