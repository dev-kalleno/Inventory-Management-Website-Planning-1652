import React from 'react';
import { motion } from 'framer-motion';
import { format, subDays, isAfter } from 'date-fns';

function MovementReport({ movements, products }) {
  const last30Days = subDays(new Date(), 30);
  const recentMovements = movements.filter(movement => 
    isAfter(new Date(movement.date), last30Days)
  );

  const inMovements = recentMovements.filter(m => m.type === 'IN');
  const outMovements = recentMovements.filter(m => m.type === 'OUT');

  const totalIn = inMovements.reduce((sum, m) => sum + m.quantity, 0);
  const totalOut = outMovements.reduce((sum, m) => sum + m.quantity, 0);

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  const topMovements = recentMovements
    .slice(0, 10)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <h4 className="text-lg font-medium text-blue-900 mb-2">Total Movements (30 days)</h4>
          <p className="text-2xl font-bold text-blue-700">{recentMovements.length}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <h4 className="text-lg font-medium text-green-900 mb-2">Stock In</h4>
          <p className="text-2xl font-bold text-green-700">+{totalIn}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <h4 className="text-lg font-medium text-red-900 mb-2">Stock Out</h4>
          <p className="text-2xl font-bold text-red-700">-{totalOut}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-50 rounded-lg p-6"
      >
        <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Movements</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Product</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Quantity</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Reason</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">User</th>
              </tr>
            </thead>
            <tbody>
              {topMovements.map(movement => (
                <tr key={movement.id} className="border-b border-gray-100">
                  <td className="py-2 text-sm text-gray-700">
                    {format(new Date(movement.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="py-2 text-sm text-gray-900">
                    {getProductName(movement.productId)}
                  </td>
                  <td className="py-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      movement.type === 'IN' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {movement.type === 'IN' ? 'Stock In' : 'Stock Out'}
                    </span>
                  </td>
                  <td className="py-2 text-sm text-gray-700">
                    {movement.type === 'IN' ? '+' : '-'}{movement.quantity}
                  </td>
                  <td className="py-2 text-sm text-gray-700">{movement.reason}</td>
                  <td className="py-2 text-sm text-gray-700">{movement.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

export default MovementReport;