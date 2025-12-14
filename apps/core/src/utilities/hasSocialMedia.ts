import { Configuration } from "@/payload-types";

type SocialMedia = Configuration["social"];
export function hasSocialMedia(socialMedia: SocialMedia) {
  return [
    socialMedia?.facebook,
    socialMedia?.instagram,
    socialMedia?.restaurantguru,
    socialMedia?.tiktok,
    socialMedia?.tripadvisor,
    socialMedia?.yelp,
    socialMedia?.youtube,
  ].some(Boolean);
}