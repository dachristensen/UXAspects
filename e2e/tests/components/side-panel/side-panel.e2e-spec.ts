import { SidePanelPage } from './side-panel.po.spec';
import { protractor } from 'protractor';

describe('Side Panel', () => {

    let page: SidePanelPage;

    beforeEach(() => {
        page = new SidePanelPage();
        page.getPage();
    });

    describe('in the default state', () => {

        it('should be hidden initially', async () => {
            expect(page.panel.getAttribute('class')).not.toContain('open');
            expect(await page.panelHost.getCssValue('position')).toBe('fixed');
            expect(await page.getRightOffsetFromWindow()).toBe(0);
        });

        it('should be visible when open', async () => {
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            expect(await page.getRightOffsetFromWindow()).toBe(200);
            expect(await page.getPanelWidth()).toBe(200);
            expect(page.getPanelHeight()).toBe(page.getViewportHeight());
        });

        it('should close when the panel close button is clicked', async () => {
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            await page.panelClose.click();
            expect(page.panel.getAttribute('class')).not.toContain('open');
            expect(await page.getRightOffsetFromWindow()).toBe(0);
        });

        it('should not close on external click', async () => {
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            await page.externalClick1.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            expect(await page.getRightOffsetFromWindow()).toBe(200);
            expect(await page.externalClick1.$('input').isSelected()).toBe(true);
        });

    });

    describe('with inline = true', () => {

        beforeEach(() => {
            page.inline.click();
        });

        it('should be hidden initially', async () => {
            expect(page.panel.getAttribute('class')).not.toContain('open');
            expect(await page.getInlinePanelWidth()).toBe(0);
            expect(await page.panelHost.getCssValue('position')).toBe('static');
        });

        it('should be visible when open', async () => {
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            expect(await page.getInlinePanelWidth()).toBe(200);
            expect(await page.getInlinePanelHeight()).toBe(300);
        });

        it('should not close on external click', async () => {
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            await page.externalClick1.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            expect(await page.getInlinePanelWidth()).toBe(200);
            expect(await page.externalClick1.$('input').isSelected()).toBe(true);
        });

    });

    describe('with attachTo = container', () => {

        beforeEach(() => {
            page.attachToContainer.click();
        });

        it('should be hidden initially', async () => {
            expect(page.panel.getAttribute('class')).not.toContain('open');
            expect(await page.getRightOffsetFromContainer()).toBe(0);
            expect(await page.panelHost.getCssValue('position')).toBe('absolute');
        });

        it('should be visible when open', async () => {
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            expect(await page.getRightOffsetFromContainer()).toBe(200);
            expect(await page.getPanelWidth()).toBe(200);
            expect(page.getPanelHeight()).toBe(page.getContainerHeight());
        });

        it('should not close on external click', async () => {
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            await page.externalClick1.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            expect(await page.getRightOffsetFromContainer()).toBe(200);
            expect(await page.externalClick1.$('input').isSelected()).toBe(true);
        });

    });

    describe('with width = 50%', () => {

        beforeEach(() => {
            page.width2.click();
        });

        it('should occupy 50% of the width of the window', async () => {
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            expect(await page.getPanelWidth()).toBeCloseTo(await page.getViewportWidth() / 2, -1);
        });

        it('should occupy 50% of the width of the container when attachTo = container', async () => {
            await page.attachToContainer.click();
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            expect(await page.getRightOffsetFromContainer()).toBe(300);
            expect(await page.getPanelWidth()).toBe(300);
            expect(page.getPanelHeight()).toBe(page.getContainerHeight());
        });

        it('should occupy 50% of the width of the container when inline', async () => {
            await page.inline.click();
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            expect(await page.getRightOffsetFromContainer()).toBe(300);
            expect(await page.getPanelWidth()).toBe(300);
            expect(page.getPanelHeight()).toBe(page.getContainerHeight());
        });

    });

    describe('with top = 60px', () => {

        beforeEach(() => {
            page.attachToContainer.click();
            page.top2.click();
        });

        it('should have offset top and reduced height when open', async () => {
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            expect(await page.getPanelHeight()).toBe(await page.getContainerHeight() - 60);
            expect(await page.getPanelTop()).toBe(await page.getContainerTop() + 60);
        });

    });

    describe('with modal = true', () => {

        beforeEach(() => {
            page.modal.click();
        });

        it('should not display a backdrop when closed', async () => {
            expect(await page.modalBackdrop.isPresent()).toBe(false);
        });

        it('should display a backdrop when open and prevent external clicks', async () => {
            await page.toggle.click();

            // Check backdrop dimensions
            expect(await page.modalBackdrop.isPresent()).toBe(true);
            expect(page.getModalBackdropWidth()).toBe(page.getViewportWidth());
            expect(page.getModalBackdropHeight()).toBe(page.getViewportHeight());
            expect(await page.getModalBackdropTop()).toBe(0);

            // Check external clicks
            expect(await page.isClickable(page.externalClick1)).toBe(false);
            expect(await page.externalClick1.$('input').isSelected()).toBe(false);
            expect(await page.isClickable(page.externalClick2)).toBe(false);
            expect(await page.externalClick2.$('input').isSelected()).toBe(false);
        });

        it('should display a backdrop over the container only when attachTo = container', async () => {
            await page.attachToContainer.click();
            await page.toggle.click();

            // Check backdrop dimensions
            expect(await page.modalBackdrop.isPresent()).toBe(true);
            expect(page.getModalBackdropWidth()).toBe(page.getContainerWidth());
            expect(page.getModalBackdropHeight()).toBe(page.getContainerHeight());
            expect(page.getModalBackdropTop()).toBe(page.getContainerTop());

            // Check external clicks
            expect(await page.isClickable(page.externalClick1)).toBe(false);
            expect(await page.externalClick1.$('input').isSelected()).toBe(false);
            expect(await page.isClickable(page.externalClick2)).toBe(true);
            expect(await page.externalClick2.$('input').isSelected()).toBe(true);
        });

        it('should display a backdrop offset by the top value', async () => {
            await page.top2.click(); // 60px - enough to make externalClick1 visible
            await page.toggle.click();

            // Check backdrop dimensions
            expect(await page.modalBackdrop.isPresent()).toBe(true);
            expect(page.getModalBackdropWidth()).toBe(page.getViewportWidth());
            expect(await page.getModalBackdropHeight()).toBe(await page.getViewportHeight() - 60);
            expect(await page.getModalBackdropTop()).toBe(60);

            // Check that externalClick1 is outside of the backdrop and clickable
            await page.externalClick1.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            expect(await page.externalClick1.$('input').isSelected()).toBe(true);

            expect(await page.isClickable(page.externalClick2)).toBe(false);
            expect(await page.externalClick2.$('input').isSelected()).toBe(false);
        });

    });

    describe('with closeOnExternalClick = true', () => {

        beforeEach(() => {
            page.closeOnExternalClick.click();
        });

        it('should close on external click', async () => {
            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            await page.externalClick1.click();
            expect(page.panel.getAttribute('class')).not.toContain('open');
            expect(await page.externalClick1.$('input').isSelected()).toBe(true);
        });

        it('should close on external click when attachTo = container', async () => {
            await page.attachToContainer.click();

            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            await page.externalClick1.click();
            expect(page.panel.getAttribute('class')).not.toContain('open');
            expect(await page.externalClick1.$('input').isSelected()).toBe(true);

            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            await page.externalClick2.click();
            expect(page.panel.getAttribute('class')).not.toContain('open');
            expect(await page.externalClick2.$('input').isSelected()).toBe(true);
        });

        it('should close on external click when inline', async () => {
            await page.inline.click();

            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            await page.externalClick1.click();
            expect(page.panel.getAttribute('class')).not.toContain('open');
            expect(await page.externalClick1.$('input').isSelected()).toBe(true);

            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            await page.externalClick2.click();
            expect(page.panel.getAttribute('class')).not.toContain('open');
            expect(await page.externalClick2.$('input').isSelected()).toBe(true);
        });

        it('should close on external click when modal', async () => {
            await page.modal.click();

            await page.toggle.click();
            expect(page.panel.getAttribute('class')).toContain('open');
            await page.modalBackdrop.click();
            expect(page.panel.getAttribute('class')).not.toContain('open');
        });

    });
});