import Image from "next/image";
import { Course } from "@/services/course-service";
import { Chip } from "@material-ui/core";
import { Category } from "@/services/category-service";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-0 aspect-w-16 aspect-h-9">
        <Image
          src={
            course.__thumbnail__
              ? "/api/file" + course.__thumbnail__.id
              : "/images/placeholder.png"
          }
          alt={course.title}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.title}</div>
        <p className="text-gray-700 text-base">{course.description}</p>
        {/* <div className="mt-4 flex flex-wrap">
          {course.__categories__.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              className="mr-2 mb-2"
            />
          ))}
        </div> */}
      </div>
      <div className="px-6 py-4 flex items-center justify-between">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {course.difficulty}
        </span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
