import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

import { arrangeChildrenAroundParent, chooseAppendRootPosition, moveNodeTree } from './graph.js'

test('chooseAppendRootPosition places a new root to the right of the current graph', () => {
  const existingNodes = [
    { x: 100, y: 120 },
    { x: 260, y: 80 },
    { x: 220, y: 260 },
  ]

  const position = chooseAppendRootPosition(existingNodes)

  assert.equal(position.x, 780)
  assert.equal(position.y, 170)
})

test('chooseAppendRootPosition leaves room for the new cluster children', () => {
  const existingNodes = [
    { x: 100, y: 120 },
    { x: 260, y: 80 },
    { x: 220, y: 260 },
  ]

  const position = chooseAppendRootPosition(existingNodes)
  const rightEdge = Math.max(...existingNodes.map(n => n.x))

  assert.ok(position.x - rightEdge >= 460)
})

test('arrangeChildrenAroundParent keeps repeated expansions grouped around the root', () => {
  const parent = { x: 400, y: 300 }
  const children = Array.from({ length: 16 }, () => ({ x: 0, y: 0 }))

  arrangeChildrenAroundParent(parent, children)

  const maxDistance = Math.max(...children.map(node => Math.hypot(node.x - parent.x, node.y - parent.y)))
  assert.ok(maxDistance > 285 && maxDistance < 295)
})

test('arrangeChildrenAroundParent expands outward without radius caps', () => {
  const parent = { x: 400, y: 300 }
  const children = Array.from({ length: 25 }, () => ({ x: 0, y: 0 }))

  arrangeChildrenAroundParent(parent, children)

  const outerDistance = Math.hypot(children[24].x - parent.x, children[24].y - parent.y)
  assert.ok(outerDistance > 505 && outerDistance < 515)
})

test('moveNodeTree keeps descendants attached when a child is repositioned', () => {
  const nodes = [
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 140, y: 140 },
    { id: 3, x: 170, y: 160 },
  ]
  const edges = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ]

  moveNodeTree(nodes[1], 200, 220, nodes, edges)

  assert.equal(nodes[1].x, 200)
  assert.equal(nodes[1].y, 220)
  assert.equal(nodes[2].x, 230)
  assert.equal(nodes[2].y, 240)
})

test('spring node movement does not use transient CSS transforms', () => {
  const source = readFileSync(new URL('./graph.js', import.meta.url), 'utf8')

  assert.doesNotMatch(source, /\.el\.style\.transform/)
})
