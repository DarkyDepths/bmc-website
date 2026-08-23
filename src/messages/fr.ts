/**
 * French is the source locale. `en.ts` and `ar.ts` are typed against this shape, so a
 * missing key fails the build rather than rendering an empty string in production.
 */
const fr = {
  meta: {
    title: 'BMC · Best Management & Consulting',
    titleTemplate: 'Cabinet de conseil en stratégie, finance et investissement',
    description:
      "Cabinet de conseil basé à Tunis. Stratégie, business plans, études de faisabilité, finance d'entreprise, investissement et transformation. Plus de quinze ans de pratique.",
    keywords:
      'conseil, stratégie, business plan, étude de faisabilité, finance, investissement, mise à niveau, Tunisie, Tunis, Ariana',
  },

  brand: {
    short: 'BMC',
    full: 'Best Management & Consulting',
    tagline: 'Transformer la stratégie en résultats',
  },

  nav: {
    chapters: {
      couverture: 'Couverture',
      cabinet: 'Le cabinet',
      expertises: 'Expertises',
      methode: 'Méthodologie',
      secteurs: 'Secteurs',
      pourquoi: 'Pourquoi BMC',
      contact: 'Contact',
    },
    contact: 'Nous écrire',
    openMenu: 'Ouvrir le sommaire',
    closeMenu: 'Fermer le sommaire',
    summary: 'Sommaire',
    language: 'Langue',
    languageMenu: 'Choisir la langue',
  },

  a11y: {
    skip: 'Aller au contenu',
    rail: 'Sommaire du document',
    railHint: 'Position de lecture',
    chartTitle: 'Courbe de trajectoire de performance',
    chartDesc:
      "Schéma conceptuel. Une courbe ascendante traverse les cinq phases de la méthodologie BMC, du diagnostic au suivi des performances. Il s'agit d'une représentation de méthode et non de données mesurées.",
    top: 'Revenir en haut',
  },

  cover: {
    label: 'Cabinet de conseil · Tunis',
    titleLead: 'Transformer la stratégie en',
    titleAccent: 'résultats.',
    lede:
      "BMC accompagne entreprises, investisseurs et institutions dans leurs projets de développement : stratégie, finance d'entreprise, investissement, transformation des organisations.",
    primary: 'Prendre contact',
    secondary: 'Voir nos expertises',
    chart: {
      caption: 'Schéma · Trajectoire de performance',
      note: 'Représentation de la méthode, non des données client.',
      axis: 'Performance',
      phases: ['Diagnostic', 'Analyse', 'Solutions', 'Mise en œuvre', 'Suivi'],
    },
    marksLabel: 'Repères',
    marks: [
      { figure: '15+', label: "Années d'exercice" },
      { figure: '08', label: "Domaines d'expertise" },
      { figure: '10', label: "Secteurs d'intervention" },
    ],
  },

  cabinet: {
    title: 'Un cabinet de conseil en stratégie, finance et investissement.',
    body: [
      "Best Management & Consulting réunit des expertises complémentaires au service d'une même exigence : produire des décisions défendables. Nous intervenons auprès de dirigeants, d'investisseurs et d'institutions publiques, du diagnostic initial jusqu'au suivi des performances.",
      "Notre valeur ne tient pas à la longueur des rapports. Elle tient à la qualité des arbitrages que nos travaux rendent possibles, et à leur capacité à tenir devant un comité de crédit, un conseil d'administration ou un bailleur.",
    ],
    disciplinesLabel: 'Domaines couverts',
    disciplines: [
      "Stratégie d'entreprise",
      'Business plans',
      'Études de faisabilité',
      'Restructuration financière',
      'Conseil en investissement',
      'Mise à niveau des entreprises',
      'Transformation organisationnelle',
      'Accompagnement des investisseurs',
      'Gouvernance',
      'Management des risques',
    ],
  },

  expertises: {
    title: "Huit expertises, un même niveau d'exigence.",
    intro:
      "Chaque mission est cadrée par un livrable précis et un critère de réussite arrêté avec vous avant de commencer.",
    hint: 'Sélectionnez une expertise pour en lire le détail.',
    items: [
      {
        id: 'strategie',
        name: 'Stratégie & performance',
        summary: 'Développement stratégique, croissance et compétitivité.',
        detail:
          'Diagnostic concurrentiel, choix de positionnement, plan de croissance chiffré et tableau de bord de pilotage.',
      },
      {
        id: 'business-plans',
        name: 'Business plans',
        summary: 'Des plans bancables, lisibles par un comité de crédit.',
        detail:
          "Modèle financier complet, hypothèses documentées et sourcées, scénarios de sensibilité, dossier de présentation prêt à défendre.",
      },
      {
        id: 'faisabilite',
        name: 'Études de faisabilité',
        summary: 'Analyses techniques, financières et économiques.',
        detail:
          "Étude de marché, dimensionnement technique, plan d'investissement, rentabilité attendue et seuils critiques.",
      },
      {
        id: 'finance',
        name: "Finance d'entreprise",
        summary: 'Valorisation, restructuration, diagnostic financier.',
        detail:
          "Diagnostic financier, valorisation, restructuration de dette, optimisation du besoin en fonds de roulement.",
      },
      {
        id: 'mise-a-niveau',
        name: 'Mise à niveau',
        summary: 'Accompagnement des programmes de modernisation.',
        detail:
          'Diagnostic stratégique et technique, plan de mise à niveau, montage du dossier et suivi jusqu’à décaissement.',
      },
      {
        id: 'investissement',
        name: 'Investissement',
        summary: 'Montage de dossiers et recherche de financement.',
        detail:
          'Structuration du besoin, dossier bancaire, mise en relation avec les financeurs, négociation des conditions.',
      },
      {
        id: 'transformation',
        name: 'Transformation',
        summary: 'Organisations, processus et gouvernance.',
        detail:
          'Cartographie des processus, organisation cible, dispositif de gouvernance, conduite du changement.',
      },
      {
        id: 'formation',
        name: 'Formation',
        summary: 'Développement des compétences des dirigeants.',
        detail:
          'Programmes courts pour dirigeants et managers : lecture financière, stratégie, pilotage, gouvernance.',
      },
    ],
  },

  methode: {
    title: "Cinq phases. Aucune n'est facultative.",
    intro:
      "La même séquence structure toutes nos missions, quelle que soit leur taille. C'est ce qui rend nos conclusions vérifiables.",
    progressLabel: 'Phase',
    phases: [
      {
        name: 'Diagnostic',
        claim: 'Comprendre avant de proposer.',
        detail:
          "Entretiens de direction, revue documentaire, analyse des données disponibles. Nous établissons une lecture partagée de la situation réelle, y compris de ce qui ne fonctionne pas.",
      },
      {
        name: 'Analyse',
        claim: 'Isoler ce qui décide.',
        detail:
          'Modélisation financière, comparaisons sectorielles, quantification des écarts. Les hypothèses sont écrites, sourcées et discutées avec vous.',
      },
      {
        name: 'Élaboration des solutions',
        claim: 'Construire des options, pas une opinion.',
        detail:
          'Scénarios chiffrés, arbitrages explicites, recommandation argumentée. Vous décidez sur la base de comparaisons, pas de convictions.',
      },
      {
        name: 'Mise en œuvre',
        claim: 'Passer du document au terrain.',
        detail:
          "Plan d'action, responsabilités nommées, calendrier réaliste. Nous restons engagés pendant l'exécution, pas seulement à la remise du rapport.",
      },
      {
        name: 'Suivi des performances',
        claim: 'Mesurer, corriger, tenir le cap.',
        detail:
          'Indicateurs définis en amont, revues périodiques, ajustements documentés. Le résultat se constate, il ne se déclare pas.',
      },
    ],
  },

  secteurs: {
    title: "Dix secteurs d'intervention.",
    colSector: 'Secteur',
    colFocus: "Domaines d'intervention",
    intro:
      "Nous n'intervenons que là où nous avons déjà une pratique. Le vocabulaire, les contraintes réglementaires et les ratios de référence diffèrent trop d'un secteur à l'autre pour être improvisés.",
    items: [
      { name: 'Industrie', note: 'Compétitivité, investissement productif, mise à niveau.' },
      { name: 'Aéronautique', note: 'Sous-traitance, certification, montée en cadence.' },
      { name: 'Automobile', note: 'Équipementiers, productivité, plans de charge.' },
      { name: 'Agroalimentaire', note: 'Filières, valorisation, mise aux normes.' },
      { name: 'Technologies', note: 'Modèles économiques, levée de fonds, structuration.' },
      { name: 'Énergie', note: 'Efficacité énergétique, renouvelables, financement.' },
      { name: 'Santé', note: "Cliniques, équipements, plans d'investissement." },
      { name: 'Services', note: 'Croissance, organisation, réseaux et franchise.' },
      { name: 'Logistique', note: 'Flux, entreposage, schémas directeurs.' },
      { name: 'Administration publique', note: 'Programmes, évaluation, gouvernance.' },
    ],
  },

  pourquoi: {
    title: 'Ce qui rend un dossier défendable.',
    intro:
      "Six engagements que nous tenons sur chaque mission, et sur lesquels vous pouvez nous juger.",
    items: [
      {
        name: "Plus de quinze ans d'exercice",
        detail:
          'Une pratique construite sur des dossiers réels, en Tunisie et à l’international, dans des secteurs exigeants.',
      },
      {
        name: 'Expertise multidisciplinaire',
        detail:
          "Stratégie, finance, organisation et technique réunies dans une même équipe. Aucun sujet n'est renvoyé à un tiers.",
      },
      {
        name: 'Confidentialité',
        detail:
          'Vos données restent les vôtres. Engagement de discrétion contractuel sur chaque mission, sans exception.',
      },
      {
        name: 'Accompagnement personnalisé',
        detail:
          'Un interlocuteur senior présent du premier entretien au dernier comité. Pas de délégation silencieuse.',
      },
      {
        name: 'Solutions applicables',
        detail:
          'Des recommandations exécutables avec vos moyens, vos délais et vos équipes, telles qu’elles existent aujourd’hui.',
      },
      {
        name: 'Vision stratégique',
        detail:
          'Chaque décision opérationnelle est rattachée à une trajectoire de long terme, et non traitée isolément.',
      },
    ],
  },

  contact: {
    title: 'Un projet, une décision à préparer ?',
    body:
      "Le premier échange est court, confidentiel et sans engagement. Décrivez votre situation : nous vous dirons si nous sommes le bon interlocuteur, et sinon vers qui vous tourner.",
    addressLabel: 'Adresse',
    phoneLabel: 'Téléphone',
    emailLabel: 'Courriel',
    primary: 'Appeler le cabinet',
    sealCaption: 'Best Management & Consulting · Tunis',
    form: {
      legend: 'Ou écrivez-nous ici',
      subject: 'Site BMC · Nouvelle demande',
      nameLabel: 'Nom',
      companyLabel: 'Société',
      emailLabel: 'Courriel',
      messageLabel: 'Votre situation en quelques lignes',
      submit: 'Envoyer',
      sending: 'Envoi en cours',
      sent: 'Message reçu. Nous revenons vers vous sous 48 heures ouvrées.',
      error: "L'envoi a échoué. Écrivez-nous directement par courriel ou appelez le cabinet.",
    },
  },

  footer: {
    rights: 'Tous droits réservés.',
    tagline: 'Cabinet de conseil en stratégie, finance et investissement.',
  },
};

/**
 * The shape every other locale must satisfy. Declared without `as const` on purpose: the
 * contract is the structure, not the French strings.
 */
export type Dict = typeof fr;

export default fr;
