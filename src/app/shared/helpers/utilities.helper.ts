import { SexualRating, ViolenceRating, VisualNovel } from '../models/vn/visual-novel';

export const weekdayDate = (date: Date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

export const formattedDate = (inputDate: Date | string | number | undefined) => new Date(inputDate || new Date()).toLocaleString('en-US', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}).replace(',', '');

export const openUrlInNewTab = (url: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const unixTimestampToDate = (inputTimestamp: number) => new Date(inputTimestamp * 1000);

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
    voted: -1
  }
};
