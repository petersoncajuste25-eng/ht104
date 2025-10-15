import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { user, profile, signOut, isAdmin } = useAuth();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">104</span>
            </div>
            <span className="text-xl font-bold text-[#1e40af]">Ht104</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#1e40af] transition-colors">
              {t('nav_home')}
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-[#1e40af] transition-colors">
              {t('nav_products')}
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-[#1e40af] transition-colors">
              {t('nav_how_it_works')}
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#1e40af] transition-colors">
              {t('nav_contact')}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('ht')}>
                  Kreyòl (HT)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('fr')}>
                  Français (FR)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English (EN)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#1e40af] transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#10b981] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      {profile?.full_name || user.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link to="/dashboard">
                      <DropdownMenuItem>
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    {isAdmin && (
                      <Link to="/admin">
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Admin
                        </DropdownMenuItem>
                      </Link>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      {language === 'ht' ? 'Dekonekte' : language === 'fr' ? 'Déconnexion' : 'Logout'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      {t('nav_login')}
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-[#1e40af] hover:bg-[#1e40af]/90">
                      {t('nav_signup')}
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-700 hover:text-[#1e40af] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav_home')}
            </Link>
            <Link
              to="/products"
              className="block text-gray-700 hover:text-[#1e40af] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav_products')}
            </Link>
            <Link
              to="/how-it-works"
              className="block text-gray-700 hover:text-[#1e40af] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav_how_it_works')}
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-[#1e40af] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav_contact')}
            </Link>
            <div className="pt-4 border-t space-y-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  {t('nav_login')}
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#1e40af] hover:bg-[#1e40af]/90">
                  {t('nav_signup')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
