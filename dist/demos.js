// Completa cada ficha cuando tengas una demo pública y aislada de producción.
// No incluyas contraseñas reales, secretos ni datos personales.
window.PORTFOLIO_DEMOS = {
  sigetram: { url: '', image: '', video: '', instructions: { es: '', en: '' } },
  transporte: { url: '', image: '', video: '', instructions: { es: '', en: '' } },
  'asp-levanto': {
    url: 'https://levanto-demo-jscs.vercel.app',
    image: 'assets/demos/levanto-poster.jpg',
    video: '',
    instructions: {
      es: 'Pulsa «Iniciar sesión» y entra con un clic como Presidente, Administrador o Empleado. Registra leche, ventas y gastos, abre la caja y revisa los reportes. En la tienda puedes comprar y pagar con la tarjeta de prueba 4242 4242 4242 4242 en una pasarela simulada: no se cobra nada. Los datos son ficticios y se reinician cada hora.',
      en: 'Click "Iniciar sesión" and sign in with one click as President, Administrator or Employee. Record milk deliveries, sales and expenses, open the till and check the reports. In the shop you can buy and pay with the test card 4242 4242 4242 4242 on a simulated checkout: nothing is charged. All data is fictitious and resets every hour.'
    }
  },
  vetcare: { url: '', image: '', video: '', instructions: { es: '', en: '' } },
  taller: {
    url: 'https://taller-demo-jscs.vercel.app',
    image: 'assets/demos/taller-poster.jpg',
    video: 'assets/demos/taller-demo.webm',
    chapters: [
      { t: 0, group: 'public', title: { es: 'Web del taller', en: 'Workshop website', pt: 'Site da oficina', fr: 'Site de l’atelier', de: 'Werkstatt-Website' }, caption: { es: 'La web pública del taller: servicios, proceso y contacto', en: 'The workshop’s public website: services, process and contact', pt: 'O site público da oficina: serviços, processo e contato', fr: 'Le site public de l’atelier : services, processus et contact', de: 'Die öffentliche Website der Werkstatt: Leistungen, Ablauf und Kontakt' } },
      { t: 12.4, group: 'public', title: { es: 'Pedir una cita', en: 'Book an appointment', pt: 'Pedir agendamento', fr: 'Demander un rendez-vous', de: 'Termin anfragen' }, caption: { es: 'El cliente pide una cita en línea y llega al panel', en: 'The customer books online and the request reaches the dashboard', pt: 'O cliente agenda online e o pedido chega ao painel', fr: 'Le client demande un rendez-vous en ligne, reçu dans le tableau de bord', de: 'Der Kunde fragt online einen Termin an, der im Dashboard ankommt' } },
      { t: 22.5, group: 'public', title: { es: 'Aprobar presupuesto', en: 'Approve the quote', pt: 'Aprovar orçamento', fr: 'Approuver le devis', de: 'Angebot freigeben' }, caption: { es: 'Portal del cliente: revisa y aprueba su presupuesto', en: 'Customer portal: review and approve the quote', pt: 'Portal do cliente: revisa e aprova o orçamento', fr: 'Portail client : consulter et approuver le devis', de: 'Kundenportal: Kostenvoranschlag prüfen und freigeben' } },
      { t: 32.2, group: 'panel', title: { es: 'Acceso por rol', en: 'Role sign-in', pt: 'Acesso por perfil', fr: 'Accès par rôle', de: 'Rollen-Login' }, caption: { es: 'Entra al panel con un clic: Propietario, Asesor, Técnico o Caja', en: 'One-click sign-in: Owner, Advisor, Technician or Cashier', pt: 'Entre no painel com um clique: Proprietário, Consultor, Técnico ou Caixa', fr: 'Connexion en un clic : Propriétaire, Conseiller, Technicien ou Caisse', de: 'Anmeldung per Klick: Inhaber, Berater, Techniker oder Kasse' } },
      { t: 37.3, group: 'panel', title: { es: 'Resumen', en: 'Overview', pt: 'Resumo', fr: 'Vue d’ensemble', de: 'Übersicht' }, caption: { es: 'Resumen del día: órdenes, citas y repuestos por reponer', en: 'Today’s overview: orders, appointments and parts to restock', pt: 'Resumo do dia: ordens, agendamentos e peças a repor', fr: 'Vue du jour : ordres, rendez-vous et pièces à réapprovisionner', de: 'Tagesübersicht: Aufträge, Termine und nachzubestellende Teile' } },
      { t: 41.9, group: 'panel', title: { es: 'Órdenes', en: 'Work orders', pt: 'Ordens', fr: 'Ordres', de: 'Aufträge' }, caption: { es: 'Órdenes de trabajo en cada etapa, con su detalle', en: 'Work orders at every stage, with their details', pt: 'Ordens de serviço em cada etapa, com detalhes', fr: 'Ordres de travail à chaque étape, avec leur détail', de: 'Arbeitsaufträge in jeder Phase, mit Details' } },
      { t: 48.3, group: 'panel', title: { es: 'Presupuestos', en: 'Quotes', pt: 'Orçamentos', fr: 'Devis', de: 'Angebote' }, caption: { es: 'Presupuestos con IGV y su estado de aprobación', en: 'Quotes with tax and their approval status', pt: 'Orçamentos com imposto e status de aprovação', fr: 'Devis TTC et leur état d’approbation', de: 'Kostenvoranschläge inkl. Steuer mit Freigabestatus' } },
      { t: 52.6, group: 'panel', title: { es: 'Caja', en: 'Till', pt: 'Caixa', fr: 'Caisse', de: 'Kasse' }, caption: { es: 'Caja: cobros de órdenes, ventas de mostrador y cierre', en: 'Till: order payments, counter sales and closing', pt: 'Caixa: recebimentos, vendas de balcão e fechamento', fr: 'Caisse : encaissements, ventes comptoir et clôture', de: 'Kasse: Zahlungen, Thekenverkäufe und Abschluss' } },
      { t: 57.7, group: 'panel', title: { es: 'Inventario', en: 'Inventory', pt: 'Estoque', fr: 'Stock', de: 'Lager' }, caption: { es: 'Inventario con stock reservado y disponible', en: 'Inventory with reserved and available stock', pt: 'Estoque com reservado e disponível', fr: 'Stock réservé et disponible', de: 'Lager mit reserviertem und verfügbarem Bestand' } },
      { t: 63.0, group: 'panel', title: { es: 'Reportes', en: 'Reports', pt: 'Relatórios', fr: 'Rapports', de: 'Berichte' }, caption: { es: 'Reportes de ingresos y operación del taller', en: 'Revenue and operations reports', pt: 'Relatórios de receita e operação', fr: 'Rapports de revenus et d’activité', de: 'Berichte zu Umsatz und Betrieb' } }
    ],
    instructions: {
      es: 'Pulsa «Iniciar sesión» y entra con un rol de prueba: Propietario, Asesor, Técnico o Caja. Crea clientes, presupuestos y órdenes, y cobra en caja. Los datos son ficticios y se reinician cada hora.',
      en: 'Click "Iniciar sesión" and sign in with a test role: Owner, Advisor, Technician or Cashier. Create customers, quotes and work orders, and take payments at the till. All data is fictitious and resets every hour.'
    }
  },
  'levanto-tur': { url: '', image: '', video: '', instructions: { es: '', en: '' } },
  restobar: { url: '', image: '', video: '', instructions: { es: '', en: '' } }
};

window.DEMO_LABELS = {
  es: { public: 'Sitio público', panel: 'Panel de gestión', tour: 'Recorrido por la demo', prev: 'Pantalla anterior', next: 'Pantalla siguiente', try: 'Probar demo', video: 'Video', watch: 'Mira el sistema en acción', soon: 'Demo próximamente', live: 'Demo disponible', preview: 'Vista animada ilustrativa · video pendiente', title: 'Prueba el sistema', help: 'Explora sus funciones en un entorno de demostración. No ingreses datos personales ni realices pagos reales.', pending: 'Estamos preparando una demo para que puedas probar su funcionamiento.', steps: 'Cómo probarlo' },
  en: { public: 'Public site', panel: 'Admin panel', tour: 'Demo walkthrough', prev: 'Previous screen', next: 'Next screen', try: 'Try demo', video: 'Video', watch: 'Watch the system in action', soon: 'Demo coming soon', live: 'Demo available', preview: 'Animated illustrative preview · video pending', title: 'Try the system', help: 'Explore its features in a demo environment. Do not enter personal data or make real payments.', pending: 'A demo is being prepared so you can explore how it works.', steps: 'How to try it' },
  pt: { public: 'Site público', panel: 'Painel de gestão', tour: 'Tour pela demo', prev: 'Tela anterior', next: 'Próxima tela', try: 'Testar demo', video: 'Vídeo', watch: 'Veja o sistema em ação', soon: 'Demo em breve', live: 'Demo disponível', preview: 'Prévia animada ilustrativa · vídeo pendente', title: 'Teste o sistema', help: 'Explore as funções em um ambiente de demonstração. Não insira dados pessoais nem faça pagamentos reais.', pending: 'Uma demo está sendo preparada para você testar o funcionamento.', steps: 'Como testar' },
  fr: { public: 'Site public', panel: 'Administration', tour: 'Visite de la démo', prev: 'Écran précédent', next: 'Écran suivant', try: 'Essayer la démo', video: 'Vidéo', watch: 'Découvrez le système en action', soon: 'Démo à venir', live: 'Démo disponible', preview: 'Aperçu animé illustratif · vidéo à venir', title: 'Testez le système', help: 'Explorez les fonctions dans un environnement de démonstration. Ne saisissez pas de données personnelles et ne faites pas de paiements réels.', pending: 'Une démo est en préparation pour découvrir son fonctionnement.', steps: 'Comment essayer' },
  de: { public: 'Öffentliche Seite', panel: 'Verwaltung', tour: 'Rundgang durch die Demo', prev: 'Vorheriger Bildschirm', next: 'Nächster Bildschirm', try: 'Demo testen', video: 'Video', watch: 'Das System in Aktion', soon: 'Demo folgt bald', live: 'Demo verfügbar', preview: 'Animierte Vorschau · Video folgt', title: 'System ausprobieren', help: 'Erkunden Sie die Funktionen in einer Demo-Umgebung. Geben Sie keine persönlichen Daten ein und tätigen Sie keine echten Zahlungen.', pending: 'Eine Demo zum Ausprobieren wird vorbereitet.', steps: 'So testen Sie' }
};
