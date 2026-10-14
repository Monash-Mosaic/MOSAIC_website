'use client';

import { useLayoutEffect, useRef } from 'react';

const WHEEL_THRESHOLD = 16;
const TOUCH_THRESHOLD = 48;
const DURATION_MS = 780;
const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function sectionsIn(root) {
  return [...root.querySelectorAll(':scope > [data-scroll-section]')];
}

function sectionIndexForHash(hash, items) {
  const id = hash.replace(/^#/, '');
  if (!id) return -1;
  const target = document.getElementById(id);
  if (!target) return -1;
  return items.findIndex((section) => section === target || section.contains(target));
}

export default function ScrollJack({ children }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const html = document.documentElement;
    html.classList.add('home-scroll');

    let index = 0;
    let locked = false;
    let touchStartY = 0;
    let releaseTimer = 0;

    const footer = () => document.querySelector('footer');

    const place = (element, y, z, animate, scale = 1) => {
      element.style.zIndex = String(z);
      element.style.transformOrigin = 'center top';
      element.style.transition = animate ? `transform ${DURATION_MS}ms ${EASE}` : 'none';
      element.style.transform = `translate3d(0, ${y}, 0) scale(${scale})`;
    };

    const paint = (nextIndex, animate) => {
      const items = sectionsIn(root);
      if (!items.length) return;

      const maxIndex = items.length;
      const clamped = Math.max(0, Math.min(nextIndex, maxIndex));
      const previous = index;
      if (animate && clamped === previous) return;

      const motion = animate && !prefersReducedMotion();
      const forward = clamped > previous;
      const top = Math.min(clamped, items.length - 1);
      const showingFooter = clamped === items.length;
      const bar = footer();

      index = clamped;

      items.forEach((section, i) => {
        section.toggleAttribute('inert', i !== top);
        section.style.pointerEvents = i === top ? 'auto' : 'none';

        if (!motion) {
          place(section, i === top ? '0%' : '100%', i === top ? 2 : 1, false);
          return;
        }

        if (forward) {
          if (i === clamped) place(section, '100%', 20, false);
          else if (i === previous) place(section, '0%', 10, false);
          else place(section, '100%', 1, false);
          return;
        }

        if (i === previous && previous < items.length) place(section, '0%', 20, false);
        else if (i === clamped) place(section, '0%', 10, false, 0.94);
        else place(section, '100%', 1, false);
      });

      if (bar) {
        bar.style.pointerEvents = showingFooter ? 'auto' : 'none';
        if (!motion) place(bar, showingFooter ? '0%' : '100%', 40, false);
        else if (showingFooter) place(bar, '100%', 40, false);
        else if (previous === items.length) place(bar, '0%', 40, false);
        else place(bar, '100%', 40, false);
      }

      if (!motion) {
        locked = false;
        return;
      }

      locked = true;
      void root.offsetWidth;
      if (forward && previous < items.length) place(items[previous], '-4%', 10, true, 0.94);
      if (forward && clamped < items.length) place(items[clamped], '0%', 20, true);
      if (!forward && previous < items.length) place(items[previous], '100%', 20, true);
      if (!forward && clamped < items.length) place(items[clamped], '0%', 10, true, 1);
      if (bar && showingFooter) place(bar, '0%', 40, true);
      if (bar && !showingFooter && previous === items.length) place(bar, '100%', 40, true);

      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(() => {
        items.forEach((section, i) => {
          place(section, i === top ? '0%' : '100%', i === top ? 2 : 1, false);
          section.style.pointerEvents = i === top ? 'auto' : 'none';
          section.toggleAttribute('inert', i !== top);
        });
        if (bar) {
          place(bar, showingFooter ? '0%' : '100%', 40, false);
          bar.style.pointerEvents = showingFooter ? 'auto' : 'none';
        }
        locked = false;
      }, DURATION_MS + 40);
    };

    const move = (direction) => {
      if (locked) return;
      paint(index + direction, true);
    };

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      event.preventDefault();
      move(event.deltaY > 0 ? 1 : -1);
    };

    const onKeyDown = (event) => {
      const tag = event.target?.tagName;
      const typing =
        tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target?.isContentEditable;
      if (typing) return;
      if (event.key === ' ' && (tag === 'BUTTON' || tag === 'A')) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const items = sectionsIn(root);
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        move(1);
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        move(-1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        if (!locked) paint(0, true);
      } else if (event.key === 'End') {
        event.preventDefault();
        if (!locked) paint(items.length, true);
      }
    };

    const onTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event) => {
      if (event.cancelable) event.preventDefault();
    };

    const onTouchEnd = (event) => {
      const endY = event.changedTouches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - endY;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;
      move(delta > 0 ? 1 : -1);
    };

    const onClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = event.target.closest?.('a[href]');
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
        return;
      }

      const match = sectionIndexForHash(url.hash, sectionsIn(root));
      if (match < 0) return;

      event.preventDefault();
      window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
      if (!locked) paint(match, true);
    };

    const onHashChange = () => {
      const match = sectionIndexForHash(window.location.hash, sectionsIn(root));
      if (match >= 0 && !locked) paint(match, false);
    };

    const initial = sectionIndexForHash(window.location.hash, sectionsIn(root));
    paint(initial >= 0 ? initial : 0, false);

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('click', onClick);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      html.classList.remove('home-scroll');
      window.clearTimeout(releaseTimer);
      for (const section of sectionsIn(root)) {
        section.style.transform = '';
        section.style.transition = '';
        section.style.zIndex = '';
        section.style.pointerEvents = '';
        section.removeAttribute('inert');
      }
      const bar = footer();
      if (bar) {
        bar.style.transform = '';
        bar.style.transition = '';
        bar.style.zIndex = '';
        bar.style.pointerEvents = '';
      }
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative h-dvh w-full overflow-hidden">
      {children}
    </div>
  );
}
