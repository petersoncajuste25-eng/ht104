import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice } from '@/lib/utils';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'black', hex: '#000000' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'red', hex: '#EF4444' },
  { name: 'blue', hex: '#3B82F6' },
  { name: 'green', hex: '#10B981' },
  { name: 'yellow', hex: '#F59E0B' },
  { name: 'gray', hex: '#6B7280' },
  { name: 'pink', hex: '#EC4899' },
];

interface Variant {
  size?: string;
  color?: string;
  quantity: number;
}

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [variants, setVariants] = useState<Variant[]>([{ quantity: 1 }]);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        navigate('/products');
        return;
      }
      setProduct(data);
      if (data.has_variants) {
        setVariants([{ size: undefined, color: undefined, quantity: 1 }]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateVariant = (index: number, field: keyof Variant, value: any) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { size: undefined, color: undefined, quantity: 1 }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.has_variants) {
      for (const variant of variants) {
        if (!variant.size || !variant.color) {
          alert(
            language === 'ht'
              ? 'Tanpri chwazi gwosè ak koulè'
              : language === 'fr'
              ? 'Veuillez choisir taille et couleur'
              : 'Please select size and color'
          );
          return;
        }
        addItem(product, variant.quantity, variant.size, variant.color);
      }
    } else {
      addItem(product, variants[0].quantity);
    }

    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!product) return null;

  const images = [product.image_url, ...(product.thumbnail_urls || [])];
  const upfrontPayment = product.price / 2;
  const deliveryPayment = product.price / 2;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-4">
              <div className="aspect-square">
                <img
                  src={images[selectedImage]}
                  alt={product[`name_${language}`]}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      selectedImage === idx ? 'ring-2 ring-[#1e40af]' : ''
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              {product[`name_${language}`]}
            </h1>
            <p className="text-4xl font-bold text-[#1e40af] mb-4">
              {formatPrice(product.price)}
            </p>
            <Badge
              className={`mb-6 ${
                product.status === 'in_stock'
                  ? 'bg-[#10b981] hover:bg-[#10b981]/90'
                  : 'bg-orange-500 hover:bg-orange-500/90'
              }`}
            >
              {t(`status_${product.status}`)}
            </Badge>

            <p className="text-gray-600 mb-6">{product[`description_${language}`]}</p>
            <p className="text-sm text-gray-500 mb-6">
              {t(`category_${product.category.toLowerCase().replace(/\s+&\s+/g, '_').replace(/\s+/g, '_')}`)}
            </p>

            {product.has_variants ? (
              <div className="space-y-6 mb-6">
                {variants.map((variant, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-900">
                        {language === 'ht' && `Varyant ${index + 1}`}
                        {language === 'fr' && `Variante ${index + 1}`}
                        {language === 'en' && `Variant ${index + 1}`}
                      </h3>
                      {variants.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVariant(index)}
                        >
                          {t('remove')}
                        </Button>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-gray-900">
                        {t('select_size')}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SIZES.map((size) => (
                          <button
                            key={size}
                            onClick={() => updateVariant(index, 'size', size)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all ${
                              variant.size === size
                                ? 'border-[#1e40af] bg-[#1e40af] text-white'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {t(`size_${size.toLowerCase()}`)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-gray-900">
                        {t('select_color')}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {COLORS.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => updateVariant(index, 'color', color.name)}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${
                              variant.color === color.name
                                ? 'border-[#1e40af] scale-110'
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={t(`color_${color.name}`)}
                          />
                        ))}
                      </div>
                      {variant.color && (
                        <p className="text-sm text-gray-600 mt-2">
                          {t(`color_${variant.color}`)}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900">
                        {t('quantity')}
                      </label>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateVariant(index, 'quantity', Math.max(1, variant.quantity - 1))
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-xl font-semibold w-12 text-center">
                          {variant.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateVariant(index, 'quantity', variant.quantity + 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addVariant} className="w-full">
                  {t('add_variant')}
                </Button>
              </div>
            ) : (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  {t('quantity')}
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateVariant(0, 'quantity', Math.max(1, variants[0].quantity - 1))
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {variants[0].quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateVariant(0, 'quantity', variants[0].quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2 text-gray-900">{t('payment_breakdown')}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#10b981] font-medium">{t('upfront_50')}</span>
                  <span className="font-semibold">{formatPrice(upfrontPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-500 font-medium">{t('delivery_50')}</span>
                  <span className="font-semibold">{formatPrice(deliveryPayment)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-bold">{t('total')}</span>
                  <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-[#10b981] hover:bg-[#10b981]/90 text-white py-6 text-lg"
            >
              {t('add_to_cart')}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="description" className="bg-white rounded-xl shadow-md p-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">
              {language === 'ht' && 'Deskripsyon'}
              {language === 'fr' && 'Description'}
              {language === 'en' && 'Description'}
            </TabsTrigger>
            <TabsTrigger value="payment">
              {language === 'ht' && 'Kondisyon Peman'}
              {language === 'fr' && 'Conditions Paiement'}
              {language === 'en' && 'Payment Terms'}
            </TabsTrigger>
            <TabsTrigger value="delivery">
              {language === 'ht' && 'Enfòmasyon Livrezon'}
              {language === 'fr' && 'Infos Livraison'}
              {language === 'en' && 'Delivery Info'}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-gray-600">{product[`description_${language}`]}</p>
          </TabsContent>
          <TabsContent value="payment" className="mt-4">
            <div className="text-gray-600 space-y-2">
              <p>
                {language === 'ht' &&
                  'Nou aksepte peman 50/50. Peye 50% lè w pase kòmand la ak Moncash oswa Natcash, epi 50% restan an lè w resevwa pwodwi a.'}
                {language === 'fr' &&
                  'Nous acceptons le paiement 50/50. Payez 50% lors de la commande avec Moncash ou Natcash, et les 50% restants à la réception du produit.'}
                {language === 'en' &&
                  'We accept 50/50 payment. Pay 50% when placing the order with Moncash or Natcash, and the remaining 50% when you receive the product.'}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="delivery" className="mt-4">
            <div className="text-gray-600 space-y-2">
              <p>
                {language === 'ht' &&
                  'Pwodwi disponib yo rive nan 2-3 jou. Pwodwi sou komand yo pran 2 semèn. Ou ka chwazi pou vin pran pwodwi a (gratis) oswa livrezon (frè aplike).'}
                {language === 'fr' &&
                  'Les produits disponibles arrivent en 2-3 jours. Les produits sur commande prennent 2 semaines. Vous pouvez choisir de récupérer le produit (gratuit) ou la livraison (frais appliqués).'}
                {language === 'en' &&
                  'In-stock products arrive in 2-3 days. On-order products take 2 weeks. You can choose to pick up the product (free) or delivery (fee applies).'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
