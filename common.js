// ════════════════════════════════════════════════════════════
//  LUNÉA 共通の処理（お客様用ページ・管理画面の両方で使います）
//  先に config.js と supabase-js を読み込んでおくこと
// ════════════════════════════════════════════════════════════
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let settings = {};

// 三日月マーク（画像がない商品などのプレースホルダー）
const MARK = '<span class="mark" aria-hidden="true"><svg><use href="#i-mark"/></svg></span>';

// ロゴ：画像が指定されていて読み込めればそれを、なければ文字ロゴを表示
function applyLogo() {
  document.querySelectorAll('img.brand-logo').forEach(img => {
    const toText = () => {
      const span = document.createElement('span');
      span.className = 'brand-text';
      span.textContent = 'LUNÉA';
      img.replaceWith(span);
    };
    if (!LOGO_URL) { toText(); return; }
    img.addEventListener('error', toText, { once: true });
    img.src = LOGO_URL;
  });
}

// 設定（振込先など）
async function loadSettings() {
  const { data } = await sb.from('settings').select('*');
  if (data) data.forEach(r => { settings[r.key] = r.value; });
}

let categories = [];
let categoriesError = false;
async function loadCategories(force = false) {
  if (categories.length && !force) return;
  const { data, error } = await sb.from('categories').select('*').order('sort_order').order('name');
  categoriesError = !!error;
  if (error) { console.warn('カテゴリ取得エラー（migration_admin.sql 未実行？）:', error); categories = []; return; }
  categories = data || [];
}

// ══════════════════════════════════════
//  UTILS
// ══════════════════════════════════════
function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
let toastTimer = null;
function showToast(msg, ms = 3000) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}
