<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Sobre a Henrique Store
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">
        Sua loja online de confiança desde 2024
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Nossa História
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">
          A Henrique Store nasceu da paixão por oferecer produtos de qualidade a
          preços acessíveis. Começamos como uma pequena loja local e hoje somos
          uma das principais referências em e-commerce.
        </p>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Nossa missão é conectar você aos melhores produtos, com a melhor
          experiência de compra possível.
        </p>
      </div>
      <div
        class="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center"
      >
        <Icon
          name="heroicons:building-storefront"
          class="w-32 h-32 text-gray-400"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div class="text-center">
        <div
          class="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center"
        >
          <Icon name="heroicons:heart" class="w-8 h-8 text-primary-600" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Qualidade
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Selecionamos cuidadosamente cada produto para garantir a melhor
          qualidade.
        </p>
      </div>

      <div class="text-center">
        <div
          class="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
        >
          <Icon name="heroicons:truck" class="w-8 h-8 text-green-600" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Entrega Rápida
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Entregamos em todo o Brasil com rapidez e segurança.
        </p>
      </div>

      <div class="text-center">
        <div
          class="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
        >
          <Icon name="heroicons:shield-check" class="w-8 h-8 text-blue-600" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Segurança
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Suas informações estão protegidas com a mais alta segurança.
        </p>
      </div>
    </div>

    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
      <h2
        class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center"
      >
        Nossos Valores
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex items-start space-x-4">
          <Icon name="heroicons:star" class="w-6 h-6 text-yellow-500 mt-1" />
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Excelência
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Buscamos sempre a excelência em tudo que fazemos, desde o
              atendimento até a entrega.
            </p>
          </div>
        </div>

        <div class="flex items-start space-x-4">
          <Icon name="heroicons:users" class="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Cliente em Primeiro Lugar
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Nossos clientes são nossa prioridade. Sua satisfação é nosso
              objetivo.
            </p>
          </div>
        </div>

        <div class="flex items-start space-x-4">
          <Icon
            name="heroicons:light-bulb"
            class="w-6 h-6 text-green-500 mt-1"
          />
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Inovação
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Estamos sempre buscando novas formas de melhorar sua experiência
              de compra.
            </p>
          </div>
        </div>

        <div class="flex items-start space-x-4">
          <Icon
            name="heroicons:hand-raised"
            class="w-6 h-6 text-purple-500 mt-1"
          />
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Transparência
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Agimos com transparência em todas as nossas relações e
              negociações.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Sobre Nós - Henrique Store',
});
</script>
