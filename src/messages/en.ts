import type { Dict } from './fr';

const en: Dict = {
  meta: {
    title: 'BMC · Best Management & Consulting',
    titleTemplate: 'Strategy, corporate finance and investment advisory',
    description:
      'Management consulting cabinet based in Tunis. Strategy, business plans, feasibility studies, corporate finance, investment and organisational transformation. Over fifteen years of practice.',
    keywords:
      'management consulting, strategy, business plan, feasibility study, corporate finance, investment, Tunisia, Tunis, Ariana',
  },

  brand: {
    short: 'BMC',
    full: 'Best Management & Consulting',
    tagline: 'Turning strategy into results',
  },

  nav: {
    chapters: {
      couverture: 'Cover',
      cabinet: 'The cabinet',
      expertises: 'Expertise',
      methode: 'Method',
      secteurs: 'Sectors',
      pourquoi: 'Why BMC',
      contact: 'Contact',
    },
    contact: 'Get in touch',
    openMenu: 'Open contents',
    closeMenu: 'Close contents',
    summary: 'Contents',
    language: 'Language',
    languageMenu: 'Choose a language',
  },

  a11y: {
    skip: 'Skip to content',
    rail: 'Document contents',
    railHint: 'Reading position',
    chartTitle: 'Performance trajectory curve',
    chartDesc:
      'Conceptual diagram. A rising curve runs through the five phases of the BMC method, from diagnosis to performance monitoring. It illustrates the method and does not represent measured data.',
    top: 'Back to top',
  },

  cover: {
    label: 'Management consulting · Tunis',
    titleLead: 'Turning strategy into',
    titleAccent: 'results.',
    lede:
      'BMC advises companies, investors and institutions on their development projects: strategy, corporate finance, investment structuring and organisational transformation.',
    primary: 'Get in touch',
    secondary: 'See our expertise',
    chart: {
      caption: 'Diagram · Performance trajectory',
      note: 'Illustrates the method, not client data.',
      axis: 'Performance',
      phases: ['Diagnosis', 'Analysis', 'Options', 'Delivery', 'Monitoring'],
    },
    marksLabel: 'At a glance',
    marks: [
      { figure: '15+', label: 'Years in practice' },
      { figure: '08', label: 'Areas of expertise' },
      { figure: '10', label: 'Sectors covered' },
    ],
  },

  cabinet: {
    title: 'A consulting cabinet for strategy, finance and investment.',
    body: [
      'Best Management & Consulting brings complementary disciplines together in service of one requirement: producing decisions that can be defended. We work with directors, investors and public institutions, from the first diagnosis through to performance monitoring.',
      'Our value is not in the length of the report. It is in the quality of the trade-offs our work makes possible, and in whether those hold up in front of a credit committee, a board or a funding body.',
    ],
    disciplinesLabel: 'Disciplines covered',
    disciplines: [
      'Corporate strategy',
      'Business plans',
      'Feasibility studies',
      'Financial restructuring',
      'Investment advisory',
      'Company upgrade programmes',
      'Organisational transformation',
      'Investor support',
      'Governance',
      'Risk management',
    ],
  },

  expertises: {
    title: 'Eight areas of expertise, one standard.',
    intro:
      'Every engagement is framed by a defined deliverable and a success criterion agreed with you before work begins.',
    hint: 'Select an area to read the detail.',
    items: [
      {
        id: 'strategie',
        name: 'Strategy & performance',
        summary: 'Strategic development, growth and competitiveness.',
        detail:
          'Competitive diagnosis, positioning choices, a costed growth plan and a management dashboard.',
      },
      {
        id: 'business-plans',
        name: 'Business plans',
        summary: 'Bankable plans a credit committee can actually read.',
        detail:
          'Full financial model, documented and sourced assumptions, sensitivity scenarios, and a presentation file ready to defend.',
      },
      {
        id: 'faisabilite',
        name: 'Feasibility studies',
        summary: 'Technical, financial and economic analysis.',
        detail:
          'Market study, technical sizing, investment plan, expected returns and break-even thresholds.',
      },
      {
        id: 'finance',
        name: 'Corporate finance',
        summary: 'Valuation, restructuring, financial diagnosis.',
        detail:
          'Financial diagnosis, valuation, debt restructuring, and working capital optimisation.',
      },
      {
        id: 'mise-a-niveau',
        name: 'Upgrade programmes',
        summary: 'Support through modernisation schemes.',
        detail:
          'Strategic and technical diagnosis, upgrade plan, file preparation and follow-through to disbursement.',
      },
      {
        id: 'investissement',
        name: 'Investment',
        summary: 'File structuring and access to funding.',
        detail:
          'Framing the requirement, preparing the bank file, introductions to funders, and negotiating terms.',
      },
      {
        id: 'transformation',
        name: 'Transformation',
        summary: 'Organisations, processes and governance.',
        detail:
          'Process mapping, target organisation, governance arrangements and change management.',
      },
      {
        id: 'formation',
        name: 'Training',
        summary: 'Building the capability of directors and managers.',
        detail:
          'Short programmes for directors and managers: reading financials, strategy, performance management, governance.',
      },
    ],
  },

  methode: {
    title: 'Five phases. None of them optional.',
    intro:
      'The same sequence structures every engagement, whatever its size. That is what makes our conclusions checkable.',
    progressLabel: 'Phase',
    phases: [
      {
        name: 'Diagnosis',
        claim: 'Understand before proposing.',
        detail:
          'Interviews with management, document review, analysis of available data. We establish a shared reading of the real situation, including what is not working.',
      },
      {
        name: 'Analysis',
        claim: 'Isolate what decides the outcome.',
        detail:
          'Financial modelling, sector benchmarks, quantified gaps. Assumptions are written down, sourced and argued through with you.',
      },
      {
        name: 'Options',
        claim: 'Build options, not an opinion.',
        detail:
          'Costed scenarios, explicit trade-offs, a reasoned recommendation. You decide on comparisons rather than on convictions.',
      },
      {
        name: 'Delivery',
        claim: 'Move from the document to the floor.',
        detail:
          'Action plan, named owners, a realistic calendar. We stay engaged through execution, not only until the report is handed over.',
      },
      {
        name: 'Monitoring',
        claim: 'Measure, correct, hold the line.',
        detail:
          'Indicators agreed up front, periodic reviews, documented adjustments. A result is observed, not announced.',
      },
    ],
  },

  secteurs: {
    title: 'Ten sectors of intervention.',
    colSector: 'Sector',
    colFocus: 'Areas of focus',
    intro:
      'We only work where we already have practice. Vocabulary, regulatory constraints and reference ratios differ too much between sectors to be improvised.',
    items: [
      { name: 'Industry', note: 'Competitiveness, productive investment, upgrading.' },
      { name: 'Aeronautics', note: 'Subcontracting, certification, ramp-up.' },
      { name: 'Automotive', note: 'Suppliers, productivity, load planning.' },
      { name: 'Agrifood', note: 'Value chains, added value, compliance.' },
      { name: 'Technology', note: 'Business models, fundraising, structuring.' },
      { name: 'Energy', note: 'Energy efficiency, renewables, financing.' },
      { name: 'Healthcare', note: 'Clinics, equipment, investment plans.' },
      { name: 'Services', note: 'Growth, organisation, networks and franchising.' },
      { name: 'Logistics', note: 'Flows, warehousing, master plans.' },
      { name: 'Public administration', note: 'Programmes, evaluation, governance.' },
    ],
  },

  pourquoi: {
    title: 'What makes a file defensible.',
    intro: 'Six commitments we hold to on every engagement, and on which you can judge us.',
    items: [
      {
        name: 'Over fifteen years in practice',
        detail:
          'A practice built on real files, in Tunisia and internationally, in demanding sectors.',
      },
      {
        name: 'Multidisciplinary expertise',
        detail:
          'Strategy, finance, organisation and technical work in one team. Nothing gets handed off to a third party.',
      },
      {
        name: 'Confidentiality',
        detail:
          'Your data stays yours. A contractual undertaking of discretion on every engagement, without exception.',
      },
      {
        name: 'Senior involvement',
        detail:
          'One senior contact present from the first meeting to the last committee. No silent delegation.',
      },
      {
        name: 'Workable solutions',
        detail:
          'Recommendations you can execute with the resources, timelines and teams you have today.',
      },
      {
        name: 'Strategic view',
        detail:
          'Every operational decision is tied back to a long-term trajectory rather than treated in isolation.',
      },
    ],
  },

  contact: {
    title: 'A project, or a decision to prepare?',
    body:
      'The first conversation is short, confidential and carries no obligation. Describe your situation and we will tell you whether we are the right people, and if not, who is.',
    addressLabel: 'Address',
    phoneLabel: 'Telephone',
    emailLabel: 'Email',
    primary: 'Call the cabinet',
    sealCaption: 'Best Management & Consulting · Tunis',
    form: {
      legend: 'Or write to us here',
      subject: 'BMC site · New enquiry',
      nameLabel: 'Name',
      companyLabel: 'Company',
      emailLabel: 'Email',
      messageLabel: 'Your situation, in a few lines',
      submit: 'Send',
      sending: 'Sending',
      sent: 'Message received. We reply within two working days.',
      error: 'The message did not go through. Email us directly or call the cabinet.',
    },
  },

  footer: {
    rights: 'All rights reserved.',
    tagline: 'Consulting cabinet for strategy, finance and investment.',
  },
};

export default en;
