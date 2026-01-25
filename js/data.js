const wasteData = [
  {
    id: 1,
    name: "Botol Plastik (PET)",
    category: "Anorganik",
    recyclable: true,
    overview:
      "Botol plastik PET adalah jenis plastik yang paling umum ditemukan pada minuman kemasan. PET memiliki peluang lebih besar untuk diproses ulang dibanding plastik campuran, namun keberhasilannya bergantung pada kondisi botol: bersih, kering, dan tidak terkontaminasi.",
    howTo: [
      "Kosongkan isi botol terlebih dahulu",
      "Bilas cepat untuk menghilangkan sisa minuman",
      "Keringkan agar tidak menimbulkan bau/jamur",
      "Pipihkan untuk menghemat tempat"
    ],
    mistakes: [
      "Memasukkan botol yang masih kotor dan lengket",
      "Mencampur botol dengan sampah organik",
      "Menganggap semua plastik otomatis bisa didaur ulang"
    ],
    fact:
      "PET cenderung lebih mudah diterima fasilitas daur ulang jika bersih dan tidak terkontaminasi."
  },

  {
    id: 2,
    name: "Kardus / Karton",
    category: "Anorganik",
    recyclable: true,
    overview:
      "Kardus dan karton umumnya dapat didaur ulang. Namun, kardus yang terkena minyak (misalnya bekas makanan) sering ditolak karena serat kertasnya sudah sulit diproses.",
    howTo: [
      "Pastikan kardus dalam kondisi kering",
      "Lipat atau rapikan agar hemat tempat",
      "Pisahkan kardus bersih dan kardus berminyak"
    ],
    mistakes: [
      "Mencampur kardus pizza berminyak dengan recycle",
      "Membiarkan kardus basah kehujanan sebelum dikumpulkan"
    ],
    fact:
      "Karton bersih biasanya bernilai lebih baik karena seratnya masih bagus untuk diproses ulang."
  },

  {
    id: 3,
    name: "Sisa Makanan",
    category: "Organik",
    recyclable: true,
    overview:
      "Sisa makanan termasuk sampah organik yang mudah dikelola jika dipisahkan dari sumbernya. Sampah organik bisa diolah menjadi kompos dan membantu mengurangi volume sampah rumah tangga.",
    howTo: [
      "Pisahkan dari plastik dan kemasan",
      "Buang ke wadah organik",
      "Jika memungkinkan, olah menjadi kompos",
      "Gunakan wadah tertutup untuk mengurangi bau"
    ],
    mistakes: [
      "Mencampur sisa makanan dengan plastik",
      "Membuang organik tanpa wadah tertutup"
    ],
    fact:
      "Jika dikelola, sampah organik dapat menjadi kompos yang bermanfaat."
  },

  {
    id: 4,
    name: "Baterai Bekas",
    category: "B3",
    recyclable: false,
    overview:
      "Baterai bekas termasuk kategori B3 karena dapat mengandung zat berbahaya. Baterai sebaiknya tidak dibuang bersama sampah biasa karena berisiko bocor dan mencemari lingkungan.",
    howTo: [
      "Simpan baterai di wadah kering dan tertutup",
      "Jauhkan dari panas dan api",
      "Kumpulkan beberapa sebelum disetor",
      "Setor ke drop point B3/e-waste jika tersedia"
    ],
    mistakes: [
      "Buang baterai ke tempat sampah biasa",
      "Membakar baterai",
      "Mencampur baterai dengan sampah basah"
    ],
    fact:
      "Baterai yang bocor bisa mencemari tanah dan air."
  },

  {
    id: 5,
    name: "Lampu Rusak (LED/Neon)",
    category: "E-waste",
    recyclable: false,
    overview:
      "Lampu termasuk limbah elektronik karena memiliki komponen yang tidak boleh dibuang sembarangan. Selain itu, lampu yang pecah dapat menimbulkan risiko cedera.",
    howTo: [
      "Bungkus lampu agar tidak pecah",
      "Simpan terpisah dari sampah lain",
      "Setor ke program e-waste jika tersedia"
    ],
    mistakes: [
      "Membuang lampu tanpa dibungkus",
      "Mencampur lampu dengan sampah basah"
    ],
    fact:
      "Pemisahan e-waste membantu mengurangi pencemaran dan meningkatkan keamanan."
  },

  {
    id: 6,
    name: "Styrofoam (Kotak Makan)",
    category: "Anorganik",
    recyclable: false,
    overview:
      "Styrofoam sulit didaur ulang dan sering ditolak karena ringan, mudah hancur menjadi serpihan kecil, serta hampir selalu terkontaminasi makanan atau minyak.",
    howTo: [
      "Jika tidak ada fasilitas khusus, masukkan ke residu",
      "Kurangi penggunaan untuk makanan panas",
      "Gunakan wadah pakai ulang jika memungkinkan"
    ],
    mistakes: [
      "Menganggap styrofoam selalu bisa recycle",
      "Membuang styrofoam berminyak ke recycle"
    ],
    fact:
      "Styrofoam yang tercecer mudah menjadi serpihan dan sulit dibersihkan dari lingkungan."
  },

  {
    id: 7,
    name: "Minyak Jelantah",
    category: "B3",
    recyclable: true,
    overview:
      "Minyak jelantah tidak boleh dibuang ke wastafel karena dapat menyumbat saluran dan mencemari air. Pada beberapa program, minyak jelantah bisa dikumpulkan untuk diolah kembali.",
    howTo: [
      "Dinginkan minyak terlebih dahulu",
      "Masukkan ke botol tertutup rapat",
      "Simpan di tempat aman",
      "Setor ke program pengumpulan jelantah jika ada"
    ],
    mistakes: [
      "Buang minyak jelantah ke wastafel",
      "Mencampur minyak jelantah dengan sampah organik"
    ],
    fact:
      "Minyak jelantah dapat mencemari air jika dibuang sembarangan."
  },

  {
    id: 8,
    name: "Kaleng Minuman",
    category: "Anorganik",
    recyclable: true,
    overview:
      "Kaleng minuman (umumnya aluminium) bernilai tinggi untuk didaur ulang. Namun tetap perlu dibersihkan agar tidak menimbulkan bau atau menarik serangga.",
    howTo: [
      "Kosongkan isi kaleng",
      "Bilas cepat",
      "Keringkan",
      "Pipihkan jika perlu"
    ],
    mistakes: [
      "Menyimpan kaleng yang masih lengket",
      "Mencampur kaleng dengan sampah basah"
    ],
    fact:
      "Aluminium bisa didaur ulang berulang kali dengan kualitas yang tetap baik."
  }
];
