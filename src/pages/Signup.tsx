import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function Signup() {
  const { language, t } = useLanguage();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(
        language === 'ht'
          ? 'Modpas yo pa menm'
          : language === 'fr'
          ? 'Les mots de passe ne correspondent pas'
          : 'Passwords do not match'
      );
      return;
    }

    if (!agreeTerms) {
      setError(
        language === 'ht'
          ? 'Ou dwe dakò ak kondisyon yo'
          : language === 'fr'
          ? 'Vous devez accepter les conditions'
          : 'You must agree to terms'
      );
      return;
    }

    setLoading(true);

    const { error } = await signUp(
      formData.email,
      formData.password,
      formData.fullName,
      formData.phone
    );

    if (error) {
      setError(
        language === 'ht'
          ? 'Gen yon erè. Tanpri eseye ankò.'
          : language === 'fr'
          ? 'Une erreur est survenue. Veuillez réessayer.'
          : 'An error occurred. Please try again.'
      );
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
            {t('signup_title')}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {language === 'ht' && 'Kreye kont ou jodi a'}
            {language === 'fr' && "Créez votre compte aujourd'hui"}
            {language === 'en' && 'Create your account today'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {language === 'ht' && 'Kont kreye avèk siksè!'}
              {language === 'fr' && 'Compte créé avec succès!'}
              {language === 'en' && 'Account created successfully!'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">{t('phone')}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+509 XXXX-XXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirm-password">{t('confirm_password')}</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                minLength={6}
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                {t('agree_terms')}
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e40af] hover:bg-[#1e40af]/90"
              size="lg"
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  {language === 'ht'
                    ? 'Chajman...'
                    : language === 'fr'
                    ? 'Chargement...'
                    : 'Loading...'}
                </span>
              ) : (
                t('signup_title')
              )}
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
