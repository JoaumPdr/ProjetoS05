import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  location?: string;
  time?: string;
  organizer?: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Feira Tecnológica INATEL",
    date: "20-22 Maio, 2025",
    description: "Exposição de projetos inovadores desenvolvidos por alunos e pesquisadores.",
    image: "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg",
    location: "Campus INATEL",
    time: "09:00 - 18:00",
    organizer: "Departamento de Inovação"
  },
  {
    id: 2,
    title: "Hackathon INATEL",
    date: "15 Junho, 2025",
    description: "Maratona de programação com foco em soluções IoT.",
    image: "https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg",
    location: "Prédio 1",
    time: "08:00 - 20:00",
    organizer: "Departamento de Computação"
  },
  {
    id: 3,
    title: "Workshop 5G",
    date: "30 Maio, 2025",
    description: "Palestra sobre as últimas inovações em tecnologia 5G.",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    location: "Auditório Principal",
    time: "14:00 - 17:00",
    organizer: "Departamento de Telecomunicações"
  }
];

const EventCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showDetails, setShowDetails] = React.useState(false);
  const { isDark } = useTheme();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  React.useEffect(() => {
    if (!showDetails) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [showDetails]);

  return (
    <div className="relative w-full mt-8 overflow-hidden rounded-xl">
      <div className="relative h-[300px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
            onClick={() => setShowDetails(true)}
          >
            <div className="relative h-full cursor-pointer">
              <img
                src={events[currentIndex].image}
                alt={events[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{events[currentIndex].title}</h3>
                <p className="text-sm opacity-90 mb-1">{events[currentIndex].date}</p>
                <p className="text-sm opacity-80">{events[currentIndex].description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg rounded-xl overflow-hidden ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img
                src={events[currentIndex].image}
                alt={events[currentIndex].title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {events[currentIndex].title}
                  </h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className={`p-2 rounded-full hover:bg-gray-100 ${
                      isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <X size={20} className={isDark ? 'text-white' : 'text-gray-600'} />
                  </button>
                </div>
                
                <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p className="font-medium">
                    <span className="font-bold">Data:</span> {events[currentIndex].date}
                  </p>
                  <p className="font-medium">
                    <span className="font-bold">Horário:</span> {events[currentIndex].time}
                  </p>
                  <p className="font-medium">
                    <span className="font-bold">Local:</span> {events[currentIndex].location}
                  </p>
                  <p className="font-medium">
                    <span className="font-bold">Organizador:</span> {events[currentIndex].organizer}
                  </p>
                  <p className="mt-4">{events[currentIndex].description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventCarousel;