import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function Login() {
  const { language, t } = useLanguage();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(
        language === 'ht'
          ? 'Imel oswa modpas pa kòrèk'
          : language === 'fr'
          ? 'Email ou mot de passe incorrect'
          : 'Invalid email or password'
      );
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
            {t('login_title')}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {language === 'ht' && 'Konekte nan kont ou'}
            {language === 'fr' && 'Connectez-vous à votre compte'}
            {language === 'en' && 'Sign in to your account'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  {t('remember_me')}
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-[#1e40af] hover:underline"
              >
                {t('forgot_password')}
              </Link>
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
                  {language === 'ht' ? 'Chajman...' : language === 'fr' ? 'Chargement...' : 'Loading...'}
                </span>
              ) : (
                t('login_title')
              )}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            {t('no_account')}{' '}
            <Link to="/signup" className="text-[#1e40af] hover:underline font-semibold">
              {t('signup_title')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
