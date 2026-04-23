import { iBookmark } from '@/shared/interface/bookmark';

const GROUP_THEME = 'theme';
const GROUP_BOOKMARKS = 'bookmarks';
const KEY_THEME = 'theme';

const storageKey = (group: string, key: string) => `${group}:${key}`;

const getTheme = async () => {
  return localStorage.getItem(storageKey(GROUP_THEME, KEY_THEME));
}

const setTheme = async (theme: 'light' | 'dark') => {
  localStorage.setItem(storageKey(GROUP_THEME, KEY_THEME), theme);
}

const getBookmarkList = async () => {
  const prefix = `${GROUP_BOOKMARKS}:`;
  const values: iBookmark[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k || !k.startsWith(prefix)) continue;
    const raw = localStorage.getItem(k);
    if (!raw) continue;
    try {
      values.push(JSON.parse(raw));
    } catch {}
  }

  return values;
}

const getBookmark = async (key: string) => {
  return localStorage.getItem(storageKey(GROUP_BOOKMARKS, key));
}

const addBookmark = async (key: string, value: iBookmark) => {
  localStorage.setItem(storageKey(GROUP_BOOKMARKS, key), JSON.stringify(value));
}

const deleteBookmark = async (key: string) => {
  localStorage.removeItem(storageKey(GROUP_BOOKMARKS, key));
}

const deleteAllBookmark = async () => {
  const prefix = `${GROUP_BOOKMARKS}:`;
  const toDelete: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) toDelete.push(k);
  }
  toDelete.forEach((k) => localStorage.removeItem(k));
}

export { 
  getTheme,
  setTheme,
  getBookmarkList,
  getBookmark,
  addBookmark,
  deleteBookmark,
  deleteAllBookmark,
};
