'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('hobbies', [
      {
        name: "Menonton",
        slug: "menonton",
        description: "Selama ini mungkin banyak di antara kamu mempunyai perasaan bersalah ketika menonton drakor maupun film kesayangan kamu sampai pekerjaan terbengkalai atau begadang hingga pagi hari. Tapi sekarang, situasi “terjebak di rumah” adalah alasan sempurna untuk berpesta menonton semua acara drama atau film favorit kamu. Walaupun Netflix, youtube dan viu adalah pilihan populer, tentu saja, ada juga yang menjadi fans Disney. Kamu dapat memilih dari setiap film Disney sesuai keinginan hati kamu (termasuk Marvel, Pixar, Star Wars, National Geographic, dan animasi klasik) dan satu tips untuk kamu, berhati-hatilah memilih jenis tontonan. Pilihlah jenis tontonan yang ramah untuk ditonton oleh seluruh anggota keluarga.",
        category: "audio-visual",
        img: "",
        community_name: "Komunitas Film",
        community_link: "https://web.facebook.com/groups/417109655010902/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Membaca",
        slug: "membaca",
        description: "Apapun jenis bahan bacaan pilihan kamu, e-book, buku audio, dan buku jenis cetakan, kamu mungkin bisa terhanyut dalam bacaan kesukaan kamu sehingga tidak terasa waktu sudah berlalu sedemikian rupa. Selain dapat memberikan ilmu baru, menurut pendapat ahli , membaca dapat mengasah daya ingat serta meningkatkan konsentrasi analisa kamu sehingga bisa memperpanjang usia pikiran kamu. Jadi tidak cepat pikun nantinya ketika tua. Untuk kaum wanita buku novel menjadi sasaran utama apalagi kalau novel romantis. Sedangkan untuk kaum pria yang suka membaca, kamu mungkin bisa coba membaca buku novel “Harry potter”, dijamin serasa seperti menjadi pemain utamanya. Namun semua tergantung pilhan kamu masing-masing yah…",
        category: "sastra",
        img: "",
        community_name: "Komunitas Membaca",
        community_link: "https://web.facebook.com/profile.php?id=100080199315895",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Berolahraga",
        slug: "berolahraga",
        description: "Tidak bisa ke arena gym? Buat saja arena gym di tempat kamu sendiri. Itulah yang sekarang dilakukan banyak orang, dengan bantuan peralatan olahraga di rumah seperti dumbel, resistance band (tali karet elastis), tali skipping, gym ball, dan banyak lagi, kamu bisa serasa berada di ruangan gym sendiri. Sementara itu kamu juga dapat menemukan banyak video tutorial seputar kegiatan olahraga dirumah, di channel YouTube. Kamu juga bisa melakukan beberapa teknik untuk menjaga agar postur badan kamu tetap bagus misalnya Push up, Sit up, Jumping jack, Crunch dan lainnya. Dengan begitu, sehabis pandemi ini berlalu kamu mungkin bisa memamerkan hasil ‘kerja keras’ kamu selama di rumah aja",
        category: "olahragam",
        img: "",
        community_name: "Komunitas Olahraga Indonesia",
        community_link: "https://web.facebook.com/KomunitasOlahraga",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Seni dan Kerajinan",
        slug: "seni-dan-kerajinan",
        description: "Ada sesuatu yang unik tentang melakukan seni dan kerajinan tangan, sebagai orang dewasa melakukan seni kerajinan tangan seperti membuat kita merasa seperti anak kecil lagi, ketika kita masih duduk di bangku sekolah. Tapi seni dan kerajinan telah terbukti membantu mengalihkan perhatian dari pikiran gelisah akibat pandemi corona loh. Ada begitu banyak proyek untuk dipilih, kamu bisa memilih belajar merajut, melukis dengan menggunakan cat air, mengukir, merangkai bunga dan sebagainya. Kegiatan ini dapat meningkatkan kemampuan kognitif kita, karena itu adalah campuran dari aktivitas yang dapat merangsang memori secara intelektual.",
        category: "kerajinan",
        img: "",
        community_name: "Komunitas Kesenian Jaranan OKu Timur Sumatra Selatan",
        community_link: "https://web.facebook.com/groups/447421076946144/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Permainan Papan",
        slug: "permainan-papan",
        description: " Jika kamu sedang dikarantina bersama dengan teman atau teman sekamar atau dengan anggota keluarga, jangan langsung menjadi depresi. Sebaliknya ciptakan mood yang positif agar membuat diri kita lebih semangat, lebih bergembira dan bisa membantu penyembuhan dari covid 19, seperti yang dikatakan pak Tung Desem Waringin, ketika beliau diisolasi. Kamu bisa saja mengajak mereka untuk memainkan permainan papan seperti monopoli, ular tangga, catur atau bahkan puzzle. Dengan begitu kamu bisa meluangkan waktu lebih banyak dengan keluarga atau teman sekamar kamu sehingga dengan demikian hubungan kekeluargaan itu bisa tercipta disaat seperti ini. Mungkin bisa diingat kembali, adakah permainan yang membuat kita serasa bernostalgia ?",
        category: "lainnya",
        img: "",
        community_name: "",
        community_link: "",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Proyek DIY",
        slug: "proyek-diy",
        description: "Mungkin semua proyek di Pinterest kamu, yang selama ini ingin kamu lakukan tapi tidak bisa karena tidak punya waktu. Nah, sekarang anda di rumah dan memiliki waktu 24 jam 7 hari seminggu. Inilah kesempatan kamu untuk melakukannya. Baik itu sesuatu yang menyenangkan seperti membuat rak palet anggur atau sepraktis mengecat ruang tamu anda dengan warna baru sehingga itu tidak membuat suasana terasa membosankan. Perlu lebih jelas cara membuatnya? Gampang…jelajahi YouTube untuk melihat tutorialnya sehingga mempermudah kamu melakukannya dan juga kamu mungkin dapat menemukan ide-ide yang baru.",
        category: "lainnya",
        img: "",
        community_name: "",
        community_link: "",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Yoga",
        slug: "yoga",
        description: "Mungkin ada sedikit bias tentang hal ini. Seseorang yang sudah terbiasa melakukan yoga, akan merasa jauh lebih baik jika dia dapat melakukan yoga setiap hari. Yoga menjadi salah satu pilihan yang bisa dilakukan di rumah terutama oleh kaum wanita. Tidak hanya sehat, gerakan yoga yang dapat meningkatkan kelenturan tubuh setiap hari, juga dapat membantu menghilangkan stres dan menyalurkan zen dalam diri kamu. Kamu juga bisa mencontoh tutorial seputar yoga yang banyak disajikan di sosial media online.",
        category: "olahraga",
        img: "",
        community_name: "Persaudaraan Kriya Yoga Indonesia",
        community_link: "https://web.facebook.com/groups/265517594033571/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Memanggang",
        slug: "memanggang",
        description: "Akhir-akhir ini saya sangat terkejut (mungkin kamu juga), melihat akun Instagram telah dibombardir dengan gambar roti buatan rumah, kue cupcake, muffin, bahkan kue tart. Sepertinya semua orang mendadak menjadi ahli memanggang ya — dan bisakah kamu menyalahkan mereka? Bagi ibu-ibu di rumah yang ingin memberikan jajanan sehat buat keluarganya, berkutat di dapur dengan bermodalkan resep yang sudah ada membuat kamu takjub dan merasa seperti orang yang ahli dalam membuat kue. Hal ini tidak hanya menyenangkan, tetapi juga produktif (dan lezat!).",
        category: "lainnya",
        img: "",
        community_name: "Komunitas Hobi Memasak",
        community_link: "https://web.facebook.com/groups/461414119054499/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Berkebun",
        slug: "berkebun",
        description: "Bukan karena diwajibkan di rumah saja berarti kamu tidak bisa keluar. Salah satu cara untuk menghabiskan lebih banyak waktu di luar rumah adalah dengan cara berkebun. Menanam tanaman bunga, buah dan sayur-sayuran di halaman rumah, bisa saja menjadi sangat menyenangkan. Ajak si kecil yang mungkin akan sangat suka untuk bermain-main dengan tanah (jangan lupa cuci tangan sesudahnya ) , dan siapa tahu mungkin jika pintar-pintar memilih apa yang ditanam bisa memberikan keuntungan di kemudian hari. Kamu juga bisa membuat taman mini yang di dalamnya terdapat berbagai macam tanaman bunga serta kolam ikan kecil yang membuat pesona taman mini tersebut lebih hidup.",
        category: "lainnya",
        img: "",
        community_name: "Komunitas Sahabat Berkebun",
        community_link: "https://web.facebook.com/groups/500344480030701/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Video Game",
        slug: "video-game",
        description: "Bagi video Gamer, bermain berjam-jam bahkan sampai lupa makan dan tidur merupakan kegiatan yang sangat menyenangkan, menantang dan sekaligus menghibur. Kamu juga bisa berinteraksi dengan teman-teman yang jauh dari kamu melalui dunia maya. Hal ini yang mengakibatkan banyak orang terobsesi dengan permainan di video game. Di era sekarang ini kaum milenial menggunakan handphone sebagai media untuk menghibur diri selama di masa pandemi virus corona. Apalagi sekarang sudah ada game online seperti Mobile Legend, PUBG, HAGO, Garena AOV dan lainnya yang membuat jarak menjadi serasa lebih dekat.",
        category: "teknologi",
        img: "",
        community_name: "Komunitas Gamer Indonesia",
        community_link: "https://web.facebook.com/groups/komunitatgamerindonesia/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Meditasi",
        slug: "meditasi",
        description: "Sejak adanya Sosial Distancing dan di rumah saja, setiap pagi saya memulai hari dengan meditasi 15 menit. Saya tidak ingin mengatakan itu mengubah hidup saya akan tetapi hal tersebut justru memang mengubah hidup saya menjadi lebih baik , membuat saya lebih open-minded sehingga itu akan memperbaiki suasana hati dan pikiran saya. Bagi yang belum pernah mencoba, mungkin kamu dapat memulainya dari besok ya, jangan lupa, kamu bisa mencari panduannya di berbagai akun sosial seperti youtube channel atau belajar melalui ebook.",
        category: "olahraga",
        img: "",
        community_name: "Komunitas Ayo Belajar Meditasi",
        community_link: "https://web.facebook.com/groups/335660501168885/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Buku Audio dan Podcast",
        slug: "buku-audio-dan-podcast",
        description: "Bagi kamu-kamu yang suka duduk dan membaca buku, kamu dapat sambil mendengar buku audio dan podcast ketika kamu melakukan aktivitas yang membutuhkan bantuan tangan atau kaki . Contohnya seperti membersihkan rumah, berjalan di luar, atau memasak makan malam. Sambil mendengarkan buku audio dan podcast, semua aktivitas kegiatan terasa lebih menyenangkan sehinga itu bisa menjadi salah satu pendorong mood buat kamu sambil melakukan aktivitas.",
        category: "audio-visual",
        img: "",
        community_name: "Komunitas Pecinta Buku Indonesia",
        community_link: "https://web.facebook.com/groups/komunitaspecintabukuindonesia/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Menulis",
        slug: "menulis",
        description: "Tidak masalah jika kamu membuat jurnal, menulis blog tentang apa yang kamu makan hari ini (yaitu semua makanan ringan di dapur), atau menulis novel kehidupan kamu. Itu semua akan membuat kamu menjadi lebih bahagia. Mengapa tidak? Karena kamu bisa mengekspresikan suasana hati kamu. Dengan menulis, secara otomatis tingkat depresi bisa menurun secara teratur bahkan menulis tidak hanya membuat otak kamu sibuk tetapi juga meningkatkan kreativitas kamu. Mulailah dengan bercerita singkat tentang hari-hari kamu di jurnal, lambat laun hal ini akan menjadi suatu keinginan yang tak dapat dibendung. Siapa tahu hobi yang tadinya cuman iseng bisa membuat kamu menjadi penulis terkenal ?",
        category: "sastra",
        img: "",
        community_name: "Komunitas Penulis Indonesia",
        community_link: "https://web.facebook.com/groups/194964677221837/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Belajar Bahasa",
        slug: "belajar-bahasa",
        description: "Bonjour ! Hola ! Guten Tag ! Tidak peduli bahasa mana yang ingin kamu tambahkan ke tempat koleksi kamu. Sekarang ini banyak pelajaran online, video, dan aplikasi lainnya yang bisa mendukung kamu untuk mempelajari berbagai macam bahasa didunia ini. Selain itu kamu juga bisa mempelajari bahasa negara lain dengan melihat film atau melihat youtube yang berhubungan dengan bahasa.",
        category: "sastra",
        img: "",
        community_name: "Komunitas Belajar Bahasa Inggris Mudah",
        community_link: "https://web.facebook.com/groups/186298889397681/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Belajar Alat Musik",
        slug: "belajar-alat-musik",
        description: "Mengapa puas mendengarkan musik padahal kamu bisa memainkannya? Jika kamu tertarik dengan salah satu alat musik seperti piano, gitar, viola dan lainnya, kamu bisa mempelajarinya melalui youtube karena disana kamu akan dapat menemukan banyak tutorial. Ketika kamu sudah mampu dalam memainkan alat musik, alangkah bagusnya jika anda menggunakan kesempatan ini untuk membuat sebuah video live musik melalui handphone anda sehingga itu akan bermanfaat bagi diri anda sendiri. Siapa yang menyangka di rumah akan menjadi menyenangkan. Dengan adanya hobi baru yang bisa anda kerjakan, percayalah kamu akan merasa jauh dari bosan. Atau mungkin ada yang ingin menambahkan daftar di atas ?",
        category: "audio-visual",
        img: "",
        community_name: "Komunitas Musisi Indonesia",
        community_link: "https://web.facebook.com/groups/391498334701223/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hobbies', null, {});
  }
};
