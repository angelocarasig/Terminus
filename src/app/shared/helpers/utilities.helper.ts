import { SexualRating, ViolenceRating } from '../models/vn/visual-novel';

export const formattedDate = (inputDate: Date | string | number | undefined) => new Date(inputDate || new Date()).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'}).replace(',', '');

export const unixTimestampToDate = (inputTimestamp: number) => new Date(inputTimestamp * 1000);

export const stripVNDBLink = (input: string): string =>
  input.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/g, '$2');

// In particular this would replace the hyperlinking setup of [url=...](url link)[url] into a html version
export const replaceVNDBDescriptionLink = (input: string): string =>  (input.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>') !== input)
    ? input.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/g, '<a href="$1" target="_blank" onclick="event.stopPropagation();">$2</a>')
    : stripVNDBLink(input);

export const GetSexualRating = (input: number): SexualRating => input < 0.5 ? SexualRating.SAFE : input > 1.5 ? SexualRating.EXPLICIT : SexualRating.SUGGESTIVE;
export const GetViolenceRating = (input: number): ViolenceRating => input < 0.5 ? ViolenceRating.TAME : input > 1.5 ? ViolenceRating.BRUTAL : ViolenceRating.VIOLENT;
