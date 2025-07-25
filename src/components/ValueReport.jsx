import React from 'react';
import { motion } from 'framer-motion';

function ValueReport({ products }) {
  const totalValue = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
  
  const topValueProducts = products
    .map(product => ({
      ...product,
      totalValue: product.quantity * product.price
    }))
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 10);

  const locationStats = products.reduce((acc, product) => {
    if (!acc[product.location]) {
      acc[product.location] = { count: 0, value: 0, quantity: 0 };
    }
    acc[product.location].count += 1;
    acc[product.location].value += product.quantity * product.price;
    acc[product.location].quantity += product.quantity;
    return acc;
  }, {});

  const supplierStats = products.reduce((acc, product) => {
    if (!acc[product.supplier]) {
      acc[product.supplier] = { count: 0, value: 0, quantity: 0 };
    }
    acc[product.supplier].count += 1;
    acc[product.supplier].value += product.quantity * product.price;
    acc[product.supplier].quantity += product.quantity;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6"
      >
        <h4 className="text-xl font-medium text-gray-900 mb-2">Total Inventory Value</h4>
        <p className="text-3xl font-bold text-blue-700">${totalValue.toLocaleString()}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-50 rounded-lg p-6"
      >
        <h4 className="text-lg font-medium text-gray-900 mb-4">Top 10 Products by Value</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-700">Product</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Quantity</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Unit Price</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Total Value</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {topValueProducts.map(product => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="py-2 text-sm text-gray-900">{product.name}</td>
                  <td className="py-2 text-sm text-gray-700">{product.quantity}</td>
                  <td className="py-2 text-sm text-gray-700">${product.price.toFixed(2)}</td>
                  <td className="py-2 text-sm text-gray-700 font-medium">
                    ${product.totalValue.toLocaleString()}
                  </td>
                  <td className="py-2 text-sm text-gray-700">
                    {((product.totalValue / totalValue) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <h4 className="text-lg font-medium text-gray-900 mb-4">Value by Location</h4>
          <div className="space-y-2">
            {Object.entries(locationStats).map(([location, stats]) => (
              <div key={location} className="flex justify-between items-center">
                <span className="text-sm text-gray-900">{location}</span>
                <span className="text-sm text-gray-700 font-medium">
                  ${stats.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <h4 className="text-lg font-medium text-gray-900 mb-4">Value by Supplier</h4>
          <div className="space-y-2">
            {Object.entries(supplierStats).map(([supplier, stats]) => (
              <div key={supplier} className="flex justify-between items-center">
                <span className="text-sm text-gray-900">{supplier}</span>
                <span className="text-sm text-gray-700 font-medium">
                  ${stats.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ValueReport;