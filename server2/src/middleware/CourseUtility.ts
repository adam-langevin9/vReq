import { Course, Listing } from "../models/init-models";

export interface DetailedCourse {
  id: number;
  title: string;
  hours: string;
  descr?: string;
  selectedListing: number;
  listings: Array<{
    id: number;
    subj: string;
    num: number;
  }>;
}

export async function getDetailedCourse(course: Course, selectedListing?: Listing): Promise<DetailedCourse> {
  const listings = await course.getListings({ attributes: { exclude: ["course_id"] } });
  const selectedListingIdx =
    selectedListing && listings.map((listing) => listing.id).includes(selectedListing.id)
      ? listings.map((listing) => listing.id).indexOf(selectedListing.id)
      : 0;
  const selectedListingSubjIdx =
    selectedListing && listings.map((listing) => listing.subj).includes(selectedListing.subj)
      ? listings.map((listing) => listing.subj).indexOf(selectedListing.subj)
      : 0;
  return {
    id: course.id,
    title: course.title,
    hours: course.hours,
    descr: course.descr,
    selectedListing: selectedListingIdx ?? selectedListingSubjIdx,
    listings,
  };
}
