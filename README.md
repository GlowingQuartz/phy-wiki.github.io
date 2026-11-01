# Phy-Wiki
Web app tanpa server untuk menghimpun, menampilkan, dan melengkapi solusi analitik soal-soal fisika yang berjalan sepenuhnya di perambahan.

## Struktur Repository
```
├── README.md          # Informasi mengenai web app Phy-Wiki
├── index.html         # Entry file web app Phy-Wiki
├── data/entries.json  # Kumpulan entri permanen yang dapat diakses global
└── .nojekyll          
```

## Fitur Web App
| Kapabilitas | Deskripsi |
| --- | --- |
| 1. Menghimpun informasi | Mencocokkan kueri dengan isi `entries.json` yang dapat diakses secara publik dan entri pribadi yang tersimpan secara lokal pada peramban. Entri akan ditampilkan jika dan hanya jika seluruh kata kunci entri cocok. |
| 2. Menyimpan dalam **Pustaka Saya** | Mengunggah referensi berupa buku teks dan acuannya dalam bentuk PDF/TXT/MD yang kontennya diekstrak lalu disimpan dalam peramban dan digunakan sebagai rujukan oleh AI. |
| 3. Menelusuri internet | Menemukan *solution manual*, catatan kuliah, dan *paper* melalui pencarian di internet lalu mengekstrak kontennya dan menyusunnya menjadi seragam dengan kutipan dari **Pustaka Saya**. |
| 4. Menyelesaikan secara mandiri | Menyediakan solusi dan proses analitik tanpa menggunakan sumber eksternal, misal tanpa pencarian internet. |
| 5. Menyelesaikan berbantu internet | Menyediakan solusi dan proses analitik dengan terlebih dahulu menelusuri internet dan membangunnya bersama dengan referensi dari **Pustaka Saya**. |

## Panduan Penggunaan
Panduan untuk memperoleh API key dan memilih model AI yang digunakan untuk memroses dan menyelesaikan ada dalam jendela **Pengaturan**. Untuk saat ini, hanya Gemini dari Google AI Studio dan Claude dari Anthropic Console yang didukung.
