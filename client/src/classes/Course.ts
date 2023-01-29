import { Listing } from "./Listing";

export class DetailedCourse {
  id: number;
  title: string;
  hours: string;
  descr: string;
  listings: Listing[];
  selectedListing: number;

  constructor(id: number, title: string, hours: string, descr: string, listings: Listing[], selectedListing?: number) {
    this.id = id;
    this.title = title;
    this.hours = hours;
    this.descr = descr;
    this.listings = [];
    listings.forEach((listing) => {
      this.listings.push(new Listing(listing.id, listing.subj, listing.num));
    });
    this.selectedListing = selectedListing ?? 0;
  }

  getListingsString() {
    return this.listings
      .slice(0, -1)
      .reduce((acc, curr) => acc.concat(curr.toString()).concat(" / "), "")
      .concat(this.listings[this.listings.length - 1].toString());
  }
}
