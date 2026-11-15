import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { imagesReady } from './helpers';

const approved: typeof import('../src/data/approvedVisuals.json') = JSON.parse(readFileSync('src/data/approvedVisuals.json', 'utf8'));

for (const [width, height] of [[1440, 900], [390, 844]]) {
  test(`recursos aprobados y capas independientes a ${width}px`, async ({ page }) => {
    const requests: string[] = [];
    page.on('request', request => requests.push(request.url()));
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await imagesReady(page);

    const panels = page.locator('.platform-panel');
    await expect(panels).toHaveCount(6);
    await expect(page.locator('.platform-panels .service-wordmark')).toHaveCount(0);

    for (const [index, id] of approved.heroOrder.entries()) {
      const visual = approved.catalog.find(entry => entry.id === id)!;
      const panel = panels.nth(index);
      const image = panel.locator('.visual-background');
      await expect(image).toHaveAttribute('src', new RegExp('/' + visual.hero.art + '$'));
      expect(await image.evaluate(e => getComputedStyle(e).objectPosition)).toBe(visual.hero.focus.replace('center', '50%'));
      if (index > 0) expect(await panel.evaluate(e => getComputedStyle(e).maskImage)).not.toBe('none');
    }

    if (width === 390) {
      const hero = page.locator('.hero-mobile');
      const heroBox = (await hero.boundingBox())!;
      const trendBox = (await page.locator('.trend-banner').boundingBox())!;
      expect(heroBox.width).toBeCloseTo(trendBox.width, 0);
      expect(heroBox.height).toBeCloseTo(trendBox.height, 0);

      const coverage = await hero.evaluate(element => {
        const bounds = element.getBoundingClientRect();
        const panels = element.querySelector('.platform-panels')!;
        element.scrollLeft = 700;
        panels.scrollLeft = 700;
        const visible = Array.from(panels.children).every(panel => {
          const frame = panel.getBoundingClientRect();
          return frame.left < bounds.right && frame.right > bounds.left;
        });
        const copy = element.querySelector('.hero-copy')!.getBoundingClientRect();
        return {
          visible,
          heroOffset: element.scrollLeft,
          panelsOffset: panels.scrollLeft,
          copyInside: copy.top >= bounds.top && copy.bottom <= bounds.bottom,
        };
      });
      expect(coverage).toEqual({ visible: true, heroOffset: 0, panelsOffset: 0, copyInside: true });
    }

    for (const visual of approved.catalog) {
      const id = visual.id === 'hbo' ? 'max' : visual.id;
      const artwork = (id === 'free-fire' ? page.locator('.gaming-artwork') : page.locator(`.service-card-${id} .service-cover`)).locator('.service-artwork');
      const image = artwork.locator('.visual-background');
      const logo = artwork.locator('.service-wordmark');
      const expectedArt = width <= 680 && visual.service.mobileArt ? visual.service.mobileArt : visual.service.art;
      expect(await image.evaluate((e: HTMLImageElement) => new URL(e.currentSrc).pathname)).toBe('/' + expectedArt);
      await expect(logo).toHaveAttribute('src', new RegExp('/' + visual.logo + '$'));
      await expect(artwork.locator('.visual-shade')).toHaveCount(1);
      expect(await logo.evaluate(e => getComputedStyle(e).objectFit)).toBe('contain');
    }

    expect(requests.every(url => new URL(url).origin === new URL(page.url()).origin)).toBe(true);
    const card = page.locator('.service-card-netflix');
    const image = card.locator('.visual-background');
    const logo = card.locator('.service-wordmark');
    const original = await image.boundingBox();
    await logo.evaluate(e => { e.style.width = '45px'; });
    expect(await image.boundingBox()).toEqual(original);
    await expect(card.getByRole('link', { name: 'Ver planes de Netflix' })).toHaveAttribute('href', '#/producto/netflix');
  });
}
