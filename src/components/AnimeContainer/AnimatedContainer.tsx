import * as React from 'react'
import { useTrail, animated } from 'react-spring'

const config = { mass: 20, tension: 2000, friction: 400 }

const AnimeContainer: React.FunctionComponent<{ toggle: boolean }> = ({ toggle, children }) => {
  const trail = useTrail(React.Children.count(children), {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 'auto' : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return (
    <>
      {
        trail.map(({ x, height, ...rest }, index) => (
            <animated.div
              key={index}
              // @ts-ignore
              style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
              <animated.div style={{ height }}>{children[index]}</animated.div>
            </animated.div>
          )
        )
      }
    </>
  )
}

export default AnimeContainer;
