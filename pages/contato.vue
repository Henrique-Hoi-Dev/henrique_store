<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Entre em Contato
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">
        Estamos aqui para ajudar você
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Informações de contato -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Informações de Contato
        </h2>

        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <div
              class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center"
            >
              <Icon
                name="heroicons:envelope"
                class="w-6 h-6 text-primary-600"
              />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                Email
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                contato@henriquestore.com
              </p>
              <p class="text-gray-600 dark:text-gray-400">
                suporte@henriquestore.com
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div
              class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
            >
              <Icon name="heroicons:phone" class="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                Telefone
              </h3>
              <p class="text-gray-600 dark:text-gray-400">(11) 99999-9999</p>
              <p class="text-gray-600 dark:text-gray-400">(11) 88888-8888</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
            >
              <Icon name="heroicons:map-pin" class="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                Endereço
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Rua das Flores, 123<br />
                Centro - São Paulo, SP<br />
                CEP: 01234-567
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
            >
              <Icon name="heroicons:clock" class="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                Horário de Atendimento
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Segunda a Sexta: 8h às 18h<br />
                Sábado: 9h às 14h<br />
                Domingo: Fechado
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulário de contato -->
      <div>
        <div class="card">
          <div class="p-6">
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Envie uma Mensagem
            </h2>

            <form @submit.prevent="enviarMensagem" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Nome
                  </label>
                  <input
                    v-model="form.nome"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="input-field"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Assunto
                </label>
                <select v-model="form.assunto" class="input-field" required>
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida sobre produto</option>
                  <option value="pedido">Status do pedido</option>
                  <option value="devolucao">Trocas e devoluções</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Mensagem
                </label>
                <textarea
                  v-model="form.mensagem"
                  rows="4"
                  required
                  class="input-field"
                  placeholder="Digite sua mensagem..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full btn-primary"
              >
                <Icon
                  v-if="loading"
                  name="heroicons:arrow-path"
                  class="animate-spin -ml-1 mr-3 h-5 w-5"
                />
                {{ loading ? 'Enviando...' : 'Enviar Mensagem' }}
              </button>
            </form>

            <div
              v-if="mensagemEnviada"
              class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md"
            >
              <div class="flex">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-green-400"
                />
                <div class="ml-3">
                  <p class="text-sm text-green-800 dark:text-green-200">
                    Mensagem enviada com sucesso! Entraremos em contato em
                    breve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="mt-16">
      <h2
        class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center"
      >
        Perguntas Frequentes
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card">
          <div class="p-6">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Como faço para rastrear meu pedido?
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Você receberá um email com o código de rastreamento assim que o
              pedido for enviado. Também pode acompanhar na sua conta.
            </p>
          </div>
        </div>

        <div class="card">
          <div class="p-6">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Qual o prazo de entrega?
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              O prazo varia de 2 a 7 dias úteis, dependendo da sua localização e
              do tipo de frete escolhido.
            </p>
          </div>
        </div>

        <div class="card">
          <div class="p-6">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Como funciona a troca/devolução?
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Você tem 7 dias para solicitar a troca ou devolução. Entre em
              contato conosco para iniciar o processo.
            </p>
          </div>
        </div>

        <div class="card">
          <div class="p-6">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Aceitam quais formas de pagamento?
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Aceitamos cartões de crédito, débito, PIX, boleto bancário e
              transferência.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  nome: '',
  email: '',
  assunto: '',
  mensagem: '',
});

const loading = ref(false);
const mensagemEnviada = ref(false);

const enviarMensagem = async () => {
  loading.value = true;

  try {
    // Simular envio de mensagem
    await new Promise((resolve) => setTimeout(resolve, 1000));

    mensagemEnviada.value = true;
    form.value = {
      nome: '',
      email: '',
      assunto: '',
      mensagem: '',
    };

    // Limpar mensagem após 5 segundos
    setTimeout(() => {
      mensagemEnviada.value = false;
    }, 5000);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  } finally {
    loading.value = false;
  }
};

useHead({
  title: 'Contato - Henrique Store',
});
</script>
