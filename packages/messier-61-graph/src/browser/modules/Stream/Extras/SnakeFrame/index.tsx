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

import FrameBodyTemplate from '../../../Frame/FrameBodyTemplate'
import { PaddedDiv } from '../../styled'
import Score from './Score'
import Snake from './Snake'
import { foodColor, worldColor } from './helpers'
import { FormButton } from 'browser/components/buttons/index'

const width = 600
const height = 300

const GameDiv = styled.div<{ width: number; height: number }>`
  margin: 30px auto;
  width: ${props => props.width}px;
  height: ${props => props.height + 50}px;
`

const SplashScreen = styled(GameDiv)<{ backgroundColor: string }>`
  background-color: ${props => props.backgroundColor};
`

const SplashContents = styled.div`
  height: auto;
  padding: 100px auto;
  text-align: center;
  p {
    color: white;
    margin-top: 10px;
  }
  h2 {
    color: white;
    padding-top: 50px;
  }
  button {
    margin-top: 100px;
  }
`

export const InitialStartButton: any = styled(FormButton)<{
  backgroundColor: string
}>`
  background-color: ${props => props.backgroundColor};
  color: #ffffff;
`

type SnakeFrameState = any

export class SnakeFrame extends React.Component<{}, SnakeFrameState> {
  state = {
    score: 0,
    play: false,
    initialLoad: true
  }

  setScore = (score: any) => {
    this.setState({ score: score - 1 })
  }

  stop = () => {
    this.setState({ play: false })
  }

  play = () => {
    this.setState({ play: true, score: 0, initialLoad: false })
  }

  render() {
    const game = (
      <GameDiv
        width={width}
        height={height}
        style={{ display: this.state.initialLoad ? 'none' : 'block' }}
      >
        <Snake
          play={this.state.play}
          width={width}
          height={height}
          gridSize={20}
          onEat={this.setScore}
          onDie={this.stop}
        />
        <Score
          initialLoad={this.state.initialLoad}
          playing={this.state.play}
          score={this.state.score}
        />
        {!this.state.play && (
          <FormButton onClick={this.play}>Start game!</FormButton>
        )}
      </GameDiv>
    )
    const splash = this.state.initialLoad && (
      <SplashScreen width={width} height={height} backgroundColor={worldColor}>
        <SplashContents>
          <h2>Snake game!</h2>
          <InitialStartButton backgroundColor={foodColor} onClick={this.play}>
            Start the game!
          </InitialStartButton>
          <p>
            Use <strong>arrow keys</strong> or <strong>a-s-w-d</strong> to
            control the snake.
            <br />
            How much can you eat?
          </p>
        </SplashContents>
      </SplashScreen>
    )
    return (
      <PaddedDiv>
        {game}
        {splash}
      </PaddedDiv>
    )
  }
}

const Frame = (props: any) => {
  return (
    <FrameBodyTemplate
      isCollapsed={props.isCollapsed}
      isFullscreen={props.isFullscreen}
      contents={<SnakeFrame {...props} />}
    />
  )
}
export default Frame
