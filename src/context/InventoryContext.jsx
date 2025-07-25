import React, { createContext, useContext, useReducer, useEffect } from 'react';

const InventoryContext = createContext();

const initialState = {
  products: [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      sku: 'MBP-16-001',
      category: 'Electronics',
      quantity: 25,
      price: 2499.99,
      reorderLevel: 10,
      supplier: 'Apple Inc.',
      location: 'Warehouse A',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      sku: 'WM-001',
      category: 'Electronics',
      quantity: 150,
      price: 29.99,
      reorderLevel: 50,
      supplier: 'Logitech',
      location: 'Warehouse B',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Office Chair',
      sku: 'OC-ERG-001',
      category: 'Furniture',
      quantity: 8,
      price: 199.99,
      reorderLevel: 15,
      supplier: 'Herman Miller',
      location: 'Warehouse A',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 4,
      name: 'USB-C Cable',
      sku: 'USBC-001',
      category: 'Electronics',
      quantity: 200,
      price: 19.99,
      reorderLevel: 100,
      supplier: 'Anker',
      location: 'Warehouse C',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 5,
      name: 'Standing Desk',
      sku: 'SD-ADJ-001',
      category: 'Furniture',
      quantity: 5,
      price: 599.99,
      reorderLevel: 10,
      supplier: 'FlexiSpot',
      location: 'Warehouse A',
      lastUpdated: new Date().toISOString()
    }
  ],
  movements: [
    {
      id: 1,
      productId: 1,
      type: 'IN',
      quantity: 10,
      reason: 'Purchase Order #PO-001',
      date: new Date(Date.now() - 86400000).toISOString(),
      user: 'John Smith'
    },
    {
      id: 2,
      productId: 2,
      type: 'OUT',
      quantity: 25,
      reason: 'Sales Order #SO-045',
      date: new Date(Date.now() - 172800000).toISOString(),
      user: 'Sarah Johnson'
    },
    {
      id: 3,
      productId: 3,
      type: 'OUT',
      quantity: 2,
      reason: 'Office Setup',
      date: new Date(Date.now() - 259200000).toISOString(),
      user: 'Mike Davis'
    }
  ],
  categories: ['Electronics', 'Furniture', 'Office Supplies', 'Hardware'],
  suppliers: ['Apple Inc.', 'Logitech', 'Herman Miller', 'Anker', 'FlexiSpot'],
  locations: ['Warehouse A', 'Warehouse B', 'Warehouse C']
};

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, { ...action.payload, id: Date.now() }]
      };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    
    case 'ADD_MOVEMENT':
      const movement = { ...action.payload, id: Date.now() };
      const updatedProducts = state.products.map(product => {
        if (product.id === movement.productId) {
          const newQuantity = movement.type === 'IN' 
            ? product.quantity + movement.quantity
            : product.quantity - movement.quantity;
          return {
            ...product,
            quantity: Math.max(0, newQuantity),
            lastUpdated: new Date().toISOString()
          };
        }
        return product;
      });
      
      return {
        ...state,
        products: updatedProducts,
        movements: [movement, ...state.movements]
      };

    // Category management
    case 'ADD_CATEGORY':
      // Don't add if already exists
      if (state.categories.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        categories: [...state.categories, action.payload].sort()
      };

    case 'UPDATE_CATEGORY':
      const { oldItem: oldCategory, newItem: newCategory } = action.payload;
      return {
        ...state,
        categories: state.categories.map(cat => 
          cat === oldCategory ? newCategory : cat
        ).sort(),
        products: state.products.map(product =>
          product.category === oldCategory 
            ? { ...product, category: newCategory }
            : product
        )
      };

    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(cat => cat !== action.payload.item)
      };

    // Supplier management
    case 'ADD_SUPPLIER':
      // Don't add if already exists
      if (state.suppliers.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload].sort()
      };

    case 'UPDATE_SUPPLIER':
      const { oldItem: oldSupplier, newItem: newSupplier } = action.payload;
      return {
        ...state,
        suppliers: state.suppliers.map(sup => 
          sup === oldSupplier ? newSupplier : sup
        ).sort(),
        products: state.products.map(product =>
          product.supplier === oldSupplier 
            ? { ...product, supplier: newSupplier }
            : product
        )
      };

    case 'DELETE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.filter(sup => sup !== action.payload.item)
      };

    // Location management
    case 'ADD_LOCATION':
      // Don't add if already exists
      if (state.locations.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        locations: [...state.locations, action.payload].sort()
      };

    case 'UPDATE_LOCATION':
      const { oldItem: oldLocation, newItem: newLocation } = action.payload;
      return {
        ...state,
        locations: state.locations.map(loc => 
          loc === oldLocation ? newLocation : loc
        ).sort(),
        products: state.products.map(product =>
          product.location === oldLocation 
            ? { ...product, location: newLocation }
            : product
        )
      };

    case 'DELETE_LOCATION':
      return {
        ...state,
        locations: state.locations.filter(loc => loc !== action.payload.item)
      };
    
    case 'LOAD_DATA':
      return action.payload;
    
    default:
      return state;
  }
}

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  useEffect(() => {
    const savedData = localStorage.getItem('inventoryData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('inventoryData', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [state]);

  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}