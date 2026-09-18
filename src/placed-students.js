// Demo portrait sources (replace with approved student photos):
// https://images.unsplash.com/photo-1666852327656-5e9fd213209b?fm=jpg&fit=crop&w=600&h=800&q=85
// https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=jpg&fit=crop&w=600&h=800&q=85
// https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&fit=crop&w=600&h=800&q=85
// Replace these placeholders with approved student names, courses and photo paths.
export const placedStudents = Array.from({ length: 6 }, (_, index) => ({
  id: 'placed-student-' + (index + 1),
  name: '',
  course: '',
  photo: index < 3 ? '/images/placed-demo-' + (index + 1) + '.jpg' : '',
  demoPhoto: index < 3,
}));
