<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
        >
          {{ $t('checkout.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t('checkout.subtitle') }}
        </p>
      </div>

      <div v-if="cartItems.length === 0" class="text-center py-16">
        <div
          class="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t('checkout.empty.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {{ $t('checkout.empty.description') }}
        </p>
        <NuxtLink
          to="/"
          class="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {{ $t('checkout.empty.startShopping') }}
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Checkout Form -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Shipping Information -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2
              class="text-xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              {{ $t('checkout.shipping.title') }}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ $t('checkout.shipping.firstName') }}
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('checkout.shipping.firstNamePlaceholder')"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ $t('checkout.shipping.lastName') }}
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('checkout.shipping.lastNamePlaceholder')"
                />
              </div>

              <div class="md:col-span-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ $t('checkout.shipping.email') }}
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('checkout.shipping.emailPlaceholder')"
                />
              </div>

              <div class="md:col-span-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ $t('checkout.shipping.phone') }}
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('checkout.shipping.phonePlaceholder')"
                />
              </div>

              <div class="md:col-span-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ $t('checkout.shipping.address') }}
                </label>
                <input
                  v-model="form.address"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('checkout.shipping.addressPlaceholder')"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ $t('checkout.shipping.city') }}
                </label>
                <input
                  v-model="form.city"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('checkout.shipping.cityPlaceholder')"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ $t('checkout.shipping.state') }}
                </label>
                <select
                  v-model="form.state"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">
                    {{ $t('checkout.shipping.selectState') }}
                  </option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="PR">Paraná</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="BA">Bahia</option>
                  <option value="GO">Goiás</option>
                  <option value="PE">Pernambuco</option>
                  <option value="CE">Ceará</option>
                </select>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ $t('checkout.shipping.zipCode') }}
                </label>
                <input
                  v-model="form.zipCode"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('checkout.shipping.zipCodePlaceholder')"
                />
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2
              class="text-xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              {{ $t('checkout.payment.title') }}
            </h2>

            <div class="space-y-6">
              <!-- Payment Method -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4"
                >
                  {{ $t('checkout.payment.method') }}
                </label>
                <div class="space-y-3">
                  <label
                    class="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <input
                      v-model="form.paymentMethod"
                      type="radio"
                      value="credit"
                      class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <div class="ml-3">
                      <div class="flex items-center">
                        <svg
                          class="w-6 h-6 text-gray-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        <span
                          class="font-medium text-gray-900 dark:text-white"
                          >{{ $t('checkout.payment.creditCard') }}</span
                        >
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {{ $t('checkout.payment.creditCardDescription') }}
                      </p>
                    </div>
                  </label>

                  <label
                    class="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <input
                      v-model="form.paymentMethod"
                      type="radio"
                      value="pix"
                      class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <div class="ml-3">
                      <div class="flex items-center">
                        <svg
                          class="w-6 h-6 text-gray-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                        <span
                          class="font-medium text-gray-900 dark:text-white"
                          >{{ $t('checkout.payment.pix') }}</span
                        >
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {{ $t('checkout.payment.pixDescription') }}
                      </p>
                    </div>
                  </label>

                  <label
                    class="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <input
                      v-model="form.paymentMethod"
                      type="radio"
                      value="boleto"
                      class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <div class="ml-3">
                      <div class="flex items-center">
                        <svg
                          class="w-6 h-6 text-gray-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span
                          class="font-medium text-gray-900 dark:text-white"
                          >{{ $t('checkout.payment.boleto') }}</span
                        >
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {{ $t('checkout.payment.boletoDescription') }}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Credit Card Fields (if selected) -->
              <div v-if="form.paymentMethod === 'credit'" class="space-y-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {{ $t('checkout.payment.cardNumber') }}
                  </label>
                  <input
                    v-model="form.cardNumber"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    :placeholder="$t('checkout.payment.cardNumberPlaceholder')"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {{ $t('checkout.payment.expiryDate') }}
                    </label>
                    <input
                      v-model="form.expiryDate"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      :placeholder="
                        $t('checkout.payment.expiryDatePlaceholder')
                      "
                    />
                  </div>

                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {{ $t('checkout.payment.cvv') }}
                    </label>
                    <input
                      v-model="form.cvv"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      :placeholder="$t('checkout.payment.cvvPlaceholder')"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8"
          >
            <h2
              class="text-xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              {{ $t('checkout.summary.title') }}
            </h2>

            <!-- Order Items -->
            <div class="space-y-4 mb-6">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex items-center space-x-3"
              >
                <img
                  :src="item.image || '/images/placeholder.jpg'"
                  :alt="item.name"
                  class="w-12 h-12 object-cover rounded-lg"
                />
                <div class="flex-1 min-w-0">
                  <h3
                    class="text-sm font-medium text-gray-900 dark:text-white truncate"
                  >
                    {{ item.name }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ $t('checkout.summary.quantity') }}: {{ item.quantity }}
                  </p>
                </div>
                <span
                  class="text-sm font-semibold text-gray-900 dark:text-white"
                >
                  {{ formatPrice(item.price * item.quantity) }}
                </span>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">
                  {{ $t('checkout.summary.subtotal') }}
                </span>
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ formatPrice(subtotal) }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">
                  {{ $t('checkout.summary.shipping') }}
                </span>
                <span class="font-semibold text-green-600">
                  {{ $t('checkout.summary.free') }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">
                  {{ $t('checkout.summary.tax') }}
                </span>
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ formatPrice(tax) }}
                </span>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div class="flex justify-between">
                  <span class="text-lg font-bold text-gray-900 dark:text-white">
                    {{ $t('checkout.summary.total') }}
                  </span>
                  <span class="text-2xl font-bold text-primary-600">
                    {{ formatPrice(total) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Place Order Button -->
            <button
              @click="placeOrder"
              :disabled="!isFormValid || processing"
              class="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span v-if="processing">{{
                $t('checkout.summary.processing')
              }}</span>
              <span v-else>{{ $t('checkout.summary.placeOrder') }}</span>
            </button>

            <!-- Security Badge -->
            <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span
                  class="text-sm text-green-700 dark:text-green-400 font-medium"
                >
                  {{ $t('checkout.summary.secureCheckout') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $t } = useNuxtApp();
const router = useRouter();
const { cartItems, clearCart, formatPrice } = useCart();

const processing = ref(false);
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  paymentMethod: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
});

const subtotal = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const tax = computed(() => {
  return subtotal.value * 0.1; // 10% tax
});

const total = computed(() => {
  return subtotal.value + tax.value;
});

const isFormValid = computed(() => {
  return (
    form.value.firstName &&
    form.value.lastName &&
    form.value.email &&
    form.value.phone &&
    form.value.address &&
    form.value.city &&
    form.value.state &&
    form.value.zipCode &&
    form.value.paymentMethod
  );
});

const placeOrder = async () => {
  if (!isFormValid.value) return;

  processing.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear cart and redirect to success page
    clearCart();
    router.push('/pedido-sucesso');
  } catch (error) {
    console.error('Error placing order:', error);
  } finally {
    processing.value = false;
  }
};

// Set page title
useHead({
  title: 'Checkout - Henrique Store',
});
</script>
