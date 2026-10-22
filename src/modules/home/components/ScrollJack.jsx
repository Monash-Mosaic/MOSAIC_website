'use client';

import { useLayoutEffect, useRef } from 'react';

const TRANSITION_MS = 900;
const WHEEL_THRESHOLD = 24;
const WHEEL_QUIET_MS = 180;
const TOUCH_THRESHOLD = 48;

function sectionsIn(root) {
  return [...root.querySelectorAll(':scope > [data-scroll-section]')];
}

function sectionIndexForHash(hash, sections) {
  const id = hash.replace(/^#/, '');
  if (!id) return -1;
  const target = document.getElementById(id);
  if (!target) return -1;
  return sections.findIndex((section) => section === target || section.contains(target));
}

function scrollableFrom(start, root) {
  let node = start instanceof Element ? start : null;
  while (node && node !== root) {
    const overflowY = getComputedStyle(node).overflowY;
    if (
      (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
      node.scrollHeight > node.clientHeight + 1
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

function canScroll(element, direction) {
  if (!element) return false;
  if (direction > 0) return element.scrollTop + element.clientHeight < element.scrollHeight - 2;
  return element.scrollTop > 2;
}

export default function ScrollJack({ children }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const html = document.documentElement;
    const desktop = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let teardown = () => {};

    const enable = () => {
      const sections = sectionsIn(root);
      let index = 0;
      let animationLocked = false;
      let wheelReady = true;
      let wheelDelta = 0;
      let wheelQuietTimer = 0;
      let unlockTimer = 0;
      let touchStartY = 0;
      let footerSlot = null;

      html.classList.add('home-scroll');
      root.dataset.scrollDirection = 'forward';

      const attachFooter = () => {
        const footer = document.querySelector('footer');
        const lastSection = sections.at(-1);
        if (!footer || !lastSection || footer.parentElement === lastSection) return;
        footerSlot = { parent: footer.parentElement, next: footer.nextSibling };
        lastSection.appendChild(footer);
      };

      const detachFooter = () => {
        const footer = document.querySelector('footer');
        if (!footer || !footerSlot?.parent) return;
        footerSlot.parent.insertBefore(footer, footerSlot.next);
        footerSlot = null;
      };

      const render = (nextIndex, animate = true) => {
        const clamped = Math.max(0, Math.min(nextIndex, sections.length - 1));
        const direction = clamped >= index ? 'forward' : 'backward';
        index = clamped;
        root.dataset.scrollDirection = direction;
        root.classList.toggle('is-animating', animate && !reducedMotion.matches);

        sections.forEach((section, sectionIndex) => {
          const isCurrent = sectionIndex === index;
          const depth = Math.min(Math.abs(sectionIndex - index), 3);
          section.dataset.scrollState =
            sectionIndex < index ? 'past' : sectionIndex > index ? 'future' : 'current';
          section.style.setProperty('--section-index', String(sectionIndex + 1));
          section.style.setProperty('--section-depth', String(depth));
          section.style.setProperty('--section-recede-y', `${-1.5 - depth * 1.25}%`);
          section.style.setProperty('--section-recede-z', `${-18 - depth * 18}px`);
          section.style.setProperty('--section-scale', String(1 - depth * 0.018));
          section.style.setProperty('--section-future-y', `${101 + depth * 1.5}%`);
          section.toggleAttribute('inert', !isCurrent);
          section.setAttribute('aria-hidden', String(!isCurrent));
          section.style.pointerEvents = isCurrent ? 'auto' : 'none';
        });

        window.clearTimeout(unlockTimer);
        if (!animate || reducedMotion.matches) {
          animationLocked = false;
          root.classList.remove('is-animating');
          return;
        }

        animationLocked = true;
        unlockTimer = window.setTimeout(() => {
          animationLocked = false;
          root.classList.remove('is-animating');
        }, TRANSITION_MS);
      };

      const move = (direction) => {
        if (animationLocked) return false;
        const nextIndex = Math.max(0, Math.min(index + direction, sections.length - 1));
        if (nextIndex === index) return false;
        render(nextIndex);
        return true;
      };

      const moveFromEvent = (event, direction) => {
        const inner = scrollableFrom(event.target, root);
        if (canScroll(inner, direction)) return false;
        if (event.cancelable) event.preventDefault();
        return move(direction);
      };

      const onWheel = (event) => {
        const direction = event.deltaY > 0 ? 1 : -1;
        const inner = scrollableFrom(event.target, root);
        if (canScroll(inner, direction)) return;

        if (event.cancelable) event.preventDefault();
        window.clearTimeout(wheelQuietTimer);
        wheelQuietTimer = window.setTimeout(() => {
          wheelReady = true;
          wheelDelta = 0;
        }, WHEEL_QUIET_MS);

        if (!wheelReady || animationLocked) return;
        wheelDelta += event.deltaY;
        if (Math.abs(wheelDelta) < WHEEL_THRESHOLD) return;

        wheelReady = false;
        const didMove = move(wheelDelta > 0 ? 1 : -1);
        wheelDelta = 0;
        if (!didMove) wheelReady = true;
      };

      const onTouchStart = (event) => {
        touchStartY = event.touches[0]?.clientY ?? 0;
      };

      const onTouchMove = (event) => {
        const currentY = event.touches[0]?.clientY ?? touchStartY;
        const delta = touchStartY - currentY;
        if (Math.abs(delta) < TOUCH_THRESHOLD) return;
        if (moveFromEvent(event, delta > 0 ? 1 : -1)) touchStartY = currentY;
      };

      const onKeyDown = (event) => {
        const tag = event.target?.tagName;
        const isTyping =
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          event.target?.isContentEditable;
        if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;
        if (event.key === ' ' && (tag === 'BUTTON' || tag === 'A')) return;

        const keys = {
          ArrowDown: 1,
          PageDown: 1,
          ' ': 1,
          ArrowUp: -1,
          PageUp: -1,
        };

        if (keys[event.key]) {
          event.preventDefault();
          move(keys[event.key]);
        } else if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          if (!animationLocked) render(event.key === 'Home' ? 0 : sections.length - 1);
        }
      };

      const onClick = (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        const link = event.target.closest?.('a[href]');
        if (!link) return;

        const url = new URL(link.href, window.location.href);
        if (
          url.origin !== window.location.origin ||
          url.pathname !== window.location.pathname ||
          !url.hash
        ) {
          return;
        }

        const nextIndex = sectionIndexForHash(url.hash, sections);
        if (nextIndex < 0) return;
        event.preventDefault();
        event.stopPropagation();
        window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
        render(nextIndex);
      };

      const onHistoryChange = () => {
        const nextIndex = sectionIndexForHash(window.location.hash, sections);
        if (nextIndex >= 0) render(nextIndex, false);
      };

      attachFooter();
      const initialIndex = sectionIndexForHash(window.location.hash, sections);
      render(initialIndex >= 0 ? initialIndex : 0, false);

      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('click', onClick, true);
      window.addEventListener('hashchange', onHistoryChange);
      window.addEventListener('popstate', onHistoryChange);

      teardown = () => {
        window.clearTimeout(unlockTimer);
        window.clearTimeout(wheelQuietTimer);
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('click', onClick, true);
        window.removeEventListener('hashchange', onHistoryChange);
        window.removeEventListener('popstate', onHistoryChange);
        detachFooter();
        sections.forEach((section) => {
          delete section.dataset.scrollState;
          section.style.removeProperty('--section-index');
          section.style.removeProperty('--section-depth');
          section.style.removeProperty('--section-recede-y');
          section.style.removeProperty('--section-recede-z');
          section.style.removeProperty('--section-scale');
          section.style.removeProperty('--section-future-y');
          section.style.pointerEvents = '';
          section.removeAttribute('inert');
          section.removeAttribute('aria-hidden');
        });
        delete root.dataset.scrollDirection;
        root.classList.remove('is-animating');
        html.classList.remove('home-scroll');
      };
    };

    const onDesktopChange = (event) => {
      teardown();
      teardown = () => {};
      if (event.matches) enable();
    };

    if (desktop.matches) enable();
    desktop.addEventListener('change', onDesktopChange);

    return () => {
      desktop.removeEventListener('change', onDesktopChange);
      teardown();
    };
  }, []);

  return (
    <div ref={rootRef} data-scroll-stack className="relative w-full md:h-dvh md:overflow-hidden">
      {children}
    </div>
  );
}
