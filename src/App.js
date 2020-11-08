import React, { Component, useEffect, useState } from 'react'
import './App.css'
import * as d3 from 'd3'
import styled from 'styled-components'

function App() {
  const [zoomLevel, setZoomLevel] = useState()
  const height = 800
  const width = 5000

  useEffect(() => {
    drawTimeline()
  }, [])

  const epochs = [
    { from: 0, duration: 1000, end: 1000 },
    { from: 1000, duration: 1500, end: 2500 },
    { from: 2500, duration: 500, end: 3000 },
    { from: 3000, duration: 500, end: 3500 },
    { from: 3500, duration: 1500, end: 5000 },
  ]

  const descriptionData = [
    { time: 1000, text: 'some sdlfjasdf' },
    { time: 2000, text: 'some sdlfjasdf' },
    { time: 3000, text: 'some sdlfjasdf' },
  ]

  const eventLabelsData = [
    { time: 0, text: 'Point 1' },
    { time: 2500, text: 'Point 2' },
    { time: 3500, text: 'Point 3' },
  ]

  const timeLabelsData = [
    { time: 0, text: '5 Billion Years' },
    { time: 1000, text: '4 Billion Years' },
    { time: 2000, text: '3 Billion Years' },
    { time: 3000, text: '2 Billion Years' },
    { time: 4000, text: '1 Billion Years' },
    { time: 5000, text: 'Present' },
  ]

  const extent = [
    [0, 0],
    [954, 0],
  ]

  const scaleExtent = [0.1908, 2]
  const translateExtent = [
    [0, 0],
    [5000, 0],
  ]

  function drawTimeline() {
    const globalScale = width / 5000

    const svg = d3.select('svg').attr('viewBox', [0, 0, width, height * 2])

    const rectanglesGroup = svg.append('g').attr('cursor', 'grab')

    rectanglesGroup
      .selectAll('rect')
      .data(epochs)
      .join('rect')
      .attr('x', ({ from }) => from)
      .attr('y', height / 4)
      .attr('width', ({ duration }) => duration)
      .attr('height', height / 2)
      .attr('fill', (d, i) => d3.interpolateRainbow(i / 5))
      .on('click', (event) => {
        console.log('Clicked', event)
      })

    const description = svg
      .selectAll('description')
      .data(descriptionData)
      .join('g')
      .attr('transform', (d) => 'translate(0,0)')
      .attr('class', 'description')

    description
      .append('text')
      .text((d) => d.text)
      .attr('x', ({ time }) => time)
      .attr('y', height / 2)
      .attr('font-size', 60)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')

    const groupEventLabels = svg
      .append('g')
      .attr('class', 'event-labels')
      .attr('cursor', 'grab')

    const eventLabels = groupEventLabels
      .selectAll('event-labels')
      .data(eventLabelsData)
      .join('g')
      .attr(
        'transform',
        ({ time }) => `translate(${time * globalScale},${height / 2})`
      )

    eventLabels
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 20)
      .attr('r', 1.5)
      .attr('transform-origin', '50% 50%')
      .attr('fill', 'black')

    eventLabels
      .append('text')
      .attr('x', 10)
      .attr('y', 20)
      .attr('text-anchor', 'start')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.text)
      .attr('font-family', 'Verdana, sans-serif')
      .attr('font-size', '60px')
      .attr('fill', 'black')

    eventLabels
      .append('rect')
      .attr('x', -0.5)
      .attr('y', 0)
      .attr('width', 1)
      .attr('height', height * 0.8)
      .attr('stroke', 'black')
      .attr('stroke-width', 0)
      .attr('fill', 'black')

    const groupTimeLabels = svg
      .append('g')
      .attr('class', 'time-labels')
      .attr('cursor', 'grab')

    const timeLabels = groupTimeLabels
      .selectAll('time-labels')
      .data(timeLabelsData)
      .join('g')
      .attr(
        'transform',
        ({ time }) => `translate(${time * globalScale},${height / 2})`
      )

    timeLabels
      .append('circle')
      .attr('cx', 0)
      .attr('cy', height - 20)
      .attr('r', 1.5)
      .attr('transform-origin', '50% 50%')
      .attr('fill', 'black')

    timeLabels
      .append('text')
      .attr('x', 10)
      .attr('y', height - 20)
      .attr('text-anchor', 'start')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.text)
      .attr('font-family', 'Verdana, sans-serif')
      .attr('font-size', '60px')
      .attr('fill', 'black')

    timeLabels
      .append('rect')
      .attr('x', -0.5)
      .attr('y', height * 0.2)
      .attr('width', 1)
      .attr('height', height * 0.8)
      .attr('stroke', 'black')
      .attr('stroke-width', 0)
      .attr('fill', 'black')

    const zoom = d3
      .zoom()
      .extent(extent)
      .scaleExtent(scaleExtent)
      .translateExtent(translateExtent)
      .on('zoom', (event) => {
        const { k, x, y } = event.transform
        setZoomLevel(k)
        rectanglesGroup.attr('transform', `translate(${x}, 0) scale(${k}, 1)`)
        eventLabels.attr(
          'transform',
          ({ time }) => `translate(${x + time * k},10)`
        )
        timeLabels.attr(
          'transform',
          ({ time }) => `translate(${x + time * k}, 10 )`
        )
        const descriptionOpacity = k > 1.3 ? 1 : 0

        description
          .attr('transform', ({ time }) => `translate(${x + time * k}, 10 )`)
          .attr('opacity', descriptionOpacity)
      })

    svg.call(zoom)
    svg.call(zoom.scaleBy, globalScale)
  }

  return <Svg />
}

export default App

const Svg = styled.svg`
  border: 2px solid red;
  margin: 150px;
`
