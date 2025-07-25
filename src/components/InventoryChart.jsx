import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBarChart3 } = FiIcons;

function InventoryChart({ products }) {
  const categoryData = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.quantity;
    return acc;
  }, {});

  const maxQuantity = Math.max(...Object.values(categoryData));
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'];

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiBarChart3} className="text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">Inventory by Category</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {Object.entries(categoryData).map(([category, quantity], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="w-24 text-sm font-medium text-gray-700">
                {category}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${colors[index % colors.length]}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(quantity / maxQuantity) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
              <div className="w-16 text-sm font-medium text-gray-900 text-right">
                {quantity}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InventoryChart;