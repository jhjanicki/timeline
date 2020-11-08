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

  const levelTwoLabelsData = [
    { time: 1000, text: 'some sdlfjasdf' },
    { time: 2000, text: 'some sdlfjasdf' },
    { time: 3000, text: 'some sdlfjasdf' },
  ]

  const levelOneData = [
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

  function drawTimeline() {
    const globalScale = width / 5000

    const svg = d3.select('svg').attr('viewBox', [0, 0, width, height * 2])
    // ------------------------------------------------------------------------------
    // RECTANGLES
    // ------------------------------------------------------------------------------

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
    // ------------------------------------------------------------------------------
    // TIME LABELS
    // ------------------------------------------------------------------------------

    const groupTimeLabels = svg
      .append('g')
      .attr('class', 'time-labels')
      .attr('cursor', 'grab')

    const timeLabels = groupTimeLabels
      .selectAll('time-labels')
      .data(timeLabelsData)
      .join('g')

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

    // ------------------------------------------------------------------------------
    // LEVEL ONE LABELS
    // ------------------------------------------------------------------------------
    const levelOneGroups = svg
      .append('g')
      .attr('class', 'event-labels')
      .attr('cursor', 'grab')

    const levelOneLabels = levelOneGroups
      .selectAll('event-labels')
      .data(levelOneData)
      .join('g')

    levelOneLabels
      .append('text')
      .attr('x', 10)
      .attr('y', 20)
      .attr('text-anchor', 'start')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.text)
      .attr('font-family', 'Verdana, sans-serif')
      .attr('font-size', '60px')
      .attr('fill', 'black')

    levelOneLabels
      .append('rect')
      .attr('x', -0.5)
      .attr('y', 0)
      .attr('width', 1)
      .attr('height', height * 0.8)
      .attr('stroke', 'black')
      .attr('stroke-width', 0)
      .attr('fill', 'black')

    // ------------------------------------------------------------------------------
    // LEVEL TWO LABELS
    // ------------------------------------------------------------------------------
    const levelTwoLabels = svg
      .selectAll('levelTwoLabels')
      .data(levelTwoLabelsData)
      .join('g')
      .attr('class', 'levelTwoLabels')

    levelTwoLabels
      .append('text')
      .text((d) => d.text)
      .attr('x', ({ time }) => time)
      .attr('y', height / 2)
      .attr('font-size', 60)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')

    // ------------------------------------------------------------------------------
    // ZOOM
    // ------------------------------------------------------------------------------

    const extent = [
      [0, 0],
      [954, 0],
    ]

    const scaleExtent = [0.1908, 2] // limits amount you can zoom in and out

    const translateExtent = [
      [-(width * 2), 0], // [x0, y0] top left corner ... not sure why it needs to be this but seems to center it when you zoom out
      [width, 0], // [x1, y1] bottom right corner
    ]
    const zoom = d3
      .zoom()
      .extent(extent)
      .scaleExtent(scaleExtent)
      .translateExtent(translateExtent)
      .on('zoom', (event) => {
        const { k, x, y } = event.transform
        setZoomLevel(k)
        rectanglesGroup.attr('transform', `translate(${x}, 0) scale(${k}, 1)`)
        levelOneLabels.attr(
          'transform',
          ({ time }) => `translate(${x + time * k},10)`
        )
        timeLabels.attr(
          'transform',
          ({ time }) => `translate(${x + time * k}, 10 )`
        )
        const levelTwoLabelsOpacity = k > 1.3 ? 1 : 0

        levelTwoLabels
          .attr('transform', ({ time }) => `translate(${x + time * k}, 10 )`)
          .attr('opacity', levelTwoLabelsOpacity)
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
