import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useInventory } from '../context/InventoryContext';
import AddItemModal from './AddItemModal';
import EditItemModal from './EditItemModal';

const { FiPlus, FiEdit2, FiTrash2, FiPackage, FiTruck, FiMapPin, FiCheck } = FiIcons;

function ManagementSection({ type, data, title }) {
  const { dispatch } = useInventory();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [notification, setNotification] = useState(null);

  const getIcon = () => {
    switch (type) {
      case 'categories': return FiPackage;
      case 'suppliers': return FiTruck;
      case 'locations': return FiMapPin;
      default: return FiPackage;
    }
  };

  const getColorClass = () => {
    switch (type) {
      case 'categories': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'suppliers': return 'bg-green-100 text-green-800 border-green-200';
      case 'locations': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item}"?`)) {
      dispatch({
        type: 'DELETE_ITEM',
        payload: { type: type.toUpperCase().slice(0, -1), item }
      });
      showNotification(`${title.slice(0, -1)} "${item}" deleted successfully`);
    }
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const IconComponent = getIcon();

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`p-4 rounded-lg border flex items-center space-x-2 ${
            notification.type === 'success' 
              ? 'bg-green-50 text-green-800 border-green-200' 
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          <SafeIcon icon={FiCheck} className="text-lg" />
          <span>{notification.message}</span>
        </motion.div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={IconComponent} className="text-2xl text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
        <motion.button
          onClick={handleAdd}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SafeIcon icon={FiPlus} className="text-sm" />
          <span className="font-medium">Add {title.slice(0, -1)}</span>
        </motion.button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12">
          <SafeIcon icon={IconComponent} className="mx-auto text-6xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No {title.toLowerCase()} found</p>
          <p className="text-gray-400 text-sm mt-2">Click the "Add {title.slice(0, -1)}" button to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`border rounded-lg p-4 hover:shadow-md transition-all duration-200 ${getColorClass()}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={IconComponent} className="text-lg" />
                  <span className="font-medium text-gray-900">{item}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-primary-600 hover:text-primary-800 p-1 rounded transition-colors duration-200"
                    title="Edit"
                  >
                    <SafeIcon icon={FiEdit2} className="text-sm" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-600 hover:text-red-800 p-1 rounded transition-colors duration-200"
                    title="Delete"
                  >
                    <SafeIcon icon={FiTrash2} className="text-sm" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <AddItemModal
          type={type}
          onClose={handleCloseModals}
        />
      )}

      {isEditModalOpen && (
        <EditItemModal
          type={type}
          item={editingItem}
          onClose={handleCloseModals}
        />
      )}
    </div>
  );
}

export default ManagementSection;