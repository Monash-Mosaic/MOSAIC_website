'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, Observer);

const DURATION = 0.9;
const EASE = 'power3.inOut';
const COVERED_SCALE = 0.94;
const WHEEL_THRESHOLD = 16;

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

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const html = document.documentElement;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        html.classList.add('home-scroll');

        const items = sectionsIn(root);
        let index = 0;
        let locked = false;
        let footerSlot = null;

        const scrollableFrom = (start) => {
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
        };

        const canScroll = (element, delta) => {
          if (!element || delta === 0) return false;
          if (delta > 0) return element.scrollTop + element.clientHeight < element.scrollHeight - 2;
          return element.scrollTop > 2;
        };

        const attachFooter = () => {
          const bar = document.querySelector('footer');
          const last = items.at(-1);
          if (!bar || !last || bar.parentElement === last) return;
          footerSlot = { parent: bar.parentElement, next: bar.nextSibling };
          last.appendChild(bar);
        };

        const detachFooter = () => {
          const bar = document.querySelector('footer');
          if (!bar || !footerSlot?.parent) return;
          footerSlot.parent.insertBefore(bar, footerSlot.next);
          footerSlot = null;
        };

        const stack = (current, animate) => {
          const motion = animate && !prefersReducedMotion();
          const duration = motion ? DURATION : 0;

          items.forEach((section, i) => {
            const isCurrent = i === current;
            section.toggleAttribute('inert', !isCurrent);
            section.style.pointerEvents = isCurrent ? 'auto' : 'none';

            gsap.to(section, {
              yPercent: i > current ? 100 : 0,
              scale: i < current ? COVERED_SCALE : 1,
              zIndex: i + 1,
              duration,
              ease: EASE,
              overwrite: true,
              transformOrigin: 'center center',
            });
          });

          if (!motion) {
            locked = false;
            return;
          }

          locked = true;
          gsap.delayedCall(duration, () => {
            locked = false;
          });
        };

        const paint = (nextIndex, animate) => {
          if (!items.length) return;
          const clamped = Math.max(0, Math.min(nextIndex, items.length - 1));
          if (animate && clamped === index) return;

          const forward = clamped > index;
          index = clamped;
          window.dispatchEvent(
            new CustomEvent('home-scroll', { detail: { direction: forward && clamped > 0 ? 1 : -1 } }),
          );
          stack(clamped, animate);
        };

        const move = (direction) => {
          if (locked) return;
          const next = Math.max(0, Math.min(index + direction, items.length - 1));
          if (next === index) return;
          locked = true;
          paint(next, true);
        };

        const tryMove = (self, direction) => {
          if (locked) {
            if (self.event?.cancelable) self.event.preventDefault();
            return;
          }

          const target = self.event?.target;
          const inner =
            target instanceof Element && target.closest('header') ? null : scrollableFrom(target);
          if (canScroll(inner, direction)) return;

          if (self.event?.cancelable) self.event.preventDefault();
          move(direction);
        };

        attachFooter();
        const initial = sectionIndexForHash(window.location.hash, items);
        paint(initial >= 0 ? initial : 0, false);

        const observer = Observer.create({
          type: 'wheel,touch',
          wheelSpeed: -1,
          tolerance: WHEEL_THRESHOLD,
          preventDefault: false,
          onUp: (self) => tryMove(self, 1),
          onDown: (self) => tryMove(self, -1),
        });

        const onKeyDown = (event) => {
          const tag = event.target?.tagName;
          const typing =
            tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target?.isContentEditable;
          if (typing) return;
          if (event.key === ' ' && (tag === 'BUTTON' || tag === 'A')) return;
          if (event.metaKey || event.ctrlKey || event.altKey) return;

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
            if (!locked) paint(items.length - 1, true);
          }
        };

        const onClick = (event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
          }

          const link = event.target.closest?.('a[href]');
          if (!link) return;

          const url = new URL(link.href, window.location.href);
          if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
            return;
          }

          const match = sectionIndexForHash(url.hash, items);
          if (match < 0) return;

          event.preventDefault();
          event.stopPropagation();
          window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
          if (!locked) paint(match, true);
        };

        const onHashChange = () => {
          const match = sectionIndexForHash(window.location.hash, items);
          if (match >= 0 && !locked) paint(match, false);
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('click', onClick, true);
        window.addEventListener('hashchange', onHashChange);

        return () => {
          observer.kill();
          gsap.killTweensOf(items);
          window.removeEventListener('keydown', onKeyDown);
          window.removeEventListener('click', onClick, true);
          window.removeEventListener('hashchange', onHashChange);
          detachFooter();
          items.forEach((section) => {
            gsap.set(section, { clearProps: 'transform,zIndex' });
            section.style.pointerEvents = '';
            section.removeAttribute('inert');
          });
          html.classList.remove('home-scroll');
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative w-full md:h-dvh md:overflow-hidden">
      {children}
    </div>
  );
}
