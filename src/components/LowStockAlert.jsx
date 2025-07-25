import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAlertTriangle, FiPackage } = FiIcons;

function LowStockAlert({ products }) {
  const lowStockProducts = products.filter(product => product.quantity <= product.reorderLevel);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiAlertTriangle} className="text-red-500" />
          <h3 className="text-lg font-medium text-gray-900">Low Stock Alert</h3>
          {lowStockProducts.length > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {lowStockProducts.length}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        {lowStockProducts.length === 0 ? (
          <div className="text-center py-8">
            <SafeIcon icon={FiPackage} className="mx-auto text-4xl text-green-500 mb-3" />
            <p className="text-gray-500">All products are well stocked!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lowStockProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">
                    {product.quantity} left
                  </p>
                  <p className="text-xs text-gray-500">
                    Reorder at {product.reorderLevel}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LowStockAlert;