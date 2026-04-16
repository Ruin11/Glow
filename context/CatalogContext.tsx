import React, { createContext, useContext, useState } from 'react';
import { Product, PRODUCTS_MOCK } from '../data/ecommerce_mock';

interface CatalogContextData {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (id: string) => void;
}

const CatalogContext = createContext<CatalogContextData>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
});

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_MOCK);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: Math.random().toString(36).substring(2, 9), // Generamos un ID provisorio
    };
    // Lo agregamos al principio de la lista para verlo rápido
    setProducts((prev) => [product, ...prev]); 
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter(p => p.id !== id));
  };

  return (
    <CatalogContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => useContext(CatalogContext);
