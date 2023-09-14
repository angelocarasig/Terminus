import { SexualRating, ViolenceRating, VisualNovel } from '../models/vn/visual-novel';

export const formattedDate = (inputDate: Date | string | number | undefined) => new Date(inputDate || new Date()).toLocaleString('en-US', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}).replace(',', '');

export const unixTimestampToDate = (inputTimestamp: number) => new Date(inputTimestamp * 1000);

export const stripVNDBLink = (input: string): string =>
  input.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/g, '$2');

// In particular this would replace the hyperlinking setup of [url=...](url link)[url] into a html version
export const replaceVNDBDescriptionLink = (input: string): string => (input.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>') !== input)
  ? input.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/g, '<a href="$1" target="_blank" onclick="event.stopPropagation();">$2</a>')
  : stripVNDBLink(input);

export const GetSexualRating = (input: number): SexualRating => input < 0.5 ? SexualRating.SAFE : input > 1.5 ? SexualRating.EXPLICIT : SexualRating.SUGGESTIVE;
export const GetViolenceRating = (input: number): ViolenceRating => input < 0.5 ? ViolenceRating.TAME : input > 1.5 ? ViolenceRating.BRUTAL : ViolenceRating.VIOLENT;

/**
 * @param vn Visual Novel to set as the content.
 * @return Returns a UserNovel with default parameters.
 *
 * The 'vn' property is set to the vn that's been passed in.
 */
export const GetSkeletonUserNovel = (vn: VisualNovel) => {
  return {
    added: -1,
    addedFormatted: undefined,
    finished: undefined,
    id: '',
    labels: [],
    lastmod: -1,
    lastmodFormatted: undefined,
    notes: null,
    started: undefined,
    vn: vn,
    vote: null,
    voted: null
  }
};
