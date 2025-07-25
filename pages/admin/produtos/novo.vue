<template>
  <div class="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-6">Novo Produto</h1>
    <form @submit.prevent="cadastrarProduto" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">Nome</label>
        <input
          v-model="nome"
          class="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label class="block mb-1 font-medium">Descrição</label>
        <textarea
          v-model="descricao"
          class="w-full px-3 py-2 border rounded"
          required
        ></textarea>
      </div>
      <div>
        <label class="block mb-1 font-medium">Preço</label>
        <input
          v-model.number="preco"
          type="number"
          step="0.01"
          class="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label class="block mb-1 font-medium"
          >Imagens (URL, separadas por vírgula)</label
        >
        <input v-model="imagens" class="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label class="block mb-1 font-medium">Estoque</label>
        <input
          v-model.number="estoque"
          type="number"
          class="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full py-2 px-4 bg-primary-600 text-white font-semibold rounded hover:bg-primary-700 transition disabled:opacity-50"
      >
        <span v-if="loading">Cadastrando...</span>
        <span v-else>Cadastrar</span>
      </button>
      <div v-if="sucesso" class="text-green-600 mt-2">{{ sucesso }}</div>
      <div v-if="erro" class="text-red-600 mt-2">{{ erro }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { addManualProduct, loading } = useProducts();

const nome = ref('');
const descricao = ref('');
const preco = ref(0);
const imagens = ref('');
const estoque = ref(0);
const sucesso = ref('');
const erro = ref('');

async function cadastrarProduto() {
  erro.value = '';
  sucesso.value = '';

  const productData = {
    name: nome.value,
    description: descricao.value,
    price: preco.value,
    images: imagens.value,
    stock: estoque.value,
  };

  const result = await addManualProduct(productData);

  if (result.success) {
    sucesso.value = 'Produto cadastrado com sucesso!';
    setTimeout(() => {
      router.push('/admin/produtos');
    }, 2000);
  } else {
    erro.value = result.message || 'Erro ao cadastrar produto';
  }
}
</script>
