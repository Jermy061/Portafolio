// Completa cada ficha cuando tengas una demo pública y aislada de producción.
// No incluyas contraseñas reales, secretos ni datos personales.
window.PORTFOLIO_DEMOS = {
  sigetram: { url: '', image: '', video: '', instructions: { es: '', en: '' } },
  transporte: { url: '', image: '', video: '', instructions: { es: '', en: '' } },
  'asp-levanto': { url: '', image: '', video: '', instructions: { es: '', en: '' } },
  vetcare: { url: '', image: '', video: '', instructions: { es: '', en: '' } },
  taller: {
    url: 'https://taller-demo-jscs.vercel.app',
    image: 'assets/demos/taller-03-resumen.jpg',
    video: '',
    slides: [
      { image: 'assets/demos/taller-01-web.jpg', caption: { es: 'Web pública del taller, editable desde el panel', en: 'Public workshop website, editable from the dashboard', pt: 'Site público da oficina, editável pelo painel', fr: 'Site public de l’atelier, modifiable depuis le tableau de bord', de: 'Öffentliche Werkstatt-Website, im Dashboard editierbar' } },
      { image: 'assets/demos/taller-02-roles.jpg', caption: { es: 'Entra con un clic: Propietario, Asesor, Técnico o Caja', en: 'One-click sign-in: Owner, Advisor, Technician or Cashier', pt: 'Entre com um clique: Proprietário, Consultor, Técnico ou Caixa', fr: 'Connexion en un clic : Propriétaire, Conseiller, Technicien ou Caisse', de: 'Anmeldung per Klick: Inhaber, Berater, Techniker oder Kasse' } },
      { image: 'assets/demos/taller-03-resumen.jpg', caption: { es: 'Resumen del día: órdenes, citas y repuestos por reponer', en: 'Today’s overview: orders, appointments and parts to restock', pt: 'Resumo do dia: ordens, agendamentos e peças a repor', fr: 'Vue du jour : ordres, rendez-vous et pièces à réapprovisionner', de: 'Tagesübersicht: Aufträge, Termine und nachzubestellende Teile' } },
      { image: 'assets/demos/taller-04-ordenes.jpg', caption: { es: 'Órdenes de trabajo en cada etapa, del diagnóstico a la entrega', en: 'Work orders at every stage, from diagnosis to delivery', pt: 'Ordens de serviço em cada etapa, do diagnóstico à entrega', fr: 'Ordres de travail à chaque étape, du diagnostic à la livraison', de: 'Arbeitsaufträge in jeder Phase, von der Diagnose bis zur Übergabe' } },
      { image: 'assets/demos/taller-05-presupuestos.jpg', caption: { es: 'Presupuestos con IGV que el cliente aprueba en línea', en: 'Quotes with tax that the customer approves online', pt: 'Orçamentos com imposto que o cliente aprova online', fr: 'Devis TTC que le client approuve en ligne', de: 'Kostenvoranschläge inkl. Steuer, online vom Kunden freigegeben' } },
      { image: 'assets/demos/taller-06-caja.jpg', caption: { es: 'Caja: cobra órdenes, ventas de mostrador y cierra el turno', en: 'Till: charge orders, counter sales and close the shift', pt: 'Caixa: receba ordens, vendas de balcão e feche o turno', fr: 'Caisse : encaissez les ordres, les ventes comptoir et clôturez', de: 'Kasse: Aufträge und Thekenverkäufe kassieren, Schicht abschließen' } },
      { image: 'assets/demos/taller-07-inventario.jpg', caption: { es: 'Inventario con stock reservado y disponible por repuesto', en: 'Inventory with reserved and available stock per part', pt: 'Estoque com reservado e disponível por peça', fr: 'Stock réservé et disponible pour chaque pièce', de: 'Lager mit reserviertem und verfügbarem Bestand je Teil' } }
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
  es: { tour: 'Recorrido por la demo', prev: 'Pantalla anterior', next: 'Pantalla siguiente', try: 'Probar demo', video: 'Video', watch: 'Mira el sistema en acción', soon: 'Demo próximamente', live: 'Demo disponible', preview: 'Vista animada ilustrativa · video pendiente', title: 'Prueba el sistema', help: 'Explora sus funciones en un entorno de demostración. No ingreses datos personales ni realices pagos reales.', pending: 'Estamos preparando una demo para que puedas probar su funcionamiento.', steps: 'Cómo probarlo' },
  en: { tour: 'Demo walkthrough', prev: 'Previous screen', next: 'Next screen', try: 'Try demo', video: 'Video', watch: 'Watch the system in action', soon: 'Demo coming soon', live: 'Demo available', preview: 'Animated illustrative preview · video pending', title: 'Try the system', help: 'Explore its features in a demo environment. Do not enter personal data or make real payments.', pending: 'A demo is being prepared so you can explore how it works.', steps: 'How to try it' },
  pt: { tour: 'Tour pela demo', prev: 'Tela anterior', next: 'Próxima tela', try: 'Testar demo', video: 'Vídeo', watch: 'Veja o sistema em ação', soon: 'Demo em breve', live: 'Demo disponível', preview: 'Prévia animada ilustrativa · vídeo pendente', title: 'Teste o sistema', help: 'Explore as funções em um ambiente de demonstração. Não insira dados pessoais nem faça pagamentos reais.', pending: 'Uma demo está sendo preparada para você testar o funcionamento.', steps: 'Como testar' },
  fr: { tour: 'Visite de la démo', prev: 'Écran précédent', next: 'Écran suivant', try: 'Essayer la démo', video: 'Vidéo', watch: 'Découvrez le système en action', soon: 'Démo à venir', live: 'Démo disponible', preview: 'Aperçu animé illustratif · vidéo à venir', title: 'Testez le système', help: 'Explorez les fonctions dans un environnement de démonstration. Ne saisissez pas de données personnelles et ne faites pas de paiements réels.', pending: 'Une démo est en préparation pour découvrir son fonctionnement.', steps: 'Comment essayer' },
  de: { tour: 'Rundgang durch die Demo', prev: 'Vorheriger Bildschirm', next: 'Nächster Bildschirm', try: 'Demo testen', video: 'Video', watch: 'Das System in Aktion', soon: 'Demo folgt bald', live: 'Demo verfügbar', preview: 'Animierte Vorschau · Video folgt', title: 'System ausprobieren', help: 'Erkunden Sie die Funktionen in einer Demo-Umgebung. Geben Sie keine persönlichen Daten ein und tätigen Sie keine echten Zahlungen.', pending: 'Eine Demo zum Ausprobieren wird vorbereitet.', steps: 'So testen Sie' }
};
