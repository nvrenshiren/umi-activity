import React from 'react'
import { Box } from '@material-ui/core'
import { BoxProps } from '@material-ui/core/Box'

interface Props {
  sound?: boolean
  maxRocket?: number
  maxParticle?: number
  config?: BoxProps
}

interface Pos {
  x: number
  y: number
}

interface RocketData {
  element: HTMLElement
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  buffer: HTMLCanvasElement
  bufferContext: CanvasRenderingContext2D
  particles: Particle[]
  rockets: Rocket[]
  interval: NodeJS.Timeout
  sound?: boolean
  maxRocket?: number
  maxParticle?: number
}

export default class FireWorksUtil extends React.PureComponent<Props> {
  constructor(props: any) {
    super(props)
  }
  fireworkScene: HTMLCanvasElement
  render() {
    const { config } = this.props
    return (
      <Box {...config} id="firework-box">
        <canvas
          id="firework-scene"
          ref={(node) => {
            this.fireworkScene = node
          }}
        />
      </Box>
    )
  }
  data: RocketData
  componentDidMount() {
    const { sound, maxRocket, maxParticle } = this.props
    let buffer = document.createElement('canvas')
    this.data = {
      element: document.getElementById('firework-box'),
      canvas: this.fireworkScene,
      context: this.fireworkScene.getContext('2d'),
      buffer: buffer,
      bufferContext: buffer.getContext('2d'),
      particles: [],
      rockets: [],
      interval: null,
      maxRocket,
      maxParticle,
      sound
    }
    this.fireworkScene.style.position = 'absolute'
    this.fireworkScene.style.top = '0px'
    this.fireworkScene.style.bottom = '0px'
    this.fireworkScene.style.left = '0px'
    this.fireworkScene.style.right = '0px'
    this.data.interval = setInterval(() => {
      loop(this.data)
    }, 1000 / 50)
  }
  componentWillUnmount() {
    clearInterval(this.data.interval)
    this.data.canvas.remove()
  }
}

const fireworkAudio = require('@/statics/audio/fireworks.mp3')
function loop(data: RocketData) {
  launch(data)
  if (data.canvas.width != data.element.offsetWidth) {
    data.canvas.width = data.buffer.width = data.element.offsetWidth
  }
  if (data.canvas.height != data.element.offsetHeight) {
    data.canvas.height = data.buffer.height = data.element.offsetHeight
  }
  data.bufferContext.clearRect(0, 0, data.canvas.width, data.canvas.height)
  data.bufferContext.globalAlpha = 0.9
  data.bufferContext.drawImage(data.canvas, 0, 0)
  data.context.clearRect(0, 0, data.canvas.width, data.canvas.height)
  data.context.drawImage(data.buffer, 0, 0)
  let existingRockets: Rocket[] = []
  data.rockets.forEach((rocket) => {
    rocket.update()
    rocket.render(data.context)
    const randomChance =
      rocket.pos.y < (data.canvas.height * 2) / 3
        ? Math.random() * 100 <= 1
        : false
    if (
      rocket.pos.y < data.canvas.height / 5 ||
      rocket.vel.y >= 0 ||
      randomChance
    ) {
      rocket.explode(data)
    } else {
      existingRockets.push(rocket)
    }
  })
  data.rockets = existingRockets
  var existingParticles: Particle[] = []
  data.particles.forEach((particle) => {
    particle.update()
    if (particle.exists) {
      particle.render(data.context)
      existingParticles.push(particle)
    }
  })
  data.particles = existingParticles
  while (data.particles.length > (data.maxParticle || 500)) {
    data.particles.shift()
  }
}
function launch(data: RocketData) {
  if (data.rockets.length < (data.maxRocket || 10)) {
    var rocket = new Rocket(data)
    const audio = document.createElement('audio')
    audio.src = fireworkAudio
    audio.play()
    data.rockets.push(rocket)
  }
}

class Particle {
  constructor(pos: Pos = { x: 0, y: 0 }) {
    this.pos = Object.assign({}, pos)
    this.vel = { x: 0, y: 0 }
    this.shrink = 0.97
    this.size = 2
    this.resistance = 1
    this.gravity = 0
    this.flick = false
    this.alpha = 1
    this.fade = 0
    this.color = 0
  }
  pos: Pos
  vel: Pos
  shrink: number
  size: number
  resistance: number
  gravity: number
  flick: boolean
  alpha: number
  fade: number
  color: number
  update() {
    this.vel.x *= this.resistance
    this.vel.y *= this.resistance
    this.vel.y += this.gravity
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.size *= this.shrink
    this.alpha -= this.fade
  }
  render(context: CanvasRenderingContext2D) {
    if (!this.exists()) {
      return
    }
    context.save()
    context.globalCompositeOperation = 'lighter'
    const { x, y } = this.pos
    const r = this.size / 2
    var gradient = context.createRadialGradient(x, y, 0.1, x, y, r)
    gradient.addColorStop(0.1, 'rgba(255,255,255,' + this.alpha + ')')
    gradient.addColorStop(
      0.8,
      'hsla(' + this.color + ', 100%, 50%, ' + this.alpha + ')'
    )
    gradient.addColorStop(1, 'hsla(' + this.color + ', 100%, 50%, 0.1)')
    context.fillStyle = gradient
    context.beginPath()
    context.arc(
      x,
      y,
      this.flick ? Math.random() * this.size : this.size,
      0,
      Math.PI * 2,
      true
    )
    context.closePath()
    context.fill()
    context.restore()
  }
  exists() {
    return this.alpha >= 0.1 && this.size >= 1
  }
}

class Rocket extends Particle {
  constructor(data: RocketData) {
    super({
      x: (Math.random() * data.canvas.width * 2) / 3 + data.canvas.width / 6,
      y: data.canvas.height
    })
  }
  vel: Pos = { x: Math.random() * 6 - 3, y: Math.random() * -3 - 4 }
  size = 2
  shrink = 0.999
  gravity = 0.01
  explosionColor = Math.floor((Math.random() * 360) / 10) * 10
  explode(data: RocketData) {
    const count = Math.random() * 10 + 80
    console.log('爆炸')
    for (let i = 0; i < count; i++) {
      let particle = new Particle(this.pos)
      let angle = Math.random() * Math.PI * 2
      let speed = Math.cos((Math.random() * Math.PI) / 2) * 15
      particle.vel.x = Math.cos(angle) * speed
      particle.vel.y = Math.sin(angle) * speed
      particle.size = 10
      particle.gravity = 0.2
      particle.resistance = 0.92
      particle.shrink = Math.random() * 0.05 + 0.93
      particle.flick = true
      particle.color = this.explosionColor
      data.particles.push(particle)
    }
  }
  render(context: CanvasRenderingContext2D) {
    if (!this.exists()) {
      return
    }
    context.save()
    context.globalCompositeOperation = 'lighter'
    const { x, y } = this.pos
    const r = this.size / 2
    const gradient = context.createRadialGradient(x, y, 0.1, x, y, r)
    gradient.addColorStop(0.1, 'rgba(255, 255, 255 ,' + this.alpha + ')')
    gradient.addColorStop(0.2, 'rgba(255, 180, 0, ' + this.alpha + ')')
    context.fillStyle = gradient
    context.beginPath()
    context.arc(
      x,
      y,
      this.flick ? (Math.random() * this.size) / 2 + this.size / 2 : this.size,
      0,
      Math.PI * 2,
      true
    )
    context.closePath()
    context.fill()
    context.restore()
  }
}
