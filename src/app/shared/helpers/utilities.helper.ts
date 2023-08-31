export const formattedDate = (inputDate: Date | string | number) => new Date(inputDate).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'}).replace(',', '');

export const stripNewline = (inputString: string) => inputString.replace(/\n/g, ' ');

export const stripVNDBLink = (input: string): string =>
  input.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/g, '$2');
