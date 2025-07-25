import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiX, FiAlertCircle } = FiIcons;

function NotificationToast({ notification, onClose }) {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success': return FiCheck;
      case 'error': return FiAlertCircle;
      default: return FiCheck;
    }
  };

  const getStyles = () => {
    switch (notification.type) {
      case 'success': return 'bg-green-50 text-green-800 border-green-200';
      case 'error': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -50, x: '-50%' }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg border shadow-lg flex items-center space-x-3 min-w-80 ${getStyles()}`}
    >
      <SafeIcon icon={getIcon()} className="text-xl flex-shrink-0" />
      <span className="flex-1">{notification.message}</span>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <SafeIcon icon={FiX} className="text-lg" />
      </button>
    </motion.div>
  );
}

export default NotificationToast;