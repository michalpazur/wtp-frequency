import formatDate from "date-fns/format";

export const getDate = (date?: Date, format: string = "yyyy-MM-dd") =>
  formatDate(date ? date : new Date(), format);
