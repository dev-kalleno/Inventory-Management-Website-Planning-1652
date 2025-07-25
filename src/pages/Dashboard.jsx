import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useInventory } from '../context/InventoryContext';
import StatsCard from '../components/StatsCard';
import RecentMovements from '../components/RecentMovements';
import LowStockAlert from '../components/LowStockAlert';
import InventoryChart from '../components/InventoryChart';

const { FiPackage, FiTrendingDown, FiDollarSign, FiAlertTriangle } = FiIcons;

function Dashboard() {
  const { state } = useInventory();
  const { products, movements } = state;

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
  const lowStockItems = products.filter(product => product.quantity <= product.reorderLevel).length;
  const recentMovements = movements.slice(0, 5);

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: FiPackage,
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Value',
      value: `$${totalValue.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'green',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      title: 'Low Stock Items',
      value: lowStockItems,
      icon: FiAlertTriangle,
      color: 'red',
      change: '-5%',
      changeType: 'negative'
    },
    {
      title: 'Recent Movements',
      value: movements.length,
      icon: FiTrendingDown,
      color: 'purple',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your inventory management system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InventoryChart products={products} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <LowStockAlert products={products} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <RecentMovements movements={recentMovements} products={products} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Dashboard;