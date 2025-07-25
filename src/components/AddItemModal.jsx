import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useInventory } from '../context/InventoryContext';

const { FiX, FiPlus } = FiIcons;

function AddItemModal({ type, onClose }) {
  const { state, dispatch } = useInventory();
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState('');

  const getTitle = () => {
    switch (type) {
      case 'categories': return 'Add Category';
      case 'suppliers': return 'Add Supplier';
      case 'locations': return 'Add Location';
      default: return 'Add Item';
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'categories': return 'Enter category name (e.g., Electronics, Furniture)';
      case 'suppliers': return 'Enter supplier name (e.g., Apple Inc., Amazon)';
      case 'locations': return 'Enter location name (e.g., Warehouse A, Office)';
      default: return 'Enter item name';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!itemName.trim()) {
      setError('Item name is required');
      return;
    }

    // Check for duplicates based on type
    const currentData = state[type] || [];
    if (currentData.includes(itemName.trim())) {
      setError(`This ${type.slice(0, -1)} already exists`);
      return;
    }

    const actionType = `ADD_${type.toUpperCase().slice(0, -1)}`;
    
    dispatch({
      type: actionType,
      payload: itemName.trim()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder={getPlaceholder()}
              autoFocus
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 flex items-center space-x-2 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiPlus} />
              <span>Add {type.slice(0, -1).charAt(0).toUpperCase() + type.slice(1, -1)}</span>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AddItemModal;