// type MenuItem = {
//   id: number;
//   title: string;
//   url: string;
//   parent: string;
//   order: number;
// };

export interface Course {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    course_preview_image?: string;
    course_preview_description?: string;
    course_ms_title?: string;
    course_ms_description?: string;
    course_ms_hours?: string;
    course_ms_long?: string;
    course_structure_tabs?: {
      course_structure_tab_name: string;
      course_structure_tab_description?: string;
      course_structure_tab_points?: { course_structure_tab_point: string }[];
    }[];
    course_lectors?: {
      course_lector_name: string;
      course_lector_position: string;
      course_lector_description: string;
    }[];
    course_materials?: {
      course_lecture_name: string;      
      course_lecture_files?: { course_lecture_file: string; course_lecture_file_name:string }[];
    }[];
    theme_color?: 'Светлая' | 'Темная';
  };
}
