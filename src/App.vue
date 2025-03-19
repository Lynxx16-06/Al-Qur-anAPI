<template>
  <div
    :class="{ dark: isDark }"
    class="md:min-h-screen md:bg-white md:dark:bg-gray-900 md:text-gray-900 md:dark:text-white"
  >
    <!-- Konten utama -->
    <div>
      <router-view 
        :sidebarOpen="sidebarOpen" 
        :isDark="isDark" 
        :searchQuery="searchQuery"
        @update-search="updateSearch"
      ></router-view>
    </div>

    <!-- Tombol Dark Mode -->
    <nav
      class="flex flex-wrap justify-between items-center lg:justify-center md: lg:gap-80 px-5 py-4 bg-white bg-border-100 text-black transition-all duration-300 text-gray shadow-2xl fixed top-0 w-full z-50"
    >
      <h2 class="font-bold text-xl md:text-2xl">Qur'anLynxx</h2>
      <div class="flex items-center space-x-6">
        <a href="/" class="hover:text-gray-300 sm:block hidden">Beranda</a>
        <a href="/doa" class="hover:text-gray-300 sm:block hidden">Doa</a>
        <div class="items-center bg-gray-800 px-4 py-2 rounded-full border md:flex hidden border-gray-600">
          <input
            class="bg-transparent outline-none text-white placeholder-gray-400 w-full sm:w-40"
            type="text"
            placeholder="Cari Surat..."
            v-model="searchQuery"
            @input="handleSearchInput"
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

      <div>
        <button class="md:hidden" @click="toggleNavbar">
          <svg class="fill-blue-900" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style=""><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
        </button>
      </div>

      <!-- Mobile -->
      <div v-if="navbarOpen">
        <main class="">
          <nav
            class="md:hidden right-0 bg-white bg-border-100 text-black transition-all duration-300 text-gray shadow-2xl fixed top-0 w-full z-50"
          >
            <div class="flex justify-between p-4">
              <div class="flex items-center gap-5 ">
                <button
                @click="toggleDarkMode"
                class="md:p-2 md:rounded-full md:bg-gray-200 md:dark:bg-gray-800 md:fixed md:z-50 md:top-7 md:right-20 md:block md:cursor-pointer md:text-black md:dark:text-white md:shadow-lg md:hover:bg-gray-300 md:dark:hover:bg-gray-700 md:transition z-50 md:w-9 right-3 md:border-0 border rounded-full p-2 top-2 shadow-2xl"
              >
                <svg
                  v-if="isDark"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4 w-5 h-5 text-yellow-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4 w-5 h-5 text-gray-900 dark:text-gray-300"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              </button>
              <div class="border p-2 rounded-full" @click="toggleOpenCS">
                <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.9381 8H21C22.1046 8 23 8.89543 23 10V14C23 15.1046 22.1046 16 21 16H19.9381C19.446 19.9463 16.0796 23 12 23V21C15.3137 21 18 18.3137 18 15V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V16H3C1.89543 16 1 15.1046 1 14V10C1 8.89543 1.89543 8 3 8H4.06189C4.55399 4.05369 7.92038 1 12 1C16.0796 1 19.446 4.05369 19.9381 8ZM3 10V14H4V10H3ZM20 10V14H21V10H20ZM7.75944 15.7849L8.81958 14.0887C9.74161 14.6662 10.8318 15 12 15C13.1682 15 14.2584 14.6662 15.1804 14.0887L16.2406 15.7849C15.0112 16.5549 13.5576 17 12 17C10.4424 17 8.98882 16.5549 7.75944 15.7849Z"></path></svg>
              </div>
              </div>
              <div>
                <button class="md:hidden" @click="toggleNavbar">
                  <svg class="fill-blue-900" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style=""><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                </button>
              </div>
            </div>
            <div class="flex flex-col items-end p-5 gap-5">
              <a href="/" class="hover:text-gray-300 sm:block">Beranda</a>
              <a href="/doa" class="hover:text-gray-300 sm:block">Doa</a>
              <a @click="setting" class="">Setting</a>
              <div class="items-center flex py-2 bg-gray-800 px-7 rounded-full border md:flex border-gray-600">
                <input
                  class="bg-transparent outline-none text-white placeholder-gray-400 w-full sm:w-40"
                  type="text"
                  placeholder="Cari Surat..."
                  v-model="searchQuery"
                  @input="handleSearchInput"
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


            <!-- CS -->
          <div v-if="IsCS" class="fixed -mt-30 w-full p-5">
            <div class="bg-border-100 bg-white shadow-2xl p-5 rounded-2xl">
              <svg @click="toggleOpenCS" class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
              <h1 class="text-center text-2xl my-5">Ada yang perlu ditanyakan?</h1>
              <form @submit.prevent class="flex flex-col gap-4">
                <label>Nama</label>
                <input type="text" v-model="nama" placeholder="Nama Anda" required class="p-2 outline-none border rounded-xl">
              
                <label>Pilih Laporan</label>
                <div class="flex gap-5">
                  <div class="gap-2 flex">
                    <input type="radio" v-model="laporan" value="Saran" required>
                    <label>Saran</label>
                  </div>
                  <div class="gap-2 flex">
                    <input type="radio" v-model="laporan" value="Kritik" required>
                    <label>Kritik</label>
                  </div>
                  <div class="gap-2 flex">
                    <input type="radio" v-model="laporan" value="Pertanyaan" required>
                    <label>Pertanyaan</label>
                  </div>
                </div>
              
                <textarea v-model="saran" maxlength="255" placeholder="Max 255 karakter" required class="resize-none h-30 outline-none border rounded-xl"></textarea>
              
                <!-- Input Email (Hanya Muncul Jika Kirim ke Email) -->
                <div v-if="kirimViaEmail">
                  <label>Email Anda</label>
                  <input type="email" v-model="email" placeholder="Masukkan Email Anda" class="p-2 outline-none border rounded-xl w-full" required>
                </div>
              
                <!-- Tombol Pilihan Kirim -->
                <div class="flex gap-4">
                  <button @click="kirimWhatsApp" class="bg-green-400 p-3 rounded-xl text-black hover:text-white hover:bg-green-300 w-full">Kirim ke WhatsApp</button>
                  <button @click="toggleKirimEmail" class="bg-blue-400 p-3 rounded-xl text-black hover:text-white hover:bg-blue-300 w-full">Kirim ke Email</button>
                </div>
              
                <!-- Tombol Kirim Email (Muncul jika pengguna memilih Kirim ke Email) -->
                <button v-if="kirimViaEmail" @click="kirimEmail" class="bg-blue-500 p-3 rounded-xl text-white hover:bg-blue-600 w-full">Konfirmasi Kirim Email</button>
              </form>
            </div>
          </div>
            <!-- Dark Mode Mobile -->
            
          </nav>
        </main>
      </div>

      <button
        @click="toggleDarkMode"
        class="md:p-2 md:rounded-full md:bg-gray-200 md:dark:bg-gray-800 md:fixed md:z-50 md:top-7 md:right-20 hidden md:block md:cursor-pointer md:text-black md:dark:text-white md:shadow-lg md:hover:bg-gray-300 md:dark:hover:bg-gray-700 md:transition z-50 md:w-9 right-3 md:border-0 border rounded-full p-2 top-2 shadow-2xl"
      >
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4 w-5 h-5 text-yellow-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4 w-5 h-5 text-gray-900 dark:text-gray-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      </button>
    </nav>

    <!-- Mobile -->
  </div>
</template>

<script>
import emailjs from "emailjs-com";
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      navbarOpen: false,
      sidebarOpen: false,
      IsCS: false,
      nama: "",
      laporan: "",
      saran: "",
      email: "", // Menyimpan input email pengguna
      kirimViaEmail: false,
      isDark: false,
      searchQuery: '',
    };
  },
  created() {
    // Cek status dark mode dari localStorage
    this.isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", this.isDark);
    
    // Cek search query dari localStorage
    const savedSearch = localStorage.getItem("searchQuery");
    if (savedSearch) {
      this.searchQuery = savedSearch;
    }

    // Event listener untuk route changes
    this.$router.beforeEach((to, from, next) => {
      // Make sure search is preserved when navigating
      next();
    });
  },
  methods: {
    toggleKirimEmail() {
      this.kirimViaEmail = !this.kirimViaEmail;
    },

    // Kirim ke WhatsApp
    kirimWhatsApp() {
      const nomorWA = "6282253355239"; 
      const pesan = `Halo, saya ${this.nama}%0A
      Saya ingin memberikan ${this.laporan}%0A
      Pesan: ${this.saran}`;

      const url = `https://wa.me/${nomorWA}?text=${pesan}`;
      window.open(url, "_blank");
    },

    // Kirim ke Email
    kirimEmail() {
      if (!this.email) {
        alert("Silakan masukkan email terlebih dahulu!");
        return;
      }

      const templateParams = {
        nama: this.nama,
        laporan: this.laporan,
        saran: this.saran,
        to_email: this.email, 
      };

      emailjs.send("service_ebjayh8", "template_41a44cj", templateParams, "7wiZbaFh4es1X-W2c")
        .then(() => {
          Swal.fire ({
            title: "Berhasil!",
            text: "Email telah dikirim!",
            icon: "success",
            timer: 2000,
            confirmButtonText: 'Ok'
          })
          this.kirimViaEmail = false; 
        })
        .catch((error) => {
          console.error("Gagal mengirim email", error);
        });
    },
    setting() {
      Swal.fire({
        title: "Peringatan",
        text: "Mohon Maaf Setting Sementara Belum Tersedia",
        icon: "info",
        confirmButtonText: "OK",
      });
    },
    toggleOpenCS() {
      this.IsCS = !this.IsCS;
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    },
    toggleDarkMode() {
      this.isDark = !this.isDark;
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", this.isDark);
    },
    handleSearchInput() {
      // Simpan di localStorage dan emit ke komponen anak
      localStorage.setItem("searchQuery", this.searchQuery);
      this.$root.$emit('search-updated', this.searchQuery);
    },
    updateSearch(value) {
      // Memperbarui searchQuery dari komponen anak
      this.searchQuery = value;
      localStorage.setItem("searchQuery", value);
      // Broadcast to all components
      this.$root.$emit('search-updated', value);
    }
  },
};
</script>