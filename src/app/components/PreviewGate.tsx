import { FormEvent, ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';

type PreviewGateProps = {
  children: ReactNode;
};

const previewEnabled = import.meta.env.VITE_PREVIEW_GATE_ENABLED === 'true';
const accessCodes = String(import.meta.env.VITE_PREVIEW_ACCESS_CODES || 'cbmc-review-2026')
  .split(',')
  .map((code) => code.trim())
  .filter(Boolean);

export function PreviewGate({ children }: PreviewGateProps) {
  const location = useLocation();
  const [code, setCode] = useState('');
  const [granted, setGranted] = useState(() => window.localStorage.getItem('cbmc-preview-access') === 'granted');

  if (!previewEnabled || granted || location.pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (accessCodes.includes(code.trim())) {
      window.localStorage.setItem('cbmc-preview-access', 'granted');
      setGranted(true);
      return;
    }
    alert('Invalid preview access code.');
  };

  return (
    <div className="min-h-screen bg-[#f4f7f2] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white border border-gray-200 shadow-lg p-8 rounded-sm">
        <img src="/brand/cbm.png" alt="City Boy Movement" className="w-24 h-24 object-contain mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#000000] text-center mb-2">Preview Access</h1>
        <p className="text-gray-600 text-center mb-6">Enter the temporary review code shared by the CBMC team.</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Preview code"
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#1a8000] focus:border-transparent"
          />
          <button type="submit" className="w-full bg-[#1a8000] text-white py-3 rounded-sm hover:bg-[#156600] transition-colors font-semibold">
            Enter Preview
          </button>
        </form>
      </div>
    </div>
  );
}
