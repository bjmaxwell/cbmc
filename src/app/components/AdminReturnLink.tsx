import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function AdminReturnLink() {
  const location = useLocation();
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    setShowLink(window.localStorage.getItem('cbmc-admin-preview') === 'active');
  }, [location.pathname]);

  if (!showLink || location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <Link
      to="/admin"
      className="fixed bottom-4 left-4 z-50 text-sm text-[#1a8000] underline underline-offset-4 bg-white/90 px-3 py-2 shadow-sm border border-gray-200"
    >
      Back to admin
    </Link>
  );
}
