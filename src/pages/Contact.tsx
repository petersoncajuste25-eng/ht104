import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Contact() {
  const { language } = useLanguage();

  const title = {
    ht: 'Kontakte Nou',
    fr: 'Contactez-Nous',
    en: 'Contact Us',
  };

  const subtitle = {
    ht: 'Gen kesyon? Nou la pou ede w!',
    fr: 'Des questions? Nous sommes là pour vous aider!',
    en: 'Have questions? We\'re here to help!',
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {language === 'ht' && 'Voye Nou yon Mesaj'}
              {language === 'fr' && 'Envoyez-nous un Message'}
              {language === 'en' && 'Send Us a Message'}
            </h2>
            <form className="space-y-6 bg-white p-8 rounded-xl shadow-md">
              <div>
                <Label htmlFor="name">
                  {language === 'ht' && 'Non'}
                  {language === 'fr' && 'Nom'}
                  {language === 'en' && 'Name'}
                </Label>
                <Input id="name" placeholder="" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">
                  {language === 'ht' && 'Imel'}
                  {language === 'fr' && 'Email'}
                  {language === 'en' && 'Email'}
                </Label>
                <Input id="email" type="email" placeholder="" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="phone">
                  {language === 'ht' && 'Telefòn'}
                  {language === 'fr' && 'Téléphone'}
                  {language === 'en' && 'Phone'}
                </Label>
                <Input id="phone" placeholder="+509" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="message">
                  {language === 'ht' && 'Mesaj'}
                  {language === 'fr' && 'Message'}
                  {language === 'en' && 'Message'}
                </Label>
                <textarea
                  id="message"
                  rows={5}
                  className="mt-2 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <Button type="submit" className="w-full bg-[#1e40af] hover:bg-[#1e40af]/90">
                {language === 'ht' && 'Voye Mesaj'}
                {language === 'fr' && 'Envoyer Message'}
                {language === 'en' && 'Send Message'}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {language === 'ht' && 'Enfòmasyon Kontak'}
                {language === 'fr' && 'Informations Contact'}
                {language === 'en' && 'Contact Information'}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1e40af] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {language === 'ht' && 'Telefòn'}
                      {language === 'fr' && 'Téléphone'}
                      {language === 'en' && 'Phone'}
                    </h3>
                    <p className="text-gray-600">+509 XXXX-XXXX</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1e40af] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-gray-600">+509 XXXX-XXXX</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1e40af] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">support@ht104.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1e40af] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {language === 'ht' && 'Adrès'}
                      {language === 'fr' && 'Adresse'}
                      {language === 'en' && 'Address'}
                    </h3>
                    <p className="text-gray-600">Port-au-Prince, Haiti</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e40af] text-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">
                {language === 'ht' && 'Èdtan Disponib'}
                {language === 'fr' && 'Heures Disponibles'}
                {language === 'en' && 'Business Hours'}
              </h3>
              <div className="space-y-2">
                <p>
                  {language === 'ht' && 'Lendi - Vandredi: 8:00 AM - 6:00 PM'}
                  {language === 'fr' && 'Lundi - Vendredi: 8:00 AM - 6:00 PM'}
                  {language === 'en' && 'Monday - Friday: 8:00 AM - 6:00 PM'}
                </p>
                <p>
                  {language === 'ht' && 'Samdi: 9:00 AM - 2:00 PM'}
                  {language === 'fr' && 'Samedi: 9:00 AM - 2:00 PM'}
                  {language === 'en' && 'Saturday: 9:00 AM - 2:00 PM'}
                </p>
                <p>
                  {language === 'ht' && 'Dimanch: Fèmen'}
                  {language === 'fr' && 'Dimanche: Fermé'}
                  {language === 'en' && 'Sunday: Closed'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
