import courses from "./index.json";
import { Course } from "./types";

export const getAllCourses = () => {
  return {
    data: courses as Course[],
    courseMap: (courses as Course[]).reduce((a: any, c, i) => {
      a[c.id] = c;
      a[c.id].index = i;
      return a;
    }, {}),
  };
};
