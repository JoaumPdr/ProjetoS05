import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trash2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartPageProps {
  items: CartItem[];
  onClearCart: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ items, onClearCart }) => {
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [password, setPassword] = useState('');

  const total = items.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);

  const handleConfirmOrder = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    setShowPasswordModal(false);
    setShowConfirmation(true);
    setTimeout(() => {
      onClearCart();
      setShowConfirmation(false);
      navigate('/restaurant');
    }, 2000);
  };

  if (showConfirmation) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-red-500 flex flex-col items-center justify-center text-white p-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center mb-6">
            <Check size={32} />
          </div>
        </motion.div>
        <h2 className="text-2xl font-bold mb-4">Pedido confirmado</h2>
        <p className="text-white/90">
          O seu pedido foi enviado para a cozinha, agora aguarde alguns minutos, por gentileza
        </p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-500 p-4 text-white">
        <div className="flex items-center">
          <button onClick={() => navigate('/restaurant')} className="p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold ml-2">Mesa/Comanda 08</h1>
          <div className="ml-auto text-sm">Pedido 036</div>
        </div>
      </header>

      <div className="p-4">
        {items.map(({ item, quantity }, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm mb-4 p-4">
            <div className="flex gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{item.name}</h3>
                  <button className="text-red-500">
                    <Trash2 size={20} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-500 font-semibold">
                    R$ {item.price.toFixed(2)}
                  </span>
                  <span>Qtd: {quantity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Total</span>
          <span className="text-green-500 font-bold text-xl">
            R$ {total.toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleConfirmOrder}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
        >
          Continuar
        </button>
      </div>

      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-sm"
            >
              <h3 className="text-xl font-semibold mb-2">Senha do Pedido</h3>
              <p className="text-gray-500 text-sm mb-4">
                Se você não tem, por favor, solicite ajuda a um Garçom
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Informe a senha"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;