// __tests__/core/TimeEdge.test.ts

import { TimeEdge } from '../../src/core/TimeEdge';
import { TimePoint } from '../../src/core/TimePoint';

describe('TimeEdge', () => {
  let fromPoint: TimePoint;
  let toPoint: TimePoint;
  let edge: TimeEdge;

  beforeEach(() => {
    fromPoint = new TimePoint('from', 0, TimePoint.SECOND, 'UTC');
    toPoint = new TimePoint('to', 3600, TimePoint.SECOND, 'UTC');
    edge = new TimeEdge('edge1', fromPoint, toPoint, 'next');
  });

  it('should create a TimeEdge instance', () => {
    expect(edge).toBeInstanceOf(TimeEdge);
    expect(edge.id).toBe('edge1');
    expect(edge.fromPoint).toBe(fromPoint);
    expect(edge.toPoint).toBe(toPoint);
    expect(edge.relationship).toBe('next');
    expect(edge.weight).toBe(1);
  });

  it('should create a TimeEdge instance with custom weight', () => {
    const weightedEdge = new TimeEdge('edge2', fromPoint, toPoint, 'custom', 2);
    expect(weightedEdge.weight).toBe(2);
  });

  it('should correctly identify duplicate edges', () => {
    const edge1 = new TimeEdge('edge1', fromPoint, toPoint, 'next');
    const edge2 = new TimeEdge('edge2', fromPoint, toPoint, 'next');
    const edge3 = new TimeEdge('edge3', toPoint, fromPoint, 'previous');
    const edge4 = new TimeEdge('edge4', fromPoint, toPoint, 'custom');

    expect(edge1.isDuplicate(edge2)).toBe(true);
    expect(edge1.isDuplicate(edge3)).toBe(false);
    expect(edge1.isDuplicate(edge4)).toBe(false);
  });
});