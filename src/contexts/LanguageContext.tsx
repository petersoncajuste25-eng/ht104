import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, Translations } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Translations = {
  nav_home: { ht: 'Lakay', fr: 'Accueil', en: 'Home' },
  nav_products: { ht: 'Pwodwi', fr: 'Produits', en: 'Products' },
  nav_how_it_works: { ht: 'Kijan li Fonksyone', fr: 'Comment ça Marche', en: 'How It Works' },
  nav_contact: { ht: 'Kontak', fr: 'Contact', en: 'Contact' },
  nav_login: { ht: 'Konekte', fr: 'Connexion', en: 'Login' },
  nav_signup: { ht: 'Enskri', fr: "S'inscrire", en: 'Sign Up' },

  search_products: { ht: 'Chèche pwodwi...', fr: 'Rechercher des produits...', en: 'Search products...' },
  all_categories: { ht: 'Tout Kategori', fr: 'Toutes Catégories', en: 'All Categories' },

  category_electronics: { ht: 'Elektwonik', fr: 'Électronique', en: 'Electronics' },
  category_clothing: { ht: 'Rad', fr: 'Vêtements', en: 'Clothing' },
  category_home: { ht: 'Lakay & Vi', fr: 'Maison & Vie', en: 'Home & Living' },
  category_beauty: { ht: 'Bote & Swen', fr: 'Beauté & Soins', en: 'Beauty & Care' },
  category_sports: { ht: 'Espò', fr: 'Sports', en: 'Sports' },
  category_bags: { ht: 'Sak', fr: 'Sacs', en: 'Bags' },
  category_tools: { ht: 'Zouti', fr: 'Outils', en: 'Tools' },
  category_kids: { ht: 'Timoun & Bebe', fr: 'Enfants & Bébé', en: 'Kids & Baby' },
  category_jewelry: { ht: 'Bijou', fr: 'Bijoux', en: 'Jewelry' },
  category_other: { ht: 'Lòt', fr: 'Autre', en: 'Other' },

  status_in_stock: { ht: 'Disponib', fr: 'Disponible', en: 'In Stock' },
  status_on_order: { ht: 'Sou Komand - 2 semèn', fr: 'Sur Commande - 2 semaines', en: 'On Order - 2 weeks' },

  view_details: { ht: 'Gade Detay', fr: 'Voir Détails', en: 'View Details' },
  add_to_cart: { ht: 'Ajoute nan Panye', fr: 'Ajouter au Panier', en: 'Add to Cart' },

  size_small: { ht: 'Piti', fr: 'Petit', en: 'Small' },
  size_medium: { ht: 'Mwayan', fr: 'Moyen', en: 'Medium' },
  size_large: { ht: 'Gwo', fr: 'Grand', en: 'Large' },
  size_xlarge: { ht: 'Trè Gwo', fr: 'Très Grand', en: 'X-Large' },
  size_xxlarge: { ht: 'Ekstra Gwo', fr: 'Extra Grand', en: 'XX-Large' },

  color_black: { ht: 'Nwa', fr: 'Noir', en: 'Black' },
  color_white: { ht: 'Blan', fr: 'Blanc', en: 'White' },
  color_red: { ht: 'Wouj', fr: 'Rouge', en: 'Red' },
  color_blue: { ht: 'Ble', fr: 'Bleu', en: 'Blue' },
  color_green: { ht: 'Vèt', fr: 'Vert', en: 'Green' },
  color_yellow: { ht: 'Jòn', fr: 'Jaune', en: 'Yellow' },
  color_gray: { ht: 'Gri', fr: 'Gris', en: 'Gray' },
  color_pink: { ht: 'Woz', fr: 'Rose', en: 'Pink' },

  select_size: { ht: 'Chwazi Gwosè', fr: 'Choisir Taille', en: 'Select Size' },
  select_color: { ht: 'Chwazi Koulè', fr: 'Choisir Couleur', en: 'Select Color' },
  add_variant: { ht: 'Ajoute yon lòt varyant', fr: 'Ajouter une autre variante', en: 'Add another variant' },

  payment_breakdown: { ht: 'Detay Peman', fr: 'Détails du Paiement', en: 'Payment Breakdown' },
  upfront_50: { ht: '50% Alavans', fr: "50% d'Avance", en: '50% Upfront' },
  delivery_50: { ht: '50% Livrezon', fr: '50% Livraison', en: '50% Delivery' },
  total: { ht: 'Total', fr: 'Total', en: 'Total' },

  shopping_cart: { ht: 'Panye Acha', fr: "Panier d'Achats", en: 'Shopping Cart' },
  empty_cart: { ht: 'Panye ou vid', fr: 'Votre panier est vide', en: 'Your cart is empty' },
  continue_shopping: { ht: 'Kontinye Achte', fr: 'Continuer les Achats', en: 'Continue Shopping' },
  proceed_checkout: { ht: 'Al Peye', fr: 'Passer à la Caisse', en: 'Proceed to Checkout' },

  quantity: { ht: 'Kantite', fr: 'Quantité', en: 'Quantity' },
  remove: { ht: 'Retire', fr: 'Retirer', en: 'Remove' },
  subtotal: { ht: 'Soutotal', fr: 'Sous-total', en: 'Subtotal' },

  login_title: { ht: 'Konekte', fr: 'Connexion', en: 'Login' },
  signup_title: { ht: 'Kreye Kont', fr: 'Créer un Compte', en: 'Create Account' },
  sign_in_google: { ht: 'Konekte ak Google', fr: 'Se connecter avec Google', en: 'Sign in with Google' },
  sign_up_google: { ht: 'Enskri ak Google', fr: "S'inscrire avec Google", en: 'Sign up with Google' },
  or: { ht: 'OUBYEN', fr: 'OU', en: 'OR' },
  email: { ht: 'Imel', fr: 'Email', en: 'Email' },
  password: { ht: 'Modpas', fr: 'Mot de passe', en: 'Password' },
  remember_me: { ht: 'Sonje mwen', fr: 'Se souvenir de moi', en: 'Remember me' },
  forgot_password: { ht: 'Bliye modpas?', fr: 'Mot de passe oublié?', en: 'Forgot password?' },
  no_account: { ht: 'Pa gen kont?', fr: "Pas de compte?", en: "Don't have an account?" },
  have_account: { ht: 'Deja gen kont?', fr: 'Déjà un compte?', en: 'Already have an account?' },

  full_name: { ht: 'Non Konplè', fr: 'Nom Complet', en: 'Full Name' },
  phone: { ht: 'Telefòn', fr: 'Téléphone', en: 'Phone' },
  confirm_password: { ht: 'Konfime Modpas', fr: 'Confirmer Mot de passe', en: 'Confirm Password' },
  agree_terms: { ht: "Mwen dakò ak Kondisyon yo", fr: "J'accepte les Conditions", en: 'I agree to Terms' },

  checkout: { ht: 'Peye', fr: 'Paiement', en: 'Checkout' },
  delivery_method: { ht: 'Metòd Livrezon', fr: 'Méthode de Livraison', en: 'Delivery Method' },
  pickup_free: { ht: 'Vin Pran - GRATIS', fr: 'Récupération - GRATUIT', en: 'Pickup - FREE' },
  delivery_fee: { ht: 'Livrezon - Frè Aplike', fr: 'Livraison - Frais Appliqués', en: 'Delivery - Fee Applies' },

  street_address: { ht: 'Adrès', fr: 'Adresse', en: 'Street Address' },
  city: { ht: 'Vil', fr: 'Ville', en: 'City' },
  department: { ht: 'Depatman', fr: 'Département', en: 'Department' },

  order_review: { ht: 'Revize Komand', fr: 'Révision Commande', en: 'Order Review' },
  place_order: { ht: 'Pase Komand', fr: 'Passer Commande', en: 'Place Order' },
  order_success: { ht: 'Komand Reisi!', fr: 'Commande Réussie!', en: 'Order Success!' },
  order_number: { ht: 'Nimewo Komand', fr: 'Numéro Commande', en: 'Order Number' },
  payment_instructions: { ht: 'Ou pral resevwa enstriksyon peman pa WhatsApp byento', fr: 'Vous recevrez les instructions de paiement via WhatsApp bientôt', en: "You'll receive payment instructions via WhatsApp shortly" },
  send_whatsapp: { ht: 'Voye WhatsApp', fr: 'Envoyer WhatsApp', en: 'Send WhatsApp' },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ht104_language');
    return (saved as Language) || 'ht';
  });

  useEffect(() => {
    localStorage.setItem('ht104_language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
