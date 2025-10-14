import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, Truck, CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function Home() {
  const { language } = useLanguage();

  const hero = {
    ht: {
      title: 'Achte san Kat Kredi, Peye 50% Kounye a!',
      subtitle: 'E-commerce pou Ayisyen ki pa gen kat kredi. Peye 50% ak Moncash/Natcash, 50% nan livrezon.',
      cta: 'Kòmanse Achte',
    },
    fr: {
      title: 'Achetez sans Carte de Crédit, Payez 50% Maintenant!',
      subtitle: 'E-commerce pour Haïtiens sans carte de crédit. Payez 50% avec Moncash/Natcash, 50% à la livraison.',
      cta: 'Commencer les Achats',
    },
    en: {
      title: 'Shop Without Credit Card, Pay 50% Now!',
      subtitle: 'E-commerce for Haitians without credit cards. Pay 50% with Moncash/Natcash, 50% on delivery.',
      cta: 'Start Shopping',
    },
  };

  const features = [
    {
      icon: Shield,
      title: { ht: 'San Kat Kredi', fr: 'Sans Carte de Crédit', en: 'No Credit Card' },
      desc: { ht: 'Peye ak Moncash oswa Natcash', fr: 'Payez avec Moncash ou Natcash', en: 'Pay with Moncash or Natcash' },
    },
    {
      icon: CreditCard,
      title: { ht: '50/50 Peman', fr: 'Paiement 50/50', en: '50/50 Payment' },
      desc: { ht: '50% kounye a, 50% nan livrezon', fr: '50% maintenant, 50% livraison', en: '50% now, 50% on delivery' },
    },
    {
      icon: Truck,
      title: { ht: 'Livrezon Rapid', fr: 'Livraison Rapide', en: 'Fast Delivery' },
      desc: { ht: 'Resevwa pwodwi ou nan men ou vit', fr: 'Recevez vos produits rapidement', en: 'Get your products quickly' },
    },
    {
      icon: ShoppingBag,
      title: { ht: 'Kantite Pwodwi', fr: 'Variété de Produits', en: 'Wide Selection' },
      desc: { ht: 'Elektwonik, rad, ak plis ankò', fr: 'Électronique, vêtements et plus', en: 'Electronics, clothing and more' },
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-[#1e40af] to-[#3b82f6] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {hero[language].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {hero[language].subtitle}
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-white text-[#1e40af] hover:bg-gray-100 text-lg px-8 py-6">
                {hero[language].cta}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl border-2 border-gray-100 hover:border-[#1e40af] hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-[#1e40af] mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title[language]}
                </h3>
                <p className="text-gray-600">{feature.desc[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {language === 'ht' && 'Pare pou Kòmanse?'}
            {language === 'fr' && 'Prêt à Commencer?'}
            {language === 'en' && 'Ready to Start?'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {language === 'ht' && 'Gade pwodwi nou yo epi kòmanse achte jodi a'}
            {language === 'fr' && 'Parcourez nos produits et commencez vos achats aujourd\'hui'}
            {language === 'en' && 'Browse our products and start shopping today'}
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-[#1e40af] hover:bg-[#1e40af]/90">
              {language === 'ht' && 'Gade Pwodwi'}
              {language === 'fr' && 'Voir les Produits'}
              {language === 'en' && 'View Products'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
