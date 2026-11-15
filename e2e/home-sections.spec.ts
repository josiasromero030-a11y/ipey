import { test, expect } from '@playwright/test';
import { imagesReady } from './helpers';

const expectedTrends = [
  ['Un trabajo maldito', 'trabajo-maldito.jpg', 'Netflix', 'center'],
  ['Lupin: Parte 4', 'lupin.jpg', 'Netflix', 'center 37%'],
  ['Bluey', 'bluey.jpg', 'Disney+', 'center'],
  ['Nadie quiere esto · Temporada 3', 'nadie-quiere-esto.jpg', 'Netflix', 'center 42%'],
  ['VisionQuest', 'visionquest.jpg', 'Disney+', 'center 38%'],
  ['Palomas negras · Temporada 2', 'palomas-negras.jpg', 'Netflix', 'center 40%'],
  ['The Gilded Age', 'gilded.jpg', 'HBO Max', 'center 35%'],
  ['WAR', 'war.jpg', 'HBO Max', 'center 42%'],
  ['Los diarios de la boticaria · Temporada 3', 'boticaria.jpg', 'Crunchyroll', 'center 40%'],
  ['Black Clover · Temporada 2', 'clover.jpg', 'Crunchyroll', 'center 37%'],
];

for (const width of [1440, 390]) {
  test(`Tendencias se mueve en bucle continuo a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const trends = page.getByRole('region', { name: 'Tendencias' });
    const original = trends.locator('.trend-cycle').first();
    const copy = trends.locator('.trend-cycle[aria-hidden="true"]');
    const titles = expectedTrends.map(([name]) => name);
    await expect(original.locator('.trend-title')).toHaveText(titles);
    await expect(copy.locator('.trend-title')).toHaveText(titles);
    await imagesReady(page);
    const geometry = await trends.locator('.trend-track').evaluate(async track => {
      const animation = track.getAnimations()[0];
      await animation.ready;
      const duration = Number(animation.effect!.getTiming().duration);
      animation.pause();
      await animation.ready;
      const [first, duplicate] = Array.from(track.children, cycle => cycle.firstElementChild!);
      animation.currentTime = 0;
      const start = first.getBoundingClientRect();
      animation.currentTime = duration / 4;
      const quarter = first.getBoundingClientRect().left;
      animation.currentTime = duration / 2;
      const half = first.getBoundingClientRect().left;
      animation.currentTime = duration - 1;
      const seam = duplicate.getBoundingClientRect().left;
      animation.currentTime = duration;
      const restart = first.getBoundingClientRect().left;
      const cover = first.querySelector('.trend-banner')!.getBoundingClientRect();
      return { start: start.left, quarter, half, seam, restart, ratio: cover.width / cover.height };
    });
    expect(geometry.quarter).toBeLessThan(geometry.start);
    expect(geometry.half).toBeLessThan(geometry.quarter);
    expect(geometry.start - geometry.quarter).toBeCloseTo(geometry.quarter - geometry.half, 0);
    expect(geometry.seam).toBeCloseTo(geometry.restart, 0);
    expect(geometry.ratio).toBeCloseTo(16 / 9, 1);
    const button = trends.getByRole('button', { name: 'Pausar movimiento' });
    await button.focus();
    await button.press('Enter');
    await expect(trends.locator('.trend-strip')).toHaveAttribute('data-paused', 'true');
  });
}

test('movimiento reducido y fila táctil de Streaming', async ({ browser }) => {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce',
  });
  try {
    await page.goto('/');
    await imagesReady(page);
    await expect(page.locator('.trend-track')).toHaveCSS('animation-name', 'none');
    await expect(page.locator('.trend-cycle[aria-hidden]')).toBeHidden();
    expect(await page.locator('.trend-strip').evaluate(row => row.scrollWidth > row.clientWidth)).toBe(true);

    const streaming = page.getByRole('region', { name: 'Servicios de streaming' });
    const row = streaming.locator('.home-service-row');
    const cards = row.locator('.service-card');
    await row.scrollIntoViewIfNeeded();
    const bounds = (await row.boundingBox())!;
    const first = (await cards.nth(0).boundingBox())!;
    const next = (await cards.nth(1).boundingBox())!;
    const visible = (bounds.x + bounds.width - next.x) / next.width;
    expect(first.x + first.width).toBeLessThan(next.x);
    expect(visible).toBeGreaterThan(.4);
    expect(visible).toBeLessThan(.58);

    const cdp = await page.context().newCDPSession(page);
    const touch = (type: 'touchStart' | 'touchMove' | 'touchEnd', x?: number) =>
      cdp.send('Input.dispatchTouchEvent', { type, touchPoints: x === undefined ? [] : [{ x, y: bounds.y + 44 }] });
    await touch('touchStart', bounds.x + 286);
    for (const x of [250, 210, 170, 130, 90, 60]) await touch('touchMove', bounds.x + x);
    await touch('touchEnd');
    await expect.poll(() => row.evaluate(element => element.scrollLeft)).toBeGreaterThan(40);
    await expect.poll(() => row.evaluate(element => {
      const start = element.getBoundingClientRect().left;
      return Math.min(...Array.from(element.children, child => Math.abs(child.getBoundingClientRect().left - start)));
    })).toBeLessThan(2);
    await expect(streaming.getByRole('link', { name: 'Ver todos' })).toHaveAttribute('href', '#/streaming');
    const game = page.getByRole('region', { name: 'Recargas de juegos' });
    expect((await game.locator('.gaming-banner').boundingBox())!.width).toBeCloseTo((await game.boundingBox())!.width, 0);
  } finally {
    await page.close();
  }
});

test('Ofertas se oculta, ocupa el ancho o permite deslizar según el catálogo', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const offers = page.getByRole('region', { name: 'Ofertas' });
  await expect(offers).toHaveCount(0);

  let count = 1;
  await page.route('**/src/catalog.ts', async route => {
    const response = await route.fetch();
    const body = (await response.text()) + '\n' +
      `const offerDemo = catalog.find(p => p.id === "free-fire"); offerDemo.offer = true;
       offerDemo.variants.slice(0, ${count}).forEach((variant, i) => Object.assign(variant, {price: 5 + i, previousPrice: 10 + i, available: true}));`;
    await route.fulfill({ response, body });
  });
  await page.reload();
  await expect(offers.locator('article')).toHaveCount(1);
  expect((await offers.locator('article').boundingBox())!.width).toBeCloseTo((await offers.boundingBox())!.width, 0);
  await expect(offers.locator('strong')).toContainText('5.00');
  await expect(offers.locator('s')).toContainText('10.00');
  await expect(offers.getByRole('link', { name: 'Ver oferta' })).toHaveAttribute('href', '#/producto/free-fire');

  count = 2;
  await page.reload();
  await expect(offers.locator('article')).toHaveCount(2);
  const row = offers.getByRole('group', { name: 'Promociones disponibles' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await row.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
  }
});
