import { useEffect } from "react";

export default function Header({
  headerRef,
  glowRef,
  kathleenRef,
  titleRowRef,
  portfRef,
  cutLineRef,
  chanRef
}) {
  useEffect(() => {
    const portf = portfRef.current;
    const cutLine = cutLineRef.current;

    let progress = 0;
    let stretchDone = false;
    let rotationDone = false;
    let animationDone = false;

    const handleWheel = (e) => {
      if (animationDone) return;

      e.preventDefault();
      e.stopPropagation();

      progress += e.deltaY * 0.002;
      progress = Math.max(0, Math.min(progress, 1));

      const fBox = portf.getBoundingClientRect();
      const centerX = fBox.left + fBox.width * 0.93;
      const centerY = fBox.top + fBox.height * 0.46;

      const italicAngle = 32;
      const finalAngle = 115;
      const maxLength = window.innerHeight * 1.4;
      const length = Math.min(maxLength, progress * maxLength);

      // Phase 1: Stretch
      if (!stretchDone) {
        cutLine.style.top = centerY + "px";
        cutLine.style.left = centerX + "px";
        cutLine.style.opacity = 1;
        cutLine.style.height = `${maxLength}px`;
        cutLine.style.transform = `translate(-50%, -50%) rotate(${italicAngle}deg) scaleY(${
          length / maxLength
        })`;

        if (length >= maxLength) {
          stretchDone = true;
          progress = 0;
        }
        return;
      }

      // Phase 2: Rotate
      if (stretchDone && !rotationDone) {
        const rotateProgress = progress;
        const rotation = italicAngle + (finalAngle - italicAngle) * rotateProgress;
        cutLine.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scaleY(1)`;

        if (rotateProgress >= 1) {
          rotationDone = true;
          progress = 0;
        }
        return;
      }

      // Phase 3: Arrow shoot
      if (rotationDone) {
        animationDone = true;
        animateArrowShoot(cutLine, finalAngle);
      }
    };

    const animateArrowShoot = (cutLine, finalAngle) => {
      const pullBackDistance = 80;
      const shootForwardDistance = window.innerHeight * 1.5;
      const pullBackDuration = 300;
      const shootDuration = 400;

      let startTime = performance.now();

      function animatePullBack(time) {
        const t = Math.min((time - startTime) / pullBackDuration, 1);
        const easeOut = 1 - Math.pow(1 - t, 2);

        const offsetX = pullBackDistance * easeOut;
        const offsetY = pullBackDistance * 0.5 * easeOut;

        cutLine.style.transform = `
          translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
          rotate(${finalAngle}deg)
          scaleY(1)
        `;

        if (t < 1) {
          requestAnimationFrame(animatePullBack);
        } else {
          startTime = performance.now();
          requestAnimationFrame(animateShootForward);
        }
      }

      function animateShootForward(time) {
        const t = Math.min((time - startTime) / shootDuration, 1);
        const easeIn = t * t * t;

        const startX = pullBackDistance;
        const startY = pullBackDistance * 0.5;
        const offsetX = startX - (startX + shootForwardDistance) * easeIn;
        const offsetY = startY - (startY + shootForwardDistance * 0.5) * easeIn;

        cutLine.style.transform = `
          translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
          rotate(${finalAngle}deg)
          scaleY(1)
        `;

        if (t < 1) {
          requestAnimationFrame(animateShootForward);
        } else {
          finishAnimation();
        }
      }

      const finishAnimation = () => {
        cutLine.style.opacity = 0;

        const titleRow = titleRowRef.current;
        titleRow.style.transition = "opacity 0.1s ease-out";

        const kathleen = kathleenRef.current;
        const chan = chanRef.current;
        const navName = document.querySelector('.nav-name');

        const navNameRect = navName.getBoundingClientRect();
        const kathleenRect = kathleen.getBoundingClientRect();
        const chanRect = chan.getBoundingClientRect();

        const scaleFactor = 18 / 30;

        const targetX = navNameRect.left;
        const targetY = navNameRect.top + navNameRect.height / 2;

        const kathleenCenterX = kathleenRect.left + kathleenRect.width / 2;
        const kathleenCenterY = kathleenRect.top + kathleenRect.height / 2;
        const kathleenFinalWidth = kathleenRect.width * scaleFactor;
        const kathleenTargetCenterX = targetX + kathleenFinalWidth / 2;
        const kathleenDeltaX = kathleenTargetCenterX - kathleenCenterX;
        const kathleenDeltaY = targetY - kathleenCenterY;

        const chanCenterX = chanRect.left + chanRect.width / 2;
        const chanCenterY = chanRect.top + chanRect.height / 2;
        const chanFinalWidth = chanRect.width * scaleFactor;
        const chanTargetCenterX = targetX + kathleenFinalWidth + 5 + chanFinalWidth / 2;
        const chanDeltaX = chanTargetCenterX - chanCenterX;
        const chanDeltaY = targetY - chanCenterY;

        kathleen.style.transition = "transform 0.2s ease-out";
        kathleen.style.transform = `translate(${kathleenDeltaX}px, ${kathleenDeltaY}px) scale(${scaleFactor})`;

        chan.style.transition = "transform 0.2s ease-out";
        chan.style.transform = `translate(${chanDeltaX}px, ${chanDeltaY}px) scale(${scaleFactor})`;

        setTimeout(() => {
          navName.style.opacity = 1;
          kathleen.style.opacity = 0;
          chan.style.opacity = 0;
          document.body.classList.remove("lock-scroll");
        });
      };

      requestAnimationFrame(animatePullBack);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [portfRef, cutLineRef, kathleenRef, chanRef, titleRowRef]);

  return (
    <header className="dark-header" ref={headerRef}>
      <div className="header-glow" ref={glowRef}></div>
      <div className="oblique kathleen" ref={kathleenRef}>
        Kathleen
      </div>
      <div className="title-row" ref={titleRowRef}>
        <span className="pinyon-script-regular portf" ref={portfRef}>
          Portf
        </span>
        <span className="brogetta olio">Olio</span>
      </div>
      <div className="cut-line" ref={cutLineRef}></div>
      <div className="oblique chan" ref={chanRef}>
        Chan
      </div>
    </header>
  );
}