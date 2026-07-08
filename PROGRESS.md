# Progress — Portfolio Redesign (nongpalm DNA)

> อัปเดตล่าสุด: 8 ก.ค. 2026
> ทิศทาง: luxury-editorial แบบนิตยสารแฟชั่น (DNA จากโปรเจกต์ `~/Me/nongpalm`) — premium = ช้า + นิ่ง ไม่ใช่เอฟเฟกต์เยอะ
> กติกาการออกแบบทั้งหมดอยู่ใน skill `.claude/skills/premium-motion/SKILL.md`

## ✅ เสร็จแล้ว

### ระบบ Motion / Design tokens (`app/globals.css`)
- Tokens: `--ease-luxe`, `--ease-inout-luxe`, `--duration-reveal (1.4s)`, `--duration-fade (1.8s)`, `--duration-ui (0.7s)`, `--duration-zoom (1.8s)`
- Utilities: `.reveal` / `.reveal-fade` / `.reveal-mask` (scroll reveal), `.hero-mask` (word-mask headline), `.btn-line` (underline wipe), `.img-zoom`, `.ken-burns`, `.grain`, `.nav-shell` / `.nav-hidden`
- Hooks: `useReveal()` (IntersectionObserver ตัวเดียวทั้งหน้า), `useScrollDir()` (auto-hide nav)
- รองรับ `prefers-reduced-motion` ทุกตัว / ฟอนต์ Bodoni Moda (display, Latin เท่านั้น) + Kanit (ไทยใช้ weight เบา)

### Hero + หน้าแรก
- Hero: eyebrow row + hairline, ภาพแบนเนอร์ ken-burns + scrim, ชื่อแบบ word-mask stagger (120ms/คำ), role เป็น serif italic, CTA คู่
- HomeFeatured: ลิสต์ผลงานแนว editorial — เลข `N° 01`, ภาพสลับซ้าย/ขวา, `img-zoom`, ปิดท้ายด้วย band "View all projects"

### Nav + Menu Overlay
- `components/layout/Navbar.tsx`: แถบ full-width — Menu/Projects/About ซ้าย, โลโก้ `SARUNPAT` (Bodoni tracking กว้าง) กลาง, Contact/TH-EN/Dark-Light ขวา, auto-hide ตอน scroll ลง + glass ตอน scroll ขึ้น
- `components/layout/MenuOverlay.tsx` (ใหม่): overlay เต็มจอพื้น inverted + grain, ลิงก์ 6 หน้าเป็น display type ยักษ์ stagger 60ms พร้อม index 01–06, หน้า active เป็น italic, คอลัมน์ social + location, รองรับ Escape / scroll lock / focus management / `inert`
- `ThemeToggle` + `LangSwitcher`: จากปุ่มไอคอนกลม → text label (`Dark`/`Light`, `TH`/`EN`)
- ลิงก์ nav แชร์กันที่ `components/layout/nav-links.ts`

### หน้า About (`app/[locale]/about/about-view.tsx`)
- Headline บรรทัดเดียว: EN "Software Engineer" (Bodoni) / TH "สถาปัตยกรรมซอฟต์แวร์" (Kanit light) — ตัดระบบ `headlineAccent` ออกแล้ว
- Portrait 3:4 + `img-zoom` + caption N° 01 / story 2 ย่อหน้า / facts 3 ช่อง (Location, Focus, Status)
- `about.p2` เล่า trajectory: engineer → Tech Lead → CTO
- Skills เป็น index list 2 คอลัมน์ (เลขกำกับ + Bodoni, counter อัปเดตตามจำนวนใน locale อัตโนมัติ — ตอนนี้ 12 ตัว)
- CTA band "Let's build something together" → หน้า contact

### หน้า Projects (`app/[locale]/projects/projects-view.tsx`)
- เปลี่ยนจาก card grid → editorial list เข้าชุดกับ HomeFeatured (ภาพสลับซ้าย/ขวา, `img-zoom`, hairline, stagger 60ms)
- จัดกลุ่มตามประเภท (production/personal/academic/opensource) พร้อม section header แบบ editorial: eyebrow `— 01 / Index` + display heading + จำนวนต่อกลุ่ม — เลข N° ไล่ต่อเนื่อง 01–07 ข้ามกลุ่ม (user เลือกแบบมี section header แทน index รวดเดียว)
- Headline แบบ hero-mask เหมือนหน้า About (EN Bodoni / TH Kanit light nowrap) + subtitle ใหม่ทั้ง 2 ภาษา — key ใหม่ใน locale: `projects.types.*`, `indexLabel`, `countLabel`, `internal`, `cta*`
- โปรเจกต์ที่ไม่มีลิงก์ (งานภายในองค์กร) แสดง label `projects.internal` แทนปุ่ม, มีลิงก์ก็แสดง Live Demo / Code เป็น `btn-line`
- ปิดท้าย CTA band `projects.ctaTitle` → หน้า contact
- ลบ `components/shared/ProjectCard.tsx` แล้ว (ไม่มีที่ใช้อีก) + เลิกใช้ framer-motion ในหน้านี้
- Verify: tsc + build ผ่าน, screenshot 320–1920 × en/th × light/dark ไม่มี overflow (บทเรียน: Chrome เครื่องนี้ส่ง Accept-Language th → proxy redirect ไป /th — เวลา screenshot ต้อง set cookie `PORTFOLIO_LOCALE` หรือ override header)

### บั๊กที่เจอและแก้แล้ว
- **CSS layering**: class ใน `globals.css` เป็น unlayered CSS ชนะ Tailwind utility เสมอ — `.grain` บังคับ `position:relative` (ห้ามใส่บน fixed overlay โดยตรง ให้ใส่ inner wrapper) และ `.btn-line` บังคับ `display:inline-flex` (จะซ่อน responsive ต้องห่อ `<span className="hidden md:inline-flex">`) — จดไว้ใน skill แล้ว
- **React 19.2 script warning ตอนสลับภาษา**: การเปลี่ยน param `[locale]` ทำให้ subtree remount แล้ว `<script>` ของ next-themes ถูกสร้างใหม่ฝั่ง client → แก้โดยให้ `LangSwitcher` ใช้ `window.location.assign()` (full navigation) แทน `router.push + refresh`
- **Headline ไทยตัด 2 บรรทัด**: ภาษาไทยไม่มีช่องว่างให้ wrap → ใช้ `text-[min(8vw,124px)] whitespace-nowrap` เฉพาะไทย (ตรวจแล้ว 1 บรรทัดตั้งแต่ 320–2560px)

### วิธี verify ที่ใช้
- `npx tsc --noEmit` + `npm run build`
- Screenshot ผ่าน puppeteer-core + Chrome ของเครื่อง (light/dark, en/th, 320/375/768/1024/1440/1920/2560) เช็ค reveal, overflow, วรรณยุกต์ไทย

## 🔜 ยังไม่ได้ทำ (สไตล์เดิมอยู่)

1. **หน้า Experience** (`app/[locale]/experience`) — timeline แนว editorial
2. **หน้า Contact** (`app/[locale]/contact`) — ฟอร์ม + layout ให้เข้าธีม
3. **Footer** — ยังเป็นแบบเดิม (ไอคอนกลม) ควรปรับเป็น text link + eyebrow ให้เข้าชุด
4. เก็บตก: `hero.description` (EN) เป็นช่องว่าง, ลิงก์ LinkedIn ยังเป็น `yourusername` (อยู่ทั้ง Footer และ MenuOverlay), รูป OG image ควรทวนหลัง redesign เสร็จ

> โน้ตทิศทาง copy: เล่าภาพ "ช่างฝีมือที่มี trajectory สู่ Tech Lead / CTO" ให้สม่ำเสมอทุกหน้า
