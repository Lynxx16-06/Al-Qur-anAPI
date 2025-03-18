<template>
  <main class="min-h-screen flex flex-col bg-white text-gray transition-all duration-300 bg-gray-10">
    <!-- Main Content -->
    <section class="mt-25 lg:mt-20 md:mt-16 px-4 md:px-16 lg:px-80 py-6 flex flex-col lg:flex-row gap-5 bg-white bg-gray-10 transition-all duration-300">
      <!-- Daftar Doa -->
      <div class="bg-white shadow-2xl bg-border-100 hidden md:block transition-all duration-300 lg:block w-full lg:w-1/3 text-black text-gray overflow-y-auto h-[80vh] rounded-2xl p-4 no-scrollbar">
        <!-- <div class="mb-4">
          <div class="items-center flex py-2 bg-gray-800 px-4 rounded-full border border-gray-600">
            <input
              class="bg-transparent outline-none text-white placeholder-gray-400 w-full"
              type="text"
              placeholder="Cari Doa..."
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
        </div> -->
        <div v-if="isLoading" class="text-center py-4">
          <p>Memuat data...</p>
        </div>
        <div v-else-if="errorMessage" class="text-center py-4 text-red-500">
          <p>{{ errorMessage }}</p>
        </div>
        <ul v-else>
          <li
            v-for="(doa, index) in filteredDoa"
            :key="index"
            @click="selectedDoa = doa"
            :class="{ active: selectedDoa === doa }"
            class="cursor-pointer p-3 bg-white border transition-all duration-300 bg-gray-10 rounded-2xl mb-2 hover:bg-green-700 hover:text-white"
          >
            <strong>{{ index + 1 }}. {{ doa.title }}</strong>
          </li>
        </ul>
      </div>

      <!-- Detail Doa -->
      <div v-if="selectedDoa" class="w-full lg:w-2/3 bg-white transition-all duration-300 bg-border-100 shadow-2xl p-6 rounded-2xl">
        <div class="bg-green-500 p-4 rounded-xl">
          <h2 class="text-xl md:text-2xl text-white">{{ selectedDoa.title }}</h2>
          <div class="flex flex-col sm:flex-row justify-between items-center mt-2">
            <!-- <span>{{ selectedDoa.translation }}</span> -->
          </div>
        </div>
        <div class="overflow-y-auto h-[60vh] no-scrollbar mt-4">
          <div class="bg-white text-black text-gray bg-gray-10 p-5 rounded-2xl transition-all duration-300">
            <p class="text-xl text-right arabic-text mb-5">{{ selectedDoa.arabic }}</p>
            <p class="text-green-400 mb-2"><em>{{ selectedDoa.latin }}</em></p>
            <h1>Artinya:</h1>
            <p>{{ selectedDoa.translation }}</p>
          </div>
          <div>
          <div class="bg-white text-gray bg-gray-10 transition-all duration-300 text-black rounded-2xl mt-10 p-10 flex justify-between items-center">
            <h1 class="md:text-xl ">Bagikan Doa:</h1>
            <div class="flex gap-3">
              <button @click="shareDoa('whatsapp')" class="bg-green-500 px-2 py-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"></path></svg></button>
              <button @click="shareDoa('instagram')" class="bg-pink-500 px-2 py-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);"><path d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 0 0 2.186-.419 4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709zm-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246zm4.807-8.339a1.077 1.077 0 0 1-1.078-1.078 1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078z"></path><circle cx="11.994" cy="11.979" r="3.003"></circle></svg></button>
              <button @click="shareDoa('facebook')" class="bg-blue-500 px-2 py-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);"><path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"></path></svg></button>
              <button @click="shareDoa('tiktok')" class="bg-black px-2 py-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path></svg></button>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- Jika tidak ada doa yang dipilih -->
      <div v-else class="text-center w-full md:w-100 lg:w-100 text-black text-gray">
        <div>
          <h1 class="text-center text-3xl py-5">Hallo Selamat Datang!</h1>
          <h1 class="md:hidden text-center text-2xl py-5">Qur'anLynxx</h1>
          <div>
            <p class="text-justify md:w-200 hidden">Assalamu'alaikum! Selamat datang di Qur'anLynxx. 'Dan sesungguhnya telah Kami mudahkan Al-Qur'an untuk pelajaran, maka adakah orang yang mau mengambil pelajaran?' (QS. Al-Qamar: 17). Mari mendekatkan diri kepada Allah melalui kalam-Nya.</p>
            <img src="../assets/img/logoquran2.png" class="md:hidden w-200" alt="" data-aos="zoom-in" data-aos-duration="900">
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="fixed bottom-0 w-full bg-white bg-border-100 text-gray text-black transition-all duration-300 text-center py-2">
      <p>Copyright 2023</p>
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
      </button>
    </div>

    <!-- MOBILE SURAH -->
    <div
      v-if="IsSurah"
      class="fixed w-full p-3 top-27 backdrop:blur-2xl"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <div class="bg-white bg-border-100 md:hidden lg:hidden w-full lg:w-1/3 transition-all duration-300 text-black text-gray overflow-y-auto h-[83vh] lg:h-[80vh] rounded-2xl p-4 no-scrollbar">
        <div class="mb-4">
          <div class="items-center flex py-2 bg-gray-800 px-4 rounded-full border border-gray-600">
            <input
              class="bg-transparent outline-none text-white placeholder-gray-400 w-full"
              type="text"
              placeholder="Cari Doa..."
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
        <div v-if="isLoading" class="text-center py-4">
          <p>Memuat data...</p>
        </div>
        <div v-else-if="errorMessage" class="text-center py-4 text-red-500">
          <p>{{ errorMessage }}</p>
        </div>
        <ul v-else>
          <li
            v-for="(doa, index) in filteredDoa"
            :key="index"
            @click="selectDoa(doa)"
            :class="{active: selectedDoa === doa}"
            class="cursor-pointer p-3 bg-white shadow bg-gray-10 transition-all duration-300 rounded-2xl mb-2 hover:bg-green-700 hover:text-white"
          >
            <strong>{{ index + 1 }}. {{ doa.title }}</strong>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    sidebarOpen: Boolean,
    isDark: Boolean,
    searchQuery: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      doaList: [],
      IsSurah: false,
      selectedDoa: null,
      localSearchQuery: '',
      isLoading: true,
      errorMessage: ''
    }
  },
  computed: {
    filteredDoa() {
      const query = (this.localSearchQuery || '').toLowerCase();
      
      if (!query) return this.doaList;
      
      return this.doaList.filter(
        (item) =>
          item.title.toLowerCase().includes(query) || 
          item.latin.toLowerCase().includes(query) ||
          item.translation.toLowerCase().includes(query)
      )
    },
  },
  watch: {
    // Watch searchQuery dari props untuk menyinkronkan dengan localSearchQuery
    searchQuery: {
      immediate: true,
      handler(newVal) {
        if (newVal !== this.localSearchQuery) {
          this.localSearchQuery = newVal;
        }
      }
    }
  },
  created() {
    // Cek apakah ada searchQuery tersimpan di localStorage
    const savedSearch = localStorage.getItem("searchQuery");
    if (savedSearch) {
      this.localSearchQuery = savedSearch;
    }
  },
  mounted() {
    this.getAllDoa();
    
    // Emit initial search value to parent if needed
    if (this.localSearchQuery) {
      this.$emit('update-search', this.localSearchQuery);
    }
  },
  methods: {
    updateParentSearch() {
      // Emit event ke parent untuk update search di navbar utama
      this.$emit('update-search', this.localSearchQuery);
      localStorage.setItem("searchQuery", this.localSearchQuery);
    },
    selectDoa(doa) {
      this.selectedDoa = doa;
      this.IsSurah = false; // Tutup mobile surah setelah pilih
    },
    openSurat() {
      this.IsSurah = !this.IsSurah;
    },
    shareDoa(platform) {
      if (!this.selectedDoa) {
        alert('Pilih doa terlebih dahulu sebelum membagikan!');
        return;
      }

      const text = `${this.selectedDoa.title}\n\n${this.selectedDoa.arabic}\n\n${this.selectedDoa.latin}\n\n${this.selectedDoa.translation}`;
      const url = window.location.href; // Gunakan URL saat ini

      switch (platform) {
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
          break;
        case 'tiktok':
          if (navigator.share) {
            navigator.share({
              title: this.selectedDoa.title,
              text: text,
              url: url,
            }).catch((error) => console.error('Gagal berbagi:', error));
          } else {
            alert('Fitur berbagi tidak didukung di browser ini.');
          }
          break;
        case 'instagram':
          if (navigator.share) {
            navigator.share({
              title: this.selectedDoa.title,
              text: text,
              url: url,
            });
          } else {
            alert('Fitur berbagi tidak didukung di browser ini.');
          }
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
          break;
        default:
          alert('Platform tidak dikenali.');
      }
    },
    async getAllDoa() {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        const response = await axios.get('https://islamic-api-zhirrr.vercel.app/api/doaharian');
        
        if (response.data && response.data.data) {
          this.doaList = response.data.data;
          console.log('Data Doa berhasil dimuat:', this.doaList);
          
          // Jika ada data, set selectedDoa ke item pertama
          if (this.doaList.length > 0 && !this.selectedDoa) {
            this.selectedDoa = this.doaList[0];
          }
        } else {
          this.errorMessage = 'Format data tidak sesuai';
          console.error('Format data tidak sesuai:', response.data);
        }
      } catch (error) {
        this.errorMessage = 'Gagal memuat data doa. Silakan coba lagi nanti.';
        console.error('Error fetching daftar doa:', error);
      } finally {
        this.isLoading = false;
      }
    }
  },
  beforeDestroy() {
    // Clean up any event listeners if needed
  }
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
</style>