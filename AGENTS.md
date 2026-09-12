# Aturan Workspace Perlengkapan Kantor

Setiap kali pengguna meminta untuk membuat artikel blog baru, AI **WAJIB** mengikuti panduan standar di [.agents/rules/article-template.md](.agents/rules/article-template.md):

1. **Konsistensi Desain**: Gunakan struktur HTML dan kelas CSS `.scf-*` yang sama persis seperti pada halaman acuan (`cara-merawat-penghancur-kertas.html`, `jual-map-snelhechter-grosir.html`, `pencahayaan-ruang-rapat-kantor.html`).
2. **Anatomi Komponen Wajib**:
   - Breadcrumb `.scf-article-breadcrumb`
   - Layout 2 kolom (`.scf-article-page` > `.row.g-5` > `.col-lg-8` & `.col-lg-4`)
   - Main Heading `.scf-article-h1` & Lead text `.scf-article-lead`
   - Author Block `.scf-author-block` (foto `ardhana.jpeg`, tanggal, menit baca, reviewer)
   - Hero Photo `.scf-hero-photo` & Caption `.scf-photo-caption`
   - Ringkasan Inti `.scf-summary-box`
   - Daftar Isi Collapsible `.scf-toc-collapsible`
   - Pemisah seksi `.scf-section-divider` dan box `.scf-baca-juga-inline`
   - Tabel Komparasi `.scf-comparison-table`
   - FAQ Accordion `.scf-faq-accordion` (5 pertanyaan & jawaban)
   - Kesimpulan Box `.scf-conclusion-box text-center`
   - Author Bio Box `.scf-author-box`
   - Footer Artikel `.scf-article-footer` (Tags & Share row)
   - Sidebar `.scf-sidebar` (CTA, Artikel Terkait, Kategori Terkait Pilihan)
   - Footer halaman, Tombol Scroll to Top (`#scf-scroll-top`), dan WhatsApp FAB (`.scf-wa-fab`).
3. **Aturan Gambar**:
   - Jangan menduplikasi gambar lain untuk memalsukan gambar baru. Selalu sertakan fallback `onerror="this.src='assets/img/web/hero-bg.webp';"`.
   - **Aset Artikel Terkait (Sidebar)**: Gunakan file thumbnail aktual yang benar-benar ada di `assets/img/blog/` (periksa referensi nyata di `blog.html`). Selalu sertakan fallback `onerror="this.src='assets/img/logo/favicon.png'"` pada thumbnail sidebar.
4. **Alur Integrasi Pasca-Generate**:
   - Tambahkan artikel ke grid teratas di `blog.html`.
   - Tambahkan URL artikel ke `sitemap.xml`.
