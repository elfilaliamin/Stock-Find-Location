import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, onValue, set, get } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATa65iD91BSq_NQEmSscWDQT86XVDhZOQ",
  authDomain: "warehouse-locator-da21f.firebaseapp.com",
  projectId: "warehouse-locator-da21f",
  storageBucket: "warehouse-locator-da21f.firebasestorage.app",
  messagingSenderId: "796897325629",
  appId: "1:796897325629:web:535e3169cc345091f27054"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const TRANSLATIONS = {
  en: {
    appTitle: "Warehouse Locator - Hyper U",
    selectLanguage: "Select Language",
    selectMode: "Select Mode",
    findLocation: "Find Pallet",
    addContent: "Add Products",
    settings: "Settings",
    searchLocation: "Locate Pallet",
    addContentMode: "Add Products to Pallet",
    searchByContent: "Search by Product",
    enterSeatNumber: "Enter pallet number (e.g., 151)",
    searchBtn: "Locate",
    locationMap: "Warehouse Map",
    positionDetail: "Position Details",
    seatNumber: "Pallet",
    selectContent: "Select Products",
    saveContent: "Save Products",
    back: "Back",
    manageContentTypes: "Manage Products",
    contentType: "Product",
    addNewType: "Add New Product",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    seatContents: "Pallet Contents",
    clickToSearch: "Click on a product to search pallets",
    noContent: "No products assigned",
    found: "Found",
    isInLocation: "is in location",
    notFound: "Pallet number not found. Please check and try again.",
    invalidNumber: "Please enter a valid pallet number",
    contentSaved: "Products saved successfully",
    selectAtLeastOne: "Please select at least one product",
    typeAdded: "Product added successfully",
    typeDeleted: "Product deleted successfully",
    next: "Next",
    seats: "pallets",
    exportData: "Export Data",
    importData: "Import Data",
    copyToClipboard: "Copy to Clipboard",
    pasteData: "Paste JSON Data",
    dataCopied: "Data copied to clipboard!",
    dataImported: "Data imported successfully!",
    invalidDataFormat: "Invalid data format. Please check the JSON.",
    dataManagement: "Data Management",
    importBtn: "Import",
    icon: "Icon",
    clearData: "Clear All Data",
    clearedSuccess: "All data cleared successfully",
    howToUse: "How to Use",
    guideTitle: "How to Use Guide",
    guideFindTitle: "Find Pallet Mode",
    guideFindDesc: "Enter a pallet number (e.g., 151) and click 'Locate'. The app will show you its exact position on the warehouse map and what products it contains.",
    guideAddTitle: "Add Products Mode",
    guideAddDesc: "First, find a pallet by its number. Then, select the products you want to assign to that pallet from the list and click 'Save'.",
    guideSearchTitle: "Search by Product Mode",
    guideSearchDesc: "This screen lists all available products and shows which pallets they are on. Use the search bar to quickly find a product. Click on a pallet number to locate it.",
    guideSettingsTitle: "Settings Mode",
    guideSettingsDesc: "Here you can manage your product list (add, edit, or delete items), and handle app data by exporting your current setup or importing a new one.",
    updateFromSource: "Update from Source",
    updateBtn: "Fetch Latest Data",
    fetchingData: "Fetching latest data...",
    fetchFailed: "Failed to fetch data. Check connection or try again.",
    viewSourceFile: "View source file on GitHub",
    enterPassword: "Enter password:",
    incorrectPassword: "Incorrect password.",
    submit: "Submit"
  },
  fr: {
    appTitle: "Localisateur de Palettes - Hyper U",
    selectLanguage: "Sélectionner la Langue",
    selectMode: "Sélectionner le Mode",
    findLocation: "Trouver Palette",
    addContent: "Ajouter Produits",
    settings: "Paramètres",
    searchLocation: "Localiser la Palette",
    addContentMode: "Ajouter Produits à la Palette",
    searchByContent: "Rechercher par Produit",
    enterSeatNumber: "Numéro de palette (ex: 151)",
    searchBtn: "Localiser",
    locationMap: "Plan de l'Entrepôt",
    positionDetail: "Détails de Position",
    seatNumber: "Palette",
    selectContent: "Sélectionner les Produits",
    saveContent: "Enregistrer les Produits",
    back: "Retour",
    manageContentTypes: "Gérer les Produits",
    contentType: "Produit",
    addNewType: "Ajouter un Nouveau Produit",
    delete: "Supprimer",
    save: "Enregistrer",
    cancel: "Annuler",
    seatContents: "Contenu Palette",
    clickToSearch: "Cliquez sur un produit pour rechercher les palettes",
    noContent: "Aucun produit assigné",
    found: "Trouvé",
    isInLocation: "est à l'emplacement",
    notFound: "Numéro de palette introuvable. Veuillez vérifier.",
    invalidNumber: "Veuillez entrer un numéro de palette valide",
    contentSaved: "Produits enregistrés avec succès",
    selectAtLeastOne: "Veuillez sélectionner au moins un produit",
    typeAdded: "Produit ajouté avec succès",
    typeDeleted: "Produit supprimé avec succès",
    next: "Suivant",
    seats: "palettes",
    exportData: "Exporter les Données",
    importData: "Importer les Données",
    copyToClipboard: "Copier dans le Presse-papiers",
    pasteData: "Coller les Données JSON",
    dataCopied: "Données copiées!",
    dataImported: "Données importées avec succès!",
    invalidDataFormat: "Format invalide. Veuillez vérifier le JSON.",
    dataManagement: "Gestion des Données",
    importBtn: "Importer",
    icon: "Icône",
    clearData: "Effacer toutes les données",
    clearedSuccess: "Toutes les données ont été effacées",
    howToUse: "Comment Utiliser",
    guideTitle: "Guide d'Utilisation",
    guideFindTitle: "Mode Trouver Palette",
    guideFindDesc: "Entrez un numéro de palette (ex: 151) et cliquez sur 'Localiser'. L'application vous montrera sa position exacte sur le plan de l'entrepôt et les produits qu'elle contient.",
    guideAddTitle: "Mode Ajouter Produits",
    guideAddDesc: "D'abord, trouvez une palette par son numéro. Ensuite, sélectionnez les produits que vous souhaitez assigner à cette palette dans la liste et cliquez sur 'Enregistrer'.",
    guideSearchTitle: "Mode Rechercher par Produit",
    guideSearchDesc: "Cet écran liste tous les produits disponibles et indique sur quelles palettes ils se trouvent. Utilisez la barre de recherche pour trouver rapidement un produit. Cliquez sur un numéro de palette pour la localiser.",
    guideSettingsTitle: "Mode Paramètres",
    guideSettingsDesc: "Ici, vous pouvez gérer votre liste de produits (ajouter, modifier ou supprimer des articles) et gérer les données de l'application en exportant votre configuration actuelle ou en en important une nouvelle.",
    updateFromSource: "Mettre à jour depuis la source",
    updateBtn: "Récupérer les données",
    fetchingData: "Récupération des données...",
    fetchFailed: "Échec de la récupération. Vérifiez la connexion ou réessayez.",
    viewSourceFile: "Voir le fichier source sur GitHub",
    enterPassword: "Entrez le mot de passe :",
    incorrectPassword: "Mot de passe incorrect.",
    submit: "Valider"
  }
};

const CONFIG = {
  emptyCells: new Set(["A3", "A4", "B3", "B4", "C4", "D4"]),
  eightCells: new Set(["A2", "B2", "C3", "D3", "E3", "F3", "G3", "H3"]),
  twelveCells: new Set(["A1", "B1", "C1", "D1", "E1", "E4", "F1", "F4", "G1", "G4", "H1", "H4"]),
  sixteenCells: new Set(["C2", "D2", "E2", "F2", "G2", "H2"]),
  rows: ["1", "2", "3", "4"],
  cols: ["A", "B", "C", "D", "E", "F", "G", "H"]
};

class LocationFinder {
  constructor() {
    try {
      // defaults - used for resetting
      this.defaultContentTypes = [
        "Pâtes (Pasta)","Riz (Rice)","Couscous (Couscous)","Légumineuses (Legumes & beans)",
        "Huile (Oil)","Vinaigre (Vinegar)","Sauces (Ketchup, Mayo, BBQ, Soja, Harissa)",
        "Conserves (Canned goods)","Sauce tomate (Tomato sauce)","Condiments (Pickles, Mustard, etc.)",
        "Épices (Spices)","Farine (Flour)","Sucre (Sugar)","Sel (Salt)","Céréales (Cereals)",
        "Biscuits sucrés (Sweet biscuits)","Biscuits salés (Crackers)","Gâteaux (Cakes & snacks)",
        "Chocolat (Chocolate bars)","Pâte à tartiner (Spreads - Nutella, Cocoa & Nuts)",
        "Confiture (Jam)","Miel (Honey)","Café (Coffee)","Thé (Tea)","Cacao (Cocoa drink)",
        "Soupes & bouillons (Soups & broths)","Produits variés (Mixed products)"
      ];
      this.defaultProductIcons = {
        "Pâtes (Pasta)": "🍝","Riz (Rice)": "🍚","Couscous (Couscous)": "🥘",
        "Légumineuses (Legumes & beans)": "🧆","Huile (Oil)": "🫒","Vinaigre (Vinegar)": "🍾",
        "Sauces (Ketchup, Mayo, BBQ, Soja, Harissa)": "🧴","Conserves (Canned goods)": "🥫",
        "Sauce tomate (Tomato sauce)": "🍅","Condiments (Pickles, Mustard, etc.)": "🥒",
        "Épices (Spices)": "🌶️","Farine (Flour)": "🌾","Sucre (Sugar)": "🍬","Sel (Salt)": "🧂",
        "Céréales (Cereals)": "🥣","Biscuits sucrés (Sweet biscuits)": "🍪","Biscuits salés (Crackers)": "🥨",
        "Gâteaux (Cakes & snacks)": "🧁","Chocolat (Chocolate bars)": "🍫","Pâte à tartiner (Spreads - Nutella, Cocoa & Nuts)": "🥄",
        "Confiture (Jam)": "🍓","Miel (Honey)": "🐝","Café (Coffee)": "☕","Thé (Tea)": "🍵",
        "Cacao (Cocoa drink)": "🥛","Soupes & bouillons (Soups & broths)": "🍲","Produits variés (Mixed products)": "☢️"
      };

      this.data = this.generateData();
      this.currentLanguage = localStorage.getItem('hyperULang') || 'en'; // persist language
      this.currentMode = null;
      this.seatContents = {};
      this.productIcons = {};
      this.contentTypes = this.defaultContentTypes.slice();
      this.productIcons = Object.assign({}, this.defaultProductIcons);
      this.currentSeat = null;
      this.password = 'pgc01';

      this.lastUpdated = null;
      // icons list for picker (expanded)
      this.iconList = [
        '🍝','🍚','🫒','🥫','🍪','🧈','🥣','🌾','🧂','☕','🍵','🍫','🍓','🍅',
        '🍞','🥐','🧀','🥛','🥤','🍷','🍺','🥃','🧃','🧊','🥗','🥙','🌮','🌯',
        '🥪','🍔','🍟','🍕','🌭','🥓','🥚','🍳','🧇','🥞','🍯','🥜','🌰','🍄',
        '🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🧄','🧅','🥔','🍠','🫘','🥨','🥯',
        '🥟','🥠','🥡','🍱','🍘','🍙','🍛','🍜','🍣','🍱'
      ];

      this.dbRef = ref(database, 'warehouseData');
      this.listenForDataChanges();
      this.showLanguageSelection();

    } catch (e) {
      console.error('Initialization error:', e);
      document.getElementById('appRoot').innerHTML = '<div class="app-container"><h1>Error loading app</h1><p>' + e.message + '</p></div>';
    }
  }

  listenForDataChanges() {
    onValue(this.dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.seatContents = data.seatContents || {};
        this.contentTypes = data.contentTypes || this.defaultContentTypes.slice();
        
        // Reconstruct productIcons using original names as keys, mapping from sanitized Firebase keys
        this.productIcons = {};
        const firebaseProductIcons = data.productIcons || {};
        for (const typeName of this.contentTypes) {
          const sanitizedKey = this.sanitizeFirebaseKey(typeName);
          if (firebaseProductIcons.hasOwnProperty(sanitizedKey)) {
            this.productIcons[typeName] = firebaseProductIcons[sanitizedKey];
          } else {
            // Fallback to default icon if not found in Firebase, or if typeName is new
            this.productIcons[typeName] = this.defaultProductIcons[typeName] || '📦';
          }
        }

        this.lastUpdated = data.lastUpdated || null;
      } else {
        // If no data in Firebase, initialize with defaults
        this.seatContents = {};
        this.contentTypes = this.defaultContentTypes.slice();
        this.productIcons = Object.assign({}, this.defaultProductIcons);
        this.lastUpdated = null;
        // Also save these defaults to Firebase with sanitized keys
        this.saveAllData();
      }
      // If a view is active, refresh it to show the new data
      if (this.currentMode) this.selectMode(this.currentMode);
    });
  }

  sanitizeFirebaseKey(key) {
    return key.replace(/[.#$/[\]\s(),]/g, '_'); // Replace invalid Firebase key characters and common problematic ones
  }

  /**
   * Saves the entire data object to Firebase.
   * This is a "heavy" operation and should only be used for major changes
   * like data import or clearing all data.
   */
  async saveAllData() {
    const sanitizedProductIcons = {};
    for (const typeName in this.productIcons) {
      const sanitizedKey = this.sanitizeFirebaseKey(typeName);
      sanitizedProductIcons[sanitizedKey] = this.productIcons[typeName];
    }

    const data = {
      seatContents: this.seatContents,
      contentTypes: this.contentTypes,
      productIcons: sanitizedProductIcons, // Send the sanitized version to Firebase
      lastUpdated: new Date().toISOString()
    };
    return set(this.dbRef, data);
  }

  exportData() {
    const data = {
      seatContents: this.seatContents,
      contentTypes: this.contentTypes,
      productIcons: this.productIcons,
      lastUpdated: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  copyDataToClipboard() {
    const data = this.exportData();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(data).then(() => {
        this.showInfo('✅ ' + this.t('dataCopied'));
      }).catch(() => {
        this.fallbackCopy(data);
      });
    } else {
      this.fallbackCopy(data);
    }
  }

  fallbackCopy(data) {
    const textarea = document.createElement('textarea');
    textarea.value = data;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      this.showInfo('✅ ' + this.t('dataCopied'));
    } catch (e) {
      this.showInfo('❌ Copy failed', true);
    }
    document.body.removeChild(textarea);
  }

  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.seatContents && data.contentTypes) {
        this.seatContents = data.seatContents;
        this.contentTypes = data.contentTypes;
        // merge icons with defaults so everything has an emoji
        this.productIcons = Object.assign({}, this.defaultProductIcons, data.productIcons || {});
        this.lastUpdated = data.lastUpdated || null;
        this.saveAllData(); // This will now save to Firebase
        this.showInfo('✅ ' + this.t('dataImported'));
        setTimeout(() => this.showSettings(), 1500);
      } else {
        this.showInfo('❌ ' + this.t('invalidDataFormat'), true);
      }
    } catch (e) {
      this.showInfo('❌ ' + this.t('invalidDataFormat'), true);
    }
  }

  importFromTextarea() {
    const textarea = document.getElementById('importTextarea');
    if (textarea) {
      const jsonString = textarea.value.trim();
      if (jsonString) {
        this.importData(jsonString);
        textarea.value = '';
      }
    }
  }

  async importFromSource() {
    const sourceUrl = './data.json'; // Fetch from local file
    this.showInfo('⏳ ' + this.t('fetchingData'));

    try {
      // Add a cache-busting query parameter to ensure the latest version is fetched
      const response = await fetch(`${sourceUrl}?v=${new Date().getTime()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonString = await response.text();
      this.importData(jsonString);
    } catch (error) {
      console.error('Failed to fetch from local data.json:', error);
      this.showInfo('❌ ' + this.t('fetchFailed'), true);
    } 
  }

  t(key) {
    return TRANSLATIONS[this.currentLanguage][key] || key;
  }

  showLanguageSelection() {
    const root = document.getElementById('appRoot');
    if (!root) return;

    root.innerHTML = `
        <div class="app-container" style="max-width: 500px;">
        <div class="hyper-u-logo">HYPER U</div>
        <h1 style="text-align: center;">🌍 ${this.t('selectLanguage')}</h1>
        <div class="language-grid">
            <button class="language-button" onclick="window.app.selectLanguage('en')">
            🇬🇧 English
            </button>
            <button class="language-button" onclick="window.app.selectLanguage('fr')">
            🇫🇷 Français
            </button>
        </div>
        </div>
    `;
  }

  selectLanguage(lang) {
    this.currentLanguage = lang;
    try { localStorage.setItem('hyperULang', lang); } catch (_) {}
    this.showModeSelection();
  }

  showModeSelection() {
    const root = document.getElementById('appRoot');
    if (!root) return;

    root.innerHTML = `
        <div class="app-container" style="max-width: 600px;">
        <div class="hyper-u-logo">HYPER U</div>
        
        <div class="info-banner" id="infoBanner">
            <p class="info-text" id="infoText" aria-live="polite"></p>
        </div>

        <h1 style="text-align: center;">📦 ${this.t('selectMode')}</h1>
        <div class="mode-grid">
            <button class="mode-button" onclick="window.app.selectMode('find')">
            📍 ${this.t('findLocation')}
            </button>
            <button class="mode-button" onclick="window.app.selectMode('search-content')">
            🔎 ${this.t('searchByContent')}
            </button>
            <button class="mode-button" onclick="window.app.showPasswordModal('add')">
            ➕ ${this.t('addContent')}
            </button>
            <button class="mode-button" onclick="window.app.showPasswordModal('settings')">
            ⚙️ ${this.t('settings')}
            </button>
            <button class="mode-button" onclick="window.app.selectMode('guide')" style="grid-column: 1 / -1;">
            💡 ${this.t('howToUse')}
            </button>
        </div>
        <div id="modalRoot"></div>
        </div>
    `;
  }

  showPasswordModal(mode) {
    const authTime = localStorage.getItem('hyperUPasswordAuthTime');
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    if (authTime && (new Date().getTime() - parseInt(authTime)) < oneHour) {
      if (mode === 'add') {
        this.selectMode('add');
      } else if (mode === 'settings') {
        this.showSettings();
      }
      return; // Bypass the modal if already authenticated
    }


    const modalRoot = document.getElementById('modalRoot');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="password-modal-overlay" id="passwordOverlay">
        <div class="password-modal">
          <h3>${this.t('enterPassword')}</h3>
          <input type="password" id="passwordInput" autofocus>
          <div class="password-modal-actions">
            <button onclick="window.app.hidePasswordModal()" style="background: var(--ink-500);">${this.t('cancel')}</button>
            <button id="passwordSubmitBtn">${this.t('submit')}</button>
          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('passwordOverlay');
    const input = document.getElementById('passwordInput');
    const submitBtn = document.getElementById('passwordSubmitBtn');

    const submit = () => this.checkPassword(mode);

    submitBtn.addEventListener('click', submit);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') submit();
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.hidePasswordModal();
    });
  }

  hidePasswordModal() {
    const modalRoot = document.getElementById('modalRoot');
    if (modalRoot) modalRoot.innerHTML = '';
  }

  checkPassword(mode) {
    const input = document.getElementById('passwordInput');
    if (!input) return;

    const enteredPassword = input.value;
    if (enteredPassword === this.password) {
      localStorage.setItem('hyperUPasswordAuthTime', new Date().getTime());
      this.hidePasswordModal();
      if (mode === 'add') {
        this.selectMode('add');
      } else if (mode === 'settings') {
        this.showSettings();
      }
    } else if (enteredPassword !== null) { // if user didn't click cancel
      this.showInfo('❌ ' + this.t('incorrectPassword'), true);
      input.value = '';
      input.focus();
    }
  }

  selectMode(mode) {
    this.currentMode = mode;
    this.resetHighlights(); // ensure no lingering highlights
    if (mode === 'find') {
      this.showFindMode();
    } else if (mode === 'add') {
      this.showAddContentMode();
    } else if (mode === 'search-content') {
      this.showSearchByContentMode();
    } else if (mode === 'guide') {
      this.showGuideMode();
    }
  }

  showFindMode() {
    this.renderMainApp();
    this.setupFindListeners();
  }

  showAddContentMode() {
    this.renderMainApp(true);
    this.setupAddContentListeners();
  }

  showSearchByContentMode() {
    const contentBySeat = {};
    for (const seat in this.seatContents) {
      const contents = this.seatContents[seat];
      for (let i = 0; i < contents.length; i++) {
        const content = contents[i];
        if (!contentBySeat[content]) contentBySeat[content] = [];
        contentBySeat[content].push(parseInt(seat));
      }
    }

    const sortedTypes = this.contentTypes.slice().sort((a, b) => {
      const aCount = (contentBySeat[a] || []).length;
      const bCount = (contentBySeat[b] || []).length;
      return bCount - aCount;
    });

    let contentHTML = '';
    for (let i = 0; i < sortedTypes.length; i++) {
      const type = sortedTypes[i];
      const seats = contentBySeat[type] || [];
      const icon = this.productIcons[type] || '📦';
      let seatsButtons = '';

      if (seats.length > 0) {
        seats.sort((a, b) => a - b);
        seatsButtons = '<div class="seat-buttons">';
        for (let j = 0; j < seats.length; j++) {
          seatsButtons += `<button class="seat-button" onclick="window.app.searchFromContent(${seats[j]})">${seats[j]}</button>`;
        }
        seatsButtons += '</div>';
      } else {
        // Display a message if there are no pallets for this product
        seatsButtons = `<p class="no-content" style="font-size: 14px; color: var(--ink-500); margin-top: 10px;">${this.t('noContent')}</p>`;
      }

      contentHTML += `
        <div class="content-list-item" data-seat-count="${seats.length}">
            <div class="content-list-header">
              <span class="content-list-title"><span class="icon">${icon}</span> ${this.escapeHtml(type)}</span>
              <span class="seat-badge">${seats.length} ${this.t('seats')}</span>
            </div>
            ${seatsButtons}
        </div>
      `;
    }

    const root = document.getElementById('appRoot');
    if (!root) return;

    // Add search input at top + keep badge in one line (CSS handles)
    root.innerHTML = `
        <div class="app-container">
        <div class="hyper-u-logo">HYPER U</div>
        <h1>🔎 ${this.t('searchByContent')}</h1>
        <p class="subtitle">${this.t('clickToSearch')}</p>
        <button onclick="window.app.showModeSelection()">← ${this.t('back')}</button>

        <div class="search-section" style="margin-top:12px;">
          <input type="text" id="productSearch" placeholder="${this.currentLanguage === 'en' ? 'Search product…' : 'Rechercher un produit…'}" aria-label="Search product">
        </div>

        <div id="contentList" style="margin-top: 10px;">${contentHTML}</div>
        </div>
    `;

    // Immediately hide items with 0 pallets on initial load
    const listItems = root.querySelectorAll('.content-list-item');
    listItems.forEach(item => {
      const seatCount = parseInt(item.getAttribute('data-seat-count') || '0', 10);
      if (seatCount === 0) {
        item.style.display = 'none';
      }
    });

    // Filter behavior
    const searchInput = document.getElementById('productSearch');
    const list = document.getElementById('contentList');
    if (searchInput && list) {
      searchInput.addEventListener('input', function () {
        const q = window.app.normalizeString(this.value.trim().toLowerCase());
        const isSearching = q.length > 0;
        const items = list.querySelectorAll('.content-list-item');

        items.forEach(item => {
          const nameEl = item.querySelector('.content-list-title');
          const name = window.app.normalizeString((nameEl ? nameEl.textContent : '').toLowerCase());
          const seatCount = parseInt(item.getAttribute('data-seat-count') || '0', 10);

          if (isSearching) {
            item.style.display = name.includes(q) ? '' : 'none';
          } else {
            item.style.display = seatCount > 0 ? '' : 'none';
          }
        });
      });
    }
  }

  // Helper to remove accents/diacritics for searching
  normalizeString(str) {
    if (typeof str !== 'string') return '';
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  searchFromContent(seatNum) {
    this.currentMode = 'find';
    this.showFindMode();
    const self = this;
    setTimeout(function() {
      const input = document.getElementById('searchInput');
      if (input) {
        input.value = seatNum;
        self.search(seatNum.toString());
      }
    }, 100);
  }

  showGuideMode() {
    const root = document.getElementById('appRoot');
    if (!root) return;

    root.innerHTML = `
      <div class="app-container" style="max-width: 700px;">
        <div class="hyper-u-logo">HYPER U</div>
        <h1>💡 ${this.t('guideTitle')}</h1>
        <button onclick="window.app.showModeSelection()" style="margin-bottom: 20px;">← ${this.t('back')}</button>

        <div class="guide-section">
          <h3>📍 ${this.t('guideFindTitle')}</h3>
          <p>${this.t('guideFindDesc')}</p>
        </div>

        <div class="guide-section">
          <h3>➕ ${this.t('guideAddTitle')}</h3>
          <p>${this.t('guideAddDesc')}</p>
        </div>

        <div class="guide-section">
          <h3>🔎 ${this.t('guideSearchTitle')}</h3>
          <p>${this.t('guideSearchDesc')}</p>
        </div>

        <div class="guide-section">
          <h3>⚙️ ${this.t('guideSettingsTitle')}</h3>
          <p>${this.t('guideSettingsDesc')}</p>
        </div>
      </div>
    `;

    // Add a simple style for the guide sections
    const style = document.createElement('style');
    style.innerHTML = `.guide-section { margin-bottom: 20px; background: #f7fafc; padding: 15px; border-radius: 12px; } .guide-section h3 { margin-top: 0; } .guide-section p { font-size: 15px; line-height: 1.6; color: var(--ink-600); }`;
    root.appendChild(style);
  }

  formatRelativeDate(dateString) {
    if (!dateString) return null;

    const date = new Date(dateString);
    const now = new Date();
    
    // To compare days accurately, we ignore the time part of the dates.
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const pastDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const timeDifference = today.getTime() - pastDate.getTime();
    const diffDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const rtf = new Intl.RelativeTimeFormat(this.currentLanguage, { numeric: 'auto' });

    if (diffDays === 0) {
        return rtf.format(0, 'day'); // 'today' or 'aujourd'hui'
    }
    if (diffDays === 1) {
        return rtf.format(-1, 'day'); // 'yesterday' or 'hier'
    }
    if (diffDays < 7) {
        return rtf.format(-diffDays, 'day'); // 'X days ago' or 'il y a X jours'
    }
    if (diffDays < 14) {
        const diffWeeks = Math.floor(diffDays / 7);
        return rtf.format(-diffWeeks, 'week'); // 'last week' or 'il y a 1 semaine'
    }
    
    // If older than two weeks, show the full date
    return new Intl.DateTimeFormat(this.currentLanguage, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
  }

  showSettings() {
    let typesHTML = '';
    for (let i = 0; i < this.contentTypes.length; i++) {
      const type = this.contentTypes[i];
      const icon = this.productIcons[type] || '📦';
      const escapedType = this.escapeHtml(type);
      const escapedIcon = this.escapeHtml(icon);
      typesHTML += `
        <div class="type-item">
          <input type="text" class="icon-input" value="${escapedIcon}" id="icon-${i}" placeholder="🍝" readonly onclick="window.app.showIconPicker(this, ${i})">
          <input type="text" value="${escapedType}" id="type-${i}">
          <button class="btn-icon btn-danger" onclick="window.app.deleteContentType(${i})" aria-label="${this.t('delete')}"><span class="material-icons">delete</span></button>
        </div>
      `;
    }

    const lastUpdatedDate = this.formatRelativeDate(this.lastUpdated);
    const lastUpdatedText = lastUpdatedDate 
        ? `${this.currentLanguage === 'en' ? 'Data from:' : 'Données du :'} <strong>${lastUpdatedDate}</strong>`
        : '';

    const root = document.getElementById('appRoot');
    if (!root) return;

    root.innerHTML = `
        <div class="app-container" style="max-width: 700px;">
        <div class="hyper-u-logo">HYPER U</div>
        <h1>⚙️ ${this.t('settings')}</h1>
        <button onclick="window.app.showModeSelection()" style="margin-bottom: 20px;">← ${this.t('back')}</button>
        
        <h2>${this.t('manageContentTypes')}</h2>
        <div id="typesList">${typesHTML}</div>
        
        <div style="margin-top: 20px; display: flex; gap: 10px; position: relative;">
            <input type="text" id="newIcon" placeholder="🍝" readonly onclick="window.app.showIconPicker(this, -1)" style="width: 80px; text-align: center; font-size: 24px; cursor: pointer;">
            <input type="text" id="newType" placeholder="${this.t('addNewType')}" style="flex:1; min-width:160px;">
            <button onclick="window.app.addContentType()" style="min-width: 120px;">
            ➕ ${this.t('Add')}
            </button>
        </div>

        <div style="display:flex; gap:10px; margin-top: 20px;">
            <button onclick="window.app.saveSettings()" style="flex:1;">
                💾 ${this.t('save')}
            </button>
            <button onclick="window.app.clearAllData()" style="flex:1; background:#dc2626;">
                🧹 ${this.t('clearData')}
            </button>
        </div>
        </div>
        <div id="iconPickerContainer"></div>
    `;

    const self = this;
    setTimeout(function() {
      const newTypeInput = document.getElementById('newType');
      if (newTypeInput) {
        newTypeInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') self.addContentType();
        });
      }
    }, 0);
  }

  // Clear all data and reset to defaults
  async clearAllData() {
    const confirmClear = window.confirm(this.currentLanguage === 'en'
      ? 'Reset all data? This will restore the default data from the source file.'
      : 'Réinitialiser les données ? Ceci restaurera les données par défaut depuis le fichier source.');
    if (!confirmClear) return;

    // Re-use the importFromSource logic to reset the data
    await this.importFromSource();
  }

  escapeHtml(text) {
    if (typeof text !== 'string') return text;
    const map = { '&': '&amp;','<': '&lt;','>': '&gt;','"': '&quot;',"'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Improved Icon Picker: modal with search + Esc to close
  showIconPicker(inputElement, index) {
    this.iconPickerTarget = { inputElement, index };

    const icons = this.iconList;
    let pickerHTML = `
      <div class="icon-modal-overlay" id="iconModalOverlay">
        <div class="icon-modal" role="dialog" aria-modal="true">
          <div class="icon-modal-header">
            <div class="icon-picker-title">${this.currentLanguage === 'en' ? 'Select an icon' : 'Sélectionner une icône'}</div>
            <button class="icon-modal-close" id="iconModalClose" aria-label="Close">×</button>
          </div>
          <div class="icon-picker-grid" id="iconPickerGrid">
    `;

    for (let i = 0; i < icons.length; i++) {
      pickerHTML += `<div class="icon-picker-item" data-icon="${icons[i]}">${icons[i]}</div>`;
    }

    pickerHTML += `
          </div>
        </div>
      </div>
    `;

    let root = document.getElementById('iconPickerRoot');
    if (!root) {
      root = document.createElement('div');
      root.id = 'iconPickerRoot';
      document.body.appendChild(root);
    }
    root.innerHTML = pickerHTML;

    // events
    const rootOverlay = document.getElementById('iconModalOverlay');
    const closeBtn = document.getElementById('iconModalClose');
    const grid = document.getElementById('iconPickerGrid');

    let removePicker = () => {
      document.removeEventListener('keydown', onKey);
      if (root) root.innerHTML = '';
    };

    const onPick = (ev) => {
      const target = ev.target.closest('.icon-picker-item');
      if (!target) return;
      const icon = target.getAttribute('data-icon');
      this.selectIcon(icon, index);
      removePicker();
    };

    const onKey = (e) => { if (e.key === 'Escape') removePicker(); };

    grid.addEventListener('click', onPick);
    closeBtn.addEventListener('click', removePicker);
    rootOverlay.addEventListener('click', function(e) {
      if (e.target === rootOverlay) removePicker();
    });
    document.addEventListener('keydown', onKey);
  }

  closeIconPicker() {
    const root = document.getElementById('iconPickerRoot');
    if (root) root.innerHTML = '';
  }

  selectIcon(icon, index) {
    if (index === -1) {
      const newIconInput = document.getElementById('newIcon');
      if (newIconInput) newIconInput.value = icon;
    } else {
      const iconInput = document.getElementById('icon-' + index);
      if (iconInput) iconInput.value = icon;
    }
    this.closeIconPicker();
  }

  async addContentType() {
    const input = document.getElementById('newType');
    const iconInput = document.getElementById('newIcon');
    if (!input) return;

    const value = input.value.trim();
    const icon = iconInput ? iconInput.value.trim() || '📦' : '📦';

    if (value) {
      // Update local state first
      this.contentTypes.push(value);
      this.productIcons[value] = icon;

      // Granularly update Firebase
      await set(ref(database, 'warehouseData/contentTypes'), this.contentTypes);
      await set(ref(database, `warehouseData/productIcons/${this.sanitizeFirebaseKey(value)}`), icon); // Sanitize key for productIcons

      input.value = '';
      if (iconInput) iconInput.value = '';
      this.showInfo(this.t('typeAdded'));
      this.showSettings();
    }
  }

  deleteContentType(idx) {
    const deleted = this.contentTypes[idx];
    if (!deleted) return;
    this.contentTypes.splice(idx, 1);
    delete this.productIcons[deleted];

    for (const seat in this.seatContents) {
      const filtered = [];
      for (let i = 0; i < this.seatContents[seat].length; i++) {
        if (this.seatContents[seat][i] !== deleted) {
          filtered.push(this.seatContents[seat][i]);
        }
      }
      this.seatContents[seat] = filtered;
      if (this.seatContents[seat].length === 0) {
        delete this.seatContents[seat];
      }
    }

    this.saveAllData(); // Use saveAllData here as it affects multiple parts of the data structure
    this.showInfo(this.t('typeDeleted'));
    this.showSettings();
  }

  async saveSettings() {
    const newTypes = [];
    const newIcons = {};
    const oldTypes = this.contentTypes.slice(); // Keep a copy of the old types
    const renameMap = {};

    for (let i = 0; i < oldTypes.length; i++) {
      const input = document.getElementById(`type-${i}`);
      const iconInput = document.getElementById(`icon-${i}`);
      const value = input ? input.value.trim() : '';
      const icon = iconInput ? iconInput.value.trim() || '📦' : '📦';
      
      if (value) {
        newTypes.push(value);
        newIcons[value] = icon;
        if (value !== oldTypes[i]) {
          renameMap[oldTypes[i]] = value;
        }
      }
    }

    // Update seatContents if any types were renamed
    if (Object.keys(renameMap).length > 0) {
      for (const seat in this.seatContents) {
        this.seatContents[seat] = this.seatContents[seat].map(type => renameMap[type] || type);
      }
    }

    this.contentTypes = newTypes;
    this.productIcons = newIcons;
    // Save all data to ensure consistency after potential renames
    await this.saveAllData();
    this.showModeSelection();
  }

  renderMainApp(isAddMode) {
    const modeTitle = isAddMode ? this.t('addContentMode') : this.t('searchLocation');
    const buttonText = isAddMode ? '▶️ ' + this.t('next') : this.t('searchBtn');

    const root = document.getElementById('appRoot');
    if (!root) return;

    root.innerHTML = `
        <div class="app-container">
        <div class="hyper-u-logo">HYPER U</div>
        <h1>📦 ${this.t('appTitle')}</h1>
        <p class="subtitle">${modeTitle}</p>
        <button onclick="window.app.showModeSelection()" style="margin-bottom: 20px;">← ${this.t('back')}</button>

        <div class="search-section">
            <input type="number" id="searchInput" placeholder="${this.t('enterSeatNumber')}" aria-label="Pallet number">
            <button id="searchBtn">${buttonText}</button>
        </div>

        <div class="info-banner" id="infoBanner">
            <p class="info-text" id="infoText" aria-live="polite"></p>
        </div>

        <div id="contentSection" class="content-section"></div>

        <div id="resultsSection" style="display: none;">
            <h2>📍 ${this.t('locationMap')}</h2>
            <div class="location" id="locationMap">
            <div class="section GH">
                <div class="H box">H</div><div class="H1 box"></div><div class="H2 box"></div><div class="H3 box passage"></div><div class="H4 box"></div>
                <div class="G box">G</div><div class="G1 box"></div><div class="G2 box"></div><div class="G3 box passage"></div><div class="G4 box"></div>
            </div>
            <div class="section EF">
                <div class="F box">F</div><div class="F1 box"></div><div class="F2 box"></div><div class="F3 box passage"></div><div class="F4 box"></div>
                <div class="E box">E</div><div class="E1 box"></div><div class="E2 box"></div><div class="E3 box passage"></div><div class="E4 box"></div>
            </div>
            <div class="section CD">
                <div class="D box">D</div><div class="D1 box"></div><div class="D2 box"></div><div class="D3 box passage"></div><div class="D4 box empty"></div>
                <div class="C box">C</div><div class="C1 box"></div><div class="C2 box"></div><div class="C3 box passage"></div><div class="C4 box empty"></div>
            </div>
            <div class="section AB">
                <div class="B box">B</div><div class="B1 box"></div><div class="B2 box passage"></div><div class="B3 box empty"></div><div class="B4 box empty"></div>
                <div class="A box">A</div><div class="A1 box"></div><div class="A2 box passage"></div><div class="A3 box empty"></div><div class="A4 box empty"></div>
            </div>
            </div>

            <h2 style="margin-top: 25px;">💺 ${this.t('positionDetail')}</h2>
            <div class="container C8L" data-capacity="8" data-side="L">
                <div class="X8 cell" data-pos="8">8</div><div class="X7 cell" data-pos="7">7</div><div class="X6 cell" data-pos="6">6</div><div class="X5 cell" data-pos="5">5</div>
                <div class="X4 cell" data-pos="4">4</div><div class="X3 cell" data-pos="3">3</div><div class="X2 cell" data-pos="2">2</div><div class="X1 cell" data-pos="1">1</div>
            </div>
            <div class="container C8R" data-capacity="8" data-side="R">
                <div class="X5 cell" data-pos="5">5</div><div class="X6 cell" data-pos="6">6</div><div class="X7 cell" data-pos="7">7</div><div class="X8 cell" data-pos="8">8</div>
                <div class="X1 cell" data-pos="1">1</div><div class="X2 cell" data-pos="2">2</div><div class="X3 cell" data-pos="3">3</div><div class="X4 cell" data-pos="4">4</div>
            </div>
            <div class="container C12L" data-capacity="12" data-side="L">
                <div class="X12 cell" data-pos="12">12</div><div class="X11 cell" data-pos="11">11</div><div class="X10 cell" data-pos="10">10</div>
                <div class="X9 cell" data-pos="9">9</div><div class="X8 cell" data-pos="8">8</div><div class="X7 cell" data-pos="7">7</div>
                <div class="X6 cell" data-pos="6">6</div><div class="X5 cell" data-pos="5">5</div><div class="X4 cell" data-pos="4">4</div>
                <div class="X3 cell" data-pos="3">3</div><div class="X2 cell" data-pos="2">2</div><div class="X1 cell" data-pos="1">1</div>
            </div>
            <div class="container C12R" data-capacity="12" data-side="R">
                <div class="X10 cell" data-pos="10">10</div><div class="X11 cell" data-pos="11">11</div><div class="X12 cell" data-pos="12">12</div>
                <div class="X7 cell" data-pos="7">7</div><div class="X8 cell" data-pos="8">8</div><div class="X9 cell" data-pos="9">9</div>
                <div class="X4 cell" data-pos="4">4</div><div class="X5 cell" data-pos="5">5</div><div class="X6 cell" data-pos="6">6</div>
                <div class="X1 cell" data-pos="1">1</div><div class="X2 cell" data-pos="2">2</div><div class="X3 cell" data-pos="3">3</div>
            </div>
            <div class="container C16L" data-capacity="16" data-side="L">
                <div class="X16 cell" data-pos="16">16</div><div class="X15 cell" data-pos="15">15</div><div class="X14 cell" data-pos="14">14</div><div class="X13 cell" data-pos="13">13</div>
                <div class="X12 cell" data-pos="12">12</div><div class="X11 cell" data-pos="11">11</div><div class="X10 cell" data-pos="10">10</div><div class="X9 cell" data-pos="9">9</div>
                <div class="X8 cell" data-pos="8">8</div><div class="X7 cell" data-pos="7">7</div><div class="X6 cell" data-pos="6">6</div><div class="X5 cell" data-pos="5">5</div>
                <div class="X4 cell" data-pos="4">4</div><div class="X3 cell" data-pos="3">3</div><div class="X2 cell" data-pos="2">2</div><div class="X1 cell" data-pos="1">1</div>
            </div>
            <div class="container C16R" data-capacity="16" data-side="R">
                <div class="X13 cell" data-pos="13">13</div><div class="X14 cell" data-pos="14">14</div><div class="X15 cell" data-pos="15">15</div><div class="X16 cell" data-pos="16">16</div>
                <div class="X9 cell" data-pos="9">9</div><div class="X10 cell" data-pos="10">10</div><div class="X11 cell" data-pos="11">11</div><div class="X12 cell" data-pos="12">12</div>
                <div class="X5 cell" data-pos="5">5</div><div class="X6 cell" data-pos="6">6</div><div class="X7 cell" data-pos="7">7</div><div class="X8 cell" data-pos="8">8</div>
                <div class="X1 cell" data-pos="1">1</div><div class="X2 cell" data-pos="2">2</div><div class="X3 cell" data-pos="3">3</div><div class="X4 cell" data-pos="4">4</div>
            </div>
        </div>
        </div>
    `;
  }

  generateData() {
    const allCells = [];
    let currentStart = 1;

    for (let c = 0; c < CONFIG.cols.length; c++) {
      const col = CONFIG.cols[c];
      for (let r = 0; r < CONFIG.rows.length; r++) {
        const row = CONFIG.rows[r];
        const id = col + row;
        const capacity = this.getCellCapacity(id);
        const end = capacity > 0 ? currentStart + capacity - 1 : currentStart - 1;

        allCells.push({
          id: id,
          start: capacity > 0 ? currentStart : null,
          end: capacity > 0 ? end : null,
          capacity: capacity
        });

        if (capacity > 0) currentStart = end + 1;
      }
    }
    return allCells;
  }

  getCellCapacity(id) {
    if (CONFIG.emptyCells.has(id)) return 0;
    if (CONFIG.eightCells.has(id)) return 8;
    if (CONFIG.twelveCells.has(id)) return 12;
    if (CONFIG.sixteenCells.has(id)) return 16;
    return 0;
  }

  findCellByNumber(num) {
    for (let i = 0; i < this.data.length; i++) {
      const cell = this.data[i];
      if (cell.capacity > 0 && num >= cell.start && num <= cell.end) {
        return cell;
      }
    }
    return null;
  }

  resetHighlights() {
    const elements = document.querySelectorAll(".box, .cell");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("highlight");
    }
    const containers = document.querySelectorAll(".container");
    for (let i = 0; i < containers.length; i++) {
      containers[i].classList.remove("show");
    }
  }

  showInfo(message, isError) {
    const banner = document.getElementById("infoBanner");
    const text = document.getElementById("infoText");
    if (banner && text) {
      text.textContent = message;
      banner.style.borderLeftColor = isError ? "#dc2626" : "#0066cc";
      banner.classList.add("show");

      setTimeout(function() {
        if (!isError) banner.classList.remove("show");
      }, 5000);
    }
  }

  search(value) {
    const num = parseInt(value);

    if (isNaN(num) || num <= 0) {
      this.showInfo('⚠️ ' + this.t('invalidNumber'), true);
      return;
    }

    this.resetHighlights();
    const found = this.findCellByNumber(num);

    if (!found) {
      this.showInfo('❌ ' + this.t('notFound'), true);
      return;
    }

    const resultsSection = document.getElementById("resultsSection");
    if (resultsSection) {
      resultsSection.style.display = "block";
      document.body.classList.add("has-results");
    }

    this.highlightLocation(found, num);

    const contents = this.seatContents[num] || [];
    let contentDisplay = '';
    if (contents.length > 0) {
      const contentList = [];
      for (let i = 0; i < contents.length; i++) {
        const c = contents[i];
        const icon = this.productIcons[c] || '📦';
        contentList.push(icon + ' ' + c);
      }
      contentDisplay = '<br>📦 ' + this.t('seatContents') + ': ' + contentList.join(', ');
    }

      let contentItemsHTML = '';
      for (let i = 0; i < contents.length; i++) {
        const c = contents[i];
        const icon = this.productIcons[c] || '📦';
        contentItemsHTML += `<div class="pallet-content-item">${icon} ${this.escapeHtml(c)}</div>`;
      }

    const infoText = '✅ ' + this.t('found') + ': ' + this.t('seatNumber') + ' ' + num + ' ' + this.t('isInLocation') + ' ' + found.id + ' (' + found.start + '-' + found.end + ')';
    this.showInfo(infoText);

    // The resultsSection variable is already declared above.
    if (resultsSection) {
      let existingDisplay = resultsSection.querySelector('.pallet-content-display');
      if (existingDisplay) existingDisplay.remove();

      if (contents.length > 0) {
        const contentHTML = `<div class="pallet-content-display"><h3>📦 ${this.t('seatContents')} - ${this.t('seatNumber')} ${num}</h3><div class="pallet-content-items">${contentItemsHTML}</div></div>`;
        const locationMap = resultsSection.querySelector('#locationMap');
        if (locationMap) locationMap.insertAdjacentHTML('afterend', contentHTML);
      }
    }
  }

  // Show content selection; adds special "Empty" option at top
  showContentSelection(seatNum) {
    this.currentSeat = seatNum;
    const existing = this.seatContents[seatNum] || [];
    let checkboxes = '';

    // Empty option
    const isEmptyChecked = existing.length === 0;
    checkboxes += `
      <div class="content-item">
        <input type="checkbox" id="content-empty" ${isEmptyChecked ? 'checked' : ''}>
        <label for="content-empty"><span class="icon">🚫</span> <strong>${this.currentLanguage === 'en' ? 'Empty (clear pallet)' : 'Vide (effacer)'} </strong></label>
      </div>
    `;

    for (let i = 0; i < this.contentTypes.length; i++) {
      const type = this.contentTypes[i];
      const icon = this.productIcons[type] || '📦';
      const isChecked = existing.indexOf(type) >= 0;
      const escapedType = this.escapeHtml(type);
      checkboxes += `
        <div class="content-item">
          <input type="checkbox" value="${escapedType}" id="content-${i}" ${isChecked ? 'checked' : ''}>
          <label for="content-${i}"><span class="icon">${icon}</span> ${escapedType}</label>
        </div>
      `;
    }

    const section = document.getElementById('contentSection');
    if (!section) return;

    section.innerHTML = `
        <h3 style="margin-top: 0; color: #2d3748;">📦 ${this.t('selectContent')} - ${this.t('seatNumber')} ${seatNum}</h3>
        <div style="display: grid; gap: 10px; margin-bottom: 20px;">
          ${checkboxes}
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button onclick="window.app.saveContentForSeat()" style="flex: 1; min-width: 160px;">
            💾 ${this.t('saveContent')}
          </button>
          <button onclick="window.app.cancelAddContent()" style="flex: 1; background: #718096; min-width: 160px;">
            ❌ ${this.t('cancel')}
          </button>
        </div>
    `;
    section.classList.add('show');

    const emptyCb = document.getElementById('content-empty');
    const otherCbs = section.querySelectorAll('input[type="checkbox"]:not(#content-empty)');

    if (emptyCb) {
      emptyCb.addEventListener('change', (e) => {
        if (e.target.checked) {
          otherCbs.forEach(cb => { cb.checked = false; });
        }
      });
    }

    otherCbs.forEach(cb => {
      cb.addEventListener('change', (e) => {
        if (e.target.checked && emptyCb) emptyCb.checked = false;
      });
    });
  }

  async saveContentForSeat() {
    const emptyCb = document.getElementById('content-empty');
    if (emptyCb && emptyCb.checked) {
      if (this.seatContents[this.currentSeat]) delete this.seatContents[this.currentSeat];
      // Granularly update Firebase by removing the specific pallet
      await set(ref(database, `warehouseData/seatContents/${this.currentSeat}`), null);
      await set(ref(database, 'warehouseData/lastUpdated'), new Date().toISOString());
      this.showInfo('✅ ' + this.t('contentSaved'));

      const section = document.getElementById('contentSection');
      if (section) section.classList.remove('show');
      const input = document.getElementById('searchInput');
      if (input) input.value = '';
      const resultsSection = document.getElementById('resultsSection');
      if (resultsSection) resultsSection.style.display = 'none';
      document.body.classList.remove('has-results');
      this.resetHighlights();
      return;
    }

    const checkboxes = document.querySelectorAll('#contentSection input[type="checkbox"]:checked');
    const selected = [];
    for (let i = 0; i < checkboxes.length; i++) {
      const id = checkboxes[i].id;
      if (id === 'content-empty') continue;
      selected.push(checkboxes[i].value);
    }

    if (selected.length === 0) {
      this.showInfo('⚠️ ' + this.t('selectAtLeastOne'), true);
      return;
    }

    this.seatContents[this.currentSeat] = selected;
    // Granularly update Firebase with only the changed pallet's data
    await set(ref(database, `warehouseData/seatContents/${this.currentSeat}`), selected);
    await set(ref(database, 'warehouseData/lastUpdated'), new Date().toISOString());


    const displayList = selected.map(c => (this.productIcons[c] || '📦') + ' ' + c);
    this.showInfo('✅ ' + this.t('contentSaved') + ' - ' + this.t('seatNumber') + ' ' + this.currentSeat + ': ' + displayList.join(', '));

    const section = document.getElementById('contentSection');
    if (section) section.classList.remove('show');

    const input = document.getElementById('searchInput');
    if (input) input.value = '';

    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) resultsSection.style.display = 'none';

    document.body.classList.remove('has-results');
    this.resetHighlights();
  }

  cancelAddContent() {
    const section = document.getElementById('contentSection');
    if (section) section.classList.remove('show');

    const input = document.getElementById('searchInput');
    if (input) input.value = '';

    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) resultsSection.style.display = 'none';

    document.body.classList.remove('has-results');
    this.resetHighlights();
  }

  highlightLocation(cell, seatNum) {
    const box = document.querySelector('.' + cell.id + '.box');
    if (box) box.classList.add("highlight");

    // Determine side: 'R' for A, C, E, G; 'L' for others.
    const section = cell.id.charAt(0);
    const side = ["A", "C", "E", "G"].includes(section) ? "R" : "L";

    // Select the correct container based on capacity and side.
    const container = document.querySelector('.C' + cell.capacity + side);

    if (container) {
      // Populate the actual pallet numbers in this container based on its layout.
      container.querySelectorAll('.cell[data-pos]').forEach(cellEl => {
        const position = parseInt(cellEl.dataset.pos);
        const actualNumber = cell.start + position - 1;
        cellEl.textContent = actualNumber;
      });

      container.classList.add("show");
      const positionIndex = seatNum - cell.start + 1;
      const positionCell = container.querySelector('.X' + positionIndex + '.cell');
      if (positionCell) positionCell.classList.add("highlight");
    }
  }

  setupFindListeners() {
    const input = document.getElementById("searchInput");
    const button = document.getElementById("searchBtn");
    const self = this;

    if (button) {
      button.addEventListener("click", function() {
        if (input) self.search(input.value.trim());
      });
    }

    if (input) {
      input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") self.search(input.value.trim());
      });

      input.addEventListener("focus", function() {
        const banner = document.getElementById("infoBanner");
        if (banner) banner.classList.remove("show");
      });
    }
  }

  setupAddContentListeners() {
    const input = document.getElementById("searchInput");
    const button = document.getElementById("searchBtn");
    const self = this;

    const handleSearch = function() {
      if (!input) return;

      const num = parseInt(input.value.trim());
      if (isNaN(num) || num <= 0) {
        self.showInfo('⚠️ ' + self.t('invalidNumber'), true);
        return;
      }

      const found = self.findCellByNumber(num);
      if (!found) {
        self.showInfo('❌ ' + self.t('notFound'), true);
        return;
      }

      self.resetHighlights();
      const resultsSection = document.getElementById("resultsSection");
      if (resultsSection) {
        resultsSection.style.display = "block";
        document.body.classList.add("has-results");
      }
      self.highlightLocation(found, num);
      self.showContentSelection(num);
    };

    if (button) {
      button.addEventListener("click", handleSearch);
    }

    if (input) {
      input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") handleSearch();
      });

      input.addEventListener("focus", function() {
        const banner = document.getElementById("infoBanner");
        if (banner) banner.classList.remove("show");
      });
    }
  }
}

window.app = null;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    window.app = new LocationFinder();
  });
} else {
  window.app = new LocationFinder();
}