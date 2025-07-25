<template>
  <div class="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-6">Editar Produto</h1>
    <form @submit.prevent="atualizarProduto" class="space-y-4">
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
      <div class="flex gap-2">
        <button
          type="submit"
          class="flex-1 py-2 px-4 bg-primary-600 text-white font-semibold rounded hover:bg-primary-700 transition"
        >
          Salvar
        </button>
        <button
          type="button"
          @click="excluirProduto"
          class="flex-1 py-2 px-4 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
        >
          Excluir
        </button>
      </div>
      <div v-if="sucesso" class="text-green-600 mt-2">Produto atualizado!</div>
      <div v-if="excluido" class="text-red-600 mt-2">Produto excluído!</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const nome = ref('Camiseta Nuxt');
const descricao = ref('Produto de exemplo para edição.');
const preco = ref(99.9);
const imagens = ref('https://via.placeholder.com/150');
const estoque = ref(10);
const sucesso = ref(false);
const excluido = ref(false);

function atualizarProduto() {
  sucesso.value = true;
  setTimeout(() => (sucesso.value = false), 2000);
}
function excluirProduto() {
  excluido.value = true;
  setTimeout(() => (excluido.value = false), 2000);
}
</script>
