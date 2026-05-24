import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  CheckCircle2,
  DatabaseZap,
  FileSpreadsheet,
  FileText,
  Globe2,
  Image as ImageIcon,
  KeyRound,
  LayoutDashboard,
  Linkedin,
  Lock,
  Mail,
  MonitorSmartphone,
  PanelLeft,
  PanelRight,
  Plus,
  Save,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import {
  AdminRole,
  apiConnections,
  articleMediaPlacements,
  cmsPages,
  editableCounters,
  pendingContent,
  roleProfiles,
} from '../data/cms';

type SectionId =
  | 'overview'
  | 'content'
  | 'approvals'
  | 'media'
  | 'people'
  | 'pages'
  | 'analytics'
  | 'integrations'
  | 'mobile'
  | 'settings';

const demoSuperUsername = import.meta.env.VITE_DEMO_SUPER_USERNAME ?? 'super';
const demoSuperPassword = import.meta.env.VITE_DEMO_SUPER_PASSWORD ?? 'super';

type LoginProfile = {
  name: string;
  password: string;
  role: AdminRole;
  mustChangePassword?: boolean;
};

type ProvinceDraft = {
  id: string;
  name: string;
  slug: string;
  message: string;
  activities: string;
  heroImageUrl: string;
  activeMembers: number;
  annualEvents: number;
  localChapterCnt: number;
  isEnabled: boolean;
};

type ExecutiveDraft = {
  id: string;
  name: string;
  position: string;
  province: string;
  bio: string;
  email: string;
  linkedinUrl: string;
  imageUrl: string;
};

const initialProvinceDrafts: ProvinceDraft[] = [
  ['Ontario', 'ontario'],
  ['Alberta', 'alberta'],
  ['British Columbia', 'british-columbia'],
  ['Quebec', 'quebec'],
  ['Manitoba', 'manitoba'],
  ['Saskatchewan', 'saskatchewan'],
  ['Nova Scotia', 'nova-scotia'],
  ['New Brunswick', 'new-brunswick'],
  ['Newfoundland And Labrador', 'newfoundland-and-labrador'],
  ['Prince Edward Island', 'prince-edward-island'],
].map(([name, slug]) => ({
  id: slug,
  name,
  slug,
  message: `Welcome to the CBM ${name} chapter. Use this field for the provincial coordinator's message.`,
  activities: `Summarize current ${name} outreach, membership, events, and community activities here.`,
  heroImageUrl: '',
  activeMembers: 475,
  annualEvents: 24,
  localChapterCnt: 4,
  isEnabled: true,
}));

const initialCredentials: Record<string, LoginProfile> = {
  bjmaxwell: { name: 'Olu Maxwell', password: '3x3BHg-WpF_8A-ecwYrA', role: 'super-admin', mustChangePassword: true },
  badebayo: { name: 'Adebayo Adedosu', password: 'goO2mw-knIucg-UnUiMQ', role: 'admin', mustChangePassword: true },
  [demoSuperUsername.toLowerCase()]: { name: 'Demo Super Admin', password: demoSuperPassword, role: 'super-admin' },
  admin: { name: 'Demo Admin', password: 'admin', role: 'admin' },
  province: { name: 'Demo Provincial Admin', password: 'province', role: 'provincial-admin' },
  secretary: { name: 'Demo Secretary', password: 'secretary', role: 'secretary' },
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeUser, setActiveUser] = useState<LoginProfile | null>(null);
  const [passwordChangeRequired, setPasswordChangeRequired] = useState(false);
  const [newPassword, setNewPassword] = useState({ password: '', confirm: '' });
  const [activeRole, setActiveRole] = useState<AdminRole>('super-admin');
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [adminPublishingEnabled, setAdminPublishingEnabled] = useState(false);
  const [downloadProtectionEnabled, setDownloadProtectionEnabled] = useState(true);
  const [carouselOpacity, setCarouselOpacity] = useState(50);
  const [pageState, setPageState] = useState(() => cmsPages);
  const [editingPageId, setEditingPageId] = useState(cmsPages[0]?.id ?? '');
  const [contentDrafts, setContentDrafts] = useState(() =>
    Object.fromEntries(
      cmsPages.map((page) => [
        page.id,
        {
          title: page.title,
          route: page.path,
          headline: `${page.title} headline`,
          body: `Editable content for ${page.title}. Replace this draft with the public page copy, media notes, and publishing instructions.`,
          status: page.enabled ? 'Published' : 'Disabled',
        },
      ]),
    ),
  );
  const [contentSaveMessage, setContentSaveMessage] = useState('');
  const [selectedArticleLayouts, setSelectedArticleLayouts] = useState<string[]>(articleMediaPlacements);
  const [executives, setExecutives] = useState([
    {
      id: 'exec-1',
      name: 'Adebayo Adedosu',
      position: 'Country Director',
      province: '',
      bio: 'Leading CBM Canada with vision and dedication to community excellence.',
      email: 'adebayo.adedosu@cityboymovementcanada.org',
      linkedinUrl: '',
      imageUrl: '/uploads/1779572252381-img-20260115-wa0166.jpg',
    },
    {
      id: 'exec-2',
      name: 'Tolulope Awogbemi',
      position: 'Deputy Country Director',
      province: '',
      bio: 'Leading CBM Canada with vision and dedication to community excellence.',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-3',
      name: 'Sheyi Akinwale',
      position: 'General Secretary',
      province: '',
      bio: 'Driving strategic initiatives and membership growth across Canada.',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-4',
      name: 'Afoluke Juwape',
      position: 'Assistant Secretary',
      province: '',
      bio: 'Managing organizational operations and communications.',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-5',
      name: 'Ibraheem Haruna',
      position: 'Strategy and Planning',
      province: '',
      bio: 'Ensuring financial transparency and accountability.',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-6',
      name: 'Tosin Adeda',
      position: 'Youth Leader',
      province: '',
      bio: 'Coordinating community programs and special projects.',
      email: '',
      linkedinUrl: '',
      imageUrl: '/uploads/1779571933087-fb_img_1779571781439.jpg',
    },
    {
      id: 'exec-7',
      name: 'Lotanna Dennis',
      position: "Students' Community Contact Lead",
      province: '',
      bio: 'Managing media relations and public outreach.',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-8',
      name: 'Aishat Aliyu Adeleke',
      position: 'Women Leader',
      province: '',
      bio: 'Planning and executing memorable community events.',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-9',
      name: 'Ifeoluwa Leo-Olagbaye',
      position: 'Assistant Woman Leader',
      province: '',
      bio: 'Building and nurturing our membership community.',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-10',
      name: 'Jide Adeyemi',
      position: 'Contact and Mobilization Officer',
      province: '',
      bio: 'Empowering young Canadians through mentorship programs.',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-11',
      name: 'Engr. Abdul Rafiu Badru',
      position: 'Director, Local Canvassing',
      province: '',
      bio: 'Driving digital innovation and technological advancement.',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-12',
      name: 'Babawale Lookman',
      position: 'Assistant Director, Local Canvassing',
      province: '',
      bio: 'Building positive relationships with stakeholders and media.',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-13',
      name: 'Bola Oduyale',
      position: 'Director, Finance',
      province: '',
      bio: 'Leading community service and social impact initiatives.',
      email: 'finance@cityboymovementcanada.org',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-14',
      name: 'Dolapo Conteh',
      position: 'Treasurer',
      province: '',
      bio: '',
      email: 'finance@cityboymovementcanada.org',
      linkedinUrl: '',
      imageUrl: '/uploads/1779572703057-conteh.jpeg',
    },
    {
      id: 'exec-15',
      name: 'Gideon Adedokun',
      position: 'Welfare and Logistics',
      province: '',
      bio: '',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-16',
      name: 'BJ',
      position: 'Director, IT and Projects',
      province: '',
      bio: '',
      email: 'admin@cityboymovementcanada.org',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-17',
      name: 'Wale Balogun',
      position: 'Director, Membership Data',
      province: '',
      bio: '',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-18',
      name: 'Bolatito Adebola',
      position: 'Director, Information & Media Relations',
      province: '',
      bio: '',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-19',
      name: 'Risikat Bello',
      position: 'Director, Digital Media Communication',
      province: '',
      bio: '',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-20',
      name: 'George Chima',
      position: 'Director, Event Planning & Management',
      province: '',
      bio: '',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-21',
      name: 'Adetokunbo Adediran',
      position: 'Director, Program Research',
      province: '',
      bio: '',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-22',
      name: 'Kunle Ogundijo',
      position: 'Director, Fundraising',
      province: '',
      bio: '',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-23',
      name: 'Wale Rabiu',
      position: 'Director, Sponsorship',
      province: '',
      bio: '',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
    {
      id: 'exec-24',
      name: 'Adewale Donald',
      position: 'Liaison, Nigeria Entertainment Group',
      province: '',
      bio: '',
      email: '',
      linkedinUrl: '',
      imageUrl: '',
    },
  ]);
  const [counters, setCounters] = useState(() => editableCounters);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'admin' as AdminRole, province: '', photoUrl: '' });
  const [memberImportFile, setMemberImportFile] = useState('');
  const [provinceDrafts, setProvinceDrafts] = useState<ProvinceDraft[]>(initialProvinceDrafts);
  const [provinceExecutives, setProvinceExecutives] = useState<Record<string, ExecutiveDraft[]>>({});
  const [provinceSaveMessage, setProvinceSaveMessage] = useState('');

  const role = roleProfiles[activeRole];
  const canPublish = activeRole === 'super-admin' || (activeRole === 'admin' && adminPublishingEnabled);

  useEffect(() => {
    if (!isAuthenticated) return;

    fetch('/api/pages')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((pages) => {
        if (!Array.isArray(pages)) return;
        setPageState((current) =>
          current.map((page) => {
            const dbPage = pages.find((item) => item.slug === page.id);
            return dbPage
              ? {
                  ...page,
                  title: dbPage.title,
                  path: dbPage.route,
                  enabled: dbPage.isEnabled,
                }
              : page;
          }),
        );
        setContentDrafts((drafts) => {
          const next = { ...drafts };
          for (const page of pages) {
            next[page.slug] = {
              title: page.title,
              route: page.route,
              headline: page.headline || page.title,
              body: page.body || '',
              status: page.status || (page.isEnabled ? 'PUBLISHED' : 'DRAFT'),
            };
          }
          return next;
        });
      })
      .catch(() => undefined);

    fetch('/api/executives')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((items) => {
        if (Array.isArray(items) && items.length > 0) {
          setExecutives(items);
        }
      })
      .catch(() => undefined);

    fetch('/api/provinces')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((items) => {
        if (Array.isArray(items) && items.length > 0) {
          setProvinceDrafts(items);
          Promise.all(
            items.map((province) =>
              fetch(`/api/provinces/${province.slug}/executives`)
                .then((response) => (response.ok ? response.json() : []))
                .then((executives) => [province.slug, Array.isArray(executives) ? executives : []] as const),
            ),
          )
            .then((entries) => setProvinceExecutives(Object.fromEntries(entries)))
            .catch(() => undefined);
        }
      })
      .catch(() => undefined);
  }, [isAuthenticated]);

  const visibleSections = useMemo(() => {
    const sections: { id: SectionId; label: string; icon: typeof LayoutDashboard }[] = [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'content', label: 'Content CRUD', icon: FileText },
      { id: 'approvals', label: 'Approvals', icon: CheckCircle2 },
      { id: 'media', label: 'Media', icon: ImageIcon },
      { id: 'people', label: 'Admins & Roles', icon: Users },
      { id: 'pages', label: 'Pages', icon: Globe2 },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'integrations', label: 'API Connections', icon: DatabaseZap },
      { id: 'mobile', label: 'Mobile App', icon: MonitorSmartphone },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return sections.filter((section) => {
      if (section.id === 'people') return role.canManageAdmins || activeRole === 'admin';
      if (section.id === 'integrations') return role.canManageApiConnections;
      if (section.id === 'settings') return activeRole === 'super-admin' || activeRole === 'admin';
      return true;
    });
  }, [activeRole, role.canManageAdmins, role.canManageApiConnections]);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    const username = credentials.username.toLowerCase();
    const profile = getLoginProfile(username);

    if (profile && profile.password === credentials.password) {
      setActiveRole(profile.role);
      setActiveUser({ ...profile, name: profile.name });
      if (profile.mustChangePassword) {
        setPasswordChangeRequired(true);
        return;
      }
      setIsAuthenticated(true);
      return;
    }

    alert('Invalid login details. Use the seeded admin credentials or a demo account.');
  };

  const handlePasswordChange = (event: FormEvent) => {
    event.preventDefault();

    if (newPassword.password.length < 10) {
      alert('Please choose a password with at least 10 characters.');
      return;
    }

    if (newPassword.password !== newPassword.confirm) {
      alert('The passwords do not match.');
      return;
    }

    const username = credentials.username.toLowerCase();
    const overrides = getStoredPasswordOverrides();
    overrides[username] = {
      password: newPassword.password,
      mustChangePassword: false,
    };
    window.localStorage.setItem('cbmc-admin-password-overrides', JSON.stringify(overrides));
    setPasswordChangeRequired(false);
    setIsAuthenticated(true);
  };

  const updateContentDraft = (pageId: string, field: 'title' | 'route' | 'headline' | 'body' | 'status', value: string) => {
    setContentDrafts((drafts) => ({
      ...drafts,
      [pageId]: {
        ...drafts[pageId],
        [field]: value,
      },
    }));
    setContentSaveMessage('');
  };

  const updateExecutive = (id: string, field: 'name' | 'position' | 'province' | 'bio' | 'email' | 'linkedinUrl' | 'imageUrl', value: string) => {
    setExecutives((items) => items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    setContentSaveMessage('');
  };

  const updateProvinceDraft = (slug: string, field: keyof Omit<ProvinceDraft, 'id' | 'name' | 'slug'>, value: string | number | boolean) => {
    setProvinceDrafts((items) => items.map((item) => (item.slug === slug ? { ...item, [field]: value } : item)));
    setProvinceSaveMessage('');
  };

  const updateProvinceExecutive = (slug: string, id: string, field: keyof ExecutiveDraft, value: string) => {
    setProvinceExecutives((groups) => ({
      ...groups,
      [slug]: (groups[slug] || []).map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
    setProvinceSaveMessage('');
  };

  const addProvinceExecutive = (province: ProvinceDraft) => {
    setProvinceExecutives((groups) => ({
      ...groups,
      [province.slug]: [
        ...(groups[province.slug] || []),
        {
          id: `province-exec-${Date.now()}`,
          name: 'New Provincial Executive',
          position: 'Position',
          province: province.name,
          bio: '',
          email: '',
          linkedinUrl: '',
          imageUrl: '',
        },
      ],
    }));
  };

  const removeProvinceExecutive = (slug: string, id: string) => {
    setProvinceExecutives((groups) => ({
      ...groups,
      [slug]: (groups[slug] || []).filter((item) => item.id !== id),
    }));
  };

  const addExecutive = () => {
    setExecutives((items) => [
      ...items,
      {
        id: `exec-${Date.now()}`,
        name: 'New Executive',
        position: 'Position',
        province: '',
        bio: '',
        email: '',
        linkedinUrl: '',
        imageUrl: '',
      },
    ]);
  };

  const savePageDraft = async (pageId: string) => {
    const draft = contentDrafts[pageId];
    const response = await fetch(`/api/pages/${pageId}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title: draft.title,
        route: draft.route,
        headline: draft.headline,
        body: draft.body,
        status: draft.status,
        isEnabled: draft.status !== 'DISABLED' && draft.status !== 'Disabled',
      }),
    });

    if (!response.ok) throw new Error('Unable to save page');
    const updated = await response.json();
    setPageState((pages) =>
      pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              title: updated.title,
              path: updated.route,
              enabled: updated.isEnabled,
            }
          : page,
      ),
    );
    setContentSaveMessage(`${updated.title} saved to Postgres.`);
  };

  const saveExecutive = async (executive: (typeof executives)[number], index: number) => {
    const response = await fetch(executive.id.startsWith('c') ? `/api/executives/${executive.id}` : '/api/executives', {
      method: executive.id.startsWith('c') ? 'PUT' : 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...executive, sortOrder: index }),
    });

    if (!response.ok) throw new Error('Unable to save executive');
    const saved = await response.json();
    setExecutives((items) => items.map((item) => (item.id === executive.id ? saved : item)));
    setContentSaveMessage(`${saved.name} saved to Postgres.`);
  };

  const saveProvinceDraft = async (province: ProvinceDraft) => {
    const response = await fetch(`/api/provinces/${province.slug}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(province),
    });

    if (!response.ok) throw new Error('Unable to save province content');
    const saved = await response.json();
    setProvinceDrafts((items) => items.map((item) => (item.slug === saved.slug ? saved : item)));
    setProvinceSaveMessage(`${saved.name} province page saved to Postgres.`);
  };

  const saveProvinceExecutives = async (province: ProvinceDraft) => {
    const response = await fetch(`/api/provinces/${province.slug}/executives`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ executives: provinceExecutives[province.slug] || [] }),
    });

    if (!response.ok) throw new Error('Unable to save provincial executives');
    const saved = await response.json();
    setProvinceExecutives((groups) => ({ ...groups, [province.slug]: saved }));
    setProvinceSaveMessage(`${province.name} provincial executives saved to Postgres.`);
  };

  const saveAllExecutives = async () => {
    const response = await fetch('/api/executives', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ executives }),
    });

    if (!response.ok) throw new Error('Unable to save executives');
    const saved = await response.json();
    setExecutives(saved);
    setContentSaveMessage('Entire Executives page saved to Postgres.');
  };

  const removeExecutive = async (id: string) => {
    if (id.startsWith('c')) {
      await fetch(`/api/executives/${id}`, { method: 'DELETE' });
    }
    setExecutives((items) => items.filter((item) => item.id !== id));
  };

  const uploadMedia = async (file: File) => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const response = await fetch('/api/media-upload', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        mimeType: file.type,
        dataUrl,
      }),
    });

    if (!response.ok) throw new Error('Unable to upload media');
    return response.json();
  };

  if (passwordChangeRequired && activeUser) {
    return (
      <div className="min-h-screen bg-[#f4f7f2] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white border border-gray-200 shadow-lg p-8 rounded-sm">
          <h1 className="text-2xl font-bold text-[#000000] mb-2 text-center">Change Temporary Password</h1>
          <p className="text-gray-600 text-center mb-6">
            Welcome, {activeUser.name}. Choose a new password before entering the admin portal.
          </p>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-2">New password</span>
              <input
                type="password"
                value={newPassword.password}
                onChange={(event) => setNewPassword({ ...newPassword, password: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#1a8000] focus:border-transparent"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-2">Confirm password</span>
              <input
                type="password"
                value={newPassword.confirm}
                onChange={(event) => setNewPassword({ ...newPassword, confirm: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#1a8000] focus:border-transparent"
              />
            </label>
            <button type="submit" className="w-full bg-[#1a8000] text-white py-3 rounded-sm hover:bg-[#156600] transition-colors font-semibold">
              Save Password and Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f4f7f2] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white border border-gray-200 shadow-lg p-8 rounded-sm">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-[#1a8000] flex items-center justify-center rounded-sm">
              <Lock className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#000000] mb-2 text-center">CBMC Admin Portal</h1>
          <p className="text-gray-600 text-center mb-6">Role-aware access for web and mobile content operations.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-2">Username</span>
              <input
                type="text"
                value={credentials.username}
                onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#1a8000] focus:border-transparent"
                placeholder={`${demoSuperUsername}, admin, province, secretary`}
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-2">Password</span>
              <input
                type="password"
                value={credentials.password}
                onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#1a8000] focus:border-transparent"
                placeholder="password"
              />
            </label>
            <button type="submit" className="w-full bg-[#1a8000] text-white py-3 rounded-sm hover:bg-[#156600] transition-colors font-semibold">
              Sign In
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Seeded: bjmaxwell and badebayo. Demo: {demoSuperUsername}, admin, province, secretary.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-[#1a8000] font-semibold">{activeUser?.name ?? role.label}</p>
            <h1 className="text-2xl font-bold text-[#000000]">Admin Control Center</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              onClick={() => window.localStorage.setItem('cbmc-admin-preview', 'active')}
              className="inline-flex items-center bg-[#1a8000] text-white px-4 py-2 rounded-sm hover:bg-[#156600] transition-colors"
            >
              View Public Site
            </Link>
            <ThemeToggle />
            <select
              value={activeRole}
              onChange={(event) => setActiveRole(event.target.value as AdminRole)}
              className="border border-gray-300 bg-white px-3 py-2 rounded-sm"
            >
              {Object.entries(roleProfiles).map(([id, profile]) => (
                <option key={id} value={id}>
                  {profile.label}
                </option>
              ))}
            </select>
            <button onClick={() => {
              setIsAuthenticated(false);
              setActiveUser(null);
              setCredentials({ username: '', password: '' });
            }} className="bg-[#FF0000] text-white px-4 py-2 rounded-sm hover:bg-[#cc0000] transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <aside className="bg-white border border-gray-200 shadow-sm p-4 rounded-sm h-fit">
            <nav className="space-y-2">
              {visibleSections.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-left ${
                      activeSection === item.id ? 'bg-[#1a8000] text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <section className="space-y-6">
            {activeSection === 'overview' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Metric icon={ShieldCheck} label="Role" value={role.label} />
                  <Metric icon={CheckCircle2} label="Can Publish" value={canPublish ? 'Yes' : 'Approval only'} />
                  <Metric icon={Activity} label="Pending Reviews" value={String(pendingContent.length)} />
                  <Metric icon={Globe2} label="Enabled Pages" value={`${pageState.filter((page) => page.enabled).length}/${pageState.length}`} />
                </div>
                <Panel title="Role Privileges" icon={ShieldCheck}>
                  <p className="text-gray-600 mb-5">{role.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      ['Final public publishing', canPublish],
                      ['Manage admins', role.canManageAdmins],
                      ['Approve provincial CRUD', role.canApproveProvincialUpdates],
                      ['Disable or enable pages', role.canTogglePageAvailability],
                      ['Overwrite auto counters', role.canOverrideCounters],
                      ['Manage API tokens', role.canManageApiConnections],
                    ].map(([label, allowed]) => (
                      <div key={String(label)} className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-sm">
                        <span className="text-sm text-gray-700">{label}</span>
                        <span className={`text-sm font-semibold ${allowed ? 'text-[#1a8000]' : 'text-gray-400'}`}>{allowed ? 'Enabled' : 'Restricted'}</span>
                      </div>
                    ))}
                  </div>
                </Panel>
              </>
            )}

            {activeSection === 'content' && (
              <Panel title="Editable Website Content" icon={FileText}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {pageState.filter((page) => page.editableBy.includes(activeRole)).map((page) => {
                      const Icon = page.icon;
                      const isEditing = editingPageId === page.id;
                      return (
                        <div key={page.id} className={`bg-gray-50 border p-4 rounded-sm ${isEditing ? 'border-[#1a8000]' : 'border-gray-200'}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-3">
                              <Icon className="w-5 h-5 text-[#1a8000] mt-1" />
                              <div>
                                <h3 className="font-bold text-[#000000]">{page.title}</h3>
                                <p className="text-sm text-gray-600">{page.path} - {page.owner} content</p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setEditingPageId(page.id);
                                setContentSaveMessage('');
                              }}
                              className="inline-flex items-center gap-2 bg-[#1a8000] text-white px-3 py-2 rounded-sm text-sm"
                            >
                              <Plus className="w-4 h-4" />
                              {isEditing ? 'Editing' : 'Edit'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="space-y-4">
                    {editingPageId && (
                      <div className="bg-white border border-gray-200 p-4 rounded-sm">
                        <h3 className="font-bold text-[#000000] mb-3">Page Editor</h3>
                        <div className="space-y-3">
                          <div className="border border-gray-200 rounded-sm overflow-hidden mb-4">
                            <div className="bg-gradient-to-br from-[#22B600] to-[#20A7DB] text-white p-6">
                              <input
                                value={contentDrafts[editingPageId].headline}
                                onChange={(event) => updateContentDraft(editingPageId, 'headline', event.target.value)}
                                className="w-full bg-white/15 border border-white/30 text-white px-4 py-3 rounded-sm text-2xl font-bold mb-3"
                              />
                              <textarea
                                value={contentDrafts[editingPageId].body}
                                onChange={(event) => updateContentDraft(editingPageId, 'body', event.target.value)}
                                className="w-full bg-white/15 border border-white/30 text-white px-4 py-3 rounded-sm min-h-24"
                              />
                            </div>
                            <div className="p-5 bg-gray-50">
                              <p className="text-sm text-gray-600">This editable preview mirrors the public page structure. Page-specific sections appear below when available.</p>
                            </div>
                          </div>
                          <label className="block">
                            <span className="block text-sm font-medium text-gray-700 mb-1">Page title</span>
                            <input
                              value={contentDrafts[editingPageId].title}
                              onChange={(event) => updateContentDraft(editingPageId, 'title', event.target.value)}
                              className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                            />
                          </label>
                          <label className="block">
                            <span className="block text-sm font-medium text-gray-700 mb-1">Route</span>
                            <input
                              value={contentDrafts[editingPageId].route}
                              onChange={(event) => updateContentDraft(editingPageId, 'route', event.target.value)}
                              className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                            />
                          </label>
                          <label className="block hidden">
                            <span className="block text-sm font-medium text-gray-700 mb-1">Headline</span>
                            <input
                              value={contentDrafts[editingPageId].headline}
                              onChange={(event) => updateContentDraft(editingPageId, 'headline', event.target.value)}
                              className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                            />
                          </label>
                          <label className="block hidden">
                            <span className="block text-sm font-medium text-gray-700 mb-1">Body copy</span>
                            <textarea
                              value={contentDrafts[editingPageId].body}
                              onChange={(event) => updateContentDraft(editingPageId, 'body', event.target.value)}
                              className="w-full min-h-36 border border-gray-300 px-3 py-2 rounded-sm"
                            />
                          </label>
                          <label className="block">
                            <span className="block text-sm font-medium text-gray-700 mb-1">Workflow status</span>
                            <select
                              value={contentDrafts[editingPageId].status}
                              onChange={(event) => updateContentDraft(editingPageId, 'status', event.target.value)}
                              className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                            >
                              <option value="DRAFT">Draft</option>
                              <option value="PENDING_REVIEW">Pending Review</option>
                              <option value="APPROVED">Approved</option>
                              <option value="PUBLISHED">Published</option>
                              <option value="DISABLED">Disabled</option>
                            </select>
                          </label>
                          <button
                            onClick={() => savePageDraft(editingPageId).catch((error) => setContentSaveMessage(error.message))}
                            className="inline-flex items-center gap-2 bg-[#1a8000] text-white px-4 py-2 rounded-sm text-sm"
                          >
                            <Save className="w-4 h-4" />
                            Save Page
                          </button>
                          {contentSaveMessage && <p className="text-sm text-[#1a8000]">{contentSaveMessage}</p>}
                        </div>
                      </div>
                    )}
                    {editingPageId === 'provinces' && (
                      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-5 border-b border-gray-200">
                          <div>
                            <h3 className="font-bold text-[#000000]">Province Page Messages</h3>
                            <p className="text-sm text-gray-600">Edit the message, activities summary, hero image, and public counters for each provincial page.</p>
                          </div>
                          {provinceSaveMessage && <p className="text-sm text-[#1a8000]">{provinceSaveMessage}</p>}
                        </div>
                        <div className="divide-y divide-gray-200">
                          {provinceDrafts.map((province) => (
                            <div key={province.slug} className="p-5">
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
                                <div>
                                  <h4 className="text-xl font-bold text-[#000000]">{province.name}</h4>
                                  <Link to={`/provinces/${province.slug}`} className="text-sm text-[#20A7DB] hover:underline">
                                    View public province page
                                  </Link>
                                </div>
                                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                  <input
                                    type="checkbox"
                                    checked={province.isEnabled}
                                    onChange={(event) => updateProvinceDraft(province.slug, 'isEnabled', event.target.checked)}
                                  />
                                  Enabled
                                </label>
                              </div>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <label className="block">
                                  <span className="block text-sm font-medium text-gray-700 mb-1">Province message</span>
                                  <textarea
                                    value={province.message}
                                    onChange={(event) => updateProvinceDraft(province.slug, 'message', event.target.value)}
                                    className="w-full min-h-32 border border-gray-300 px-3 py-2 rounded-sm"
                                  />
                                </label>
                                <label className="block">
                                  <span className="block text-sm font-medium text-gray-700 mb-1">Activities summary</span>
                                  <textarea
                                    value={province.activities}
                                    onChange={(event) => updateProvinceDraft(province.slug, 'activities', event.target.value)}
                                    className="w-full min-h-32 border border-gray-300 px-3 py-2 rounded-sm"
                                  />
                                </label>
                                <label className="block lg:col-span-2">
                                  <span className="block text-sm font-medium text-gray-700 mb-1">Hero image URL</span>
                                  <input
                                    value={province.heroImageUrl}
                                    onChange={(event) => updateProvinceDraft(province.slug, 'heroImageUrl', event.target.value)}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                    placeholder="/uploads/province-image.jpg or https://..."
                                  />
                                </label>
                                <label className="block">
                                  <span className="block text-sm font-medium text-gray-700 mb-1">Active members</span>
                                  <input
                                    type="number"
                                    value={province.activeMembers}
                                    onChange={(event) => updateProvinceDraft(province.slug, 'activeMembers', Number(event.target.value))}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                  />
                                </label>
                                <label className="block">
                                  <span className="block text-sm font-medium text-gray-700 mb-1">Local chapters</span>
                                  <input
                                    type="number"
                                    value={province.localChapterCnt}
                                    onChange={(event) => updateProvinceDraft(province.slug, 'localChapterCnt', Number(event.target.value))}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                  />
                                </label>
                                <label className="block">
                                  <span className="block text-sm font-medium text-gray-700 mb-1">Annual events</span>
                                  <input
                                    type="number"
                                    value={province.annualEvents}
                                    onChange={(event) => updateProvinceDraft(province.slug, 'annualEvents', Number(event.target.value))}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                  />
                                </label>
                              </div>
                              <div className="mt-5 border border-gray-200 rounded-sm overflow-hidden">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gray-50 p-4 border-b border-gray-200">
                                  <div>
                                    <h5 className="font-bold text-[#000000]">Provincial Executives</h5>
                                    <p className="text-sm text-gray-600">Names, roles, photos, contact links, and short profiles shown on this province page.</p>
                                  </div>
                                  <button
                                    onClick={() => addProvinceExecutive(province)}
                                    className="inline-flex items-center gap-2 bg-[#20A7DB] text-white px-3 py-2 rounded-sm text-sm"
                                  >
                                    <Plus className="w-4 h-4" />
                                    Add Provincial Executive
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4">
                                  {(provinceExecutives[province.slug] || []).map((executive, index) => (
                                    <div key={executive.id} className="border border-gray-200 rounded-sm p-4 bg-white">
                                      <div className="flex items-start gap-4 mb-4">
                                        <div className="w-24 h-24 bg-gradient-to-br from-[#1a8000] to-[#20A7DB] rounded-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                                          {executive.imageUrl ? (
                                            <img src={executive.imageUrl} alt={executive.name} className="w-full h-full object-cover" />
                                          ) : (
                                            <User className="w-10 h-10 text-white opacity-60" />
                                          )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between gap-3">
                                            <span className="text-xs font-semibold text-[#1a8000]">Provincial Executive {index + 1}</span>
                                            <button
                                              onClick={() => removeProvinceExecutive(province.slug, executive.id)}
                                              className="text-[#FF0000] text-sm underline"
                                            >
                                              Remove
                                            </button>
                                          </div>
                                          <p className="text-xs text-gray-500 mt-1">{province.name}</p>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <label className="block">
                                          <span className="block text-xs font-medium text-gray-700 mb-1">Name</span>
                                          <input
                                            value={executive.name}
                                            onChange={(event) => updateProvinceExecutive(province.slug, executive.id, 'name', event.target.value)}
                                            className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                          />
                                        </label>
                                        <label className="block">
                                          <span className="block text-xs font-medium text-gray-700 mb-1">Position</span>
                                          <input
                                            value={executive.position}
                                            onChange={(event) => updateProvinceExecutive(province.slug, executive.id, 'position', event.target.value)}
                                            className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                          />
                                        </label>
                                        <label className="block">
                                          <span className="block text-xs font-medium text-gray-700 mb-1">Email</span>
                                          <input
                                            value={executive.email}
                                            onChange={(event) => updateProvinceExecutive(province.slug, executive.id, 'email', event.target.value)}
                                            className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                          />
                                        </label>
                                        <label className="block">
                                          <span className="block text-xs font-medium text-gray-700 mb-1">LinkedIn URL</span>
                                          <input
                                            value={executive.linkedinUrl || ''}
                                            onChange={(event) => updateProvinceExecutive(province.slug, executive.id, 'linkedinUrl', event.target.value)}
                                            className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                          />
                                        </label>
                                        <label className="block md:col-span-2">
                                          <span className="block text-xs font-medium text-gray-700 mb-1">Photo URL or uploaded media path</span>
                                          <input
                                            value={executive.imageUrl}
                                            onChange={(event) => updateProvinceExecutive(province.slug, executive.id, 'imageUrl', event.target.value)}
                                            placeholder="/uploads/provincial-executive.jpg"
                                            className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                          />
                                          <input
                                            type="file"
                                            accept="image/*"
                                            className="mt-2 block w-full text-xs"
                                            onChange={(event) => {
                                              const file = event.target.files?.[0];
                                              if (!file) return;
                                              uploadMedia(file)
                                                .then((media) => updateProvinceExecutive(province.slug, executive.id, 'imageUrl', media.url))
                                                .catch((error) => setProvinceSaveMessage(error.message));
                                            }}
                                          />
                                        </label>
                                        <label className="block md:col-span-2">
                                          <span className="block text-xs font-medium text-gray-700 mb-1">Profile / biography</span>
                                          <textarea
                                            value={executive.bio}
                                            onChange={(event) => updateProvinceExecutive(province.slug, executive.id, 'bio', event.target.value)}
                                            className="w-full min-h-24 border border-gray-300 px-3 py-2 rounded-sm"
                                          />
                                        </label>
                                      </div>
                                    </div>
                                  ))}
                                  {(provinceExecutives[province.slug] || []).length === 0 && (
                                    <div className="xl:col-span-2 text-sm text-gray-600 bg-white border border-dashed border-gray-300 p-4 rounded-sm">
                                      No provincial executives added yet.
                                    </div>
                                  )}
                                </div>
                                <div className="p-4 border-t border-gray-200">
                                  <button
                                    onClick={() => saveProvinceExecutives(province).catch((error) => setProvinceSaveMessage(error.message))}
                                    className="inline-flex items-center gap-2 bg-[#1a8000] text-white px-4 py-2 rounded-sm text-sm"
                                  >
                                    <Save className="w-4 h-4" />
                                    Save {province.name} Executives
                                  </button>
                                </div>
                              </div>
                              <button
                                onClick={() => saveProvinceDraft(province).catch((error) => setProvinceSaveMessage(error.message))}
                                className="inline-flex items-center gap-2 bg-[#1a8000] text-white px-4 py-2 rounded-sm text-sm mt-4"
                              >
                                <Save className="w-4 h-4" />
                                Save {province.name}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {editingPageId === 'executives' && (
                      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                        <section className="bg-gradient-to-br from-[#22B600] to-[#20A7DB] text-white p-8">
                          <input
                            value={contentDrafts.executives.headline}
                            onChange={(event) => updateContentDraft('executives', 'headline', event.target.value)}
                            className="w-full bg-white/15 border border-white/30 text-white placeholder-white/80 px-4 py-3 rounded-sm text-3xl font-bold mb-3"
                          />
                          <textarea
                            value={contentDrafts.executives.body}
                            onChange={(event) => updateContentDraft('executives', 'body', event.target.value)}
                            className="w-full bg-white/15 border border-white/30 text-white placeholder-white/80 px-4 py-3 rounded-sm min-h-20"
                          />
                        </section>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-5 border-b border-gray-200">
                          <div>
                            <h3 className="font-bold text-[#000000]">Executive Profiles</h3>
                            <p className="text-sm text-gray-600">Edit this page in the same card layout visitors see on the public site.</p>
                          </div>
                          <button
                            onClick={addExecutive}
                            className="inline-flex items-center gap-2 bg-[#20A7DB] text-white px-3 py-2 rounded-sm text-sm"
                          >
                            <Plus className="w-4 h-4" />
                            Add Executive
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-5">
                          {executives.map((executive, index) => (
                            <div key={executive.id} className="bg-white rounded-sm shadow-lg overflow-hidden border border-gray-200">
                              <div className="aspect-square bg-gradient-to-br from-[#22B600] to-[#20A7DB] flex items-center justify-center relative">
                                {executive.imageUrl ? (
                                  <img src={executive.imageUrl} alt={executive.name} className="w-full h-full object-cover" />
                                ) : (
                                  <User className="w-24 h-24 text-white opacity-50" />
                                )}
                              </div>
                              <div className="p-5 space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-xs font-semibold text-[#1a8000]">Executive {index + 1}</span>
                                  <button
                                    onClick={() => removeExecutive(executive.id).catch((error) => setContentSaveMessage(error.message))}
                                    className="text-[#FF0000] text-sm underline"
                                  >
                                    Remove
                                  </button>
                                </div>
                                <label className="block">
                                  <span className="block text-xs font-medium text-gray-700 mb-1">Name</span>
                                  <input
                                    value={executive.name}
                                    onChange={(event) => updateExecutive(executive.id, 'name', event.target.value)}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm text-xl font-bold text-[#000000]"
                                  />
                                </label>
                                <label className="block">
                                  <span className="block text-xs font-medium text-gray-700 mb-1">Position</span>
                                  <input
                                    value={executive.position}
                                    onChange={(event) => updateExecutive(executive.id, 'position', event.target.value)}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm text-[#22B600] font-semibold"
                                  />
                                </label>
                                <label className="block">
                                  <span className="block text-xs font-medium text-gray-700 mb-1">Province (optional)</span>
                                  <input
                                    value={executive.province}
                                    onChange={(event) => updateExecutive(executive.id, 'province', event.target.value)}
                                    placeholder="Leave blank for national executives"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                  />
                                </label>
                                <label className="block">
                                  <span className="block text-xs font-medium text-gray-700 mb-1">Email</span>
                                  <input
                                    value={executive.email}
                                    onChange={(event) => updateExecutive(executive.id, 'email', event.target.value)}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                  />
                                </label>
                                <label className="block">
                                  <span className="block text-xs font-medium text-gray-700 mb-1">LinkedIn URL</span>
                                  <input
                                    value={executive.linkedinUrl || ''}
                                    onChange={(event) => updateExecutive(executive.id, 'linkedinUrl', event.target.value)}
                                    placeholder="https://www.linkedin.com/in/..."
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                  />
                                </label>
                                <label className="block">
                                  <span className="block text-xs font-medium text-gray-700 mb-1">Photo URL or uploaded media path</span>
                                  <input
                                    value={executive.imageUrl}
                                    onChange={(event) => updateExecutive(executive.id, 'imageUrl', event.target.value)}
                                    placeholder="/uploads/executives/name.jpg"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm"
                                  />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="mt-2 block w-full text-xs"
                                    onChange={(event) => {
                                      const file = event.target.files?.[0];
                                      if (!file) return;
                                      uploadMedia(file)
                                        .then((media) => updateExecutive(executive.id, 'imageUrl', media.url))
                                        .catch((error) => setContentSaveMessage(error.message));
                                    }}
                                  />
                                </label>
                                <label className="block">
                                  <span className="block text-xs font-medium text-gray-700 mb-1">Full profile / biography shown on executive profile page</span>
                                  <textarea
                                    value={executive.bio}
                                    onChange={(event) => updateExecutive(executive.id, 'bio', event.target.value)}
                                    className="w-full min-h-36 border border-gray-300 px-3 py-2 rounded-sm"
                                  />
                                </label>
                                <div className="flex items-center justify-between gap-3 pt-2">
                                  <div className="flex gap-2">
                                    <span className="flex items-center justify-center w-9 h-9 bg-[#22B600] text-white rounded-full">
                                      <Mail className="w-4 h-4" />
                                    </span>
                                    <span className="flex items-center justify-center w-9 h-9 bg-[#20A7DB] text-white rounded-full">
                                      <Linkedin className="w-4 h-4" />
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => saveExecutive(executive, index).catch((error) => setContentSaveMessage(error.message))}
                                    className="inline-flex items-center gap-2 bg-[#1a8000] text-white px-3 py-2 rounded-sm text-sm"
                                  >
                                    <Save className="w-4 h-4" />
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          {contentSaveMessage && <p className="text-sm text-[#1a8000]">{contentSaveMessage}</p>}
                          <button
                            onClick={() => saveAllExecutives().catch((error) => setContentSaveMessage(error.message))}
                            className="inline-flex items-center gap-2 bg-[#1a8000] text-white px-4 py-2 rounded-sm text-sm"
                          >
                            <Save className="w-4 h-4" />
                            Save Entire Executives Page
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="bg-white border border-gray-200 p-4 rounded-sm">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <h3 className="font-bold text-[#000000]">Article Media Layouts</h3>
                        <button
                          onClick={() => setContentSaveMessage('Article media layout options saved in this admin session.')}
                          className="inline-flex items-center gap-2 bg-[#1a8000] text-white px-3 py-2 rounded-sm text-sm"
                        >
                          <Save className="w-4 h-4" />
                          Save Layouts
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Articles can combine multiple layouts. Select every layout available to article editors.</p>
                      <div className="space-y-2">
                        {articleMediaPlacements.map((placement, index) => (
                          <label key={placement} className="flex items-center gap-3 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              checked={selectedArticleLayouts.includes(placement)}
                              onChange={(event) =>
                                setSelectedArticleLayouts((items) =>
                                  event.target.checked ? [...items, placement] : items.filter((item) => item !== placement),
                                )
                              }
                              className="accent-[#1a8000]"
                            />
                            {index % 2 === 0 ? <PanelLeft className="w-4 h-4 text-[#20A7DB]" /> : <PanelRight className="w-4 h-4 text-[#1a8000]" />}
                            <span>{placement}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>
            )}

            {activeSection === 'approvals' && (
              <Panel title="Approval Queue" icon={CheckCircle2}>
                <div className="space-y-3">
                  {pendingContent.map((item) => (
                    <div key={item.id} className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                          <p className="text-sm text-[#1a8000] font-semibold">{item.submittedBy} - {item.area}</p>
                          <h3 className="font-bold text-[#000000]">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.summary}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button disabled={!role.canApproveProvincialUpdates} className="px-3 py-2 bg-[#20A7DB] disabled:bg-gray-300 text-white rounded-sm text-sm">
                            Approve
                          </button>
                          <button disabled={!canPublish} className="px-3 py-2 bg-[#1a8000] disabled:bg-gray-300 text-white rounded-sm text-sm">
                            Publish
                          </button>
                          <button className="px-3 py-2 border border-gray-300 rounded-sm text-sm">Request Changes</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {activeSection === 'media' && (
              <Panel title="Media Library & Carousel" icon={ImageIcon}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded-sm">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Upload protected pictures, videos, executive portraits, and article media.</p>
                    <label className="inline-flex items-center gap-2 bg-[#1a8000] text-white px-6 py-3 rounded-sm cursor-pointer">
                      <Upload className="w-4 h-4" />
                      Upload Media
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          uploadMedia(file)
                            .then((media) => setContentSaveMessage(`Uploaded ${media.title} to ${media.url}`))
                            .catch((error) => setContentSaveMessage(error.message));
                        }}
                      />
                    </label>
                    {contentSaveMessage && <p className="text-sm text-[#1a8000] mt-3">{contentSaveMessage}</p>}
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-5 rounded-sm">
                    <h3 className="font-bold text-[#000000] mb-3">Carousel Controls</h3>
                    <label className="block text-sm text-gray-700 mb-2">Green overlay transparency: {carouselOpacity}%</label>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      value={carouselOpacity}
                      onChange={(event) => setCarouselOpacity(Number(event.target.value))}
                      className="w-full accent-[#1a8000]"
                    />
                    <div className="grid grid-cols-3 gap-3 mt-5">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="aspect-video bg-gray-200 rounded-sm flex items-center justify-center text-gray-500">
                          Slide {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Panel>
            )}

            {activeSection === 'people' && (
              <Panel title="Admins & Publishing Rights" icon={Users}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <UserPlus className="w-5 h-5 text-[#1a8000]" />
                        <h3 className="font-bold text-[#000000]">Add Admin User</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          disabled={!role.canManageAdmins}
                          value={newUser.name}
                          onChange={(event) => setNewUser({ ...newUser, name: event.target.value })}
                          placeholder="Full name"
                          className="border border-gray-300 px-3 py-2 rounded-sm disabled:bg-gray-100"
                        />
                        <input
                          disabled={!role.canManageAdmins}
                          value={newUser.email}
                          onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
                          placeholder="Email address"
                          className="border border-gray-300 px-3 py-2 rounded-sm disabled:bg-gray-100"
                        />
                        <select
                          disabled={!role.canManageAdmins}
                          value={newUser.role}
                          onChange={(event) => setNewUser({ ...newUser, role: event.target.value as AdminRole })}
                          className="border border-gray-300 px-3 py-2 rounded-sm disabled:bg-gray-100"
                        >
                          <option value="admin">Admin</option>
                          <option value="provincial-admin">Provincial Admin</option>
                          <option value="secretary">Secretary</option>
                          <option value="super-admin">Super Admin</option>
                        </select>
                        <input
                          disabled={!role.canManageAdmins}
                          value={newUser.province}
                          onChange={(event) => setNewUser({ ...newUser, province: event.target.value })}
                          placeholder="Province, if applicable"
                          className="border border-gray-300 px-3 py-2 rounded-sm disabled:bg-gray-100"
                        />
                        <label className="block md:col-span-2">
                          <span className="block text-xs font-medium text-gray-700 mb-1">Profile photo upload</span>
                          <input
                            disabled={!role.canManageAdmins}
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (!file) return;
                              uploadMedia(file)
                                .then((media) => setNewUser({ ...newUser, photoUrl: media.url }))
                                .catch((error) => setContentSaveMessage(error.message));
                            }}
                          />
                          {newUser.photoUrl && <p className="text-xs text-[#1a8000] mt-1">{newUser.photoUrl}</p>}
                        </label>
                      </div>
                      <button disabled={!role.canManageAdmins} className="inline-flex items-center gap-2 mt-4 bg-[#1a8000] disabled:bg-gray-300 text-white px-4 py-2 rounded-sm text-sm">
                        <UserPlus className="w-4 h-4" />
                        Create User
                      </button>
                      <button
                        disabled={!role.canManageAdmins}
                        onClick={() => setContentSaveMessage('Admin user changes saved in this admin session.')}
                        className="inline-flex items-center gap-2 mt-4 ml-2 border border-[#1a8000] text-[#1a8000] disabled:border-gray-300 disabled:text-gray-400 px-4 py-2 rounded-sm text-sm"
                      >
                        <Save className="w-4 h-4" />
                        Save Admin Changes
                      </button>
                      <p className="text-xs text-gray-500 mt-3">This GUI is ready for the backend endpoint that will write users to Postgres.</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <FileSpreadsheet className="w-5 h-5 text-[#1a8000]" />
                        <h3 className="font-bold text-[#000000]">Mass Upload Members</h3>
                      </div>
                      <label className="block border-2 border-dashed border-gray-300 bg-white p-5 text-center rounded-sm cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-600">{memberImportFile || 'Choose .xlsx or .csv member register'}</span>
                        <input
                          disabled={!role.canManageAdmins}
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          className="sr-only"
                          onChange={(event) => setMemberImportFile(event.target.files?.[0]?.name ?? '')}
                        />
                      </label>
                      <button disabled={!role.canManageAdmins || !memberImportFile} className="inline-flex items-center gap-2 mt-4 bg-[#20A7DB] disabled:bg-gray-300 text-white px-4 py-2 rounded-sm text-sm">
                        <FileSpreadsheet className="w-4 h-4" />
                        Import or Update Register
                      </button>
                      <button
                        disabled={!role.canManageAdmins}
                        onClick={() => setContentSaveMessage('Member import settings saved in this admin session.')}
                        className="inline-flex items-center gap-2 mt-4 ml-2 border border-[#1a8000] text-[#1a8000] disabled:border-gray-300 disabled:text-gray-400 px-4 py-2 rounded-sm text-sm"
                      >
                        <Save className="w-4 h-4" />
                        Save Import Settings
                      </button>
                      <p className="text-xs text-gray-500 mt-3">Expected columns: firstName, lastName, email, phone, province, city, status, joinedAt.</p>
                    </div>
                  </div>

                  {Object.entries(roleProfiles).map(([id, profile]) => (
                    <div key={id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gray-50 border border-gray-200 p-4 rounded-sm">
                      <div>
                        <h3 className="font-bold text-[#000000]">{profile.label}</h3>
                        <p className="text-sm text-gray-600">{profile.description}</p>
                      </div>
                      <button disabled={!role.canManageAdmins} className="px-3 py-2 bg-[#1a8000] disabled:bg-gray-300 text-white rounded-sm text-sm">
                        Manage
                      </button>
                    </div>
                  ))}
                  <ToggleRow
                    label="Allow Admin to publish directly"
                    enabled={adminPublishingEnabled}
                    disabled={activeRole !== 'super-admin'}
                    onChange={() => setAdminPublishingEnabled((value) => !value)}
                  />
                  <button
                    onClick={() => setContentSaveMessage('Publishing rights saved in this admin session.')}
                    className="inline-flex items-center gap-2 bg-[#1a8000] text-white px-4 py-2 rounded-sm text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save Role Settings
                  </button>
                </div>
              </Panel>
            )}

            {activeSection === 'pages' && (
              <Panel title="Page Availability" icon={Globe2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pageState.map((page) => (
                    <ToggleRow
                      key={page.id}
                      label={page.title}
                      enabled={page.enabled}
                      disabled={!role.canTogglePageAvailability}
                      onChange={() =>
                        setPageState((pages) =>
                          pages.map((item) => (item.id === page.id ? { ...item, enabled: !item.enabled } : item)),
                        )
                      }
                    />
                  ))}
                </div>
                <button
                  onClick={() => setContentSaveMessage('Page availability settings saved in this admin session.')}
                  className="inline-flex items-center gap-2 mt-4 bg-[#1a8000] text-white px-4 py-2 rounded-sm text-sm"
                >
                  <Save className="w-4 h-4" />
                  Save Page Availability
                </button>
              </Panel>
            )}

            {activeSection === 'analytics' && (
              <Panel title="Analytics Data Controls" icon={BarChart3}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {counters.map((counter) => (
                    <div key={counter.id} className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
                      <label className="block text-sm font-semibold text-[#000000] mb-2">{counter.label}</label>
                      <p className="text-xs text-gray-500 mb-2">Auto-count: {counter.autoValue}</p>
                      <input
                        disabled={!role.canOverrideCounters}
                        value={counter.overrideValue}
                        onChange={(event) =>
                          setCounters((items) =>
                            items.map((item) => (item.id === counter.id ? { ...item, overrideValue: event.target.value } : item)),
                          )
                        }
                        className="w-full border border-gray-300 px-3 py-2 rounded-sm disabled:bg-gray-100"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">Analytics charts remain downloadable while the rest of the website keeps media protection enabled.</p>
                <button
                  onClick={() => setContentSaveMessage('Analytics controls saved in this admin session.')}
                  className="inline-flex items-center gap-2 mt-4 bg-[#1a8000] text-white px-4 py-2 rounded-sm text-sm"
                >
                  <Save className="w-4 h-4" />
                  Save Analytics Controls
                </button>
              </Panel>
            )}

            {activeSection === 'integrations' && (
              <Panel title="External API Connections" icon={DatabaseZap}>
                <div className="space-y-3">
                  {apiConnections.map((connection) => (
                    <div key={connection.id} className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-[#000000]">{connection.name}</h3>
                          <p className="text-sm text-gray-600">{connection.endpoint}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="inline-flex items-center gap-2 px-3 py-2 bg-[#20A7DB] text-white rounded-sm text-sm">
                            <KeyRound className="w-4 h-4" />
                            Token
                          </button>
                          <button className="px-3 py-2 border border-gray-300 rounded-sm text-sm">Test</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setContentSaveMessage('API connection changes saved in this admin session.')}
                  className="inline-flex items-center gap-2 mt-4 bg-[#1a8000] text-white px-4 py-2 rounded-sm text-sm"
                >
                  <Save className="w-4 h-4" />
                  Save API Connections
                </button>
              </Panel>
            )}

            {activeSection === 'mobile' && (
              <Panel title="Mobile App Readiness" icon={MonitorSmartphone}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Metric icon={MonitorSmartphone} label="App Shell" value="Expo ready" />
                  <Metric icon={ShieldCheck} label="Roles" value="Shared model" />
                  <Metric icon={DatabaseZap} label="Backend" value="API-ready" />
                </div>
                <p className="text-gray-600 mt-4">
                  The mobile app scaffold in apps/mobile is prepared to consume the same role, approval, media, analytics, and API concepts as the web app.
                </p>
              </Panel>
            )}

            {activeSection === 'settings' && (
              <Panel title="Security & Publishing Settings" icon={SlidersHorizontal}>
                <div className="space-y-4">
                  <ToggleRow
                    label="Media download protection"
                    enabled={downloadProtectionEnabled}
                    disabled={!role.canDisableDownloadProtection}
                    onChange={() => setDownloadProtectionEnabled((value) => !value)}
                  />
                  <ToggleRow
                    label="Admin direct publishing"
                    enabled={adminPublishingEnabled}
                    disabled={activeRole !== 'super-admin'}
                    onChange={() => setAdminPublishingEnabled((value) => !value)}
                  />
                  <p className="text-sm text-gray-600">
                    Browser-level screenshot blocking cannot be guaranteed by any website, but this app blocks right-click, common save/print shortcuts, and image dragging outside analytics.
                  </p>
                  <button
                    onClick={() => setContentSaveMessage('Security settings saved in this admin session.')}
                    className="inline-flex items-center gap-2 bg-[#1a8000] text-white px-4 py-2 rounded-sm text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save Security Settings
                  </button>
                </div>
              </Panel>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: typeof LayoutDashboard; children: ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-sm">
      <div className="flex items-center gap-3 mb-5">
        <Icon className="w-6 h-6 text-[#1a8000]" />
        <h2 className="text-xl font-bold text-[#000000]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof LayoutDashboard; label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm p-5 rounded-sm">
      <Icon className="w-7 h-7 text-[#1a8000] mb-3" />
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-[#000000]">{value}</p>
    </div>
  );
}

function ToggleRow({ label, enabled, disabled, onChange }: { label: string; enabled: boolean; disabled: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-gray-50 border border-gray-200 p-4 rounded-sm">
      <span className="font-medium text-[#000000]">{label}</span>
      <button
        disabled={disabled}
        onClick={onChange}
        className={`w-14 h-8 rounded-full p-1 transition-colors disabled:opacity-50 ${enabled ? 'bg-[#1a8000]' : 'bg-gray-300'}`}
        aria-pressed={enabled}
      >
        <span className={`block w-6 h-6 bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

function getStoredPasswordOverrides(): Record<string, { password: string; mustChangePassword: boolean }> {
  try {
    return JSON.parse(window.localStorage.getItem('cbmc-admin-password-overrides') || '{}');
  } catch {
    return {};
  }
}

function getLoginProfile(username: string): LoginProfile | undefined {
  const profile = initialCredentials[username];
  if (!profile) return undefined;

  const override = getStoredPasswordOverrides()[username];

  if (!override) {
    return profile;
  }

  return {
    ...profile,
    password: override.password,
    mustChangePassword: override.mustChangePassword,
  };
}
