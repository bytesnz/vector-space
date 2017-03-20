declare namespace VectorSpace {
  /// A reference to another object
  export type Reference = any;
  
  export type Coordinate = [ number, number ];
  
  export type SnapPoint = 'tl' | 'tm' | 'tr' | 'mr' | 'br' | 'bm' | 'bl' | 'ml' | 'c';
  
  /// Element in VectorSpace's history
  export interface Step {
    /// Date element was created
    created: Date,
    /// User who created the element
    user?: Reference,
    /// Last time the element was created
    lastModified?: Date,
    /// Last user to modify the element
    lastModifiedUser?: Reference
  };
    
  export interface History {
    /// Date the change took place
    modificationDate: Date,
    /// User who made the change
    user?: Reference,
    /// Previous values
    previousValues: {
      [ key: string ]: any
    }
  };
  
  /// Modification Step
  export interface Modification extends Step {
    /// the element modified
    element: Reference
  };
  
  /// Annotation Element
  export interface Annotation extends Step {
    /// Text of annotation
    annotation: string,
    /// Point that position will be relative to
    snapPoint: SnapPoint,
    /// Coordinates of Annotation relative to the 
    coordinate: Coordinate,
    /// Point coordinated relative to
    relativePoint:
  };  
  
  /// The base element of the objects in the VectorSpace
  export interface Element extends Step {
    /// Type of element
    type: string,
    /// Annotations on the element
    annotations?: Annotation[],
    /// Element's history
    history?: History[]
  };
  
  ///Point Element
  export interface Point extends Element {
    type: 'point',
    point: Coordinate,
    /// Size of point relative to the drawing unit
    size?: number
  };
  
  /// Line Element
  export interface Line extends Element {
    type: 'line',
    /// Path of line
    path: Coordinate[],
    /// Thickness of line relative to the drawing unit
    thickness?: number
  };
  
  /// Image Element
  export interface Image extends Element {
    type: 'image',
    /// Image reference
    image: Reference,
    /// Size of image in pixels
    size: Coordinate
  };
}
