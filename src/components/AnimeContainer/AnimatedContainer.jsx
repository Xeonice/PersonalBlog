import React from 'react'
import { useTrail, animated } from 'react-spring'

const config = { mass: 20, tension: 2000, friction: 400 }

export default function AnimeContainer({ toggle, children }) {
  const trail = useTrail(children.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 'auto' : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return trail.map(({ x, height, ...rest }, index) => (
      <animated.div
        key={index}
        style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
        <animated.div style={{ height }}>{children[index]}</animated.div>
      </animated.div>
    )
  )
}
