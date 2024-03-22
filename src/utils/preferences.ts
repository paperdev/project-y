import { iBookmark } from '@/shared/interface/bookmark';
import { Preferences as themePreferences } from '@capacitor/preferences';
import { Preferences as bookmarksPreferences } from '@capacitor/preferences';

const GROUP_THEME = 'theme';
const GROUP_BOOKMARKS = 'bookmarks';
const KEY_THEME = 'theme';

const initThemePreferences = async () => {
  return themePreferences.configure(
    {
      group: GROUP_THEME
    }
  );
}

const initBookmarksPreferences = async () => {
  return bookmarksPreferences.configure(
    {
      group: GROUP_BOOKMARKS
    }
  );
}

const getTheme = async () => {
  await initThemePreferences();
  const { value } = await themePreferences.get({ key: KEY_THEME });
  return value;
}

const setTheme = async (theme: 'light' | 'dark') => {
  await initThemePreferences();
  return themePreferences.set({
    key: KEY_THEME,
    value: theme
  });
}

const getBookmarkList = async () => {
  await initBookmarksPreferences();
  
  const { keys } = await bookmarksPreferences.keys();
  if (0 === keys.length) {
    return [];
  }
  
  return Promise.all(
    keys.map(async (key: string) => {
      const { value } = await bookmarksPreferences.get({ key: key });
      if (!value) {
        return;
      }

      return JSON.parse(value);
    })
  );
}

const getBookmark = async (key: string) => {
  await initBookmarksPreferences();
  const { value } = await bookmarksPreferences.get({ key: key });
  return value;
}

const addBookmark = async (key: string, value: iBookmark) => {
  await initBookmarksPreferences();
  return bookmarksPreferences.set({
    key: key,
    value: JSON.stringify(value),
  });
}

const deleteBookmark = async (key: string) => {
  await initBookmarksPreferences();
  return bookmarksPreferences.remove({key: key});
}

export { 
  getTheme,
  setTheme,
  getBookmarkList,
  getBookmark,
  addBookmark,
  deleteBookmark,
};
