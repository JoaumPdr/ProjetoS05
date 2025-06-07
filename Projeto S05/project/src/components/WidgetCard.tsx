import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface WidgetCardProps {
  title: string;
  date: string;
  details: string;
  icon: string;
  color: string;
  onClick: () => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, date, details, icon, color, onClick }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-md cursor-pointer w-full max-w-sm mx-auto`}
    >
      <div className="flex">
        <div className={`${color} w-16 flex-shrink-0 flex items-center justify-center text-white text-2xl`}>
          {icon}
        </div>
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{date}</span>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>{details}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WidgetCard;