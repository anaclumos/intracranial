import React, { useEffect } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import BrowserOnly from '@docusaurus/BrowserOnly'

const GraphView = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const N = 300
  const gData = {
    nodes: [...Array.from(Array(N).keys())].map((i) => ({
      id: i,
    })),
    links: [...Array.from(Array(N).keys())]
      .filter((id) => id)
      .map((id) => ({
        source: id,
        target: Math.round(Math.random() * (id - 1)),
      })),
  }

  return (
    <div className={styles.graphView}>
      <div className={styles.graphView__title}>
        <h1>Graph View</h1>
        <BrowserOnly>
          {() => {
            const {
              ForceGraph3D,
            } = require('react-force-graph')
            return (
              <ForceGraph3D
                graphData={gData}
                backgroundColor="#1b1b1d"
              />
            )
          }}
        </BrowserOnly>
      </div>
    </div>
  )
}

export default function Graph(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={siteConfig.tagline}
    >
      <main className={styles.mainContainer}>
        <GraphView />
      </main>
    </Layout>
  )
}
