import { useState, useEffect, useCallback, useMemo } from 'react';

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    searchTime: 0,
    toolsLoaded: 0,
    lastUpdate: Date.now()
  });

  const updateMetric = useCallback((metric: string, value: number) => {
    setMetrics(prev => ({
      ...prev,
      [metric]: value,
      lastUpdate: Date.now()
    }));
  }, []);

  const getMemoryInfo = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
      };
    }
    return null;
  }, []);

  return { metrics, updateMetric, getMemoryInfo };
};

// Debounce hook for search optimization
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Data pagination hook
export const useDataPagination = (data: any[], itemsPerPage: number = 1000) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return {
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
    totalItems: data.length
  };
};

// Virtual scrolling hook for large lists
export const useVirtualList = (
  items: any[],
  containerHeight: number,
  itemHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    items.length - 1
  );

  const visibleItems = items.slice(visibleStart, visibleEnd + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
    visibleStart,
    visibleEnd
  };
}; 