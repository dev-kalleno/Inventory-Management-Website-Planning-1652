import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';

const { FiTrendingUp, FiTrendingDown, FiClock } = FiIcons;

function RecentMovements({ movements, products }) {
  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiClock} className="text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">Recent Movements</h3>
        </div>
      </div>

      <div className="p-6">
        {movements.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent movements</p>
        ) : (
          <div className="space-y-4">
            {movements.map((movement, index) => (
              <motion.div
                key={movement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    movement.type === 'IN' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    <SafeIcon 
                      icon={movement.type === 'IN' ? FiTrendingUp : FiTrendingDown} 
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {getProductName(movement.productId)}
                    </p>
                    <p className="text-sm text-gray-500">{movement.reason}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`font-medium ${
                    movement.type === 'IN' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {movement.type === 'IN' ? '+' : '-'}{movement.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(movement.date), 'MMM dd, yyyy')}
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

export default RecentMovements;