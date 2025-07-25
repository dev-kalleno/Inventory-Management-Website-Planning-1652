import React from 'react';
import { motion } from 'framer-motion';

function InventoryReport({ products }) {
  const totalValue = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
  const lowStockItems = products.filter(product => product.quantity <= product.reorderLevel);
  
  const categoryStats = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = { count: 0, value: 0, quantity: 0 };
    }
    acc[product.category].count += 1;
    acc[product.category].value += product.quantity * product.price;
    acc[product.category].quantity += product.quantity;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <h4 className="text-lg font-medium text-blue-900 mb-2">Total Products</h4>
          <p className="text-2xl font-bold text-blue-700">{products.length}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <h4 className="text-lg font-medium text-green-900 mb-2">Total Value</h4>
          <p className="text-2xl font-bold text-green-700">${totalValue.toLocaleString()}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <h4 className="text-lg font-medium text-red-900 mb-2">Low Stock Items</h4>
          <p className="text-2xl font-bold text-red-700">{lowStockItems.length}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-50 rounded-lg p-6"
      >
        <h4 className="text-lg font-medium text-gray-900 mb-4">Category Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-700">Category</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Products</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Total Quantity</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Total Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(categoryStats).map(([category, stats]) => (
                <tr key={category} className="border-b border-gray-100">
                  <td className="py-2 text-sm text-gray-900">{category}</td>
                  <td className="py-2 text-sm text-gray-700">{stats.count}</td>
                  <td className="py-2 text-sm text-gray-700">{stats.quantity}</td>
                  <td className="py-2 text-sm text-gray-700">${stats.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {lowStockItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6"
        >
          <h4 className="text-lg font-medium text-red-900 mb-4">Low Stock Alert</h4>
          <div className="space-y-2">
            {lowStockItems.map(product => (
              <div key={product.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-900">{product.name}</span>
                <span className="text-sm text-red-600 font-medium">
                  {product.quantity} left (reorder at {product.reorderLevel})
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default InventoryReport;