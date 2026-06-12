import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type DownloadProtectionProps = {
  disabledBySuperAdmin?: boolean;
};

export function DownloadProtection({ disabledBySuperAdmin = false }: DownloadProtectionProps) {
  const location = useLocation();
  const [shieldVisible, setShieldVisible] = useState(false);
  const analyticsPage = location.pathname.startsWith('/analytics');
  const adminPage = location.pathname.startsWith('/admin');
  const protectionEnabled = !analyticsPage && !adminPage && !disabledBySuperAdmin;

  useEffect(() => {
    document.body.dataset.protection = protectionEnabled ? 'enabled' : 'disabled';

    if (!protectionEnabled) {
      return;
    }

    const blockContextMenu = (event: MouseEvent) => event.preventDefault();
    const blockCopy = (event: Event) => event.preventDefault();
    const blockShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const protectedCombo =
        key === 'printscreen' ||
        (event.ctrlKey && ['s', 'p', 'u'].includes(key)) ||
        (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key));

      if (protectedCombo) {
        event.preventDefault();
        if (key === 'printscreen') {
          setShieldVisible(true);
          window.setTimeout(() => setShieldVisible(false), 1500);
        }
      }
    };
    const protectWhenHidden = () => setShieldVisible(document.hidden);
    const protectOnBlur = () => setShieldVisible(true);
    const restoreOnFocus = () => setShieldVisible(false);

    window.addEventListener('contextmenu', blockContextMenu);
    window.addEventListener('keydown', blockShortcuts);
    window.addEventListener('copy', blockCopy);
    window.addEventListener('cut', blockCopy);
    window.addEventListener('dragstart', blockCopy);
    window.addEventListener('blur', protectOnBlur);
    window.addEventListener('focus', restoreOnFocus);
    document.addEventListener('visibilitychange', protectWhenHidden);

    return () => {
      window.removeEventListener('contextmenu', blockContextMenu);
      window.removeEventListener('keydown', blockShortcuts);
      window.removeEventListener('copy', blockCopy);
      window.removeEventListener('cut', blockCopy);
      window.removeEventListener('dragstart', blockCopy);
      window.removeEventListener('blur', protectOnBlur);
      window.removeEventListener('focus', restoreOnFocus);
      document.removeEventListener('visibilitychange', protectWhenHidden);
    };
  }, [protectionEnabled]);

  if (!protectionEnabled) return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[45] overflow-hidden opacity-[0.055]" aria-hidden="true">
        <div className="grid h-full grid-cols-2 content-around gap-20 -rotate-12 text-center text-xl font-bold uppercase tracking-[0.35em] text-black md:grid-cols-4">
          {Array.from({ length: 20 }, (_, index) => <span key={index}>CBMC Protected</span>)}
        </div>
      </div>
      {shieldVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white">
          <p className="px-6 text-center text-lg font-semibold">Protected content hidden while capture tools may be active.</p>
        </div>
      )}
    </>
  );
}
