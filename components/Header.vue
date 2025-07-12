<template>
  <header
    class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 pt-4 sm:pt-0"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <div
              class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-lg">H</span>
            </div>
            <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white"
              >Henrique Store</span
            >
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink
            to="/"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            {{ $t('navigation.home') }}
          </NuxtLink>
          <NuxtLink
            to="/produtos"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            {{ $t('navigation.products') }}
          </NuxtLink>
          <NuxtLink
            to="/sobre"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            {{ $t('navigation.about') }}
          </NuxtLink>
          <NuxtLink
            to="/contato"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
            active-class="text-primary-600 dark:text-primary-400"
          >
            {{ $t('navigation.contact') }}
          </NuxtLink>
        </nav>

        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden sm:block">
            <div class="relative">
              <input
                type="text"
                :placeholder="$t('common.search')"
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Dark mode toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <svg
              v-if="colorMode.value === 'dark'"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m6.01-6.01l.707-.707m12.728 12.728l.707.707M6.01 6.01L5.303 5.303m12.728 12.728l.707.707M6.01 6.01L5.303 5.303m12.728 12.728l.707.707"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- Language selector -->
          <div class="relative">
            <button
              @click="toggleLanguageMenu"
              class="flex items-center space-x-1 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <span class="text-sm">{{ currentLocale.name }}</span>
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              v-if="showLanguageMenu"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
            >
              <button
                v-for="locale in availableLocales"
                :key="locale.code"
                @click="changeLanguage(locale.code)"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {{ locale.name }}
              </button>
            </div>
          </div>

          <!-- Cart -->
          <NuxtLink
            to="/carrinho"
            class="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartItemCount }}
            </span>
          </NuxtLink>

          <!-- User menu -->
          <div class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <div
                class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center"
              >
                <span class="text-white text-sm font-medium">{{
                  userInitials
                }}</span>
              </div>
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
            >
              <NuxtLink
                to="/perfil"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {{ $t('navigation.profile') }}
              </NuxtLink>
              <NuxtLink
                to="/pedidos"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {{ $t('navigation.orders') }}
              </NuxtLink>
              <hr class="my-1 border-gray-200 dark:border-gray-600" />
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {{ $t('common.logout') }}
              </button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="showMobileMenu" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NuxtLink
            to="/"
            class="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            active-class="text-primary-600 dark:text-primary-400"
          >
            {{ $t('navigation.home') }}
          </NuxtLink>
          <NuxtLink
            to="/produtos"
            class="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            active-class="text-primary-600 dark:text-primary-400"
          >
            {{ $t('navigation.products') }}
          </NuxtLink>
          <NuxtLink
            to="/sobre"
            class="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            active-class="text-primary-600 dark:text-primary-400"
          >
            {{ $t('navigation.about') }}
          </NuxtLink>
          <NuxtLink
            to="/contato"
            class="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            active-class="text-primary-600 dark:text-primary-400"
          >
            {{ $t('navigation.contact') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { $i18n } = useNuxtApp();
const colorMode = useColorMode();
const { cartItemCount } = useCart();
const { user, logout } = useAuth();

const showMobileMenu = ref(false);
const showUserMenu = ref(false);
const showLanguageMenu = ref(false);

const availableLocales = computed(() => $i18n.locales.value);
const currentLocale = computed(() => $i18n.locale.value);

const userInitials = computed(() => {
  if (!user.value) return 'U';
  const { firstName, lastName } = user.value;
  return (
    `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() ||
    'U'
  );
});

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  showLanguageMenu.value = false;
};

const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value;
  showUserMenu.value = false;
};

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const changeLanguage = (locale) => {
  $i18n.setLocale(locale);
  showLanguageMenu.value = false;
};

// Close menus when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showUserMenu.value = false;
      showLanguageMenu.value = false;
    }
  });
});
</script>
