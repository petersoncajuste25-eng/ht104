import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ForgotPassword() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <Link
            to="/login"
            className="inline-flex items-center text-[#1e40af] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'ht' && 'Retounen nan Koneksyon'}
            {language === 'fr' && 'Retour à Connexion'}
            {language === 'en' && 'Back to Login'}
          </Link>

          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {language === 'ht' && 'Bliye Modpas?'}
            {language === 'fr' && 'Mot de passe oublié?'}
            {language === 'en' && 'Forgot Password?'}
          </h1>
          <p className="text-gray-600 mb-8">
            {language === 'ht' &&
              'Antre imel ou epi nou pral voye yon lyen pou chanje modpas ou'}
            {language === 'fr' &&
              'Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe'}
            {language === 'en' &&
              'Enter your email and we\'ll send you a link to reset your password'}
          </p>

          <form className="space-y-4">
            <div>
              <Label htmlFor="email">
                {language === 'ht' && 'Imel'}
                {language === 'fr' && 'Email'}
                {language === 'en' && 'Email'}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@example.com"
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1e40af] hover:bg-[#1e40af]/90"
              size="lg"
            >
              {language === 'ht' && 'Voye Lyen Reinisilizasyon'}
              {language === 'fr' && 'Envoyer Lien Réinitialisation'}
              {language === 'en' && 'Send Reset Link'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
