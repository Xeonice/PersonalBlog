import React, { Component } from 'react'
import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link'
import gsap from 'gsap'

export default class Cover extends Component {
  constructor(props) {
    super(props)

    this.horizontal = this.horizontal.bind(this)
    this.vertical = this.vertical.bind(this)

    this.cover = React.createRef()
    this.cover2 = React.createRef()
    this.cover3 = React.createRef()
    this.cover4 = React.createRef()
    this.cover5 = React.createRef()
    this.cover6 = React.createRef()
  }

  horizontal = ({ node, props: { length: seconds }, direction }) => {
    const directionTo = direction === 'left' ? '-100%' : '100%'
    const directionFrom = direction === 'left' ? '100%' : '-100%'

    const wait = seconds / 6
    const half = (seconds - wait) / 2

    console.log('seconds', seconds);

    console.log('wait', wait);

    // GSDevTools.create();

    return gsap.timeline()
      .set([this.cover, this.cover1, this.cover2, this.cover3, this.cover4, this.cover5, this.cover6], { y: 0, x: directionFrom, display: 'block' })
      .to([this.cover, this.cover1, this.cover2, this.cover3, this.cover4, this.cover5, this.cover6], {
        x: '0%',
        ease: "power1.easeInOut",
        stagger: {
          each: half / 12,
        },
      })
      .set(node, { opacity: 0 })
      .to(
        [this.cover, this.cover1, this.cover2, this.cover3, this.cover4, this.cover5, this.cover6], {
          x: directionTo,
          ease: "power1.easeOut",
          stagger: {
            each: half / 12,
          }
        }
      )
  }

  vertical = ({ node, props: { length: seconds }, direction }) => {
    const directionTo = direction === 'up' ? '-100%' : '100%'
    const directionFrom = direction === 'up' ? '100%' : '-100%'



    const wait = seconds / 6
    const half = (seconds - wait) / 2

    return gsap.timeline()
      .set(this.cover, { y: directionFrom })
      .to(this.cover, {
        y: '0%',
        ease: "power1.easeInOut",
        duration: half,
      })
      .set(node, { opacity: 0 })
      .to(
        this.cover, {
          y: directionTo,
          ease: "power1.easeIn",
          duration: half,
        },
        `+=${wait}`,
      )
  }

  moveInDirection = ({ props, direction, node }) => {
    if (direction === 'left' || direction === 'right')
      return this.horizontal({ props, direction, node })

    return this.vertical({ props, direction, node })
  }

  render() {
    const direction = this.props.direction || 'left'
    const length = this.props.duration || 4
    const {
      exit: removedExit,
      entry: removedEntry,
      cover: removedProp,
      ...props
    } = this.props
    return (
      <>
        <TransitionLink
          exit={{
            length: length,
            trigger: ({ exit, node }) =>
              this.moveInDirection({
                props: exit,
                node,
                direction,
              }),
          }}
          entry={{
            delay: length / 2,
          }}
          {...props}>
          {this.props.children}
        </TransitionLink>

        <TransitionPortal>
          <div
            ref={n => (this.cover = n)}
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              display: 'none',
            }}
          >
            <div
              ref={n => (this.cover1 = n)}
              style={{
                background: '#F9CD58',
                borderRadius: 50,
                top: 0,
                left: 0,
                width: '100%',
                // width: 'calc(100% + 100px)',
                height: '16.6%',
                transform: 'translateY(300%)',
              }}
            />
            <div
              ref={n => (this.cover2 = n)}
              style={{
                background: '#F9CD58',
                top: 'calc(100vh / 6)',
                borderRadius: 50,
                left: 0,
                width: '100%',
                // width: 'calc(100% + 100px)',
                height: '16.6%',
                transform: 'translateY(300%)',
              }}
            />
            <div
              ref={n => (this.cover3 = n)}
              style={{
                background: '#F9CD58',
                top: 'calc(100vh * 2/ 6)',
                borderRadius: 50,
                left: 0,
                width: '100%',
                // width: 'calc(100% + 100px)',
                height: '16.6%',
                transform: 'translateY(300%)',
              }}
            />
            <div
              ref={n => (this.cover4 = n)}
              style={{
                background: '#F9CD58',
                top: 'calc(100vh * 3/ 6)',
                borderRadius: 50,
                left: 0,
                width: '100%',
                // width: 'calc(100% + 100px)',
                height: '16.6%',
                transform: 'translateY(300%)',
              }}
            />
            <div
              ref={n => (this.cover5 = n)}
              style={{
                background: '#F9CD58',
                top: 'calc(100vh * 4/ 6)',
                borderRadius: 50,
                left: 0,
                width: '100%',
                // width: 'calc(100% + 100px)',
                height: '16.6%',
                transform: 'translateY(300%)',
              }}
            />
            <div
              ref={n => (this.cover6 = n)}
              style={{
                background: '#F9CD58',
                top: 'calc(100vh * 5/ 6)',
                borderRadius: 50,
                left: 0,
                width: '100%',
                // width: 'calc(100% + 100px)',
                height: '16.6%',
                transform: 'translateY(300%)',
              }}
            />
          </div>
        </TransitionPortal>
      </>
    )
  }
}
