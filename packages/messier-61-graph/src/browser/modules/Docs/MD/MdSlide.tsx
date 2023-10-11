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
import { StyledSidebarSlide } from 'browser/modules/Carousel/styled'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import Slide from '../../Carousel/Slide'
import { splitMdColumns, splitMdRows } from './splitMd'
import { StyledColumn, StyledRow } from './styled'

type RowProps = { row: string }
const MdRow = ({ row = '' }: RowProps) => (
  <StyledRow>
    {splitMdColumns(row).map((column, index) => (
      <StyledColumn key={index}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            pre({
              className,
              children,
              ...props
            }: React.DetailedHTMLProps<
              React.HTMLAttributes<HTMLPreElement>,
              HTMLPreElement
            >) {
              const isCypherCodeBlock =
                Array.isArray(children) &&
                children[0]?.props?.className?.includes('cypher')
              return (
                <pre
                  className={
                    (className ?? '') +
                    (isCypherCodeBlock ? ' code runnable' : '')
                  }
                  {...props}
                >
                  {children}
                </pre>
              )
            }
          }}
        >
          {column ?? ''}
        </ReactMarkdown>
      </StyledColumn>
    ))}
  </StyledRow>
)

type MdSlideProps = { md: string; isSidebarSlide?: boolean }
const MdSlide = ({
  md = '',
  isSidebarSlide = false
}: MdSlideProps): JSX.Element => (
  <Slide isSidebarSlide={isSidebarSlide}>
    <StyledSidebarSlide>
      {splitMdRows(md).map((row, index) => (
        <MdRow key={index} row={row} />
      ))}
    </StyledSidebarSlide>
  </Slide>
)

export default MdSlide
