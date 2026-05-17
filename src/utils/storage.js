function resolveStorage(storageOrGetter) {
  try {
    if (typeof storageOrGetter === "function") {
      return storageOrGetter();
    }
    return storageOrGetter;
  } catch {
    return null;
  }
}

export function getSessionStorage() {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function getLocalStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function safeStorageGet(storageOrGetter, key) {
  try {
    const storage = resolveStorage(storageOrGetter);
    if (!storage) return null;
    return storage.getItem(key);
  } catch {
    return null;
  }
}

export function safeStorageSet(storageOrGetter, key, value) {
  try {
    const storage = resolveStorage(storageOrGetter);
    if (!storage) return false;
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function safeStorageRemove(storageOrGetter, key) {
  try {
    const storage = resolveStorage(storageOrGetter);
    if (!storage) return false;
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
