import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">104</span>
              </div>
              <span className="text-xl font-bold text-[#1e40af]">Ht104</span>
            </div>
            <p className="text-gray-600 text-sm">
              {t('nav_home')} - Shop without credit cards in Haiti
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#1e40af] transition-colors text-sm">
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-[#1e40af] transition-colors text-sm">
                  {t('nav_products')}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-[#1e40af] transition-colors text-sm">
                  {t('nav_how_it_works')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-[#1e40af] transition-colors text-sm">
                  {t('nav_contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-[#1e40af] transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-[#1e40af] transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <p className="text-gray-600 text-sm">
              Moncash & Natcash accepted
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {currentYear} Ht104. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
