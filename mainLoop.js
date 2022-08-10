function mainLoop(func_frameRender) {
  let proto_mainLoop = {};
  let animating = false;

  proto_mainLoop.start = () => {
    if (isAnimating()) {
      return;
    }

    setIsAnimating(true);
    tic();

    report("Main loop started");
  };

  proto_mainLoop.stop = () => {
    if (!isAnimating()) {
      return;
    }

    setIsAnimating(false);

    report("Main loop stopped");
  };

  proto_mainLoop.next = () => {
    window.requestAnimationFrame(func_frameRender);
  }

  function isAnimating() {
    return animating === true;
  }

  function setIsAnimating(value) {
    animating = value;
  }

  function tic() {
    if (!isAnimating()) {
      return;
    }

    func_frameRender();
    window.requestAnimationFrame(tic);
  }

  function proto_start() {
    if (isAnimating()) {
      return;
    }

    setIsAnimating(true);
    tic();

    report("Main loop started");
  }

  return proto_mainLoop;
}
