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
              <div>
                <button class="md:hidden" @click="toggleNavbar">
                  <svg class="fill-blue-900" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style=""><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                </button>
              </div>
            </div>
            <div class="flex flex-col items-end p-5 gap-5">
              <a href="/" class="hover:text-gray-300 sm:block">Beranda</a>
              <a href="/doa" class="hover:text-gray-300 sm:block">Doa</a>
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
export default {
  data() {
    return {
      navbarOpen: false,
      sidebarOpen: false,
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