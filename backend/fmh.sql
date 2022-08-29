--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: hobbies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hobbies (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    description text NOT NULL,
    category character varying(255) NOT NULL,
    img character varying(255),
    visited_count integer DEFAULT 0,
    community_name character varying(255),
    community_link character varying(255),
    suggester_email character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.hobbies OWNER TO postgres;

--
-- Name: hobbies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hobbies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hobbies_id_seq OWNER TO postgres;

--
-- Name: hobbies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hobbies_id_seq OWNED BY public.hobbies.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: suggestions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suggestions (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    description text NOT NULL,
    category character varying(255) NOT NULL,
    img character varying(255),
    visited_count integer DEFAULT 0,
    suggester_email character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.suggestions OWNER TO postgres;

--
-- Name: suggestions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suggestions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.suggestions_id_seq OWNER TO postgres;

--
-- Name: suggestions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suggestions_id_seq OWNED BY public.suggestions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: hobbies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hobbies ALTER COLUMN id SET DEFAULT nextval('public.hobbies_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: suggestions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suggestions ALTER COLUMN id SET DEFAULT nextval('public.suggestions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20220619071328-create-users.js
20220619074633-create-roles.js
20220619075301-create-hobbies.js
20220619075818-create-categories.js
20220619080118-create-suggestions.js
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, slug, "createdAt", "updatedAt") FROM stdin;
1	Teknologi	teknologi	2022-08-23 15:50:08.45+07	2022-08-23 15:50:08.45+07
2	Audio Visual	audio-visual	2022-08-23 15:50:08.45+07	2022-08-23 15:50:08.45+07
3	Sastra	sastra	2022-08-23 15:50:08.45+07	2022-08-23 15:50:08.45+07
4	Kerajinan	kerajinan	2022-08-23 15:50:08.45+07	2022-08-23 15:50:08.45+07
5	Otomotif	otomotif	2022-08-23 15:50:08.45+07	2022-08-23 15:50:08.45+07
6	Olahraga	olahraga	2022-08-23 15:50:08.45+07	2022-08-23 15:50:08.45+07
7	Lainnya	lainnya	2022-08-23 15:50:08.45+07	2022-08-23 15:50:08.45+07
\.


--
-- Data for Name: hobbies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hobbies (id, name, slug, description, category, img, visited_count, community_name, community_link, suggester_email, "createdAt", "updatedAt") FROM stdin;
4	Seni dan Kerajinan	seni-dan-kerajinan	Ada sesuatu yang unik tentang melakukan seni dan kerajinan tangan, sebagai orang dewasa melakukan seni kerajinan tangan seperti membuat kita merasa seperti anak kecil lagi, ketika kita masih duduk di bangku sekolah. Tapi seni dan kerajinan telah terbukti membantu mengalihkan perhatian dari pikiran gelisah akibat pandemi corona loh. Ada begitu banyak proyek untuk dipilih, kamu bisa memilih belajar merajut, melukis dengan menggunakan cat air, mengukir, merangkai bunga dan sebagainya. Kegiatan ini dapat meningkatkan kemampuan kognitif kita, karena itu adalah campuran dari aktivitas yang dapat merangsang memori secara intelektual.	kerajinan		0	Komunitas Kesenian Jaranan OKu Timur Sumatra Selatan	https://web.facebook.com/groups/447421076946144/	\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
5	Permainan Papan	permainan-papan	 Jika kamu sedang dikarantina bersama dengan teman atau teman sekamar atau dengan anggota keluarga, jangan langsung menjadi depresi. Sebaliknya ciptakan mood yang positif agar membuat diri kita lebih semangat, lebih bergembira dan bisa membantu penyembuhan dari covid 19, seperti yang dikatakan pak Tung Desem Waringin, ketika beliau diisolasi. Kamu bisa saja mengajak mereka untuk memainkan permainan papan seperti monopoli, ular tangga, catur atau bahkan puzzle. Dengan begitu kamu bisa meluangkan waktu lebih banyak dengan keluarga atau teman sekamar kamu sehingga dengan demikian hubungan kekeluargaan itu bisa tercipta disaat seperti ini. Mungkin bisa diingat kembali, adakah permainan yang membuat kita serasa bernostalgia ?	lainnya		0			\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
6	Proyek DIY	proyek-diy	Mungkin semua proyek di Pinterest kamu, yang selama ini ingin kamu lakukan tapi tidak bisa karena tidak punya waktu. Nah, sekarang anda di rumah dan memiliki waktu 24 jam 7 hari seminggu. Inilah kesempatan kamu untuk melakukannya. Baik itu sesuatu yang menyenangkan seperti membuat rak palet anggur atau sepraktis mengecat ruang tamu anda dengan warna baru sehingga itu tidak membuat suasana terasa membosankan. Perlu lebih jelas cara membuatnya? Gampang…jelajahi YouTube untuk melihat tutorialnya sehingga mempermudah kamu melakukannya dan juga kamu mungkin dapat menemukan ide-ide yang baru.	lainnya		0			\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
7	Yoga	yoga	Mungkin ada sedikit bias tentang hal ini. Seseorang yang sudah terbiasa melakukan yoga, akan merasa jauh lebih baik jika dia dapat melakukan yoga setiap hari. Yoga menjadi salah satu pilihan yang bisa dilakukan di rumah terutama oleh kaum wanita. Tidak hanya sehat, gerakan yoga yang dapat meningkatkan kelenturan tubuh setiap hari, juga dapat membantu menghilangkan stres dan menyalurkan zen dalam diri kamu. Kamu juga bisa mencontoh tutorial seputar yoga yang banyak disajikan di sosial media online.	olahraga		0	Persaudaraan Kriya Yoga Indonesia	https://web.facebook.com/groups/265517594033571/	\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
8	Memanggang	memanggang	Akhir-akhir ini saya sangat terkejut (mungkin kamu juga), melihat akun Instagram telah dibombardir dengan gambar roti buatan rumah, kue cupcake, muffin, bahkan kue tart. Sepertinya semua orang mendadak menjadi ahli memanggang ya — dan bisakah kamu menyalahkan mereka? Bagi ibu-ibu di rumah yang ingin memberikan jajanan sehat buat keluarganya, berkutat di dapur dengan bermodalkan resep yang sudah ada membuat kamu takjub dan merasa seperti orang yang ahli dalam membuat kue. Hal ini tidak hanya menyenangkan, tetapi juga produktif (dan lezat!).	lainnya		0	Komunitas Hobi Memasak	https://web.facebook.com/groups/461414119054499/	\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
9	Berkebun	berkebun	Bukan karena diwajibkan di rumah saja berarti kamu tidak bisa keluar. Salah satu cara untuk menghabiskan lebih banyak waktu di luar rumah adalah dengan cara berkebun. Menanam tanaman bunga, buah dan sayur-sayuran di halaman rumah, bisa saja menjadi sangat menyenangkan. Ajak si kecil yang mungkin akan sangat suka untuk bermain-main dengan tanah (jangan lupa cuci tangan sesudahnya ) , dan siapa tahu mungkin jika pintar-pintar memilih apa yang ditanam bisa memberikan keuntungan di kemudian hari. Kamu juga bisa membuat taman mini yang di dalamnya terdapat berbagai macam tanaman bunga serta kolam ikan kecil yang membuat pesona taman mini tersebut lebih hidup.	lainnya		0	Komunitas Sahabat Berkebun	https://web.facebook.com/groups/500344480030701/	\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
10	Video Game	video-game	Bagi video Gamer, bermain berjam-jam bahkan sampai lupa makan dan tidur merupakan kegiatan yang sangat menyenangkan, menantang dan sekaligus menghibur. Kamu juga bisa berinteraksi dengan teman-teman yang jauh dari kamu melalui dunia maya. Hal ini yang mengakibatkan banyak orang terobsesi dengan permainan di video game. Di era sekarang ini kaum milenial menggunakan handphone sebagai media untuk menghibur diri selama di masa pandemi virus corona. Apalagi sekarang sudah ada game online seperti Mobile Legend, PUBG, HAGO, Garena AOV dan lainnya yang membuat jarak menjadi serasa lebih dekat.	teknologi		0	Komunitas Gamer Indonesia	https://web.facebook.com/groups/komunitatgamerindonesia/	\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
2	Membaca	membaca	Apapun jenis bahan bacaan pilihan kamu, e-book, buku audio, dan buku jenis cetakan, kamu mungkin bisa terhanyut dalam bacaan kesukaan kamu sehingga tidak terasa waktu sudah berlalu sedemikian rupa. Selain dapat memberikan ilmu baru, menurut pendapat ahli , membaca dapat mengasah daya ingat serta meningkatkan konsentrasi analisa kamu sehingga bisa memperpanjang usia pikiran kamu. Jadi tidak cepat pikun nantinya ketika tua. Untuk kaum wanita buku novel menjadi sasaran utama apalagi kalau novel romantis. Sedangkan untuk kaum pria yang suka membaca, kamu mungkin bisa coba membaca buku novel “Harry potter”, dijamin serasa seperti menjadi pemain utamanya. Namun semua tergantung pilhan kamu masing-masing yah…	sastra		1	Komunitas Membaca	https://web.facebook.com/profile.php?id=100080199315895	\N	2022-08-23 15:50:08.429+07	2022-08-23 15:54:48.843+07
11	Meditasi	meditasi	Sejak adanya Sosial Distancing dan di rumah saja, setiap pagi saya memulai hari dengan meditasi 15 menit. Saya tidak ingin mengatakan itu mengubah hidup saya akan tetapi hal tersebut justru memang mengubah hidup saya menjadi lebih baik , membuat saya lebih open-minded sehingga itu akan memperbaiki suasana hati dan pikiran saya. Bagi yang belum pernah mencoba, mungkin kamu dapat memulainya dari besok ya, jangan lupa, kamu bisa mencari panduannya di berbagai akun sosial seperti youtube channel atau belajar melalui ebook.	olahraga		0	Komunitas Ayo Belajar Meditasi	https://web.facebook.com/groups/335660501168885/	\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
12	Buku Audio dan Podcast	buku-audio-dan-podcast	Bagi kamu-kamu yang suka duduk dan membaca buku, kamu dapat sambil mendengar buku audio dan podcast ketika kamu melakukan aktivitas yang membutuhkan bantuan tangan atau kaki . Contohnya seperti membersihkan rumah, berjalan di luar, atau memasak makan malam. Sambil mendengarkan buku audio dan podcast, semua aktivitas kegiatan terasa lebih menyenangkan sehinga itu bisa menjadi salah satu pendorong mood buat kamu sambil melakukan aktivitas.	audio-visual		0	Komunitas Pecinta Buku Indonesia	https://web.facebook.com/groups/komunitaspecintabukuindonesia/	\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
13	Menulis	menulis	Tidak masalah jika kamu membuat jurnal, menulis blog tentang apa yang kamu makan hari ini (yaitu semua makanan ringan di dapur), atau menulis novel kehidupan kamu. Itu semua akan membuat kamu menjadi lebih bahagia. Mengapa tidak? Karena kamu bisa mengekspresikan suasana hati kamu. Dengan menulis, secara otomatis tingkat depresi bisa menurun secara teratur bahkan menulis tidak hanya membuat otak kamu sibuk tetapi juga meningkatkan kreativitas kamu. Mulailah dengan bercerita singkat tentang hari-hari kamu di jurnal, lambat laun hal ini akan menjadi suatu keinginan yang tak dapat dibendung. Siapa tahu hobi yang tadinya cuman iseng bisa membuat kamu menjadi penulis terkenal ?	sastra		0	Komunitas Penulis Indonesia	https://web.facebook.com/groups/194964677221837/	\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
14	Belajar Bahasa	belajar-bahasa	Bonjour ! Hola ! Guten Tag ! Tidak peduli bahasa mana yang ingin kamu tambahkan ke tempat koleksi kamu. Sekarang ini banyak pelajaran online, video, dan aplikasi lainnya yang bisa mendukung kamu untuk mempelajari berbagai macam bahasa didunia ini. Selain itu kamu juga bisa mempelajari bahasa negara lain dengan melihat film atau melihat youtube yang berhubungan dengan bahasa.	sastra		0	Komunitas Belajar Bahasa Inggris Mudah	https://web.facebook.com/groups/186298889397681/	\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
15	Belajar Alat Musik	belajar-alat-musik	Mengapa puas mendengarkan musik padahal kamu bisa memainkannya? Jika kamu tertarik dengan salah satu alat musik seperti piano, gitar, viola dan lainnya, kamu bisa mempelajarinya melalui youtube karena disana kamu akan dapat menemukan banyak tutorial. Ketika kamu sudah mampu dalam memainkan alat musik, alangkah bagusnya jika anda menggunakan kesempatan ini untuk membuat sebuah video live musik melalui handphone anda sehingga itu akan bermanfaat bagi diri anda sendiri. Siapa yang menyangka di rumah akan menjadi menyenangkan. Dengan adanya hobi baru yang bisa anda kerjakan, percayalah kamu akan merasa jauh dari bosan. Atau mungkin ada yang ingin menambahkan daftar di atas ?	audio-visual		0	Komunitas Musisi Indonesia	https://web.facebook.com/groups/391498334701223/	\N	2022-08-23 15:50:08.429+07	2022-08-23 15:50:08.429+07
1	Menonton	menonton	Selama ini mungkin banyak di antara kamu mempunyai perasaan bersalah ketika menonton drakor maupun film kesayangan kamu sampai pekerjaan terbengkalai atau begadang hingga pagi hari. Tapi sekarang, situasi “terjebak di rumah” adalah alasan sempurna untuk berpesta menonton semua acara drama atau film favorit kamu. Walaupun Netflix, youtube dan viu adalah pilihan populer, tentu saja, ada juga yang menjadi fans Disney. Kamu dapat memilih dari setiap film Disney sesuai keinginan hati kamu (termasuk Marvel, Pixar, Star Wars, National Geographic, dan animasi klasik) dan satu tips untuk kamu, berhati-hatilah memilih jenis tontonan. Pilihlah jenis tontonan yang ramah untuk ditonton oleh seluruh anggota keluarga.	audio-visual		3	Komunitas Film	https://web.facebook.com/groups/417109655010902/	\N	2022-08-23 15:50:08.429+07	2022-08-29 06:20:19.59+07
3	Berolahraga	berolahraga	Tidak bisa ke arena gym? Buat saja arena gym di tempat kamu sendiri. Itulah yang sekarang dilakukan banyak orang, dengan bantuan peralatan olahraga di rumah seperti dumbel, resistance band (tali karet elastis), tali skipping, gym ball, dan banyak lagi, kamu bisa serasa berada di ruangan gym sendiri. Sementara itu kamu juga dapat menemukan banyak video tutorial seputar kegiatan olahraga dirumah, di channel YouTube. Kamu juga bisa melakukan beberapa teknik untuk menjaga agar postur badan kamu tetap bagus misalnya Push up, Sit up, Jumping jack, Crunch dan lainnya. Dengan begitu, sehabis pandemi ini berlalu kamu mungkin bisa memamerkan hasil ‘kerja keras’ kamu selama di rumah aja	olahragam		1	Komunitas Olahraga Indonesia	https://web.facebook.com/KomunitasOlahraga	\N	2022-08-23 15:50:08.429+07	2022-08-29 06:21:16.28+07
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, slug, "createdAt", "updatedAt") FROM stdin;
1	Administrator	administrator	2022-08-23 15:50:08.421+07	2022-08-23 15:50:08.421+07
2	Moderator	moderator	2022-08-23 15:50:08.421+07	2022-08-23 15:50:08.421+07
\.


--
-- Data for Name: suggestions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suggestions (id, name, slug, description, category, img, visited_count, suggester_email, "createdAt", "updatedAt") FROM stdin;
1	Mendayung perahu	mendayung-perahu	ya mendayung	teknologi		0	adhy@gmail.com	2022-08-23 15:50:08.442+07	2022-08-23 15:50:08.442+07
2	Memancing	memancing	ya mendayung	teknologi		0	adhy@gmail.com	2022-08-23 15:50:08.442+07	2022-08-23 15:50:08.442+07
3	Berlayar	berlayar	ya mendayung	teknologi		0	adhy@gmail.com	2022-08-23 15:50:08.442+07	2022-08-23 15:50:08.442+07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, role, "createdAt", "updatedAt") FROM stdin;
1	admin	$2b$12$ath594/Xrt9xRpE5YSGuN.CehAxfct13Dpm1DgJDNqZS.VLFRwu76	administrator	2022-08-23 15:50:08.405+07	2022-08-23 15:50:08.405+07
2	adhy	$2b$12$ath594/Xrt9xRpE5YSGuN.CehAxfct13Dpm1DgJDNqZS.VLFRwu76	moderator	2022-08-23 15:50:08.405+07	2022-08-23 15:50:08.405+07
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 7, true);


--
-- Name: hobbies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hobbies_id_seq', 15, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: suggestions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suggestions_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: hobbies hobbies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hobbies
    ADD CONSTRAINT hobbies_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: suggestions suggestions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suggestions
    ADD CONSTRAINT suggestions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

