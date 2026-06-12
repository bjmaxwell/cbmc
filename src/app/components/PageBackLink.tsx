import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function PageBackLink() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPreview = window.localStorage.getItem('cbmc-admin-preview') === 'active';

  if (location.pathname === '/' || location.pathname.startsWith('/admin') || isAdminPreview) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => navigate(location.key === 'default' ? '/' : -1)}
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 text-sm text-[#1a8000] bg-white/95 px-3 py-2 shadow-sm border border-gray-200 rounded-sm"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );
}
