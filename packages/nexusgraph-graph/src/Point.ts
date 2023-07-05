// Copyright 2023 Paion Data. All rights reserved.
/**
 * Plot a coordinate point
 */
export class Point {
  readonly x: number;
  readonly y: number;

  /**
   * All-args constructor.
   *
   * Define the x and y coordinates of the point
   *
   * @param x The abscissa of a point is used to draw a coordinate point
   * @param y The ordinate of a point is used to draw a coordinate point
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return `${this.x} ${this.y}`;
  }
}
