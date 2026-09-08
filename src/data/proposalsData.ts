import i18n from '../localization/i18n';

export type ProposalStatus = 'draft' | 'pending' | 'accepted' | 'declined' | 'expired';
export type DocumentType = 'proposal' | 'contract';

export interface MilestonePayment {
  id: string;
  title: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
}

export interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  performedBy: string;
}

export interface ProposalContract {
  id: string;
  title: string;
  projectTitle: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  type: DocumentType;
  amount: number;
  currency: string;
  issuedDate: string;
  validUntil: string;
  status: ProposalStatus;
  scopeOfWork: string[];
  deliverables: string[];
  milestones?: MilestonePayment[];
  paymentTerms: string;
  notes?: string;
  signedAt?: string;
  signedBy?: string;
  signatureDataUrl?: string;
  activityLogs?: ActivityLog[];
}

// دالة جلب البيانات الديناميكية لدعم اللغات المترجمة
export const getInitialProposals = (): ProposalContract[] => [
  {
    id: 'PROP-2026-001',
    title: i18n.t('Data.proposalsData.items.PROP-2026-001.title'),
    projectTitle: i18n.t('Data.proposalsData.items.PROP-2026-001.projectTitle'),
    clientName: 'Alex Morgan',
    clientEmail: 'alex.m@advancedsolutions.io',
    companyName: i18n.t('Data.proposalsData.items.PROP-2026-001.companyName'),
    type: 'proposal',
    amount: 8500,
    currency: 'USD',
    issuedDate: '2026-07-15',
    validUntil: '2026-08-30',
    status: 'pending',
    scopeOfWork: i18n.t('Data.proposalsData.items.PROP-2026-001.scopeOfWork', { returnObjects: true }) as string[],
    deliverables: i18n.t('Data.proposalsData.items.PROP-2026-001.deliverables', { returnObjects: true }) as string[],
    milestones: [
      { id: 'm1', title: i18n.t('Data.proposalsData.items.PROP-2026-001.milestones.m1'), percentage: 40, amount: 3400, dueDate: 'Upon Signing', status: 'pending' },
      { id: 'm2', title: i18n.t('Data.proposalsData.items.PROP-2026-001.milestones.m2'), percentage: 30, amount: 2550, dueDate: '2026-08-15', status: 'pending' },
      { id: 'm3', title: i18n.t('Data.proposalsData.items.PROP-2026-001.milestones.m3'), percentage: 30, amount: 2550, dueDate: '2026-08-30', status: 'pending' }
    ],
    paymentTerms: i18n.t('Data.proposalsData.items.PROP-2026-001.paymentTerms'),
    notes: i18n.t('Data.proposalsData.items.PROP-2026-001.notes'),
    activityLogs: [
      { id: 'l1', action: i18n.t('Data.proposalsData.items.PROP-2026-001.activityLogs.l1'), timestamp: '2026-07-15 09:00', performedBy: 'Admin' },
      { id: 'l2', action: i18n.t('Data.proposalsData.items.PROP-2026-001.activityLogs.l2'), timestamp: '2026-07-15 10:30', performedBy: 'Admin' },
      { id: 'l3', action: i18n.t('Data.proposalsData.items.PROP-2026-001.activityLogs.l3'), timestamp: '2026-07-16 14:12', performedBy: 'Alex Morgan' }
    ]
  },
  {
    id: 'CNT-2026-002',
    title: i18n.t('Data.proposalsData.items.CNT-2026-002.title'),
    projectTitle: i18n.t('Data.proposalsData.items.CNT-2026-002.projectTitle'),
    clientName: 'Sarah Jenkins',
    clientEmail: 's.jenkins@nexadesign.com',
    companyName: i18n.t('Data.proposalsData.items.CNT-2026-002.companyName'),
    type: 'contract',
    amount: 4200,
    currency: 'USD',
    issuedDate: '2026-06-01',
    validUntil: '2026-06-15',
    status: 'accepted',
    signedAt: '2026-06-03 14:20',
    signedBy: 'Sarah Jenkins',
    scopeOfWork: i18n.t('Data.proposalsData.items.CNT-2026-002.scopeOfWork', { returnObjects: true }) as string[],
    deliverables: i18n.t('Data.proposalsData.items.CNT-2026-002.deliverables', { returnObjects: true }) as string[],
    milestones: [
      { id: 'm1', title: i18n.t('Data.proposalsData.items.CNT-2026-002.milestones.m1'), percentage: 100, amount: 4200, dueDate: '2026-06-15', status: 'paid' }
    ],
    paymentTerms: i18n.t('Data.proposalsData.items.CNT-2026-002.paymentTerms'),
    activityLogs: [
      { id: 'l1', action: i18n.t('Data.proposalsData.items.CNT-2026-002.activityLogs.l1'), timestamp: '2026-06-01 11:00', performedBy: 'Admin' },
      { id: 'l2', action: i18n.t('Data.proposalsData.items.CNT-2026-002.activityLogs.l2'), timestamp: '2026-06-03 14:20', performedBy: 'Sarah Jenkins' }
    ]
  },
  {
    id: 'PROP-2026-003',
    title: i18n.t('Data.proposalsData.items.PROP-2026-003.title'),
    projectTitle: i18n.t('Data.proposalsData.items.PROP-2026-003.projectTitle'),
    clientName: 'Michael Brown',
    clientEmail: 'm.brown@velocelogistics.io',
    companyName: i18n.t('Data.proposalsData.items.PROP-2026-003.companyName'),
    type: 'proposal',
    amount: 3100,
    currency: 'USD',
    issuedDate: '2026-05-10',
    validUntil: '2026-05-25',
    status: 'expired',
    scopeOfWork: i18n.t('Data.proposalsData.items.PROP-2026-003.scopeOfWork', { returnObjects: true }) as string[],
    deliverables: i18n.t('Data.proposalsData.items.PROP-2026-003.deliverables', { returnObjects: true }) as string[],
    paymentTerms: i18n.t('Data.proposalsData.items.PROP-2026-003.paymentTerms'),
    activityLogs: [
      { id: 'l1', action: i18n.t('Data.proposalsData.items.PROP-2026-003.activityLogs.l1'), timestamp: '2026-05-10 08:30', performedBy: 'Admin' },
      { id: 'l2', action: i18n.t('Data.proposalsData.items.PROP-2026-003.activityLogs.l2'), timestamp: '2026-05-26 00:00', performedBy: 'System' }
    ]
  }
];

export const INITIAL_PROPOSALS: ProposalContract[] = getInitialProposals();

class ProposalStore {
  private listeners: Array<() => void> = [];
  private data: ProposalContract[] = getInitialProposals();

  constructor() {
    // إعادة تحميل البيانات وحساب المترجمات تلقائياً عند تغيير اللغة في i18n
    i18n.on('languageChanged', () => {
      this.refreshDataWithLanguage();
    });
  }

  private refreshDataWithLanguage() {
    const freshData = getInitialProposals();
    // دمج الحالات الحالية المؤقتة مع التراجم الجديدة
    this.data = this.data.map(item => {
      const match = freshData.find(f => f.id === item.id);
      if (match) {
        return {
          ...item,
          title: match.title,
          projectTitle: match.projectTitle,
          companyName: match.companyName,
          scopeOfWork: match.scopeOfWork,
          deliverables: match.deliverables,
          paymentTerms: match.paymentTerms,
          notes: match.notes,
          milestones: match.milestones
        };
      }
      return item;
    });
    this.notify();
  }

  public getProposals(): ProposalContract[] {
    return this.data;
  }

  public setProposals(newData: ProposalContract[]) {
    this.data = newData;
    this.notify();
  }

  public updateProposalStatus(
    id: string, 
    status: ProposalStatus, 
    signedBy?: string, 
    signedAt?: string,
    signatureDataUrl?: string
  ) {
    this.data = this.data.map(item => {
      if (item.id === id) {
        const newLogs = [...(item.activityLogs || [])];
        const translatedStatus = i18n.t(`proposalsData.statuses.${status}`);
        const userText = signedBy ? i18n.t('Data.proposalsData.storeLogs.byUser', { user: signedBy }) : '';
        const actionText = `${i18n.t('Data.proposalsData.storeLogs.statusUpdated', { status: translatedStatus.toUpperCase() })}${userText}`;

        newLogs.push({
          id: `log-${Date.now()}`,
          action: actionText,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          performedBy: signedBy || i18n.t('Data.proposalsData.storeLogs.defaultUser')
        });

        return { 
          ...item, 
          status, 
          ...(signedBy && { signedBy }), 
          ...(signedAt && { signedAt }),
          ...(signatureDataUrl && { signatureDataUrl }),
          activityLogs: newLogs
        };
      }
      return item;
    });
    this.notify();
  }

  public addProposal(item: ProposalContract) {
    const newItem: ProposalContract = {
      ...item,
      activityLogs: [
        {
          id: `log-${Date.now()}`,
          action: i18n.t('Data.proposalsData.storeLogs.documentCreated'),
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          performedBy: 'Admin'
        }
      ]
    };
    this.data = [newItem, ...this.data];
    this.notify();
  }

  public deleteProposal(id: string) {
    this.data = this.data.filter(item => item.id !== id);
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }
}

export const proposalStore = new ProposalStore();