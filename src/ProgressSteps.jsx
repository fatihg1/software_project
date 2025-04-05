import { clsx } from 'clsx';
import { Check } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import translations from './translations.jsx';
export default function ProgressSteps({ currentStep }) {
  const { language } = useLanguage();
  const steps = translations[language].steps;
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <div className="w-full md:w-64 md:shrink-0">
      <div className="bg-white md:bg-transparent p-6 rounded-xl shadow-md md:shadow-none">
        <div className="flex flex-col space-y-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors",
                  {
                    'bg-blue-600 text-white': index <= currentStepIndex,
                    'bg-gray-200 text-gray-500': index > currentStepIndex,
                  }
                )}>
                  {index < currentStepIndex ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={clsx(
                    "h-16 w-0.5 mt-2",
                    index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                  )} />
                )}
              </div>
              <div>
                <div className={clsx(
                  "text-sm font-semibold",
                  index <= currentStepIndex ? 'text-blue-600' : 'text-gray-500'
                )}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">{step.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}