/**
 * Storage utility with expiry time support
 * Stores data with TTL (Time To Live) in localStorage
 */

interface StorageItem {
  value: string;
  expiry: number; // Timestamp in milliseconds
}

/**
 * Store a value in localStorage with expiry time
 * @param key - Storage key
 * @param value - Value to store
 * @param ttl - Time to live in milliseconds
 */
export const setWithExpiry = (key: string, value: string, ttl: number): void => {
  const now = Date.now();
  const item: StorageItem = {
    value,
    expiry: now + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Retrieve a value from localStorage if it hasn't expired
 * @param key - Storage key
 * @returns Value if valid and not expired, null otherwise
 */
export const getWithExpiry = (key: string): string | null => {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item: StorageItem = JSON.parse(itemStr);
    const now = Date.now();

    // Check if item has expired
    if (now > item.expiry) {
      // Remove expired item
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.error(`Error retrieving item from storage: ${key}`, error);
    return null;
  }
};

/**
 * Remove an item from localStorage
 * @param key - Storage key
 */
export const removeFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 * Get remaining time for a storage item
 * @param key - Storage key
 * @returns Remaining time in milliseconds, or 0 if expired/not found
 */
export const getExpiryTime = (key: string): number => {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return 0;
    }

    const item: StorageItem = JSON.parse(itemStr);
    const now = Date.now();
    const remaining = item.expiry - now;

    return remaining > 0 ? remaining : 0;
  } catch (error) {
    console.error(`Error getting expiry time: ${key}`, error);
    return 0;
  }
};
