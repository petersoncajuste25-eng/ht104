import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function Signup() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
            {t('signup_title')}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {language === 'ht' && 'Kreye kont ou jodi a'}
            {language === 'fr' && 'Créez votre compte aujourd\'hui'}
            {language === 'en' && 'Create your account today'}
          </p>

          <Button variant="outline" className="w-full mb-4" size="lg">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            {t('sign_up_google')}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{t('or')}</span>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <Label htmlFor="name">{t('full_name')}</Label>
              <Input
                id="name"
                type="text"
                placeholder={
                  language === 'ht'
                    ? 'Jan Pye'
                    : language === 'fr'
                    ? 'Jean Pierre'
                    : 'John Doe'
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@example.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">{t('phone')}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+509 XXXX-XXXX"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirm-password">{t('confirm_password')}</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                {t('agree_terms')}
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1e40af] hover:bg-[#1e40af]/90"
              size="lg"
            >
              {t('signup_title')}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            {t('have_account')}{' '}
            <Link to="/login" className="text-[#1e40af] hover:underline font-semibold">
              {t('login_title')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
