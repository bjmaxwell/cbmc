import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type DownloadProtectionProps = {
  disabledBySuperAdmin?: boolean;
};

export function DownloadProtection({ disabledBySuperAdmin = false }: DownloadProtectionProps) {
  const location = useLocation();
  const analyticsPage = location.pathname.startsWith('/analytics');
  const protectionEnabled = !analyticsPage && !disabledBySuperAdmin;

  useEffect(() => {
    document.body.dataset.protection = protectionEnabled ? 'enabled' : 'disabled';

    if (!protectionEnabled) {
      return;
    }

    const blockContextMenu = (event: MouseEvent) => event.preventDefault();
    const blockShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const protectedCombo =
        key === 'printscreen' ||
        (event.ctrlKey && ['s', 'p', 'u'].includes(key)) ||
        (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key));

      if (protectedCombo) {
        event.preventDefault();
      }
    };

    window.addEventListener('contextmenu', blockContextMenu);
    window.addEventListener('keydown', blockShortcuts);

    return () => {
      window.removeEventListener('contextmenu', blockContextMenu);
      window.removeEventListener('keydown', blockShortcuts);
    };
  }, [protectionEnabled]);

  return null;
}
