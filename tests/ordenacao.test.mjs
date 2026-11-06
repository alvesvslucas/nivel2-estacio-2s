import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../js/ordenando.js', import.meta.url), 'utf8');
function evaluate(values, operation) {
  // Modelo mínimo dos nós manipulados pelo algoritmo, sem navegador ou bibliotecas.
  const children = values.map(value => ({
    value: String(value),
    get innerHTML() { return this.value; },
    set innerHTML(next) { this.value = String(next); },
    get textContent() { return this.value; }
  }));
  const list = { children };
  const document = { getElementById: id => id === 'lista' ? list : null };
  const context = vm.createContext({ document });
  vm.runInContext(source, context);
  vm.runInContext(operation, context);
  return children.map(node => Number(node.textContent));
}
for (const [name, operation] of [
  ['Bubble Sort', 'bubble_sort(lista.children)'],
  ['Selection Sort', 'selection_sort(lista.children)'],
  ['Quick Sort', 'quick_sort(lista.children, 0, lista.children.length - 1)']
]) {
  test(name + ' ordena inteiros, negativos, duplicados e limites', () => {
    for (const input of [[9, -2, 4, 4, 0, 100], [1, 2, 3], [], [7]]) {
      assert.deepEqual(evaluate(input, operation), [...input].sort((a, b) => a - b));
    }
  });
}
test('misturar preserva quantidade e valores', () => {
  const input = [9, -2, 4, 4, 0, 100];
  assert.deepEqual(evaluate(input, 'misturar()').sort((a, b) => a - b), [...input].sort((a, b) => a - b));
});

