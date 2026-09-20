'use strict';

/* ESTADO GLOBAL */
const state = {
  items: [],
  filter: 'tudo',
  search: '',
  sort: 'recentes',
  selectMode: false,
  selected: new Set(),
  lightboxId: null,
  editId: null,
  editRotation: 0,
  shareIds: [],
  deleteIds: [],
  cameraFlipped: false,
  cameraMode: 'foto',
  cameraGrid: false,
  recording: false,
};

/* DADOS INICIAIS */
const INITIAL_ITEMS = [
  {
    id: 1, tipo: 'foto', nome: 'Pôr do sol urbano',
    url: 'assets/media/01.jpg',
    favorito: true, compartilhado: false,
    dataCriacao: new Date('2024-11-15T18:32:00'),
  },
  {
    id: 2, tipo: 'video', nome: 'Praia ao entardecer',
    url: 'assets/media/02.jpg',
    favorito: false, compartilhado: true,
    dataCriacao: new Date('2024-11-14T15:20:00'),
  },
  {
    id: 3, tipo: 'foto', nome: 'Café da manhã',
    url: 'assets/media/03.jpg',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-11-14T08:45:00'),
  },
  {
    id: 4, tipo: 'foto', nome: 'Montanhas nevadas',
    url: 'assets/media/04.jpg',
    favorito: true, compartilhado: false,
    dataCriacao: new Date('2024-11-13T11:10:00'),
  },
  {
    id: 5, tipo: 'video', nome: 'Centro histórico',
    url: 'assets/media/05.jpg',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-11-12T14:00:00'),
  },
  {
    id: 6, tipo: 'foto', nome: 'Flor silvestre',
    url: 'assets/media/06.png',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-11-11T10:30:00'),
  },
  {
    id: 7, tipo: 'foto', nome: 'Circuito eletrônico',
    url: 'assets/media/07.jpg',
    favorito: false, compartilhado: true,
    dataCriacao: new Date('2024-11-10T16:45:00'),
  },
  {
    id: 8, tipo: 'foto', nome: 'Gato curioso',
    url: 'assets/media/08.jpg',
    favorito: true, compartilhado: false,
    dataCriacao: new Date('2024-11-09T12:20:00'),
  },
  {
    id: 9, tipo: 'video', nome: 'Rua movimentada',
    url: 'assets/media/09.jpg',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-11-08T09:15:00'),
  },
  {
    id: 10, tipo: 'foto', nome: 'Retrato artístico',
    url: 'assets/media/10.jpg',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-11-07T17:50:00'),
  },
  {
    id: 11, tipo: 'foto', nome: 'Tênis novo',
    url: 'assets/media/11.jpg',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-11-06T14:30:00'),
  },
  {
    id: 12, tipo: 'foto', nome: 'Pizza artesanal',
    url: 'assets/media/12.jpg',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-11-05T20:00:00'),
  },
  {
    id: 13, tipo: 'foto', nome: 'Lago ao amanhecer',
    url: 'assets/media/13.png',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-11-04T07:20:00'),
  },
  {
    id: 14, tipo: 'foto', nome: 'Trilha na floresta',
    url: 'assets/media/14.png',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-11-03T10:10:00'),
  },
  {
    id: 15, tipo: 'foto', nome: 'Costa ao pôr do sol',
    url: 'assets/media/15.png',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-11-02T17:40:00'),
  },
  {
    id: 16, tipo: 'foto', nome: 'Bicicleta na rua',
    url: 'assets/media/16.png',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-11-01T14:20:00'),
  },
  {
    id: 17, tipo: 'foto', nome: 'Dunas douradas',
    url: 'assets/media/17.png',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-10-31T18:05:00'),
  },
  {
    id: 18, tipo: 'foto', nome: 'Mercado noturno',
    url: 'assets/media/18.png',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-10-30T21:15:00'),
  },
  {
    id: 19, tipo: 'foto', nome: 'Cachoeira na mata',
    url: 'assets/media/19.png',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-10-29T11:30:00'),
  },
  {
    id: 20, tipo: 'foto', nome: 'Arquitetura em branco',
    url: 'assets/media/20.png',
    favorito: false, compartilhado: false,
    dataCriacao: new Date('2024-10-28T12:00:00'),
  },
];

/* UTILITÁRIOS */
function getItem(id) {
  return state.items.find(i => i.id === id) || null;
}

function getFilteredItems() {
  let items = [...state.items];

  // Filtro por tipo
  if (state.filter === 'fotos') {
    items = items.filter(i => i.tipo === 'foto');
  } else if (state.filter === 'videos') {
    items = items.filter(i => i.tipo === 'video');
  } else if (state.filter === 'favoritos') {
    items = items.filter(i => i.favorito);
  }

  // Busca por nome
  if (state.search.trim()) {
    const q = state.search.trim().toLowerCase();
    items = items.filter(i => i.nome.toLowerCase().includes(q));
  }

  // Ordenação
  items.sort((a, b) => {
    const diff = b.dataCriacao - a.dataCriacao;
    return state.sort === 'recentes' ? diff : -diff;
  });

  return items;
}

function formatDate(d) {
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function mediaTransform(item) {
  const edits = item.edits;
  return edits ? `rotate(${edits.rotation || 0}deg) scale(${edits.crop ? 1.25 : 1})` : '';
}

function mediaFilter(item) {
  const edits = item.edits;
  return edits ? `brightness(${edits.brightness}%) contrast(${edits.contrast}%) saturate(${edits.saturation}%)` : '';
}

function getVisibleIds() {
  return getFilteredItems().map(i => i.id);
}

/* NAVEGAÇÃO */
function goTo(screenName) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));

  const target = document.getElementById('screen-' + screenName);
  if (target) {
    target.classList.add('active');
  }
}

/* GALERIA — RENDERIZAR */
const VIDEO_MARKER_ICON = `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
  <rect x="4" y="4" width="40" height="40" rx="6" fill="rgba(32,32,32,.22)" stroke="currentColor" stroke-width="4"/>
  <path d="M19 15 L33 24 L19 33 Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
</svg>`;

function renderGallery() {
  const grid = document.getElementById('gal-grid');
  const empty = document.getElementById('gal-empty');
  const items = getFilteredItems();

  // Atualizar contagem
  document.getElementById('gal-count').textContent =
    `${state.items.length} ${state.items.length === 1 ? 'item' : 'itens'}`;

  if (items.length === 0) {
    grid.innerHTML = '';
    grid.classList.add('hidden');
    empty.classList.remove('hidden');
    renderContextBar();
    return;
  }

  grid.classList.remove('hidden');
  empty.classList.add('hidden');

  // Aplicar/remover classe select-mode no grid
  grid.classList.toggle('select-mode', state.selectMode);

  grid.innerHTML = items.map(item => {
    const isSelected = state.selected.has(item.id);
    return `
      <div class="grid-item ${isSelected ? 'selected' : ''}"
           data-id="${item.id}"
           role="button"
           tabindex="0"
           aria-label="${item.nome}">
        <img
          src="${item.url}"
          alt="${item.nome}"
          style="filter:${mediaFilter(item)};transform:${mediaTransform(item)}"
          loading="lazy"
          decoding="async">

        ${item.tipo === 'video'
          ? `<div class="item-video-badge" role="img" aria-label="Vídeo">${VIDEO_MARKER_ICON}</div>`
          : ''}

        <!-- Favorito -->
        <button class="btn item-fav-btn ${item.favorito ? 'active' : ''}"
                data-action="fav"
                data-id="${item.id}"
                title="${item.favorito ? 'Remover favorito' : 'Favoritar'}"
                aria-label="${item.favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
                aria-pressed="${item.favorito}">
          <i class="bi ${item.favorito ? 'bi-heart-fill' : 'bi-heart'}"></i>
        </button>

        <!-- Seleção -->
        <div class="item-select-overlay">
          <div class="item-checkbox"></div>
        </div>
      </div>
    `;
  }).join('');

  renderContextBar();
}

function renderContextBar() {
  const bar = document.getElementById('ctx-bar');
  const info = document.getElementById('ctx-bar-info');
  const actions = document.getElementById('ctx-bar-actions');

  if (!state.selectMode || state.selected.size === 0) {
    bar.classList.add('hidden');
    return;
  }

  bar.classList.remove('hidden');
  const n = state.selected.size;
  info.textContent = `${n} ${n === 1 ? 'selecionado' : 'selecionados'}`;

  actions.innerHTML = `
    <button class="btn ctx-action-btn accent" data-ctx="share">
      <i class="bi bi-share"></i> Compartilhar
    </button>
    <button class="btn ctx-action-btn danger" data-ctx="delete">
      <i class="bi bi-trash3"></i> Excluir
    </button>
  `;
}

/* MODO SELEÇÃO */
function enterSelectMode() {
  state.selectMode = true;
  state.selected.clear();

  const btn = document.getElementById('btn-select');
  btn.textContent = 'Cancelar';
  btn.classList.add('active');

  renderGallery();
}

function exitSelectMode() {
  state.selectMode = false;
  state.selected.clear();

  const btn = document.getElementById('btn-select');
  btn.textContent = 'Selecionar';
  btn.classList.remove('active');

  renderGallery();
}

function toggleItemSelect(id) {
  if (!getItem(id)) return;
  if (state.selected.has(id)) {
    state.selected.delete(id);
  } else {
    state.selected.add(id);
  }
  renderGallery();
}

/* FAVORITO */
function toggleFavorite(id) {
  const item = getItem(id);
  if (!item) return;
  item.favorito = !item.favorito;
  renderGallery();

  // Atualizar botão do lightbox se estiver aberto
  if (state.lightboxId === id) renderLightboxMeta();

  showToast(
    item.favorito
      ? '<i class="bi bi-heart-fill"></i> Adicionado aos favoritos'
      : '<i class="bi bi-heart"></i> Removido dos favoritos',
    'info'
  );
}

/* LIGHTBOX */
function openLightbox(id) {
  const item = getItem(id);
  if (!item) return;

  state.lightboxId = id;
  renderLightboxMeta();

  const overlay = document.getElementById('overlay-lightbox');
  overlay.classList.remove('hidden');
}

function closeLightbox() {
  document.getElementById('overlay-lightbox').classList.add('hidden');
  state.lightboxId = null;
}

function renderLightboxMeta() {
  const item = getItem(state.lightboxId);
  if (!item) return;

  document.getElementById('lb-img').src = item.url;
  document.getElementById('lb-img').style.filter = mediaFilter(item);
  document.getElementById('lb-img').style.transform = mediaTransform(item);
  document.getElementById('lb-name').textContent = item.nome;
  document.getElementById('lb-date').textContent = `${item.tipo === 'video' ? 'Vídeo' : 'Foto'} • ${formatDate(item.dataCriacao)}`;

  // Tipo
  const typeBadge = document.getElementById('lb-type-badge');
  typeBadge.innerHTML = item.tipo === 'video' ? VIDEO_MARKER_ICON : '';
  typeBadge.setAttribute('aria-label', item.tipo === 'video' ? 'Vídeo' : '');
  typeBadge.style.display = item.tipo === 'video' ? '' : 'none';

  // Favorito
  const favBtn = document.getElementById('btn-lb-fav');
  const favIcon = document.getElementById('lb-fav-icon');
  favBtn.classList.toggle('active', item.favorito);
  favBtn.setAttribute('aria-label', item.favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
  favBtn.setAttribute('aria-pressed', String(item.favorito));
  favIcon.className = item.favorito ? 'bi bi-heart-fill' : 'bi bi-heart';

  // Badge compartilhado
  const sharedBadge = document.getElementById('lb-shared-badge');
  sharedBadge.classList.toggle('hidden', !item.compartilhado);

  // Botão editar — desabilitado se compartilhado
  const editBtn = document.getElementById('btn-lb-edit');
  editBtn.disabled = item.compartilhado;
  editBtn.setAttribute('aria-label', item.compartilhado ? 'Não é possível editar conteúdo já compartilhado' : 'Editar');
  editBtn.title = item.compartilhado
    ? 'Não é possível editar conteúdo já compartilhado'
    : 'Editar';

  // Navegação prev/next
  const ids = getVisibleIds();
  const idx = ids.indexOf(item.id);
  document.getElementById('btn-lb-prev').disabled = idx <= 0;
  document.getElementById('btn-lb-next').disabled = idx >= ids.length - 1;
}

function playLbSlide(dir) {
  const wrap = document.querySelector('#overlay-lightbox .lb-img-wrap');
  if (!wrap) return;
  wrap.classList.remove('lb-anim-next', 'lb-anim-prev');
  void wrap.offsetWidth;
  wrap.classList.add(dir > 0 ? 'lb-anim-next' : 'lb-anim-prev');
}

function lbNavigate(dir) {
  const ids = getVisibleIds();
  const idx = ids.indexOf(state.lightboxId);
  const next = idx + dir;
  if (next >= 0 && next < ids.length) {
    state.lightboxId = ids[next];
    renderLightboxMeta();
    playLbSlide(dir);
  }
}

/* COMPARTILHAMENTO */
function openShare(ids) {
  state.shareIds = ids.filter(id => getItem(id));
  if (!state.shareIds.length) return;
  const n = state.shareIds.length;
  document.getElementById('share-subtitle').textContent =
    n === 1 ? 'Compartilhe sua foto nas redes' : `Compartilhe ${n} itens nas redes`;
  document.getElementById('overlay-share').classList.remove('hidden');
}

function doShare() {
  state.shareIds.forEach(id => {
    const item = getItem(id);
    if (item) item.compartilhado = true;
  });

  closeShare();
  exitSelectMode();
  closeLightbox();

  showToast('<i class="bi bi-check-circle-fill"></i> Compartilhado com sucesso!', 'success');
}

function closeShare() {
  document.getElementById('overlay-share').classList.add('hidden');
  state.shareIds = [];
}

/* EXCLUSÃO */
function openDelete(ids) {
  state.deleteIds = ids.filter(id => getItem(id));
  if (!state.deleteIds.length) return;
  const n = state.deleteIds.length;
  document.getElementById('del-count-text').textContent =
    n === 1 ? 'este item' : `${n} itens`;
  document.getElementById('overlay-delete').classList.remove('hidden');
}

function doDelete() {
  const ids = new Set(state.deleteIds);
  state.items = state.items.filter(i => !ids.has(i.id));

  // Limpar seleção e estados
  ids.forEach(id => state.selected.delete(id));

  closeDelete();
  closeLightbox();
  exitSelectMode();
  updateCameraThumb();

  const n = ids.size;
  showToast(
    `<i class="bi bi-trash3-fill"></i> ${n} ${n === 1 ? 'item excluído' : 'itens excluídos'}`,
    'info'
  );
}

function closeDelete() {
  document.getElementById('overlay-delete').classList.add('hidden');
  state.deleteIds = [];
}

function enableSheetSwipe(sheetId, close) {
  const sheet = document.getElementById(sheetId);
  let startY = null;
  let pointerId = null;

  const reset = () => {
    sheet.style.transform = '';
    sheet.style.transition = '';
    startY = null;
    pointerId = null;
  };

  sheet.addEventListener('pointerdown', e => {
    if (!e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0)) return;
    if (e.target.closest('button, a, input, select, textarea')) return;
    startY = e.clientY;
    pointerId = e.pointerId;
    sheet.setPointerCapture(pointerId);
  });

  sheet.addEventListener('pointermove', e => {
    if (e.pointerId !== pointerId || startY === null) return;
    const distance = Math.max(0, e.clientY - startY);
    if (distance > 0) {
      sheet.style.transition = 'none';
      sheet.style.transform = `translateY(${distance}px)`;
    }
  });

  sheet.addEventListener('pointerup', e => {
    if (e.pointerId !== pointerId || startY === null) return;
    const distance = e.clientY - startY;
    reset();
    if (distance > Math.min(80, sheet.offsetHeight * 0.25)) close();
  });

  sheet.addEventListener('pointercancel', reset);
}

/* EDIÇÃO */
function openEdit(id) {
  const item = getItem(id);
  if (!item) return;
  if (item.compartilhado) {
    showToast('<i class="bi bi-lock-fill"></i> Não é possível editar conteúdo já compartilhado', 'error');
    return;
  }

  state.editId = id;
  state.editRotation = 0;

  document.getElementById('edit-img').src = item.url;
  document.getElementById('edit-img').style.cssText = '';

  // Reset sliders
  ['brightness', 'contrast', 'saturation'].forEach(name => {
    const value = item.edits?.[name] ?? 100;
    document.getElementById('sl-' + name).value = value;
  });
  state.editRotation = item.edits?.rotation || 0;

  // Reset overlays
  document.getElementById('edit-grid-overlay').classList.add('hidden');
  document.getElementById('edit-crop-overlay').classList.add('hidden');
  document.getElementById('btn-tool-grid').classList.remove('active');
  document.getElementById('btn-tool-crop').classList.toggle('active', Boolean(item.edits?.crop));
  document.getElementById('edit-crop-overlay').classList.toggle('hidden', !item.edits?.crop);
  applyEditFilters();

  closeLightbox();
  exitSelectMode();
  goTo('edit');
}

function applyEditFilters() {
  const b = document.getElementById('sl-brightness').value;
  const c = document.getElementById('sl-contrast').value;
  const s = document.getElementById('sl-saturation').value;
  const img = document.getElementById('edit-img');
  img.style.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
  const crop = document.getElementById('btn-tool-crop').classList.contains('active');
  img.style.transform = `rotate(${state.editRotation}deg) scale(${crop ? 1.25 : 1})`;
}

/* CÂMERA */
function initCameraShake() {
  // Iniciar ciclo aleatório de "tremor"
  function schedule() {
    const delay = 8000 + Math.random() * 12000;
    setTimeout(() => {
      startShake();
      setTimeout(() => {
        stopShake();
        schedule();
      }, 2500 + Math.random() * 1500);
    }, delay);
  }
  schedule();
}

function startShake() {
  const status = document.getElementById('cam-status');
  const dot = document.getElementById('cam-dot');
  const text = document.getElementById('cam-status-text');
  const frame = document.getElementById('focus-frame');
  const centerDot = frame.querySelector('.focus-center-dot');
  const corners = frame.querySelectorAll('.focus-corner');

  status.classList.add('shake');
  dot.classList.add('shake');
  text.classList.add('shake');
  text.textContent = 'TREMOR DETECTADO';
  frame.classList.add('shake-mode');
  centerDot.classList.add('shake');
  corners.forEach(c => c.classList.add('shake'));
}

function stopShake() {
  const status = document.getElementById('cam-status');
  const dot = document.getElementById('cam-dot');
  const text = document.getElementById('cam-status-text');
  const frame = document.getElementById('focus-frame');
  const centerDot = frame.querySelector('.focus-center-dot');
  const corners = frame.querySelectorAll('.focus-corner');

  status.classList.remove('shake');
  dot.classList.remove('shake');
  text.classList.remove('shake');
  text.textContent = 'PRONTO';
  frame.classList.remove('shake-mode');
  centerDot.classList.remove('shake');
  corners.forEach(c => c.classList.remove('shake'));
}

function simulateCapture() {
  // Flash visual
  const viewfinder = document.querySelector('.camera-viewfinder');
  const flash = document.createElement('div');
  flash.className = 'cam-flash';
  viewfinder.appendChild(flash);
  setTimeout(() => flash.remove(), 400);

  // Adicionar novo item ao início
  const newItem = {
    id: Date.now() + Math.random(),
    tipo: state.cameraMode === 'video' ? 'video' : 'foto',
    nome: `Captura ${new Date().toLocaleTimeString('pt-BR')}`,
    url: 'assets/media/park-swing.png',
    favorito: false,
    compartilhado: false,
    dataCriacao: new Date(),
  };
  state.items.unshift(newItem);

  // Atualizar thumbnail
  updateCameraThumb();

  renderGallery();
  showToast('<i class="bi bi-camera-fill"></i> Captura realizada!', 'success');
}

function updateCameraThumb() {
  const thumb = document.getElementById('cam-thumb-img');
  if (state.items.length > 0) thumb.src = state.items[0].url;
  else thumb.removeAttribute('src');
}

/* TOAST */
function showToast(html, type = 'success') {
  const area = document.getElementById('toast-area');
  const toast = document.createElement('div');
  toast.className = `toast d-flex align-items-center ${type}`;
  toast.innerHTML = html;
  area.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 280);
  }, 2800);
}

/* EVENT LISTENERS */
function initEvents() {
  // ── CÂMERA ──────────────────────────────────────────────
  document.getElementById('btn-capture').addEventListener('click', () => {
    if (state.cameraMode === 'video') {
      state.recording = !state.recording;
      document.getElementById('btn-capture').classList.toggle('recording', state.recording);
      if (!state.recording) simulateCapture();
      else showToast('<i class="bi bi-record-circle"></i> Gravação iniciada', 'info');
    } else simulateCapture();
  });

  document.getElementById('btn-camera-grid').addEventListener('click', () => {
    state.cameraGrid = !state.cameraGrid;
    document.getElementById('camera-grid').classList.toggle('hidden', !state.cameraGrid);
    const btn = document.getElementById('btn-camera-grid');
    btn.classList.toggle('active', state.cameraGrid);
    btn.setAttribute('aria-pressed', String(state.cameraGrid));
    btn.setAttribute('aria-label', state.cameraGrid ? 'Desativar grade' : 'Ativar grade');
  });

  document.getElementById('btn-gallery-back').addEventListener('click', () => goTo('camera'));

  document.getElementById('btn-cam-to-gallery').addEventListener('click', () => {
    exitSelectMode();
    goTo('gallery');
  });

  document.getElementById('btn-flip-cam').addEventListener('click', () => {
    state.cameraFlipped = !state.cameraFlipped;
    showToast('<i class="bi bi-arrow-repeat"></i> Câmera invertida', 'info');
  });

  document.querySelectorAll('.cam-mode').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cam-mode').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.cameraMode = btn.dataset.mode;
      state.recording = false;
      const capture = document.getElementById('btn-capture');
      capture.classList.toggle('video-mode', state.cameraMode === 'video');
      capture.classList.remove('recording');
      capture.setAttribute('aria-label', state.cameraMode === 'video' ? 'Iniciar gravação' : 'Capturar foto');
    });
  });

  // Flash toggle
  document.getElementById('btn-flash').addEventListener('click', function () {
    const on = this.querySelector('i').classList.contains('bi-lightning-charge-fill');
    this.querySelector('i').className = on ? 'bi bi-lightning-charge' : 'bi bi-lightning-charge-fill';
    this.style.color = on ? 'rgba(255,255,255,0.4)' : '';
    this.setAttribute('aria-pressed', String(!on));
    this.setAttribute('aria-label', on ? 'Ativar flash' : 'Desativar flash');
  });

  // ── GALERIA ─────────────────────────────────────────────

  // Abas de filtro
  document.getElementById('gal-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.gal-tab');
    if (!tab) return;
    document.querySelectorAll('.gal-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    state.filter = tab.dataset.filter;
    exitSelectMode();
  });

  // Busca
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('btn-search-clear');

  searchInput.addEventListener('input', () => {
    state.search = searchInput.value;
    searchClear.classList.toggle('hidden', !state.search);
    renderGallery();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    state.search = '';
    searchClear.classList.add('hidden');
    renderGallery();
  });

  // Ordenação
  const sortBtn = document.getElementById('btn-sort');
  const sortIcon = document.getElementById('sort-icon');
  const sortLabel = document.getElementById('gal-sort-label');

  function applySort(sort) {
    state.sort = sort;
    const recent = sort === 'recentes';
    sortIcon.className = recent ? 'bi bi-sort-down' : 'bi bi-sort-up';
    sortBtn.title = recent ? 'Mais recentes' : 'Mais antigos';
    sortBtn.setAttribute('aria-label', recent ? 'Ordenar: mais recentes' : 'Ordenar: mais antigos');
    sortLabel.textContent = recent ? 'Mais recentes' : 'Mais antigos';
    renderGallery();
  }

  sortBtn.addEventListener('click', () => {
    applySort(state.sort === 'recentes' ? 'antigos' : 'recentes');
  });

  // Botão selecionar
  document.getElementById('btn-select').addEventListener('click', () => {
    if (state.selectMode) {
      exitSelectMode();
    } else {
      enterSelectMode();
    }
  });

  // Cliques na grade (delegação)
  let suppressGridClick = false;
  document.getElementById('gal-grid').addEventListener('click', e => {
    if (suppressGridClick) { suppressGridClick = false; return; }
    // Fav button
    const favBtn = e.target.closest('[data-action="fav"]');
    if (favBtn) {
      e.stopPropagation();
      toggleFavorite(Number(favBtn.dataset.id));
      return;
    }

    // Item click
    const gridItem = e.target.closest('.grid-item');
    if (!gridItem) return;
    const id = Number(gridItem.dataset.id);

    if (state.selectMode) {
      toggleItemSelect(id);
    } else {
      openLightbox(id);
    }
  });

  document.getElementById('gal-grid').addEventListener('keydown', e => {
    const item = e.target.closest('.grid-item');
    if (!item || e.target !== item || !['Enter', ' '].includes(e.key)) return;
    e.preventDefault();
    const id = Number(item.dataset.id);
    if (state.selectMode) toggleItemSelect(id);
    else openLightbox(id);
  });

  // Long press para entrar em modo seleção
  let longPressTimer = null;
  document.getElementById('gal-grid').addEventListener('pointerdown', e => {
    const item = e.target.closest('.grid-item');
    if (!item || state.selectMode) return;
    longPressTimer = setTimeout(() => {
      enterSelectMode();
      toggleItemSelect(Number(item.dataset.id));
      suppressGridClick = true;
    }, 500);
  });

  document.getElementById('gal-grid').addEventListener('pointerup', () => {
    clearTimeout(longPressTimer);
  });

  document.getElementById('gal-grid').addEventListener('pointermove', () => {
    clearTimeout(longPressTimer);
  });

  document.getElementById('gal-grid').addEventListener('pointercancel', () => clearTimeout(longPressTimer));
  document.getElementById('gal-grid').addEventListener('pointerleave', () => clearTimeout(longPressTimer));

  // Context bar actions
  document.getElementById('ctx-bar-actions').addEventListener('click', e => {
    const btn = e.target.closest('[data-ctx]');
    if (!btn) return;
    const action = btn.dataset.ctx;
    const ids = [...state.selected].filter(id => getItem(id));
    if (!ids.length) return;
    if (action === 'delete') openDelete(ids);
    else if (action === 'share') openShare(ids);
  });

  // ── LIGHTBOX ────────────────────────────────────────────
  document.getElementById('btn-lb-close').addEventListener('click', closeLightbox);

  document.getElementById('btn-lb-prev').addEventListener('click', () => lbNavigate(-1));
  document.getElementById('btn-lb-next').addEventListener('click', () => lbNavigate(1));

  document.getElementById('btn-lb-fav').addEventListener('click', () => {
    toggleFavorite(state.lightboxId);
  });

  document.getElementById('btn-lb-edit').addEventListener('click', () => {
    openEdit(state.lightboxId);
  });

  document.getElementById('btn-lb-share').addEventListener('click', () => {
    openShare([state.lightboxId]);
  });

  document.getElementById('btn-lb-delete').addEventListener('click', () => {
    openDelete([state.lightboxId]);
  });

  // Navegação por teclado e toque no visualizador
  document.getElementById('overlay-lightbox').addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') lbNavigate(-1);
    if (e.key === 'ArrowRight') lbNavigate(1);
    if (e.key === 'Escape') closeLightbox();
  });

  // Suporte a swipe touch
  let touchStartX = 0;
  const lbOverlay = document.getElementById('overlay-lightbox');

  lbOverlay.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lbOverlay.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) lbNavigate(diff < 0 ? 1 : -1);
  });

  // ── SHARE ────────────────────────────────────────────────
  document.querySelectorAll('.platform-btn').forEach(btn => {
    btn.addEventListener('click', doShare);
  });

  document.getElementById('btn-create-story').addEventListener('click', doShare);
  document.getElementById('btn-copy-link').addEventListener('click', doShare);

  document.getElementById('share-backdrop').addEventListener('click', closeShare);
  enableSheetSwipe('share-sheet', closeShare);

  // ── DELETE ──────────────────────────────────────────────
  document.getElementById('btn-del-confirm').addEventListener('click', doDelete);
  document.getElementById('btn-del-cancel').addEventListener('click', closeDelete);
  document.getElementById('delete-backdrop').addEventListener('click', closeDelete);
  enableSheetSwipe('delete-modal', closeDelete);

  // ── EDIÇÃO ──────────────────────────────────────────────
  const closeEdit = () => {
    goTo('gallery');
    exitSelectMode();
  };
  document.getElementById('btn-edit-back').addEventListener('click', closeEdit);
  enableSheetSwipe('edit-panel', closeEdit);

  document.getElementById('btn-edit-save').addEventListener('click', () => {
    const item = getItem(state.editId);
    if (!item || item.compartilhado) { goTo('gallery'); return; }
    item.edits = { brightness: document.getElementById('sl-brightness').value, contrast: document.getElementById('sl-contrast').value, saturation: document.getElementById('sl-saturation').value, rotation: state.editRotation, crop: document.getElementById('btn-tool-crop').classList.contains('active') };
    showToast('<i class="bi bi-check-circle-fill"></i> Alterações salvas', 'success');
    goTo('gallery');
    exitSelectMode();
  });

  // Sliders
  ['brightness', 'contrast', 'saturation'].forEach(name => {
    const slider = document.getElementById('sl-' + name);
    slider.addEventListener('input', () => {
      applyEditFilters();
    });
  });

  // Ferramentas
  document.getElementById('btn-tool-crop').addEventListener('click', function () {
    const isActive = this.classList.toggle('active');
    document.getElementById('edit-crop-overlay').classList.toggle('hidden', !isActive);
    applyEditFilters();
  });

  document.getElementById('btn-tool-grid').addEventListener('click', function () {
    const isActive = this.classList.toggle('active');
    document.getElementById('edit-grid-overlay').classList.toggle('hidden', !isActive);
  });

  document.getElementById('btn-tool-rotate').addEventListener('click', () => {
    state.editRotation = (state.editRotation + 90) % 360;
    applyEditFilters();
  });

  document.getElementById('btn-tool-reset').addEventListener('click', () => {
    ['brightness', 'contrast', 'saturation'].forEach(name => {
      document.getElementById('sl-' + name).value = 100;
    });
    state.editRotation = 0;
    document.getElementById('edit-img').style.cssText = '';
    document.getElementById('edit-grid-overlay').classList.add('hidden');
    document.getElementById('edit-crop-overlay').classList.add('hidden');
    document.getElementById('btn-tool-grid').classList.remove('active');
    document.getElementById('btn-tool-crop').classList.remove('active');
  });

  // Escape fecha overlays abertos
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!document.getElementById('overlay-share').classList.contains('hidden')) closeShare();
      else if (!document.getElementById('overlay-delete').classList.contains('hidden')) closeDelete();
      else if (!document.getElementById('overlay-lightbox').classList.contains('hidden')) closeLightbox();
      else if (state.selectMode) exitSelectMode();
    }
  });
}

/* INICIALIZAÇÃO */
function init() {
  state.items = INITIAL_ITEMS.map(i => ({ ...i }));

  initEvents();

  // Galeria: renderizar e navegar
  renderGallery();
  goTo('camera');

  // Câmera: configurar thumbnail e shake
  updateCameraThumb();
  initCameraShake();
}

document.addEventListener('DOMContentLoaded', init);
