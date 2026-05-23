import {
  BarChart3,
  Calendar,
  Contact,
  FileText,
  Flag,
  Home,
  Image,
  Info,
  LucideIcon,
  MapPin,
  Newspaper,
  Users,
} from 'lucide-react';

export type AdminRole = 'super-admin' | 'admin' | 'provincial-admin' | 'secretary';

export type WorkflowStatus = 'draft' | 'pending-review' | 'approved' | 'published' | 'changes-requested';

export type CmsPage = {
  id: string;
  title: string;
  path: string;
  owner: 'national' | 'province' | 'system';
  enabled: boolean;
  editableBy: AdminRole[];
  icon: LucideIcon;
};

export const roleProfiles: Record<
  AdminRole,
  {
    label: string;
    description: string;
    canPublishPublicly: boolean;
    canManageAdmins: boolean;
    canApproveProvincialUpdates: boolean;
    canTogglePageAvailability: boolean;
    canOverrideCounters: boolean;
    canManageApiConnections: boolean;
    canDisableDownloadProtection: boolean;
  }
> = {
  'super-admin': {
    label: 'Super Admin',
    description: 'Full access, admin management, final public publishing, page controls, and security toggles.',
    canPublishPublicly: true,
    canManageAdmins: true,
    canApproveProvincialUpdates: true,
    canTogglePageAvailability: true,
    canOverrideCounters: true,
    canManageApiConnections: true,
    canDisableDownloadProtection: true,
  },
  admin: {
    label: 'Admin',
    description: 'National content CRUD, provincial approvals, analytics, media, counters, APIs, and delegated publishing.',
    canPublishPublicly: false,
    canManageAdmins: false,
    canApproveProvincialUpdates: true,
    canTogglePageAvailability: true,
    canOverrideCounters: true,
    canManageApiConnections: true,
    canDisableDownloadProtection: false,
  },
  'provincial-admin': {
    label: 'Provincial Admin',
    description: 'Can update assigned provincial pages, except provincial executive details and images.',
    canPublishPublicly: false,
    canManageAdmins: false,
    canApproveProvincialUpdates: false,
    canTogglePageAvailability: false,
    canOverrideCounters: false,
    canManageApiConnections: false,
    canDisableDownloadProtection: false,
  },
  secretary: {
    label: 'Secretary',
    description: 'Can draft and update articles and media for review before publication.',
    canPublishPublicly: false,
    canManageAdmins: false,
    canApproveProvincialUpdates: false,
    canTogglePageAvailability: false,
    canOverrideCounters: false,
    canManageApiConnections: false,
    canDisableDownloadProtection: false,
  },
};

export const cmsPages: CmsPage[] = [
  { id: 'home', title: 'Home', path: '/', owner: 'national', enabled: true, editableBy: ['super-admin', 'admin'], icon: Home },
  { id: 'about', title: 'About', path: '/about', owner: 'national', enabled: true, editableBy: ['super-admin', 'admin'], icon: Info },
  { id: 'provinces', title: 'Provincial Pages', path: '/provinces/:province', owner: 'province', enabled: true, editableBy: ['super-admin', 'admin', 'provincial-admin'], icon: MapPin },
  { id: 'executives', title: 'Executives', path: '/executives', owner: 'national', enabled: true, editableBy: ['super-admin', 'admin'], icon: Users },
  { id: 'events', title: 'Events', path: '/events', owner: 'national', enabled: true, editableBy: ['super-admin', 'admin'], icon: Calendar },
  { id: 'membership', title: 'Membership', path: '/membership', owner: 'national', enabled: true, editableBy: ['super-admin', 'admin'], icon: Users },
  { id: 'donate', title: 'Donations', path: '/donate', owner: 'national', enabled: true, editableBy: ['super-admin', 'admin'], icon: Flag },
  { id: 'news', title: 'News & Articles', path: '/news', owner: 'national', enabled: true, editableBy: ['super-admin', 'admin', 'secretary'], icon: Newspaper },
  { id: 'gallery', title: 'Media Gallery', path: '/gallery', owner: 'national', enabled: true, editableBy: ['super-admin', 'admin', 'secretary'], icon: Image },
  { id: 'projects', title: 'Special Projects', path: '/projects', owner: 'national', enabled: true, editableBy: ['super-admin', 'admin'], icon: FileText },
  { id: 'analytics', title: 'Analytics', path: '/analytics', owner: 'system', enabled: true, editableBy: ['super-admin', 'admin'], icon: BarChart3 },
  { id: 'contact', title: 'Contact', path: '/contact', owner: 'national', enabled: true, editableBy: ['super-admin', 'admin'], icon: Contact },
];

export const pendingContent = [
  {
    id: 'prov-ontario-hero',
    title: 'Ontario chapter service update',
    submittedBy: 'Ontario Provincial Admin',
    area: 'Ontario page',
    status: 'pending-review' as WorkflowStatus,
    summary: 'Updated chapter activities, local chapters, and event schedule. Executive section locked.',
  },
  {
    id: 'secretary-article-001',
    title: 'Renewed Hope town hall recap',
    submittedBy: 'Secretary',
    area: 'News & Articles',
    status: 'approved' as WorkflowStatus,
    summary: 'Article draft with two embedded images and one video block ready for final publication.',
  },
  {
    id: 'prov-bc-projects',
    title: 'British Columbia project gallery',
    submittedBy: 'British Columbia Provincial Admin',
    area: 'Provincial media',
    status: 'changes-requested' as WorkflowStatus,
    summary: 'Needs corrected captions before approval.',
  },
];

export const editableCounters = [
  { id: 'members', label: 'Active Members', autoValue: '2,547', overrideValue: '2,500+' },
  { id: 'provinces', label: 'Provinces', autoValue: '10', overrideValue: '10' },
  { id: 'events', label: 'Events', autoValue: '50', overrideValue: '50+' },
  { id: 'projects', label: 'Projects Completed', autoValue: '100', overrideValue: '100+' },
];

export const apiConnections = [
  { id: 'apc', name: 'APC National News API', endpoint: 'https://api.example.org/apc/news', status: 'Connected' },
  { id: 'gov', name: 'Government Achievements Dataset', endpoint: 'https://api.example.org/achievements', status: 'Token required' },
  { id: 'events', name: 'Partner Events Feed', endpoint: 'https://api.example.org/events', status: 'Connected' },
];

export const articleMediaPlacements = [
  'Left panel with text wrap',
  'Right panel with text wrap',
  'Full-width media block',
  'Inline middle image',
  'Video embed between paragraphs',
  'Side-by-side gallery',
];
