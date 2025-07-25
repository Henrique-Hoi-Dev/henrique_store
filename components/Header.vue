<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center group">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300"
            >
              <span class="text-white font-bold text-lg">H</span>
            </div>
            <span class="ml-3 text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
              Henrique Store
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink
            to="/"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
            active-class="text-primary-600 font-semibold"
          >
            {{ $t('navigation.home') }}
          </NuxtLink>
          <NuxtLink
            to="/produtos"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
            active-class="text-primary-600 font-semibold"
          >
            {{ $t('navigation.products') }}
          </NuxtLink>
          <NuxtLink
            to="/sobre"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
            active-class="text-primary-600 font-semibold"
          >
            {{ $t('navigation.about') }}
          </NuxtLink>
          <NuxtLink
            to="/contato"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
            active-class="text-primary-600 font-semibold"
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
                class="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-300"
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

          <!-- Language selector -->
          <div class="relative">
            <button
              @click="toggleLanguageMenu"
              class="flex items-center space-x-1 p-2 text-gray-600 hover:text-primary-600 transition-all duration-300 hover:scale-105"
            >
              <span class="text-sm font-medium">{{ currentLocale?.name || 'Idioma' }}</span>
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
              class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200"
            >
              <button
                v-for="locale in availableLocales || []"
                :key="locale.code"
                @click="changeLanguage(locale.code)"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
              >
                {{ locale.name }}
              </button>
            </div>
          </div>

          <!-- Cart -->
          <NuxtLink
            to="/carrinho"
            class="relative p-2 text-gray-600 hover:text-primary-600 transition-all duration-300 hover:scale-105 group"
          >
            <div class="relative">
              <svg
                class="h-6 w-6 group-hover:scale-110 transition-transform duration-300"
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
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-md"
              >
                {{ cartItemCount }}
              </span>
            </div>
          </NuxtLink>

          <!-- User menu -->
          <div class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-600 transition-all duration-300 hover:scale-105"
            >
              <div
                class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-md"
              >
                <span class="text-white text-sm font-bold">{{
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
              class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200"
            >
              <NuxtLink
                to="/perfil"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
              >
                {{ $t('navigation.profile') }}
              </NuxtLink>
              <NuxtLink
                to="/pedidos"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
              >
                {{ $t('navigation.orders') }}
              </NuxtLink>
              <hr class="my-2 border-gray-200" />
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
              >
                {{ $t('common.logout') }}
              </button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-all duration-300 hover:scale-105"
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
      <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 bg-white">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            to="/"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
            active-class="text-primary-600 bg-primary-50"
          >
            {{ $t('navigation.home') }}
          </NuxtLink>
          <NuxtLink
            to="/produtos"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
            active-class="text-primary-600 bg-primary-50"
          >
            {{ $t('navigation.products') }}
          </NuxtLink>
          <NuxtLink
            to="/sobre"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
            active-class="text-primary-600 bg-primary-50"
          >
            {{ $t('navigation.about') }}
          </NuxtLink>
          <NuxtLink
            to="/contato"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
            active-class="text-primary-600 bg-primary-50"
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
const { cartItemCount } = useCart();
const { user, logout } = useAuth();

const showMobileMenu = ref(false);
const showUserMenu = ref(false);
const showLanguageMenu = ref(false);

const availableLocales = computed(() => $i18n.locales.value || []);
const currentLocale = computed(() => $i18n.locale.value || {});

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
