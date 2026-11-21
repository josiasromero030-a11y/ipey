import {test,expect} from '@playwright/test';
import {demoCatalog} from './helpers';

test('menú informativo: Escape devuelve el foco y los destinos principales siguen visibles',async({page})=>{
 await page.goto('/');
 const nav=page.getByRole('navigation',{name:'Principal',exact:true});
 for(const name of ['Inicio','Streaming','Juegos'])await expect(nav.getByRole('link',{name,exact:true})).toBeVisible();
 const trigger=page.getByRole('button',{name:'Abrir menú',exact:true});await trigger.click();
 await page.getByRole('navigation',{name:'Más información',exact:true}).getByRole('link',{name:'Privacidad',exact:true}).focus();
 await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
 await trigger.click();await page.getByRole('navigation',{name:'Más información',exact:true}).getByRole('link',{name:'Condiciones',exact:true}).click();
 await expect(page.getByRole('heading',{level:1,name:'Condiciones',exact:true})).toBeVisible();
 await expect(trigger).toHaveAttribute('aria-expanded','false');
});

test('filtros: categoría global, borrador, cancelar y limpiar', async ({ page }) => {
 await page.goto('/#/buscar');
 await page.getByRole('button', {name: 'Filtros', exact: true}).click();
 const category = page.getByRole('combobox', {name: 'Categoría', exact: true});
 await expect(category.locator('option')).toHaveText(['Todas las categorías', 'Streaming', 'Juegos']);
 await expect(page.getByRole('combobox', {name: 'Duración', exact: true})).toHaveCount(0);
 await category.selectOption('gaming');
 await page.keyboard.press('Escape');
 await expect(page.locator('.product-card')).toHaveCount(6);
 await page.getByRole('button', {name: 'Filtros', exact: true}).click();
 await expect(category).toHaveValue('');
 await category.selectOption('gaming');
 await page.getByRole('button', {name: 'Aplicar filtros', exact: true}).click();
 await expect(page.locator('.product-card')).toHaveCount(1);
 await page.getByRole('button', {name: 'Quitar filtro: Juegos', exact: true}).click();
 await expect(page.locator('.product-card')).toHaveCount(6);
 await page.getByRole('button', {name: 'Filtros', exact: true}).click();
 await category.selectOption('streaming');
 await page.getByRole('button', {name: 'Aplicar filtros', exact: true}).click();
 await expect(page.locator('.product-card')).toHaveCount(5);
 for (const route of ['streaming','juegos']) {
  await page.goto('/#/'+route);
  await page.getByRole('button', {name: /^Filtros/}).click();
  await expect(page.getByRole('combobox', {name: /Categoría|Plataforma|Duración/})).toHaveCount(0);
  await page.getByRole('combobox', {name: 'Disponibilidad', exact: true}).selectOption('yes');
  await page.getByRole('button', {name: 'Aplicar filtros', exact: true}).click();
  await expect(page.locator('.product-card')).toHaveCount(0);
  await page.getByRole('button', {name: 'Mostrar todo', exact: true}).click();
  await expect(page.locator('.product-card')).toHaveCount(route === 'streaming' ? 5 : 1);
 }
});

test('cada ficha usa el acento de su plataforma y omite la ruta pequeña', async ({page}) => {
 await page.emulateMedia({reducedMotion:'reduce'});
 for (const [id, color] of [['netflix','#da2335'],['spotify','#1bba68'],['disney','#1c64df'],['max','#6444ce'],['crunchyroll','#ed781b'],['free-fire','#dc8c27']]) {
  await page.goto('/#/producto/'+id);
  await expect(page.locator('.detail-page .breadcrumb')).toHaveCount(0);
  const radios = page.getByRole('radio');
  await expect(radios.first()).toBeChecked();
  await radios.nth(1).check();
  await expect(page.locator('.variant.selected')).toHaveCount(1);
  const style = await page.locator('.variant.selected').evaluate(element => {
   const color = getComputedStyle(element).getPropertyValue('--color-selection').trim();
   const border = getComputedStyle(element).borderTopColor;
   const radio = getComputedStyle(element.querySelector('input')!).accentColor;
   const canvas = document.createElement('canvas').getContext('2d')!;
   canvas.fillStyle = color;
   const hex = canvas.fillStyle;
   return { color, hex, same: border === radio, tinted: getComputedStyle(element).backgroundColor };
  });
  expect(style.hex).toBe(color);
  expect(style.same).toBe(true);
 }
});

test('ID, condiciones y acción del resumen siguen accesibles con menos altura',async({page})=>{
 await demoCatalog(page);await page.goto('/#/producto/free-fire');
 await page.setViewportSize({width:390,height:500});
 const id=page.getByRole('textbox',{name:'ID de jugador',exact:true});
 await id.fill('12345678');await id.scrollIntoViewIfNeeded();await expect(id).toBeInViewport();
 await page.getByText('Condiciones del servicio',{exact:true}).click();
 await expect(page.getByText('Verifica el ID antes de solicitar una recarga.',{exact:false})).toBeVisible();
 await page.getByRole('button',{name:'Revisar solicitud',exact:true}).click();
 const action=page.getByRole('link',{name:'Continuar a WhatsApp',exact:true});await action.scrollIntoViewIfNeeded();
 await expect(action).toBeInViewport();
 await page.getByRole('button',{name:'Cerrar resumen',exact:true}).click();
 await expect(page.getByRole('dialog',{name:'Revisa tu solicitud',exact:true})).not.toBeVisible();
});
