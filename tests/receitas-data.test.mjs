import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../js/receitas.js', import.meta.url), 'utf8');
const recipes = JSON.parse(fs.readFileSync(new URL('../dados.json', import.meta.url), 'utf8'));
test('catálogo lê o JSON relativo e renderiza as receitas fornecidas', async () => {
  const panel = { innerHTML: '' };
  const requests = [];
  const context = vm.createContext({
    document: { getElementById: id => id === 'pnlCatalogo' ? panel : null },
    fetch: async url => {
      requests.push(url);
      return { json: async () => recipes };
    }
  });
  vm.runInContext(source, context);
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(requests, ['./dados.json']);
  assert.ok(Array.isArray(recipes) && recipes.length > 0);
  assert.equal((panel.innerHTML.match(/class="receita card /g) ?? []).length, recipes.length);
  for (const recipe of recipes) {
    assert.ok(typeof recipe.nome === 'string' && panel.innerHTML.includes(recipe.nome));
    assert.ok(Array.isArray(recipe.ingredientes) && recipe.ingredientes.every(value => panel.innerHTML.includes(value)));
    assert.ok(typeof recipe.preparo === 'string' && panel.innerHTML.includes(recipe.preparo));
  }
});

