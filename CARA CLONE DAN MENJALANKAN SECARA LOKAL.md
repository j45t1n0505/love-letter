Markdown
## 🚀 Panduan Instalasi & Menjalankan Secara Lokal

Ikuti langkah-langkah di bawah ini untuk menyalin (clone) dan menjalankan proyek ini di mesin lokal Anda untuk keperluan pengembangan atau eksperimen.

### 📋 Prasyarat
Sebelum memulai, pastikan sistem Anda sudah terinstal perangkat lunak berikut:
- **[Git](https://git-scm.com/)** (v2.0 atau lebih baru)
- **[Node.js](https://nodejs.org/)** (v18.0.0 atau direkomendasikan versi LTS terbaru)
- **Manajer Paket**: `npm` (biasanya sudah bawaan Node.js), `yarn`, atau `pnpm`.

### 🛠️ Langkah-langkah Instalasi

**1. Clone Repositori**
Buka terminal (Command Prompt, PowerShell, atau Terminal bawaan OS Anda) dan jalankan perintah berikut untuk mengunduh kode sumber:
```bash
git clone [https://github.com/j45t1n0505/love-letter.git](https://github.com/j45t1n0505/love-letter.git)
2. Masuk ke Direktori Proyek
Pindah ke dalam folder proyek yang baru saja diunduh:

Bash
cd love-letter
3. Instalasi Dependensi
Unduh dan instal semua pustaka yang dibutuhkan oleh aplikasi dengan menjalankan:

Bash
npm install
# atau menggunakan yarn: yarn install
# atau menggunakan pnpm: pnpm install
4. Jalankan Server Pengembangan (Development Server)
Setelah semua dependensi terinstal, Anda dapat menjalankan aplikasi di lingkungan pengembangan lokal:

Bash
npm run dev
5. Akses Aplikasi
Terminal akan menampilkan URL lokal (biasanya http://localhost:5173). Buka URL tersebut di browser web Anda (Chrome/Firefox/Edge) untuk melihat aplikasi berjalan. Setiap perubahan kode yang Anda simpan akan secara otomatis memicu pembaruan di browser.

📦 Membangun untuk Produksi (Build)
Jika Anda ingin mengompilasi proyek ini menjadi file statis yang siap diunggah ke server (hosting), jalankan:

Bash
npm run build
Hasil kompilasi akan berada di dalam folder dist/ atau build/.


---

### Penjelasan Logika Sistematis & Kompleks

Sesuai dengan kebutuhan Anda untuk memahami alur di balik layar dari setiap eksekusi pemrograman, berikut adalah rincian teknis mendalam tentang apa yang sebenarnya terjadi pada sistem operasi dan memori komputer Anda saat langkah-langkah di atas dijalankan:

**1. Alur Logika `git clone`**
*   **Handshake Protokol & Negosiasi Data:** Saat perintah ini dieksekusi, Git akan menginisialisasi koneksi HTTPS/SSH ke server GitHub. Terjadi proses negosiasi *packfile*, di mana klien dan server membandingkan hash referensi *commit* untuk menentukan objek data mana yang belum dimiliki klien.
*   **Transfer & Dekompresi Objek:** GitHub membundel riwayat *commit*, struktur pohon (*tree*), dan isi file (*blob*) ke dalam format biner yang dikompresi dengan zlib (disebut *packfile*), lalu mentransfernya. Di lokal, Git menerima aliran data ini, mendekompresinya, dan menyimpannya ke dalam folder tersembunyi `.git/objects`.
*   **Checkout Working Tree:** Git membaca *commit* terbaru pada *branch* default (biasanya `main` atau `master`). Ia memetakan struktur data graf langsung asiklik (DAG) dari `.git` menjadi file dan folder nyata pada sistem file (*file system*) komputer Anda, menciptakan *Working Directory* yang bisa Anda edit.

**2. Alur Logika `npm install`**
*   **Resolusi Pohon Dependensi (*Dependency Tree*):** Node Package Manager (npm) pertama kali akan membaca file `package.json` untuk melihat daftar dependensi langsung. Selanjutnya, npm membaca `package-lock.json` (jika ada) untuk menjamin versi yang direpresentasikan benar-benar presisi sampai ke tingkat sub-dependensi (dependensi dari dependensi). 
*   **Pengambilan dari Registry & Caching:** Npm akan melakukan *query* ke registry utama (registry.npmjs.org). Jika paket belum ada di *cache* lokal (biasanya di `~/.npm`), npm akan mengunduh file *tarball* (arsip terkompresi) dari setiap dependensi.
*   **Ekstraksi ke `node_modules`:** Paket yang diunduh kemudian diekstrak ke dalam direktori hierarkis `node_modules`. Proses ini sangat intensif pada I/O (Input/Output) disk karena melibatkan pembacaan dan penulisan puluhan ribu file kecil. Modul ini menjadi fondasi bagi fitur-fitur kompleks, misalnya modul pemutar musik (audio context) atau *library* animasi yang mungkin berjalan di atas *rendering engine* virtual DOM.

**3. Alur Logika `npm run dev` (berbasis Vite/Modern Bundler)**
*   **Pra-Bundling (*Pre-bundling*):** Saat perintah dijalankan, *bundler* seperti Vite (yang menggunakan esbuild) memindai semua dependensi pihak ketiga di `node_modules` dan melakukan kompilasi cepat (mengubah format CommonJS/UMD menjadi *Native ESM* atau ES Modules) menggunakan bahasa level-bawah (Go).
*   **Inisialisasi Server & HMR (Hot Module Replacement):** Server HTTP Node.js menyala dan membuka jalur komunikasi dua arah dengan browser menggunakan protokol **WebSocket**.
*   **Native ESM Serving:** Ketika browser meminta sebuah file `.js` atau `.jsx`, server tidak melakukan bundel ulang pada seluruh aplikasi. Sebaliknya, server hanya melayani file spesifik yang diminta.
*   **Siklus HMR:** Jika Anda memodifikasi komponen atau *styling* kompleks (misalnya, merender ulang warna komponen atau mengganti aset animasi visual), sistem *file watcher* di lokal mendeteksi perubahan *timestamp* file. Melalui WebSocket, server mengirimkan modul baru tersebut ke browser. Eksekusi ini mengganti modul lama di memori (RAM) browser tanpa melakukan *refresh* halaman penuh, menjaga *state* aplikasi (seperti posisi detik pemutar musik) tetap utuh saat pengembangan berlangsung.
