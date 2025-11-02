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
    clearedSuccess: "All data cleared successfully"
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
    clearedSuccess: "Toutes les données ont été effacées"
  }
};

const CONFIG = {
  emptyCells: ["A3", "A4", "B3", "B4", "C4", "D4"],
  eightCells: ["A2", "B2", "C3", "D3", "E3", "F3", "G3", "H3"],
  twelveCells: ["A1", "B1", "C1", "D1", "E1", "E4", "F1", "F4", "G1", "G4", "H1", "H4"],
  sixteenCells: ["C2", "D2", "E2", "F2", "G2", "H2"],
  rows: ["1", "2", "3", "4"],
  cols: ["A", "B", "C", "D", "E", "F", "G", "H"]
};

class LocationFinder {
  constructor() {
    try {
      // defaults - used for resetting
      this.defaultContentTypes = [
        "Pâtes (Pasta)",
        "Riz (Rice)",
        "Couscous (Couscous)",
        "Légumineuses (Legumes & beans)",
        "Huile (Oil)",
        "Vinaigre (Vinegar)",
        "Sauces (Ketchup, Mayo, BBQ, Soja, Harissa)",
        "Conserves (Canned goods)",
        "Sauce tomate (Tomato sauce)",
        "Condiments (Pickles, Mustard, etc.)",
        "Épices (Spices)",
        "Farine (Flour)",
        "Sucre (Sugar)",
        "Sel (Salt)",
        "Céréales (Cereals)",
        "Biscuits sucrés (Sweet biscuits)",
        "Biscuits salés (Crackers)",
        "Gâteaux (Cakes & snacks)",
        "Chocolat (Chocolate bars)",
        "Pâte à tartiner (Spreads - Nutella, Cocoa & Nuts)",
        "Confiture (Jam)",
        "Miel (Honey)",
        "Café (Coffee)",
        "Thé (Tea)",
        "Cacao (Cocoa drink)",
        "Soupes & bouillons (Soups & broths)",
        "Produits variés (Mixed products)",
      ];
      this.defaultProductIcons = {
        "Pâtes (Pasta)": "🍝",
        "Riz (Rice)": "🍚",
        "Couscous (Couscous)": "🥘",
        "Légumineuses (Legumes & beans)": "🧆",
        "Huile (Oil)": "🫒",
        "Vinaigre (Vinegar)": "🍾",
        "Sauces (Ketchup, Mayo, BBQ, Soja, Harissa)": "🧴",
        "Conserves (Canned goods)": "🥫",
        "Sauce tomate (Tomato sauce)": "🍅",
        "Condiments (Pickles, Mustard, etc.)": "🥒",
        "Épices (Spices)": "🌶️",
        "Farine (Flour)": "🌾",
        "Sucre (Sugar)": "🍬",
        "Sel (Salt)": "🧂",
        "Céréales (Cereals)": "🥣",
        "Biscuits sucrés (Sweet biscuits)": "🍪",
        "Biscuits salés (Crackers)": "🥨",
        "Gâteaux (Cakes & snacks)": "🧁",
        "Chocolat (Chocolate bars)": "🍫",
        "Pâte à tartiner (Spreads - Nutella, Cocoa & Nuts)": "🥄",
        "Confiture (Jam)": "🍓",
        "Miel (Honey)": "🐝",
        "Café (Coffee)": "☕",
        "Thé (Tea)": "🍵",
        "Cacao (Cocoa drink)": "🥛",
        "Soupes & bouillons (Soups & broths)": "🍲",
        "Produits variés (Mixed products)": "☢️"
      };

      this.data = this.generateData();
      this.currentLanguage = 'en';
      this.currentMode = null;
      this.seatContents = {};
      this.productIcons = {};
      this.contentTypes = this.defaultContentTypes.slice();
      this.productIcons = Object.assign({}, this.defaultProductIcons);
      this.currentSeat = null;

      // icons list for picker (expanded)
      this.iconList = [
        '🍝','🍚','🫒','🥫','🍪','🧈','🥣','🌾','🧂','☕','🍵','🍫','🍓','🍅',
        '🍞','🥐','🧀','🥛','🥤','🍷','🍺','🥃','🧃','🧊','🥗','🥙','🌮','🌯',
        '🥪','🍔','🍟','🍕','🌭','🥓','🥚','🍳','🧇','🥞','🍯','🥜','🌰','🍄',
        '🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🧄','🧅','🥔','🍠','🫘','🥨','🥯',
        '🥟','🥠','🥡','🍱','🍘','🍙','🍛','🍜','🍣','🍱'
      ];

      this.loadFromStorage();
      this.showLanguageSelection();

    } catch (e) {
      console.error('Initialization error:', e);
      document.getElementById('appRoot').innerHTML = '<div class="app-container"><h1>Error loading app</h1><p>' + e.message + '</p></div>';
    }
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('hyperUData');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.seatContents = parsed.seatContents || {};
        this.contentTypes = parsed.contentTypes || this.contentTypes;
        this.productIcons = parsed.productIcons || this.productIcons;
      }
    } catch (e) {
      console.error('Error loading data:', e);
    }
  }

  saveToStorage() {
    try {
      const data = {
        seatContents: this.seatContents,
        contentTypes: this.contentTypes,
        productIcons: this.productIcons
      };
      localStorage.setItem('hyperUData', JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data:', e);
    }
  }

  exportData() {
    const data = {
      seatContents: this.seatContents,
      contentTypes: this.contentTypes,
      productIcons: this.productIcons,
      exportDate: new Date().toISOString()
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
        this.productIcons = data.productIcons || {};
        this.saveToStorage();
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
    this.showModeSelection();
  }

  showModeSelection() {
    const root = document.getElementById('appRoot');
    if (!root) return;

    root.innerHTML = `
        <div class="app-container" style="max-width: 600px;">
        <div class="hyper-u-logo">HYPER U</div>
        <h1 style="text-align: center;">📦 ${this.t('selectMode')}</h1>
        <div class="mode-grid">
            <button class="mode-button" onclick="window.app.selectMode('find')">
            📍 ${this.t('findLocation')}
            </button>
            <button class="mode-button" onclick="window.app.selectMode('add')">
            ➕ ${this.t('addContent')}
            </button>
            <button class="mode-button" onclick="window.app.selectMode('search-content')">
            🔎 ${this.t('searchByContent')}
            </button>
            <button class="mode-button" onclick="window.app.showSettings()">
            ⚙️ ${this.t('settings')}
            </button>
        </div>
        </div>
    `;
  }

  selectMode(mode) {
    this.currentMode = mode;
    if (mode === 'find') {
      this.showFindMode();
    } else if (mode === 'add') {
      this.showAddContentMode();
    } else if (mode === 'search-content') {
      this.showSearchByContentMode();
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
      seats.sort((a, b) => a - b);
      const icon = this.productIcons[type] || '📦';

      let seatsButtons = '';
      if (seats.length > 0) {
        seatsButtons = '<div class="seat-buttons">';
        for (let j = 0; j < seats.length; j++) {
          seatsButtons += `<button class="seat-button" onclick="window.app.searchFromContent(${seats[j]})">${seats[j]}</button>`;
        }
        seatsButtons += '</div>';
      } else {
        seatsButtons = `<p class="no-content">${this.t('noContent')}</p>`;
      }

      contentHTML += `
        <div class="content-list-item">
            <div class="content-list-header">
            <span><span class="icon">${icon}</span> ${type}</span>
            <span class="seat-badge">${seats.length} ${this.t('seats')}</span>
            </div>
            ${seatsButtons}
        </div>
        `;
    }

    const root = document.getElementById('appRoot');
    if (!root) return;

    root.innerHTML = `
        <div class="app-container">
        <div class="hyper-u-logo">HYPER U</div>
        <h1>🔎 ${this.t('searchByContent')}</h1>
        <p class="subtitle">${this.t('clickToSearch')}</p>
        <button onclick="window.app.showModeSelection()">← ${this.t('back')}</button>
        <div style="margin-top: 20px;">${contentHTML}</div>
        </div>
    `;
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
        <button onclick="window.app.deleteContentType(${i})" style="background: #dc2626;">
            ${this.t('delete')}
        </button>
        </div>
    `;
    }

    const root = document.getElementById('appRoot');
    if (!root) return;

    root.innerHTML = `
        <div class="app-container" style="max-width: 700px;">
        <div class="hyper-u-logo">HYPER U</div>
        <h1>⚙️ ${this.t('settings')}</h1>
        <button onclick="window.app.showModeSelection()" style="margin-bottom: 20px;">← ${this.t('back')}</button>
        
        <h2>${this.t('manageContentTypes')}</h2>
        <div id="typesList">${typesHTML}</div>
        
        <div style="margin-top: 20px; display: flex; gap: 10px; position: relative; flex-wrap: wrap;">
            <input type="text" id="newIcon" placeholder="🍝" readonly onclick="window.app.showIconPicker(this, -1)" style="width: 80px; text-align: center; font-size: 24px; cursor: pointer;">
            <input type="text" id="newType" placeholder="${this.t('addNewType')}" style="flex:1; min-width:160px;">
            <button onclick="window.app.addContentType()" style="min-width: 120px;">
            ➕ ${this.t('save')}
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

        <h2 style="margin-top: 30px;">${this.t('dataManagement')}</h2>
        
        <div style="background: #f7fafc; padding: 20px; border-radius: 12px;">
            <h3 style="margin-top: 0; color: #2d3748;">📤 ${this.t('exportData')}</h3>
            <p style="color: #718096; font-size: 14px; margin-bottom: 15px;">
            ${this.currentLanguage === 'en' ? 'Copy your data as JSON to share or backup' : 'Copiez vos données au format JSON pour partager ou sauvegarder'}
            </p>
            <button onclick="window.app.copyDataToClipboard()" style="width: 100%; background: #10b981;">
            📋 ${this.t('copyToClipboard')}
            </button>
        </div>

        <div style="background: #f7fafc; padding: 20px; border-radius: 12px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #2d3748;">📥 ${this.t('importData')}</h3>
            <p style="color: #718096; font-size: 14px; margin-bottom: 15px;">
            ${this.currentLanguage === 'en' ? 'Paste your JSON data below to import' : 'Collez vos données JSON ci-dessous pour importer'}
            </p>
            <textarea id="importTextarea" placeholder="${this.t('pasteData')}" 
            style="width: 100%; min-height: 150px; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 12px; resize: vertical; margin-bottom: 10px;"></textarea>
            <button onclick="window.app.importFromTextarea()" style="width: 100%; background: #0066cc;">
            📥 ${this.t('importBtn')}
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
  clearAllData() {
    const confirmClear = window.confirm(this.currentLanguage === 'en'
      ? 'Clear all data? This will reset pallets, types and icons to defaults.'
      : 'Effacer toutes les données ? Cela réinitialisera les palettes, types et icônes par défaut.');
    if (!confirmClear) return;

    this.seatContents = {};
    this.contentTypes = this.defaultContentTypes.slice();
    this.productIcons = Object.assign({}, this.defaultProductIcons);
    try {
      localStorage.removeItem('hyperUData');
    } catch (e) {
      console.error('clear storage error', e);
    }
    this.showInfo('✅ ' + this.t('clearedSuccess'));
    setTimeout(() => this.showSettings(), 800);
  }

  escapeHtml(text) {
    if (typeof text !== 'string') return text;
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

  // Improved Icon Picker: modal with search
  showIconPicker(inputElement, index) {
    // Save current target
    this.iconPickerTarget = { inputElement, index };

    const icons = this.iconList;
    let pickerHTML = `
      <div class="icon-modal-overlay" id="iconModalOverlay">
        <div class="icon-modal">
          <div class="icon-modal-header">
            <div class="icon-picker-title">${this.currentLanguage === 'en' ? 'Select an icon' : 'Sélectionner une icône'}</div>
            <input id="iconSearch" placeholder="${this.currentLanguage === 'en' ? 'Search emoji or type...' : 'Rechercher...'}" />
            <button class="icon-modal-close" id="iconModalClose">×</button>
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

    // append to dedicated root
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
    const searchInput = document.getElementById('iconSearch');
    const grid = document.getElementById('iconPickerGrid');

    const onPick = (ev) => {
      const target = ev.target.closest('.icon-picker-item');
      if (!target) return;
      const icon = target.getAttribute('data-icon');
      this.selectIcon(icon, index);
      removePicker();
    };

    const filterIcons = (term) => {
      term = term.trim().toLowerCase();
      const items = grid.querySelectorAll('.icon-picker-item');
      items.forEach(item => {
        const ic = item.getAttribute('data-icon') || '';
        const label = ic.toString();
        if (term === '' || label.includes(term)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    };

    const removePicker = () => {
      if (root) root.innerHTML = '';
    };

    grid.addEventListener('click', onPick);
    closeBtn.addEventListener('click', removePicker);
    rootOverlay.addEventListener('click', function(e) {
      if (e.target === rootOverlay) removePicker();
    });

    searchInput.addEventListener('input', function(e) {
      filterIcons(e.target.value);
    });

    // For mobile: focus search
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 50);
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

  addContentType() {
    const input = document.getElementById('newType');
    const iconInput = document.getElementById('newIcon');
    if (!input) return;

    const value = input.value.trim();
    const icon = iconInput ? iconInput.value.trim() || '📦' : '📦';

    if (value) {
      this.contentTypes.push(value);
      this.productIcons[value] = icon;
      input.value = '';
      if (iconInput) iconInput.value = '';
      this.saveToStorage();
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

    this.saveToStorage();
    this.showInfo(this.t('typeDeleted'));
    this.showSettings();
  }

  saveSettings() {
    const inputs = document.querySelectorAll('[id^="type-"]');
    const iconInputs = document.querySelectorAll('[id^="icon-"]');

    const newTypes = [];
    const newIcons = {};

    for (let i = 0; i < inputs.length; i++) {
      const value = inputs[i].value.trim();
      const icon = iconInputs[i] ? iconInputs[i].value.trim() || '📦' : '📦';
      if (value) {
        newTypes.push(value);
        newIcons[value] = icon;
      }
    }

    this.contentTypes = newTypes;
    this.productIcons = newIcons;
    this.saveToStorage();
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
            <p class="info-text" id="infoText"></p>
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

            <h2>📌 ${this.t('positionDetail')}</h2>
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
    if (CONFIG.emptyCells.indexOf(id) >= 0) return 0;
    if (CONFIG.eightCells.indexOf(id) >= 0) return 8;
    if (CONFIG.twelveCells.indexOf(id) >= 0) return 12;
    if (CONFIG.sixteenCells.indexOf(id) >= 0) return 16;
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

    const existingDisplay = document.getElementById('palletContentDisplay');
    if (existingDisplay) {
      existingDisplay.remove();
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

    this.showInfo('✅ ' + this.t('found') + ': ' + this.t('seatNumber') + ' ' + num + ' ' + this.t('isInLocation') + ' ' + found.id + ' (' + found.start + '-' + found.end + ')' + contentDisplay);

    this.displayPalletContent(num);
  }

  displayPalletContent(seatNum) {
    const contents = this.seatContents[seatNum] || [];
    const resultsSection = document.getElementById("resultsSection");

    if (!resultsSection) return;

    let existingDisplay = document.getElementById('palletContentDisplay');
    if (existingDisplay) {
      existingDisplay.remove();
    }

    if (contents.length > 0) {
      let contentItemsHTML = '';
      for (let i = 0; i < contents.length; i++) {
        const c = contents[i];
        const icon = this.productIcons[c] || '📦';
        contentItemsHTML += `<div class="pallet-content-item">${icon} ${c}</div>`;
      }

      const contentHTML = `
        <div id="palletContentDisplay" class="pallet-content-display">
            <h3>📦 ${this.t('seatContents')} - ${this.t('seatNumber')} ${seatNum}</h3>
            <div class="pallet-content-items">${contentItemsHTML}</div>
        </div>
        `;

      const locationMap = document.getElementById('locationMap');
      if (locationMap && locationMap.parentNode) {
        locationMap.insertAdjacentHTML('afterend', contentHTML);
      }
    }
  }

  // Show content selection; adds special "Empty" option at top
  showContentSelection(seatNum) {
    this.currentSeat = seatNum;
    const existing = this.seatContents[seatNum] || [];
    let checkboxes = '';

    // Empty special option at top
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

    // add behavior: when Empty is checked, uncheck all other boxes; when any other is checked, uncheck Empty
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
        if (e.target.checked) {
          if (emptyCb) emptyCb.checked = false;
        }
      });
    });
  }

  saveContentForSeat() {
    const emptyCb = document.getElementById('content-empty');
    if (emptyCb && emptyCb.checked) {
      // Clear pallet contents
      if (this.seatContents[this.currentSeat]) delete this.seatContents[this.currentSeat];
      this.saveToStorage();
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
    this.saveToStorage();

    const displayList = [];
    for (let i = 0; i < selected.length; i++) {
      const c = selected[i];
      const icon = this.productIcons[c] || '📦';
      displayList.push(icon + ' ' + c);
    }
    const displayText = displayList.join(', ');

    this.showInfo('✅ ' + this.t('contentSaved') + ' - ' + this.t('seatNumber') + ' ' + this.currentSeat + ': ' + displayText);

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

    const section = cell.id.charAt(0);
    const side = (section === "A" || section === "C" || section === "E" || section === "G") ? "R" : "L";
    const container = document.querySelector('.C' + cell.capacity + side);

    if (container) {
      const cells = container.querySelectorAll('.cell[data-pos]');
      for (let i = 0; i < cells.length; i++) {
        const cellEl = cells[i];
        const position = parseInt(cellEl.getAttribute('data-pos'));
        const actualNumber = cell.start + position - 1;
        cellEl.textContent = actualNumber;
      }

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
