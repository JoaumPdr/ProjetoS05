import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Plus, Minus, Trash2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import CartPage from './CartPage';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

const RestaurantPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<Array<{ item: MenuItem; quantity: number }>>([]);
  const [showCart, setShowCart] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

  const categories: Category[] = [
    { id: 'massas', name: 'Massas', icon: '🍝' },
    { id: 'pizzas', name: 'Pizzas', icon: '🍕' },
    { id: 'carnes', name: 'Carnes', icon: '🥩' },
    { id: 'lanches', name: 'Lanches', icon: '🍔' },
    { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
    { id: 'sobremesas', name: 'Sobremesas', icon: '🍰' },
  ];

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'X-Salada',
      description: 'Hambúrguer artesanal, alface, tomate, queijo e maionese especial',
      price: 26.00,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
      category: 'lanches'
    },
    {
      id: '2',
      name: 'Pizza Margherita',
      description: 'Molho de tomate, mussarela, manjericão fresco e azeite',
      price: 45.00,
      image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
      category: 'pizzas'
    },
    {
      id: '3',
      name: 'Espaguete à Carbonara',
      description: 'Massa fresca, pancetta, ovo, queijo pecorino e pimenta preta',
      price: 38.00,
      image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
      category: 'massas'
    },
    {
      id: '4',
      name: 'Picanha Grelhada',
      description: 'Picanha premium, arroz, farofa e vinagrete',
      price: 65.00,
      image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg',
      category: 'carnes'
    },
    {
      id: '5',
      name: 'Milk Shake',
      description: 'Shake cremoso de chocolate com chantilly',
      price: 18.00,
      image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg',
      category: 'bebidas'
    },
    {
      id: '6',
      name: 'Brownie com Sorvete',
      description: 'Brownie caseiro com sorvete de baunilha e calda quente',
      price: 22.00,
      image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg',
      category: 'sobremesas'
    }
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = !activeCategory || item.category === activeCategory;
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => [...prev, { item, quantity: itemQuantity }]);
    setSelectedItem(null);
    setItemQuantity(1);
  };

  const clearCart = () => {
    setCartItems([]);
    setShowCart(false);
  };

  if (showCart) {
    return <CartPage items={cartItems} onClearCart={clearCart} />;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDark ? 'bg-gray-800' : 'bg-red-500'} p-4 text-white`}>
        <div className="flex items-center">
          <button onClick={() => navigate('/')} className="p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold mx-auto">INAFOOD</h1>
        </div>
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Qual comida você está procurando?"
            className={`w-full py-2 pl-10 pr-4 rounded-lg ${
              isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-800'
            }`}
          />
        </div>
      </header>

      {/* Categories */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(prev => prev === category.id ? null : category.id)}
              className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} 
                p-4 rounded-lg shadow-sm border
                ${activeCategory === category.id ? 'border-red-500' : ''} 
                flex flex-col items-center gap-2`}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 pb-24">
        {filteredItems.length === 0 ? (
          <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-8`}>
            <p>Nenhum item encontrado</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <motion.div
              key={item.id}
              className={`mb-4 ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              } rounded-lg shadow-sm border overflow-hidden`}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="flex gap-4 p-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {item.name}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    {item.description}
                  </p>
                  <p className="text-green-500 font-semibold mt-2">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Item Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className={`absolute bottom-0 w-full ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } rounded-t-xl p-4`}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className={`text-xl font-semibold mt-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {selectedItem.name}
              </h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                {selectedItem.description}
              </p>
              <p className="text-green-500 font-semibold mt-2">
                R$ {selectedItem.price.toFixed(2)}
              </p>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button 
                    className={`p-2 rounded-full ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                    onClick={() => setItemQuantity(prev => Math.max(1, prev - 1))}
                  >
                    <Minus size={20} className={isDark ? 'text-white' : 'text-gray-600'} />
                  </button>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {itemQuantity}
                  </span>
                  <button 
                    className={`p-2 rounded-full ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                    onClick={() => setItemQuantity(prev => prev + 1)}
                  >
                    <Plus size={20} className={isDark ? 'text-white' : 'text-gray-600'} />
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(selectedItem)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg"
                >
                  Adicionar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Button */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-4 left-4 right-4"
        >
          <button
            onClick={() => setShowCart(true)}
            className="w-full bg-red-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <span>Ver Carrinho</span>
            <span className="bg-red-600 px-2 py-1 rounded">
              {cartItems.length}
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default RestaurantPage;