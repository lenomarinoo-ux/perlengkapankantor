# Aturan Standar Pembuatan Artikel (Perlengkapan Kantor)

Dokumen ini adalah pedoman wajib bagi asisten AI dan pengembang saat membuat halaman artikel blog baru di project `perlengkapankantor`. Semua artikel baru **WAJIB** mengikuti tata letak, struktur HTML, kelas CSS (`.scf-*`), dan alur integrasi di bawah ini agar tampilan selalu 100% konsisten.

---

## 1. Prinsip Utama & Larangan
1. **DILARANG** menduplikasi/meng-copy file gambar lain untuk memalsukan aset baru. Jika aset baru belum digenerate/tersedia, pasang URL target dengan fallback `onerror="this.src='assets/img/web/hero-bg.webp';"`.
2. **Aset Gambar Artikel Terkait (Sidebar):** **WAJIB** menggunakan path gambar yang valid dan benar-benar ada di `assets/img/blog/` (periksa nama file aktual dari `blog.html` atau folder `assets/img/blog/`, jangan menebak pola `-01.webp` jika artikel lama memakai nama deskriptif seperti `cara-menata-arsip-kantor-dengan-rapi.webp`, `harga-grosir-ordner-f4-jakarta.webp`, `desain-tata-ruang-kantor-minimalis-jakarta.webp`). Selalu sertakan fallback `onerror="this.src='assets/img/logo/favicon.png'"`.
3. **SELALU** menggunakan sistem kelas `.scf-*` yang sudah terdefinisi di `assets/css/style.css`.
4. **SELALU** menambahkan kartu artikel ke `blog.html` (posisi teratas grid) dan URL baru ke `sitemap.xml`.

---

## 2. Struktur Anatomi Halaman Artikel (Wajib Lengkap)

### A. `<head>` SEO & Schema
- Canonical URL: `https://perlengkapankantor.web.id/[slug]`
- Geo Meta: `ID-JK`, `Jakarta Selatan`, koordinat Sudirman.
- JSON-LD `@graph`:
  - `OfficeEquipmentStore`
  - `Article` (Author: Tim Spesialis Perlengkapan Kantor)
  - `Product` (Produk/Paket terkait artikel)
  - `FAQPage` (5 Pertanyaan dan Jawaban)
  - `BreadcrumbList`

### B. Header & Hero Section
```html
<main class="flex-grow-1">
  <div class="container scf-max-width">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="scf-article-breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">Beranda</a></li>
        <li class="breadcrumb-item"><a href="blog.html">Blog</a></li>
        <li class="breadcrumb-item active" aria-current="page">[Meta Title]</li>
      </ol>
    </nav>

    <div class="scf-article-page">
      <div class="row g-5">
        <div class="col-lg-8">
          <!-- H1 & Lead -->
          <h1 class="scf-article-h1">[Judul H1 Artikel]</h1>
          <p class="scf-article-lead">[Answer Capsule / Lead Paragraph]</p>

          <!-- Author Meta Block -->
          <div class="scf-author-block">
            <img src="assets/img/blog/ardhana.jpeg" alt="Tim Spesialis Perlengkapan Kantor" class="scf-author-photo" onerror="this.src='assets/img/logo/favicon.png'" />
            <div>
              <div class="scf-author-name">Tim Spesialis Perlengkapan Kantor</div>
              <div class="scf-author-meta">
                <span class="meta-item"><span class="material-symbols-outlined">calendar_today</span>[Tanggal]</span>
                <span class="meta-item"><span class="material-symbols-outlined">schedule</span>[X] menit baca</span>
                <span class="meta-item"><span class="material-symbols-outlined">verified</span>Direview oleh [Konsultan Terkait]</span>
              </div>
            </div>
          </div>

          <!-- Hero Image & Caption -->
          <img src="assets/img/blog/[slug]-01.webp" alt="[Alt Text]" class="scf-hero-photo" onerror="this.src='assets/img/web/hero-bg.webp';" />
          <p class="scf-photo-caption">[Deskripsi Foto Utama]</p>
```

### C. Ringkasan Inti & Table of Contents (TOC)
```html
          <!-- Ringkasan Inti -->
          <div class="scf-summary-box">
            <div class="scf-summary-label">
              <span class="material-symbols-outlined">summarize</span>
              Ringkasan Inti
            </div>
            <ul>
              <li><strong>[Poin 1]:</strong> ...</li>
              <li><strong>[Poin 2]:</strong> ...</li>
              <li><strong>[Poin 3]:</strong> ...</li>
              <li><strong>[Poin 4]:</strong> ...</li>
            </ul>
          </div>

          <!-- TOC Collapsible -->
          <div class="scf-toc-collapsible">
            <button class="scf-toc-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#tocBody" aria-expanded="true" aria-controls="tocBody" id="tocToggleBtn">
              <span class="scf-toc-toggle-label">
                <span class="material-symbols-outlined">format_list_bulleted</span>
                Daftar Isi
              </span>
              <span class="material-symbols-outlined scf-toc-chevron">expand_more</span>
            </button>
            <div class="collapse show" id="tocBody">
              <div class="scf-toc-body">
                <ol>
                  <li><a href="#section-1">[Judul Section 1]</a></li>
                  <!-- item seterusnya -->
                </ol>
              </div>
            </div>
          </div>
```

### D. Body Artikel & Komponen Interaktif
- Setiap section utama dipisah dengan `<hr class="scf-section-divider" />`.
- Sisipkan box rekomendasi bacaan:
```html
<div class="scf-baca-juga-inline">
  <div class="scf-baca-juga-inline-label">
    <span class="material-symbols-outlined">auto_stories</span>
    Baca Juga
  </div>
  <ul class="scf-baca-juga-inline-list">
    <li><a href="[slug].html"><span class="material-symbols-outlined">arrow_forward</span>[Judul Terkait]</a></li>
  </ul>
</div>
```
- Tabel Komparasi:
```html
<div class="table-responsive scf-comparison-table my-4">
  <table class="table table-bordered align-middle mb-0">...</table>
</div>
```
- Gambar Kedua di dalam isi:
```html
<img src="assets/img/blog/[slug]-02.webp" alt="[Alt Text 2]" class="scf-hero-photo" onerror="this.src='assets/img/web/hero-bg.webp';" />
<p class="scf-photo-caption">[Caption Foto Kedua]</p>
```

### E. FAQ Accordion (5 Pertanyaan)
```html
<div class="scf-faq-accordion">
  <div class="scf-faq-item">
    <button class="scf-faq-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true" aria-controls="faq1">
      [Pertanyaan FAQ 1]
      <span class="material-symbols-outlined scf-faq-chevron">expand_more</span>
    </button>
    <div class="collapse show" id="faq1">
      <div class="scf-faq-body">[Jawaban FAQ 1]</div>
    </div>
  </div>
  <!-- Item 2 - 5 menggunakan aria-expanded="false" dan class="collapse" -->
</div>
```

### F. Kesimpulan, Author Bio Box & Footer Artikel
```html
<!-- Kesimpulan Box -->
<div class="scf-conclusion-box text-center" id="kesimpulan">
  <h2 class="mb-3">Kesimpulan Praktis</h2>
  <p class="mb-4">...</p>
  <div class="d-flex flex-wrap justify-content-center gap-3">
    <a href="https://wa.me/6288989643555?text=..." target="_blank" class="scf-btn-success d-inline-flex align-items-center gap-2">
      <!-- WA SVG --> Konsultasi via WhatsApp
    </a>
    <a href="kontak.html" class="scf-btn-outline-light d-inline-flex align-items-center gap-2">
      <span class="material-symbols-outlined">mail</span> Hubungi Kami
    </a>
  </div>
</div>

<!-- Author Bio Box -->
<div class="scf-author-box my-4 p-4 rounded-3 d-flex align-items-center gap-3" style="background: var(--scf-surface-container-low, #f9f3ee); border: 1px solid var(--scf-outline-variant, #e0e0e0);">
  <img src="assets/img/blog/ardhana.jpeg" alt="Tim Spesialis Perlengkapan Kantor" class="rounded-circle flex-shrink-0" style="width: 70px; height: 70px; object-fit: cover; border: 2px solid var(--scf-primary, #502c12);" onerror="this.src='assets/img/logo/favicon.png'" />
  <div>
    <h5 class="mb-1 fw-bold" style="color: var(--scf-on-surface, #1a1a1a); font-size: 1.05rem;">Penulis: Tim Spesialis Perlengkapan Kantor</h5>
    <p class="mb-0 text-muted" style="font-size: 0.88rem; line-height: 1.5;">[Deskripsi Divisi]</p>
  </div>
</div>

<!-- Tags & Share Row -->
<div class="scf-article-footer">
  <div class="d-flex flex-wrap gap-2 mb-3">...</div>
  <div class="scf-share-row">...</div>
</div>
```

### G. Sidebar (col-lg-4)
```html
<div class="col-lg-4">
  <aside class="scf-sidebar">
    <!-- CTA Widget -->
    <div class="scf-sidebar-cta">
      <span class="material-symbols-outlined">[icon_name]</span>
      <h3>[Judul CTA]</h3>
      <p>
        [Deskripsi Penawaran]
      </p>
      <a href="https://wa.me/6288989643555?text=[Pesan_WhatsApp_Terkait]" target="_blank"
        class="scf-btn-success w-100 justify-content-center d-inline-flex align-items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
        [Label CTA]
      </a>
    </div>

    <!-- Artikel Terkait Widget -->
    <div class="scf-sidebar-card">
      <div class="scf-sidebar-title">Artikel Terkait</div>
      <!-- Minimal 3 Item dengan file gambar yang valid di assets/img/blog/ -->
      <a href="[slug-terkait-1].html" class="scf-related-item">
        <img src="assets/img/blog/[nama-file-gambar-nyata].webp" alt="[Alt Text]" class="scf-related-thumb" onerror="this.src='assets/img/logo/favicon.png'" />
        <div>
          <div class="scf-related-cat">[Kategori]</div>
          <div class="scf-related-title">[Judul Artikel Terkait 1]</div>
        </div>
      </a>
      <a href="[slug-terkait-2].html" class="scf-related-item">
        <img src="assets/img/blog/[nama-file-gambar-nyata].webp" alt="[Alt Text]" class="scf-related-thumb" onerror="this.src='assets/img/logo/favicon.png'" />
        <div>
          <div class="scf-related-cat">[Kategori]</div>
          <div class="scf-related-title">[Judul Artikel Terkait 2]</div>
        </div>
      </a>
      <a href="[slug-terkait-3].html" class="scf-related-item">
        <img src="assets/img/blog/[nama-file-gambar-nyata].webp" alt="[Alt Text]" class="scf-related-thumb" onerror="this.src='assets/img/logo/favicon.png'" />
        <div>
          <div class="scf-related-cat">[Kategori]</div>
          <div class="scf-related-title">[Judul Artikel Terkait 3]</div>
        </div>
      </a>
    </div>

    <!-- Kategori Terkait Pilihan -->
    <div class="scf-sidebar-card">
      <div class="scf-sidebar-title">Kategori Terkait Pilihan</div>
      <a href="[produk-1].html" class="scf-sidebar-product">
        <span class="material-symbols-outlined">[icon]</span>
        <div>
          <div class="scf-sidebar-product-name">[Nama Produk/Layanan]</div>
          <div class="scf-sidebar-product-desc">[Deskripsi Singkat]</div>
        </div>
      </a>
      <!-- 3 item kategori lainnya -->
    </div>
  </aside>
</div>
```

---

## 3. Integrasi Wajib Setelah Artikel Dibuat
1. **`blog.html`**: Tambahkan artikel baru pada urutan pertama `.row.g-4` dengan kartu `.scf-blog-card`.
2. **`sitemap.xml`**: Tambahkan entri `<url><loc>https://perlengkapankantor.web.id/[slug]</loc><lastmod>[YYYY-MM-DD]</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`.
