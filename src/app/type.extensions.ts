export {};


declare global {
  interface Number {
    between(start: number, end: number, include?: boolean): boolean;
  }

  interface Object {
    isObjectEmpty(): boolean;
  }

  interface String {
    capitalizeFirstLetter(): string;
  }
}
String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Number.prototype.between = function( start, end ) {
  return ( this >= start && this <= end );
};
