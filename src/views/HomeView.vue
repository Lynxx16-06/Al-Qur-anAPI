<template>
  <main class="min-h-screen flex flex-col bg-white text-gray transition-all duration-300 bg-gray-10">
    <!-- Main Content -->
    <section
      class="mt-25 lg:mt-20 md:mt-16 px-4 md:px-16 lg:px-80 py-6 flex flex-col lg:flex-row gap-5"
    >
      <!-- Daftar Surat -->
      <div
        class="bg-white shadow-2xl bg-border-100 transition-all duration-300 hidden md:block lg:block w-full lg:w-1/3 text-white overflow-y-auto h-[80vh] lg:h-[80vh] rounded-2xl p-4 no-scrollbar"
      >
        <ul>
          <li
            v-for="item in filteredSurat"
            :key="item.nomor"
            @click="setActiveSurah(item.nomor)"
            :class="{ active: selectedSurah === item.nomor }"
            class="cursor-pointer p-3 bg-white text-black border bg-border-100 text-gray hover:bg-gray-10 rounded-2xl mb-2 hover:bg-green-700 hover:text-white transition duration-200"
          >
          <strong>{{ convertToArabic(item.nomor) }}. {{ item.namaLatin }}</strong>
            <div class="flex justify-between">
              <span dir="rtl">{{ item.nama }}</span>
              <span>{{ item.jumlahAyat }} Ayat</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Detail Surat -->
      <div v-if="selectedSurat" class="w-full lg:w-2/3 bg-white shadow-2xl bg-border-100 transition-all duration-300 p-6 rounded-2xl">
        <div class="bg-green-500 p-4 rounded-xl">
          <h2 class="text-xl md:text-2xl text-white">
            {{ selectedSurat.namaLatin }} - {{ selectedSurat.nama }} - {{ selectedSurat.tempatTurun }}
          </h2>
          <div class="flex gap-5 items-center ">
            <button @click="playAudio" class="bg-white text-green-700 px-4 py-2 rounded-xl mt-2">Play</button>
            <button class="bg-white px-4 py-2 rounded-xl mt-2" @click="openDes">
                <svg class="size-6 fill-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=""><path d="M20 22H6.5C4.567 22 3 20.433 3 18.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V17H6.5C5.67157 17 5 17.6716 5 18.5C5 19.3284 5.67157 20 6.5 20H19Z"></path></svg>
            </button>
          </div>
          <div class="flex flex-col sm:flex-row justify-between items-center mt-2 text-white">
            <span>{{ selectedSurat.jumlahAyat }} Ayat - {{ selectedSurat.arti }}</span>
            <select v-model="selectedQari" @change="updateAudioSource" class="bg-green-700 px-3 py-2 rounded-xl mt-2 sm:mt-0">
              <option value="">Pilih Qori</option> 
              <option v-for="(src, qari) in selectedSurat?.audioFull" :key="qari" :value="qari">
                {{ qariList[qari] || `Qari ${qari}` }}
              </option>
            </select>
            <!-- <p>Selected Qari: {{ selectedQari }}</p> -->
          </div>
          <audio ref="audioPlayer"></audio>
        </div>
        <div class="overflow-y-auto h-[60vh] no-scrollbar mt-4">
          <div v-for="ayat in selectedSurat.ayat" :key="ayat.nomorAyat" class="mb-4">
            <div class="bg-white bg-gray-10 transition-all duration-300 p-4 rounded-2xl">
              <p class="text-xl text-right arabic-text">{{ ayat.teksArab }}</p>
              <p class="text-green-400">
                <em>{{ ayat.teksLatin }}</em>
              </p>
              <h1 class="my-5">Artinya:</h1>
              <p>{{ ayat.teksIndonesia }}</p>
              <div class="flex gap-5">
                <button @click="playAyat(ayat.audio[selectedQari])" class="bg-green-400 p-2 rounded-xl my-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style="fill: rgba(255, 255, 255, 1)"
                  >
                    <path d="M7 6v12l10-6z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <!-- Jika tidak ada surat yang dipilih -->
      <div v-else class=" text-center w-full md:w-100 lg:w-100">
        <!-- <video autoplay loop muted src="../assets/img/animasi.gif"></video> -->
        <img class="-mt-15 md:hidden object-cover w-full" src="../assets/img/ramadanbaru.png" alt="">
        <div>
          <h1 class="md:hidden text-center text-3xl font-bold py-1">Qur'anLynxx</h1>
          <div>
            <p class="text-justify md:w-200 hidden">Assalamu'alaikum! Selamat datang di Qur'anLynxx. 'Dan sesungguhnya telah Kami mudahkan Al-Qur'an untuk pelajaran, maka adakah orang yang mau mengambil pelajaran?' (QS. Al-Qamar: 17). Mari mendekatkan diri kepada Allah melalui kalam-Nya.</p>
            <img src="../assets/img/logoquran2.png" class="md:hidden w-200" alt="" data-aos="zoom-in" data-aos-duration="900">
            <h1 class=" text-center text-3xl py-1 font-light">Hallo Selamat Datang!</h1>
            <div class="md:hidden">
              <p>Selamat Hari Raya Idul Fitri</p>
              <p>1446 Hijriah</p>
              <!-- <p>Mohon Maaf Lahir dan Batin, Semoga Allah SWT Menerima Amal Ibadah Kita</p> -->
            </div>
          </div>
        </div>
      </div>


      <div v-if="Peringatan" class="fixed left-0 p-5 md:w-150 md:left-160 w-full" data-aos="zoom-in" data-aos-duration="800">
        <div class="bg-white bg-border-100 p-5 rounded-lg shadow-lg w-full">
        <div class="py-2 flex justify-between">
          <h1 class="text-2xl text-red-500">Warning</h1>
          <svg @click="togglePeringatan" class="size-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
          </svg>
        </div>
        
          <div class="">
            <h1>Hallo, saya Ilham Yuniar Pembuat Qur'anLynxx</h1>
            <p class="text-justify">Jika ada bug atau error, bisa ditanyakan di CS Qur'anLynxx.</p>
          </div>
        
          <div class="flex gap-2 mt-3">
            <input type="checkbox" id="toggle" v-model="toggle" />
            <label for="toggle">Setuju untuk dipahami</label>
          </div>
        
          <button @click="setujuiPeringatan" class="bg-green-500 text-white px-4 py-2 rounded-lg mt-3">
            Oke, Saya Paham
          </button>
        </div>
      </div>


      <div v-if="IsOpenDes && selectedSurat && selectedSurat.deskripsi" class="fixed lg:left-140 lg:top-60 w-full lg:w-223 left-0 p-5">
        <div class="flex justify-between bg-gray-500 bg-border-100 rounded-t-2xl p-5 items-center transition-all duration-300">
          <h1 class="text-xl font-bold text-center text-white">{{ selectedSurat.namaLatin }}</h1>
          <svg @click="openDes" class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
        </div>
        <div class=" bg-gray-10 bg-gray-300 rounded-b-2xl p-5 transition-all duration-300 overflow-y-auto h-[300px] md:h-50">
          <p v-html="selectedSurat.deskripsi" class="text-sm text-gray text-justify w-full lg:w-200"></p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="fixed bottom-0 w-full bg-white text-black bg-border-100 text-gray transition-all duration-300 text-center py-2">
      <p>Copyright 2025</p>
    </footer>

    <div class="fixed md:hidden lg:hidden bottom-5 left-6 z-50">
      <button class="bg-green-500 p-4 rounded-full" @click="openSurat">
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          style="fill: rgba(255, 255, 255, 1)"
        >
          <path
            d="M19 10H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2zM5 6h14v2H5zm2-4h10v2H7z"
          ></path>
        </svg>
        <!-- <svg v-else="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg> -->
      </button>
    </div>

    <!-- MOBILE SURAH -->
    <div
      v-if="IsSurah"
      class="fixed w-full p-3 top-25 backdrop:blur-2xl"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <div class="bg-white bg-border-100 md:hidden lg:hidden w-full lg:w-1/3 transition-all duration-300 text-black text-gray overflow-y-auto h-[83vh] lg:h-[80vh] rounded-2xl p-4 no-scrollbar">
        <div class="" >
          <svg @click="openSurat" class="size-7 my-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
        </div>
        <div class="mb-4">
          <div class="items-center flex py-2 bg-gray-800 px-4 rounded-full border border-gray-600">
            <input
              class="bg-transparent outline-none text-white placeholder-gray-400 w-full"
              type="text"
              placeholder="Cari Surat..."
              v-model="localSearchQuery"
              @input="updateParentSearch"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              class="text-white"
            >
              <path
                d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
              ></path>
            </svg>
          </div>
        </div>
        <ul>
          <li
            v-for="item in filteredSurat"
            :key="item.nomor"
            @click="setActiveSurah(item.nomor)"
            :class="{ active: selectedSurah === item.nomor }"
            class="cursor-pointer p-3 bg-white shadow bg-gray-10 transition-all duration-300 rounded-2xl mb-2 hover:bg-green-700 "
          >
          <strong>{{ convertToArabic(item.nomor) }}. {{ item.namaLatin }}</strong>
            <div class="flex justify-between">
              <span dir="rtl">{{ item.nama }}</span>
              <span>{{ item.jumlahAyat }} Ayat</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
export default {
  props: {
    sidebarOpen: Boolean,
    isDark: Boolean,
    searchQuery: {
      type: String,
      default: ''
    }
  },
  components: { DotLottieVue },
  data() {
    return {
      quran: [],
      selectedSurat: null,
      selectedQari: '',
      toggle: false,
      currentAudio: null,
      IsSurah: false,
      Peringatan: true,
      IsOpenDes: false,
      localSearchQuery: '',
      selectedSurah: null,
      qariList: {
        '00': 'Pilih Qari',
        '01': 'Abdullah Al-Juhany',
        '02': 'Abdul-Muhsin Al-Qasim',
        '03': 'Abdurrahman As-Sudais',
        '04': 'Ibrahim Al-Dossari',
        '05': 'Misyari Rasyid Al-Afasi',
      },
    }
  },
  computed: {
    filteredSurat() {
      const query = (this.searchQuery || this.localSearchQuery || '').toLowerCase();
      
      if (!query) return this.quran;
      
      return this.quran.filter(
        (item) =>
          item.namaLatin.toLowerCase().includes(query) || 
          item.nama.toLowerCase().includes(query) ||
          item.nomor.toString().includes(query)
      )
    },
  },
  watch: {
    // Watch searchQuery dari props untuk menyinkronkan dengan lokalSearchQuery
    searchQuery: {
      immediate: true,
      handler(newVal) {
        this.localSearchQuery = newVal;
      }
    },
    "selectedSurat.audioFull": {
    immediate: true, // Jalankan saat data pertama kali dimuat
    handler(newAudioFull) {
      if (newAudioFull && Object.keys(newAudioFull).length > 0) {
        this.selectedQari = Object.keys(newAudioFull)[0]; // Ambil key pertama
      } else {
        this.selectedQari = ""; // Reset ke kosong jika tidak ada data
      }
    },
  },
  },
  mounted() {
    this.getAllSurat();
    
    const savedSearch = localStorage.getItem("searchQuery");
    if (savedSearch) {
      this.localSearchQuery = savedSearch;
      this.$emit('update-search', savedSearch);
    }
    if (localStorage.getItem("peringatan_disetujui") === "true") {
      this.Peringatan = false;
    }
  },
  methods: {
    setujuiPeringatan() {
      if (this.toggle) {
        localStorage.setItem("peringatan_disetujui", "true");
        this.Peringatan = false; 
      } else {
        alert("Harap centang 'Memahami' terlebih dahulu!");
      }
    },
    togglePeringatan() {
      this.Peringatan = false
    },
    convertToArabic(number) {
      return number.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    },
    openDes() {
      this.IsOpenDes = !this.IsOpenDes;
    },
    updateParentSearch() {
      this.$emit('update-search', this.localSearchQuery);
      localStorage.setItem("searchQuery", this.localSearchQuery);
    },
    setActiveSurah(nomor) {
      this.selectedSurah = nomor; 
      this.getSuratDetail(nomor);
      this.IsSurah = false; // Tutup mobile surah setelah pilih
    },
    openSurat() {
      this.IsSurah = !this.IsSurah
    },
    async getAllSurat() {
      try {
        const response = await axios.get('https://equran.id/api/v2/surat')
        this.quran = response.data.data
        if (this.localSearchQuery && this.filteredSurat.length > 0) {
        }
      } catch (error) {
        console.error('Error fetching daftar surat:', error)
      }
    },

    async getSuratDetail(nomorSurat) {
      try {
        const response = await axios.get(`https://equran.id/api/v2/surat/${nomorSurat}`);
        this.selectedSurat = response.data.data;

        // Jangan langsung pilih qari pertama, biarkan tetap kosong
        this.selectedQari = ""; 
      } catch (error) {
        console.error("Error fetching detail surat:", error);
      }
    },



    updateAudioSource() {
      if (this.selectedSurat && this.selectedSurat.audioFull) {
        this.$refs.audioPlayer.src = this.selectedSurat.audioFull[this.selectedQari];
      }
    },
    playAudio() {
      if (this.$refs.audioPlayer.src) {
        this.$refs.audioPlayer.play();
      }
    },
    playAyat(audioSrc) {
      if (this.currentAudio) {
        this.currentAudio.pause();
      }
      this.currentAudio = new Audio(audioSrc);
      this.currentAudio.play();
    },
  },
}
</script>

<style>
.surat-item {
  cursor: pointer;
  padding: 5px;
}
.arabic-text {
  font-size: 24px;
  font-family: 'Amiri', serif;
}
.play-button {
  background-color: #28a745;
  color: white;
  margin-top: 2vh;
  width: 5vh;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
}
.play-button:hover {
  background-color: #218838;
}
.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.active {
  border: 1px solid white;
  background-color: #28a745 !important; /* Warna hijau aktif */
  color: white;
  font-weight: bold;
}

 video {
    mix-blend-mode: multiply;
  }
</style>