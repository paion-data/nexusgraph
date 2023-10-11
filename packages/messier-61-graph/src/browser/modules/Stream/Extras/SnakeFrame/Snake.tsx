/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react'
import styled from 'styled-components'

import {
  DOWN,
  LEFT,
  RIGHT,
  UP,
  doesCollide,
  foodColor,
  getInitialState,
  maxSpeed,
  newFood,
  rect,
  snakeColor,
  transitionDirection
} from './helpers'

const SnakeCanvas = styled.canvas`
  border: 1px solid #787878;
  &:focus {
    outline: none;
  }
`

class SnakeFrame extends React.Component<any> {
  canvas = React.createRef<any>()
  ctx: any = null
  gameState: any = getInitialState(
    this.props.play,
    this.props.width,
    this.props.height,
    this.props.gridSize
  )

  blockInput = false
  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d')
    this.canvas.current.addEventListener('keydown', (ev: any) => {
      const { key } = ev
      if (this.blockInput) {
        return
      }
      const allowedKeys: any = {
        ArrowDown: DOWN,
        ArrowUp: UP,
        ArrowLeft: LEFT,
        ArrowRight: RIGHT,
        s: DOWN,
        w: UP,
        a: LEFT,
        d: RIGHT
      }
      if (!Object.keys(allowedKeys).includes(key)) {
        return
      }
      this.blockInput = true
      this.gameState.snake.direction = transitionDirection(
        this.gameState.snake.direction,
        allowedKeys[key]
      )
    })
    this.updateCanvas()
  }

  componentDidUpdate() {
    if (this.gameState.play !== this.props.play) {
      this.gameState.play = this.props.play
      if (this.props.play) {
        this.canvas.current.focus()
        this.reset()
        this.updateCanvas()
      }
    }
  }

  reset = () => {
    this.gameState = getInitialState(
      this.props.play,
      this.props.width,
      this.props.height,
      this.props.gridSize
    )
  }

  drawFood = () => {
    this.ctx.fillStyle = foodColor
    rect({
      ctx: this.ctx,
      x: this.gameState.food.x,
      y: this.gameState.food.y,
      width: this.gameState.snake.width,
      height: this.gameState.snake.height
    })
  }

  drawSnake = () => {
    this.ctx.fillStyle = snakeColor
    const { snake } = this.gameState
    snake.body.forEach((part: any) => {
      rect({
        ctx: this.ctx,
        x: part.x,
        y: part.y,
        width: snake.width,
        height: snake.height
      })
    })
  }

  drawWorld = () => {
    const { color, width, height } = this.gameState.world
    this.ctx.fillStyle = color
    rect({
      ctx: this.ctx,
      x: 0,
      y: 0,
      width: width,
      height: height
    })
  }

  calcNextHeadPos = (): any => {
    let { x, y } = this.gameState.snake.body[0]
    if (this.gameState.snake.direction === UP) {
      y -= this.gameState.step
      return { x, y }
    }
    if (this.gameState.snake.direction === DOWN) {
      y += this.gameState.step
      return { x, y }
    }
    if (this.gameState.snake.direction === LEFT) {
      x -= this.gameState.step
      return { x, y }
    }
    if (this.gameState.snake.direction === RIGHT) {
      x += this.gameState.step
      return { x, y }
    }
  }

  growSnake = () => {
    this.gameState.snake.body.unshift(this.gameState.snake.body[0])
  }

  eatMaybe = () => {
    const { x, y } = this.gameState.snake.body[0]
    const { x: fx, y: fy } = this.gameState.food
    if (x === fx && y === fy) {
      newFood(this.gameState)
      this.growSnake()
      this.props.onEat && this.props.onEat(this.gameState.snake.body.length)
      this.setNewSpeed()
    }
  }

  setNewSpeed = () => {
    const speedLen =
      this.gameState.snake.body.length % 5
        ? this.gameState.speed
        : this.gameState.speed - 1
    this.gameState.speed = Math.max(speedLen, maxSpeed)
  }

  updateCanvas = () => {
    if (this.gameState.frame % this.gameState.speed) {
      this.tick()
      return
    }
    this.blockInput = false
    if (!this.gameState.play) {
      return
    }
    if (!this.canvas || !this.canvas.current) {
      return
    }
    if (!this.gameState.play) {
      return
    }
    this.ctx.clearRect(
      0,
      0,
      this.gameState.world.width,
      this.gameState.world.height
    )
    this.drawWorld()
    const { x, y } = this.calcNextHeadPos()
    if (doesCollide({ x, y }, this.gameState)) {
      this.drawFood()
      this.drawSnake()
      this.props.onDie && this.props.onDie()
      return
    }
    this.gameState.snake.body.unshift({ x, y })
    this.gameState.snake.body.pop()
    this.drawFood()
    this.drawSnake()
    this.eatMaybe()
    this.tick()
  }

  tick = () => {
    this.gameState.frame++
    window.requestAnimationFrame(() => {
      this.updateCanvas()
    })
  }

  render() {
    return (
      <SnakeCanvas
        tabIndex={1}
        ref={this.canvas}
        width={this.gameState.world.width}
        height={this.gameState.world.height}
      />
    )
  }
}
export default SnakeFrame
