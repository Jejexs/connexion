import React, { useState, useEffect } from 'react';

/**
 * Composant pour la saisie des détails utilisateur lors de l'inscription.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.email - L'email de l'utilisateur.
 * @param {Function} props.setEmail - Fonction pour définir l'email de l'utilisateur.
 * @param {string} props.username - Le nom d'utilisateur.
 * @param {Function} props.setUsername - Fonction pour définir le nom d'utilisateur.
 * @param {string} props.password - Le mot de passe de l'utilisateur.
 * @param {Function} props.setPassword - Fonction pour définir le mot de passe.
 * @param {boolean} props.isNewsletter - Indique si l'utilisateur souhaite recevoir la newsletter.
 * @param {Function} props.setIsNewsletter - Fonction pour définir l'abonnement à la newsletter.
 * @param {Function} props.onNext - Fonction pour passer à l'étape suivante.
 * @param {Function} props.onPrevious - Fonction pour revenir à l'étape précédente.
 */
const UserDetailsStep = ({ email, setEmail, username, setUsername, password, setPassword, isNewsletter, setIsNewsletter, onNext, onPrevious }) => {
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isDataConsentChecked, setIsDataConsentChecked] = useState(false);

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        number: false,
        lowercase: false,
        uppercase: false,
        specialChar: false
    });

    useEffect(() => {
        // Met à jour les validations de mot de passe à chaque changement de mot de passe
        setPasswordValidations({
            length: password.length >= 8,
            number: /[0-9]/.test(password),
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            specialChar: /[\W]/.test(password)
        });
    }, [password]);

    return (
        <>
            <div className="mb-8 relative">
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(email.length === 0 ? false : true)}
                    required
                    className={`pl-3 p-2 w-full text-sm text-white bg-transparent border border-white rounded-lg focus:outline-none transition duration-300 ${isEmailFocused || email ? 'shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]' : ''}`}
                />
                <label
                    htmlFor="email"
                    className={`absolute left-3 transition-all duration-300 pointer-events-none text-white ${isEmailFocused || email ? '-top-5 text-xs' : 'top-1/2 transform -translate-y-1/2'}`}
                >
                    Email
                </label>
            </div>
            <div className="mb-8 relative">
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setIsUsernameFocused(true)}
                    onBlur={() => setIsUsernameFocused(username.length === 0 ? false : true)}
                    required
                    className={`pl-3 p-2 w-full text-sm text-white bg-transparent border border-white rounded-lg focus:outline-none transition duration-300 ${isUsernameFocused || username ? 'shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]' : ''}`}
                />
                <label
                    htmlFor="username"
                    className={`absolute left-3 transition-all duration-300 pointer-events-none text-white ${isUsernameFocused || username ? '-top-5 text-xs' : 'top-1/2 transform -translate-y-1/2'}`}
                >
                    Nom d'utilisateur
                </label>
            </div>
            <div className="mb-8 relative">
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(password.length === 0 ? false : true)}
                    required
                    className={`pl-3 p-2 w-full text-sm text-white bg-transparent border border-white rounded-lg focus:outline-none transition duration-300 ${isPasswordFocused || password ? 'shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]' : ''}`}
                />
                <label
                    htmlFor="password"
                    className={`absolute left-3 transition-all duration-300 pointer-events-none text-white ${isPasswordFocused || password ? '-top-5 text-xs' : 'top-1/2 transform -translate-y-1/2'}`}
                >
                    Mot de passe
                </label>
            </div>
            <div className="mb-8">
                <ul className="text-white text-sm">
                    <li className={`flex items-center ${passwordValidations.length ? 'text-green-500' : 'text-red-500'}`}>
                        {passwordValidations.length ? '✓' : '✗'} 8 caractères minimum
                    </li>
                    <li className={`flex items-center ${passwordValidations.number ? 'text-green-500' : 'text-red-500'}`}>
                        {passwordValidations.number ? '✓' : '✗'} 1 chiffre minimum
                    </li>
                    <li className={`flex items-center ${passwordValidations.lowercase ? 'text-green-500' : 'text-red-500'}`}>
                        {passwordValidations.lowercase ? '✓' : '✗'} 1 lettre minuscule
                    </li>
                    <li className={`flex items-center ${passwordValidations.uppercase ? 'text-green-500' : 'text-red-500'}`}>
                        {passwordValidations.uppercase ? '✓' : '✗'} 1 lettre majuscule
                    </li>
                    <li className={`flex items-center ${passwordValidations.specialChar ? 'text-green-500' : 'text-red-500'}`}>
                        {passwordValidations.specialChar ? '✓' : '✗'} 1 caractère spécial
                    </li>
                </ul>
            </div>
            <div className="mb-4 flex items-start">
                <input
                    type="checkbox"
                    id="dataConsent"
                    checked={isDataConsentChecked}
                    onChange={() => setIsDataConsentChecked(!isDataConsentChecked)}
                    className="mr-2"
                />
                <label htmlFor="dataConsent" className="text-white text-sm">
                    Je suis d'accord avec le traitement des données personnelles
                </label>
            </div>
            <div className="mb-8 flex items-start">
                <input
                    type="checkbox"
                    id="newsletter"
                    checked={isNewsletter}
                    onChange={() => setIsNewsletter(!isNewsletter)}
                    className="mr-2"
                />
                <label htmlFor="newsletter" className="text-white text-sm">
                    Je souhaite rester informé et m'inscrire à la newsletter
                </label>
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    type="button" onClick={onPrevious}>
                    Précédent
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    type="submit" onClick={onNext} disabled={!isDataConsentChecked}>
                    Inscription
                </button>
            </div>
        </>
    );
};

export default UserDetailsStep;
