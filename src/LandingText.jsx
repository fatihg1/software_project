import {useLanguage} from './LanguageContext.jsx';
import translations from './translations.jsx';
function LandingText(){
    const {language} = useLanguage();
    return (
        <div className="flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold text-center drop-shadow-xl">{translations[language].welcome}</h1>
            <br></br>
            <p className="text-lg md:text-xl text-center drop-shadow-lg">{translations[language].landingMessage}</p>
        </div>
    );
}

export default LandingText;