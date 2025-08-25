"use client";

export function useLocalStorage(key: string) {
  function setItem(value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  }

  function getItem() {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (e) {
      console.log(e);
    }
  }

  function removeItem() {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  }

  return { getItem, setItem, removeItem };
}
