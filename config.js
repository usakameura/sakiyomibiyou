// ════════════════════════════════════════════════════════════
//  LUNÉA 共通設定（お客様用ページ・管理画面の両方で使います）
//  キーや画像の場所を変えるときは、このファイルだけ直せばOK
// ════════════════════════════════════════════════════════════
// 新しいプロジェクトの値に差し替えてください（Project Settings → API）
// SUPABASE_KEY は anon / publishable キー（公開して問題ないキー）。service_role / secret キーは絶対に入れない
const SUPABASE_URL   = 'https://ietoycmgaqqhlppvecrj.supabase.co';
const SUPABASE_KEY   = 'sb_publishable_dtMPr570myhWnT6FsNQvpQ_m9kTamqJ';
const STORAGE_BUCKET = 'product-images';
const EMAIL_FUNCTION = 'send-order-email';
const ORDER_FUNCTION = 'place-order';        // 注文を受け付ける Edge Function

// ── ロボット対策（Cloudflare Turnstile） ──
// Cloudflare で発行した「サイトキー」を入れる（公開してよいキー）。空ならロボット確認の画面は出ません
// ※ シークレットキーはここには入れず、Supabase の Edge Functions → Secrets に TURNSTILE_SECRET として登録
const TURNSTILE_SITE_KEY = '';

// ── 画像（Vercel のプロジェクトに置いたファイルのパス） ──
// 例：サイトのいちばん上の階層に images フォルダを作り、hero.jpg を置く → '/images/hero.jpg'
// 空文字 or 読み込めない場合は、文字で組んだヒーロー／ロゴが表示されます
const HERO_IMAGE    = '/images/hero.jpg';
const HERO_IMAGE_SP = '';                    // スマホ用に別画像を使う場合だけ指定（例：'/images/hero-sp.jpg'）
const LOGO_URL      = '';                    // ロゴ画像を使う場合に指定（例：'/images/logo.png'）。空なら文字ロゴ
