import { useEffect } from 'react';

interface UseKeyboardShortcutProps {
  key: string;
  callback: () => void;
  modifier?: 'cmd' | 'ctrl';
  preventDefault?: boolean;
}

export const useKeyboardShortcut = ({
  key,
  callback,
  modifier = 'cmd',
  preventDefault = true
}: UseKeyboardShortcutProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== key.toLowerCase()) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifierKey = isMac ? event.metaKey : event.ctrlKey;
      
      if (!modifierKey) return;

      if (preventDefault) {
        event.preventDefault();
      }

      callback();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback, modifier, preventDefault]);
}; 