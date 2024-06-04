import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white bg-transparent border border-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded-full transition duration-300"
        >
            <FaArrowLeft className="mr-2" />
            Retour
        </button>
    );
};

export default BackButton;
