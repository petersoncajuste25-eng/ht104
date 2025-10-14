import { ShoppingCart, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function HowItWorks() {
  const { language } = useLanguage();

  const steps = [
    {
      icon: ShoppingCart,
      title: { ht: 'Chwazi Pwodwi', fr: 'Choisir Produits', en: 'Choose Products' },
      desc: {
        ht: 'Navige nan katalòg nou an epi ajoute pwodwi yo nan panye ou',
        fr: 'Parcourez notre catalogue et ajoutez des produits à votre panier',
        en: 'Browse our catalog and add products to your cart',
      },
    },
    {
      icon: CreditCard,
      title: { ht: 'Peye 50% Alavans', fr: "Payer 50% d'Avance", en: 'Pay 50% Upfront' },
      desc: {
        ht: 'Peye mwatye premye a ak Moncash oswa Natcash',
        fr: 'Payez la première moitié avec Moncash ou Natcash',
        en: 'Pay the first half with Moncash or Natcash',
      },
    },
    {
      icon: Truck,
      title: { ht: 'Resevwa Livrezon', fr: 'Recevoir Livraison', en: 'Receive Delivery' },
      desc: {
        ht: 'Nou pral livre pwodwi ou lakay ou oswa ou ka vin pran li',
        fr: 'Nous livrerons votre produit chez vous ou vous pouvez le récupérer',
        en: "We'll deliver your product or you can pick it up",
      },
    },
    {
      icon: CheckCircle,
      title: { ht: 'Peye 50% Restan', fr: 'Payer 50% Restant', en: 'Pay Remaining 50%' },
      desc: {
        ht: 'Peye lòt mwatye a lè w resevwa pwodwi a',
        fr: "Payez l'autre moitié à la réception du produit",
        en: 'Pay the other half when you receive the product',
      },
    },
  ];

  const title = {
    ht: 'Kijan li Fonksyone?',
    fr: 'Comment ça Marche?',
    en: 'How It Works?',
  };

  const subtitle = {
    ht: 'Achte pwodwi nan 4 etap senp',
    fr: 'Achetez des produits en 4 étapes simples',
    en: 'Shop products in 4 simple steps',
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {title[language]}
          </h1>
          <p className="text-xl text-gray-600">{subtitle[language]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1e40af] text-white flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {step.title[language]}
                  </h3>
                  <p className="text-gray-600">{step.desc[language]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            {language === 'ht' && 'Kesyon yo Poze Souvan'}
            {language === 'fr' && 'Questions Fréquentes'}
            {language === 'en' && 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                {language === 'ht' && 'Èske mwen dwe gen kat kredi?'}
                {language === 'fr' && 'Dois-je avoir une carte de crédit?'}
                {language === 'en' && 'Do I need a credit card?'}
              </h3>
              <p className="text-gray-600">
                {language === 'ht' && 'Non! Ou ka peye ak Moncash oswa Natcash.'}
                {language === 'fr' && 'Non! Vous pouvez payer avec Moncash ou Natcash.'}
                {language === 'en' && 'No! You can pay with Moncash or Natcash.'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                {language === 'ht' && 'Konbyen tan livrezon an pran?'}
                {language === 'fr' && 'Combien de temps prend la livraison?'}
                {language === 'en' && 'How long does delivery take?'}
              </h3>
              <p className="text-gray-600">
                {language === 'ht' && 'Pwodwi disponib yo rive nan 2-3 jou. Pwodwi sou komand yo pran 2 semèn.'}
                {language === 'fr' && 'Les produits disponibles arrivent en 2-3 jours. Les produits sur commande prennent 2 semaines.'}
                {language === 'en' && 'In-stock products arrive in 2-3 days. On-order products take 2 weeks.'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                {language === 'ht' && 'Ki jan pou mwen peye?'}
                {language === 'fr' && 'Comment puis-je payer?'}
                {language === 'en' && 'How can I pay?'}
              </h3>
              <p className="text-gray-600">
                {language === 'ht' && 'Ou peye 50% lè w pase kòmand la ak Moncash/Natcash, epi 50% restan an lè w resevwa pwodwi a.'}
                {language === 'fr' && 'Vous payez 50% lors de la commande avec Moncash/Natcash, et les 50% restants à la réception du produit.'}
                {language === 'en' && 'You pay 50% when placing the order with Moncash/Natcash, and the remaining 50% when you receive the product.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
