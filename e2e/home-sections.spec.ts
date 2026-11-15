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
  test(`Tendencias muestra cinco pares en orden a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const start = new Date('2026-01-01T00:00:00Z');
    await page.clock.install({ time: start });
    await page.clock.pauseAt(new Date(start.getTime() + 30_000));
    await page.goto('/');

    const trends = page.getByRole('region', { name: 'Tendencias' });
    const grid = trends.locator('.trend-grid');
    const banners = trends.locator('.trend-banner');
    const titles = trends.locator('.trend-title');
    const next = () => titles.first().press('ArrowRight');
    const previous = () => titles.first().press('ArrowLeft');
    const pause = trends.getByRole('button', { name: /Pausar rotación/ });
    const resume = trends.getByRole('button', { name: /Reanudar rotación/ });
    const expectPair = (index: number) =>
      expect(titles).toHaveText(expectedTrends.slice(index * 2, index * 2 + 2).map(([name]) => name));

    expect(await trends.evaluate(section => section.previousElementSibling?.matches('.hero-desktop,.hero-mobile'))).toBe(true);
    await expectPair(0);
    await expect(trends.getByRole('button')).toHaveCount(2);
    const left = (await banners.nth(0).boundingBox())!;
    const right = (await banners.nth(1).boundingBox())!;
    expect(left.y).toBe(right.y);
    expect(left.x + left.width).toBeLessThan(right.x);
    expect(left.width).toBeCloseTo(right.width, 0);
    const row = (await grid.boundingBox())!;
    expect(left.x).toBeCloseTo(row.x, 0);
    expect(right.x + right.width).toBeCloseTo(row.x + row.width, 0);
    expect(left.height).toBeLessThanOrEqual(width === 390 ? 100 : 260);

    await page.clock.runFor(7999);
    await expectPair(0);
    await page.clock.runFor(1);
    await expectPair(1);

    await page.clock.runFor(5000);
    await next();
    await expectPair(2);
    await page.clock.runFor(7999);
    await expectPair(2);
    await page.clock.runFor(1);
    await expectPair(3);

    await pause.last().click();
    await page.clock.runFor(9000);
    await expectPair(3);
    await previous();
    await expectPair(2);
    await resume.first().click();

    const setHidden = (value: boolean) => page.evaluate(hidden => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: hidden });
      document.dispatchEvent(new Event('visibilitychange'));
    }, value);
    await setHidden(true);
    await expect(grid).toHaveAttribute('aria-live', 'polite');
    await page.clock.runFor(9000);
    await expectPair(2);
    await setHidden(false);
    await expect(grid).toHaveAttribute('aria-live', 'off');
    await page.clock.runFor(8000);
    await expectPair(3);

    await pause.first().click();
    for (let i = 0; i < 3; i++) await previous();
    for (let pair = 0; pair < 5; pair++) {
      await expectPair(pair);
      for (const [slot, [, file, brand, focus]] of expectedTrends.slice(pair * 2, pair * 2 + 2).entries()) {
        const banner = banners.nth(slot);
        const art = await banner.locator('.visual-background').evaluate(async (image: HTMLImageElement) => {
          await image.decode();
          return { url: image.currentSrc, width: image.naturalWidth, focus: getComputedStyle(image).objectPosition };
        });
        expect(new URL(art.url).pathname.endsWith('/recursos/destacados/' + file)).toBe(true);
        expect(art.width).toBeGreaterThan(0);
        expect(art.focus).toBe(focus === 'center' ? '50% 50%' : focus.replace('center', '50%'));
        await expect(banner.getByRole('img', { name: brand })).toBeVisible();
      }
      if (pair < 4) await next();
    }
    await resume.last().click();
    await page.clock.runFor(8000);
    await expectPair(0);
    await previous();
    await expectPair(4);
    await next();
    await expectPair(0);
  });
}

test('movimiento reducido y fila táctil de Streaming', async ({ browser }) => {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce',
  });
  try {
    await page.goto('/');
    await imagesReady(page);
    await expect(page.getByRole('button', { name: /Reanudar rotación/ })).toHaveCount(2);

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
