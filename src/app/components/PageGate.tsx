import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cmsPages } from '../data/cms';

type PageGateProps = {
  pageId: string;
  children: ReactNode;
};

export function PageGate({ pageId, children }: PageGateProps) {
  const page = cmsPages.find((item) => item.id === pageId);

  if (!page || page.enabled) {
    return <>{children}</>;
  }

  return (
    <section className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-xl text-center bg-white border border-gray-200 shadow-md p-8 rounded-sm">
        <h1 className="text-3xl font-bold text-[#000000] mb-3">Page temporarily unavailable</h1>
        <p className="text-gray-600 mb-6">
          This page is currently disabled by an administrator while content is reviewed.
        </p>
        <Link to="/" className="inline-flex bg-[#1a8000] text-white px-6 py-3 rounded-sm font-semibold">
          Return Home
        </Link>
      </div>
    </section>
  );
}
