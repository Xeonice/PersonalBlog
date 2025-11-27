import * as React from 'react';
import { useTrail, animated } from 'react-spring';

const config = { mass: 20, tension: 2000, friction: 400 };

const AnimeContainer: React.FunctionComponent<{ toggle: boolean; children: React.ReactNode[] }> = function ({ toggle, children }) {
  const trail = useTrail(React.Children.count(children), {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 'auto' : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <>
      {
        trail.map(({ x, height, ...rest }, index) => {
          const AnimatedDiv = animated.div as any;
          return (
            <AnimatedDiv
              key={index}
              style={{ ...rest, transform: (x as any).interpolate ? (x as any).interpolate((x: number) => `translate3d(0,${x}px,0)`) : `translate3d(0,${x}px,0)` }}
            >
              <AnimatedDiv style={{ height }}>{children[index]}</AnimatedDiv>
            </AnimatedDiv>
          );
        })
      }
    </>
  );
};

export default AnimeContainer;
