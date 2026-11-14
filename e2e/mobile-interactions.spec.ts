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

test('filtros: borrador, cancelar, aplicar, etiquetas y limpieza',async({page})=>{
 await page.goto('/#/streaming');
 await page.getByRole('button',{name:'Filtros',exact:true}).click();
 await page.getByRole('combobox',{name:'Plataforma',exact:true}).selectOption('netflix');
 await page.keyboard.press('Escape');await expect(page.locator('.product-card')).toHaveCount(5);
 await page.getByRole('button',{name:'Filtros',exact:true}).click();
 await expect(page.getByRole('combobox',{name:'Plataforma',exact:true})).toHaveValue('');
 await page.getByRole('combobox',{name:'Plataforma',exact:true}).selectOption('netflix');
 await page.getByRole('combobox',{name:'Duración',exact:true}).selectOption('3');
 await page.getByRole('button',{name:'Aplicar filtros',exact:true}).click();
 await expect(page.locator('.product-card')).toHaveCount(1);
 await expect(page.getByRole('button',{name:/^Filtros/})).toBeFocused();
 await page.getByRole('button',{name:'Quitar filtro: Netflix',exact:true}).click();
 await expect(page.locator('.product-card')).toHaveCount(5);
 await page.getByRole('button',{name:/^Filtros/}).click();
 await page.getByRole('button',{name:'Limpiar',exact:true}).click();
 await page.getByRole('button',{name:'Aplicar filtros',exact:true}).click();
 await expect(page.getByRole('button',{name:/Quitar filtro:/})).toHaveCount(0);
 await page.getByRole('combobox',{name:'Ordenar',exact:true}).selectOption('desc');
 await page.getByRole('searchbox',{name:'Buscar servicios',exact:true}).fill('Spotify');
 await expect(page.locator('.product-card h3')).toHaveText('Spotify');
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
