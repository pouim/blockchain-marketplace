import { useWeb3Provider } from "@components/provider";
import { Hero } from "@components/ui/common";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";

import { getAllCourses } from "content/courses/fetcher";
import { Course } from "content/courses/types";

export default function Home({ courses }: { courses: Course[] }) {
  const { isInitialized = false } = useWeb3Provider()!;

  return (
    <>
      {isInitialized ? "IsInit" : "Not Init"}
      <Hero />
      <CourseList courses={courses} />
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Home.Layout = BaseLayout;
