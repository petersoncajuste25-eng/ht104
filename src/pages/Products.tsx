import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { Product, Category } from '@/types';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

export function Products() {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [loading, setLoading] = useState(true);

  const categories: (Category | 'All')[] = [
    'All',
    'Electronics',
    'Clothing',
    'Home & Living',
    'Beauty & Care',
    'Sports',
    'Bags',
    'Tools',
    'Kids & Baby',
    'Jewelry',
    'Other',
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory, language]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p[`name_${language}`].toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  };

  const getCategoryKey = (category: string) => {
    return 'category_' + category.toLowerCase().replace(/\s+&\s+/g, '_').replace(/\s+/g, '_');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
          {t('nav_products')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-900">
                  {t('search_products')}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={t('search_products')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-900">
                  {t('all_categories')}
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#1e40af] text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category === 'All' ? t('all_categories') : t(getCategoryKey(category))}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <p className="text-gray-600">
                  {language === 'ht' && 'Pa gen pwodwi'}
                  {language === 'fr' && 'Aucun produit'}
                  {language === 'en' && 'No products found'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-xl transition-shadow">
                    <div className="aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product[`name_${language}`]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
                        {product[`name_${language}`]}
                      </h3>
                      <p className="text-2xl font-bold text-[#1e40af] mb-2">
                        {formatPrice(product.price)}
                      </p>
                      <Badge
                        className={
                          product.status === 'in_stock'
                            ? 'bg-[#10b981] hover:bg-[#10b981]/90'
                            : 'bg-orange-500 hover:bg-orange-500/90'
                        }
                      >
                        {t(`status_${product.status}`)}
                      </Badge>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link to={`/products/${product.id}`} className="w-full">
                        <Button className="w-full bg-[#1e40af] hover:bg-[#1e40af]/90">
                          {t('view_details')}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
