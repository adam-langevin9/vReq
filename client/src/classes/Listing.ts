export class Listing {
  crosslistings: Array<string>;
  selectedListing: string;

  constructor(crosslistings: Array<string>, selectedListing?: string) {
    this.crosslistings = crosslistings;
    this.selectedListing = selectedListing ?? crosslistings[0];
  }
}
