import { Modal } from "@components/common";
import { CourseHero, Curriculum, Keypoints } from "@components/course";
import { BaseLayout } from "@components/layout";
import { getAllCourses } from "content/courses/fetcher";
import { Course } from "content/courses/types";

export default function CourseDetail({ course }: { course: Course }) {
  const { title, description, coverImage, wsl } = course;

  return (
    <>
      <div className="py-4">
        <CourseHero
          title={title}
          description={description}
          image={coverImage}
        />
      </div>
      <Keypoints points={wsl} />
      <Curriculum locked={true} />
      <Modal />
    </>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourses();

  return {
    paths: data.map((c) => ({
      params: {
        slug: c.slug,
      },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }: any) {
  const { data } = getAllCourses();
  const course = data.filter((c) => c.slug === params.slug)[0];

  return {
    props: {
      course,
    },
  };
}

CourseDetail.Layout = BaseLayout;
