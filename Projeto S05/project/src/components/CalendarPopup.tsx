import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface CalendarItem {
  date: string;
  title: string;
  details: string;
}

interface CalendarPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: CalendarItem[];
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({ isOpen, onClose, title, items }) => {
  const { isDark } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-xl overflow-hidden ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}
          >
            <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} px-6 py-4 flex justify-between items-center`}>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-full hover:${isDark ? 'bg-gray-700' : 'bg-gray-200'} transition-colors`}
              >
                <X className={isDark ? 'text-white' : 'text-gray-600'} size={20} />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`mb-4 p-4 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-gray-50'
                  } last:mb-0`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {item.title}
                    </h3>
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.date}
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendarPopup;