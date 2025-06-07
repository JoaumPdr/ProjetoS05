import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, DollarSign, Utensils, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import WidgetCard from '../components/WidgetCard';
import CalendarPopup from '../components/CalendarPopup';
import EventCarousel from '../components/EventCarousel';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCalendar, setSelectedCalendar] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'food') {
      navigate('/restaurant');
    }
  };

  const calendarData = {
    provas: [
      { date: '15 de Maio, 2025', title: 'Cálculo II', details: 'Sala 305 - Derivadas e Integrais' },
      { date: '20 de Maio, 2025', title: 'Física III', details: 'Sala 201 - Eletromagnetismo' },
      { date: '25 de Maio, 2025', title: 'Programação', details: 'Lab 3 - Estruturas de Dados' },
    ],
    aulas: [
      { date: 'Amanhã, 8:00', title: 'Lab. de Programação', details: 'Sala 203 - Arrays e Listas' },
      { date: 'Amanhã, 10:00', title: 'Cálculo II', details: 'Sala 305 - Integrais Múltiplas' },
      { date: 'Amanhã, 14:00', title: 'Física III', details: 'Sala 201 - Campo Elétrico' },
    ],
    trabalhos: [
      { date: '10 de Maio, 2025', title: 'Trabalho de Pesquisa', details: 'Física - Campo Magnético' },
      { date: '12 de Maio, 2025', title: 'Projeto Final', details: 'Programação - App Mobile' },
      { date: '18 de Maio, 2025', title: 'Relatório', details: 'Lab de Física - Experimento 3' },
    ],
  };

  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'finance', icon: DollarSign, label: 'Financeiro' },
    { id: 'food', icon: Utensils, label: 'Restaurante' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'} flex flex-col max-w-[430px] mx-auto`}>
      {/* Header */}
      <header className={`${isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-inatel-light to-inatel-medium'} p-4 text-white flex justify-between items-center`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2"
          onClick={toggleTheme}
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
        <h1 className="text-xl font-bold">Portal INATEL</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          className="p-2"
        >
          <LogOut size={24} />
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col items-center">
        {/* Profile Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 mb-10 flex flex-col items-center"
        >
          <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white shadow-lg overflow-hidden">
            <div className="w-full h-full bg-inatel-medium flex items-center justify-center text-white text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
          <h2 className={`mt-4 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {user?.name || 'Usuário'}
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
            {user?.email || 'usuario@exemplo.com'}
          </p>
        </motion.div>

        {/* Widgets */}
        <div className="w-full space-y-4">
          <WidgetCard 
            title="Próxima Prova" 
            date="15 de Maio, 2025" 
            details="Cálculo II - Sala 305" 
            icon="📝"
            color={isDark ? "bg-gray-700" : "bg-gray-200"}
            onClick={() => setSelectedCalendar('provas')}
          />
          
          <WidgetCard 
            title="Próxima Aula" 
            date="Amanhã, 8:00" 
            details="Lab. de Programação - Sala 203" 
            icon="🎓"
            color={isDark ? "bg-gray-700" : "bg-gray-200"}
            onClick={() => setSelectedCalendar('aulas')}
          />
          
          <WidgetCard 
            title="Entrega de Trabalho" 
            date="10 de Maio, 2025" 
            details="Trabalho de Pesquisa - Física" 
            icon="📚"
            color={isDark ? "bg-gray-700" : "bg-gray-200"}
            onClick={() => setSelectedCalendar('trabalhos')}
          />
        </div>

        {/* Event Carousel */}
        <EventCarousel />
      </main>

      {/* Navigation Menu */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-black'} text-white p-2 rounded-full mx-4 mb-4 shadow-lg`}>
        <div className="flex justify-around items-center">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative p-3 rounded-full ${
                activeTab === tab.id ? 'text-white' : 'text-gray-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <tab.icon size={24} />
              <AnimatePresence>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-inatel-light rounded-full -z-10"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 500,
                      damping: 40,
                      mass: 1
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Calendar Popups */}
      <CalendarPopup
        isOpen={selectedCalendar === 'provas'}
        onClose={() => setSelectedCalendar(null)}
        title="Calendário de Provas"
        items={calendarData.provas}
      />
      <CalendarPopup
        isOpen={selectedCalendar === 'aulas'}
        onClose={() => setSelectedCalendar(null)}
        title="Calendário de Aulas"
        items={calendarData.aulas}
      />
      <CalendarPopup
        isOpen={selectedCalendar === 'trabalhos'}
        onClose={() => setSelectedCalendar(null)}
        title="Lista de Trabalhos"
        items={calendarData.trabalhos}
      />
    </div>
  );
};

export default HomePage;