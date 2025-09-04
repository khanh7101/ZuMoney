# Chi tiêu cá nhân — React + Vite (PWA, Supabase)

## Chạy cục bộ
1) Cài **Node.js LTS**.
2) `npm i`
3) `copy .env.example .env` (Windows) rồi sửa `.env`:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```
4) `npm run dev` → mở link http://localhost:5173

## Build & deploy
- `npm run build` → `dist/`
- `npm run preview` để test bản build
- Deploy `dist/` lên Netlify/Vercel, rồi **Add to Home Screen** trên iPhone.

Nếu chưa tạo DB, mở Supabase **SQL Editor** và chạy `supabase.sql` (kèm dự án).
